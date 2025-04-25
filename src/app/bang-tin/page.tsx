"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { Post } from "@/components/home/Post";
import { likePost } from "@/requests/post";
import { PostType } from "@/types";
import moment from "moment";
import { get } from "lodash";
import { useLoadingStore } from "@/store/LoadingStore";
import { useUserStore } from "@/store/UserStore";
import { useEffect } from "react";
import { useInfiniteLatestPost } from "@/hooks/use-post";
import { useInView } from "react-intersection-observer";
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;
const Home = () => {
  const { ref, inView } = useInView();

  //set for contest page
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const [userInfo] = useUserStore((state) => [state.userInfo]);

  const {
    data: currentPageData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteLatestPost({
    page: DEFAULT_PAGE,
    limit: DEFAULT_PAGE_SIZE,
  });

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

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten posts from all pages
  const flattenedPosts =
    currentPageData?.pages?.flatMap((page) => page?.data || []) || [];

  return (
    <>
      <div className="text-SubheadLg text-gray-95 px-4">Trang chủ</div>
      <Tabs defaultValue="all" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="play">Dự án</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center">Loading posts...</div>
          ) : flattenedPosts.length === 0 ? (
            <div className="p-8 text-center">No posts found</div>
          ) : (
            <>
              {flattenedPosts.map((item: PostType, index: number) => (
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
                        get(item, "postedBy.username") ||
                        userInfo?.username ||
                        "User"
                      }
                      specialName={get(item, "postedBy.skills", "")}
                      userRank={
                        <span
                          className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
                        >
                          IV
                        </span>
                      }
                      postContent={get(item, "content", "")}
                      postName={get(item, "name", "")}
                      createdAt={moment(get(item, "createdAt", ""))
                        .format("DD/MM/YYYY")
                        .toString()}
                      likedCount={get(item, "likeCount", 0).toString() || "0"}
                      commentCount={
                        get(item, "commentCount", 0).toString() || "0"
                      }
                      onLikedPostClick={handleLikedPostClick}
                      onUpdatePost={refetch}
                    />
                  </div>
                  {index !== flattenedPosts.length - 1 && (
                    <hr className="border-t border-gray-200 my-4" />
                  )}
                </div>
              ))}

              {/* Loading indicator and intersection observer target */}
              <div ref={ref} className="p-4 text-center">
                {isFetchingNextPage
                  ? "Đang tải thêm bài viết..."
                  : !hasNextPage && flattenedPosts.length > 0
                  ? ""
                  : ""}
              </div>
            </>
          )}
        </TabsContent>
        <TabsContent value="play" className="overflow-y-auto">
          Play
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Home;
