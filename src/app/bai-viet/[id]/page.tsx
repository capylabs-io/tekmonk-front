"use client";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

import { PostCommentContent } from "@/components/home/PostCommentContent";
import { Post } from "@/components/home/Post";
import { PostType, PostVerificationType } from "@/types";
import { get } from "lodash";
import moment from "moment";
import { findPost, likePost } from "@/requests/post";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useUserStore } from "@/store/UserStore";
import { useQuery } from "@tanstack/react-query";
import Script from "next/script";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { AuthGuard } from "@/components/hoc/auth-guard";
import qs from "qs";
import { User } from "@/types/common-types";
import { CommonLoading } from "@/components/common/CommonLoading";
// Thêm kiểu cho window.FB
declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: () => void;
      };
    };
  }
}

export default function Page({ params }: { params: { id: number } }) {
  const router = useCustomRouter();
  const [showError] = useSnackbarStore((state) => [state.error]);
  const [userInfo] = useUserStore((state) => [state.userInfo]);

  const {
    data: postData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["post", params.id],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          populate: ["postedBy", "tagged_users", "comments"],
        });
        const res = await findPost(params.id, queryString);
        return res;
      } catch (error) {
        console.log("error", error);
        showError("Lỗi", "Không tìm thấy bài viết");
        return null;
      }
    },
    enabled: !!params.id,
  });

  // Thêm Facebook Open Graph script
  useEffect(() => {
    if (postData) {
      const postedById = get(postData, "postedBy.data.id");
      if (
        (postData.isVerified === PostVerificationType.PENDING ||
          postData.isVerified === PostVerificationType.DENIED) &&
        postedById !== userInfo?.id
      ) {
        showError("Lỗi", "Bạn không có quyền xem bài viết này");
        router.back();
      }
      // Tạo hoặc cập nhật meta tags
      const updateMetaTags = () => {
        // Facebook / Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector(
          'meta[property="og:description"]'
        );
        const ogImage = document.querySelector('meta[property="og:image"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');

        if (!ogTitle) {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "og:title");
          meta.setAttribute("content", postData.name || "Bài viết");
          document.head.appendChild(meta);
        } else {
          ogTitle.setAttribute("content", postData.name || "Bài viết");
        }

        if (!ogDesc) {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "og:description");
          meta.setAttribute(
            "content",
            postData.content?.replace(/<[^>]*>?/gm, "").substring(0, 200) || ""
          );
          document.head.appendChild(meta);
        } else {
          ogDesc.setAttribute(
            "content",
            postData.content?.replace(/<[^>]*>?/gm, "").substring(0, 200) || ""
          );
        }

        if (!ogImage) {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "og:image");
          meta.setAttribute("content", postData.thumbnail || "");
          document.head.appendChild(meta);
        } else {
          ogImage.setAttribute("content", postData.thumbnail || "");
        }

        if (!ogUrl) {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "og:url");
          meta.setAttribute(
            "content",
            `${process.env.NEXT_PUBLIC_BASE_URL}/bai-viet/${params.id}`
          );
          document.head.appendChild(meta);
        } else {
          ogUrl.setAttribute(
            "content",
            `${process.env.NEXT_PUBLIC_BASE_URL}/bai-viet/${params.id}`
          );
        }
      };

      updateMetaTags();

      // Facebook Refresh
      if (window.FB) {
        window.FB.XFBML.parse();
      }
    }
  }, [postData, params.id]);

  const handleLikedPostClick = async (data: PostType) => {
    try {
      if (!params.id || typeof Number(params.id) !== "number") {
        showError("Lỗi", "Không tìm thấy bài viết");
        return;
      }
      await likePost({
        postId: Number(params.id),
      });
    } catch (error) {
      console.error(error);
    } finally {
      refetch();
    }
  };

  if (isLoading) {
    return <CommonLoading />;
  }
  if (postData?.isVerified !== PostVerificationType.ACCEPTED) {
    return <div>Bài viết đang chờ duyệt</div>;
  }
  return (
    <>
      <Script
        id="facebook-jssdk"
        strategy="afterInteractive"
        src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v18.0"
      />

      <div className="flex justify-between px-4 pb-[10px] item-center border-b">
        <div className="flex gap-2 item-center">
          <ArrowLeft
            size={24}
            className="text-gray-600"
            onClick={() => router.back()}
          />
          <span className="text-SubheadLg">Bài đăng</span>
        </div>
      </div>
      <div className="mt-3 px-6">
        <Post
          data={{
            ...postData,
            id: postData?.id || 0,
            tags: postData?.tags || "",
            tagged_users: get(postData, "tagged_users.data", []).map(
              (user: User) => {
                return { ...get(user, "attributes", {}), id: get(user, "id") };
              }
            ) as User[],
            postedBy: get(postData, "postedBy.data")
              ? ({
                ...get(postData, "postedBy.data.attributes", {}),
                id: get(postData, "postedBy.data.id"),
              } as unknown as User)
              : null,
          }}
          imageUrl="bg-[url('/image/home/profile-pic.png')]"
          thumbnailUrl={get(postData, "thumbnail") || ""}
          userName={
            get(postData, "postedBy.data.attributes.username") ||
            userInfo?.username ||
            "User"
          }
          specialName={get(postData, "postedBy.skills", "")}
          userRank={
            <span
              className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
            >
              IV
            </span>
          }
          taggedUsers={
            get(postData, "tagged_users.data", []).map((user: User) => {
              return { ...get(user, "attributes", {}), id: get(user, "id") };
            }) as User[]
          }
          postContent={get(postData, "content", "")}
          postName={get(postData, "name", "")}
          createdAt={moment(get(postData, "createdAt", ""))
            .format("DD/MM/YYYY")
            .toString()}
          likedCount={get(postData, "likeCount", 0).toString() || "0"}
          commentCount={get(postData, "commentCount", 0).toString() || "0"}
          isDetail={true}
          onLikedPostClick={handleLikedPostClick}
          onUpdatePost={() => refetch()}
        />
        <div className="mt-3">
          <PostCommentContent
            postId={params.id}
            onUpdateComment={() => refetch()}
          />
        </div>
      </div>
    </>
  );
}
