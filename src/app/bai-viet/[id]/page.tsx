"use client";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PostCommentContent } from "@/components/home/PostCommentContent";
import { Post } from "@/components/home/Post";
import { PostType } from "@/types";
import { get } from "lodash";
import moment from "moment";
import { findPost, likePost } from "@/requests/post";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useUserStore } from "@/store/UserStore";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { id: number } }) {
  const router = useRouter();
  // const [currentPost, setCurrentPost] = useState<PostType>();
  const [hideLoading, showLoading] = useLoadingStore((state) => [
    state.hide,
    state.show,
  ]);
  const [showError] = useSnackbarStore((state) => [state.error]);
  const [userInfo] = useUserStore((state) => [state.userInfo]);

  const { data: postData, refetch } = useQuery({
    queryKey: ["post", params.id],
    queryFn: async () => {
      try {
        return await findPost(params.id);
      } catch (error) {
        console.log("error", error);
        showError("Lỗi", "Không tìm thấy bài viết");
        return null;
      }
    },
    enabled: !!params.id,
  });

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

  return (
    <>
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
          data={postData}
          imageUrl="bg-[url('/image/home/profile-pic.png')]"
          thumbnailUrl={get(postData, "thumbnail") || ""}
          userName={userInfo?.username || "User"}
          specialName={get(postData, "postedBy.skills", "")}
          userRank={
            <span
              className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
            >
              IV
            </span>
          }
          postContent={get(postData, "content", "")}
          postName={get(postData, "name", "")}
          createdAt={moment(get(postData, "createdAt", ""))
            .format("DD/MM/YYYY")
            .toString()}
          likedCount={get(postData, "likeCount", 0).toString() || "0"}
          commentCount={get(postData, "commentCount", 0).toString() || "0"}
          onLikedPostClick={handleLikedPostClick}
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
