"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { Post } from "@/components/home/Post";
import { likePost } from "@/requests/post";
import { PostType, PostTypeEnum, PostVerificationType } from "@/types";
import moment from "moment";
import { get } from "lodash";
import { useLoadingStore } from "@/store/LoadingStore";
import { useUserStore } from "@/store/UserStore";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { User } from "@/types/common-types";
import { useQuery } from "@tanstack/react-query";
import { getListPostCustom } from "@/requests/post";
import qs from "qs";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

const HistoryPage = () => {
  const { ref } = useInView();
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const [postStatus, setPostStatus] = useState<PostVerificationType>(
    PostVerificationType.ACCEPTED
  );

  // Custom useQuery instead of useInfiniteLatestPost to include verification status
  const {
    data: currentPageData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["post-history", postStatus],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          page: DEFAULT_PAGE,
          limit: DEFAULT_PAGE_SIZE,
          isVerified: postStatus,
          authorId: userInfo?.id,
          sort: "desc",
        });

        const results = await getListPostCustom(queryString);
        return results;
      } catch (error) {
        console.error("Error fetching history posts:", error);
        return { data: [] };
      }
    },
  });

  const handleTabChange = (value: string) => {
    setPostStatus(value as PostVerificationType);
  };

  const handleLikedPostClick = async (data: PostType) => {
    try {
      showLoading();
      await likePost({
        postId: get(data, "id"),
      });
      refetch();
    } catch (error) {
      console.log("error", error);
    } finally {
      hideLoading();
    }
  };

  // Flatten posts
  const posts = currentPageData?.data || [];

  // Render post list for each tab
  const renderPosts = () => {
    if (isLoading) {
      return <div className="p-8 text-center">Truy xuất dữ liệu...</div>;
    }

    if (posts.length === 0) {
      return <div className="p-8 text-center">Không có bài viết nào</div>;
    }

    return (
      <>
        {posts.map((item: PostType, index: number) => (
          <div key={item.id || index}>
            <div className="px-8 relative">
              <div className="text-sm text-gray-500 absolute top-2 right-8">
                {moment(get(item, "createdAt", ""))
                  .format("DD/MM/YYYY")
                  .toString()}
              </div>
              <Post
                isAllowClickDetail
                data={item}
                imageUrl="bg-[url('/image/home/profile-pic.png')]"
                thumbnailUrl={get(item, "thumbnail") || ""}
                userName={
                  get(item, "postedBy.username") || userInfo?.username || "User"
                }
                taggedUsers={get(item, "tagged_users", []) as User[]}
                specialName={get(item, "postedBy.skills", "")}
                postContent={get(item, "content", "")}
                postName={get(item, "name", "")}
                createdAt={moment(get(item, "createdAt", ""))
                  .format("DD/MM/YYYY")
                  .toString()}
                likedCount={get(item, "likeCount", 0).toString() || "0"}
                commentCount={get(item, "commentCount", 0).toString() || "0"}
                onLikedPostClick={handleLikedPostClick}
                onUpdatePost={refetch}
              />
            </div>
            {index !== posts.length - 1 && (
              <hr className="border-t border-gray-200 my-4" />
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 px-8 pt-4">
        Lịch sử đăng bài
      </h1>
      <Tabs
        defaultValue={PostVerificationType.ACCEPTED}
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value={PostVerificationType.ACCEPTED}>
            Bài đã được chấp nhận
          </TabsTrigger>
          <TabsTrigger value={PostVerificationType.PENDING}>
            Bài đang chờ duyệt
          </TabsTrigger>
          <TabsTrigger value={PostVerificationType.DENIED}>
            Bài đã bị từ chối
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value={PostVerificationType.ACCEPTED}
          className="overflow-y-auto"
        >
          {renderPosts()}
        </TabsContent>

        <TabsContent
          value={PostVerificationType.PENDING}
          className="overflow-y-auto"
        >
          {renderPosts()}
        </TabsContent>

        <TabsContent
          value={PostVerificationType.DENIED}
          className="overflow-y-auto"
        >
          {renderPosts()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HistoryPage;
