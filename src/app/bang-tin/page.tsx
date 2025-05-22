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
import { useEffect, useState } from "react";
import { useInfiniteLatestPost } from "@/hooks/use-post";
import { useInView } from "react-intersection-observer";
import { useProfileStore } from "@/store/ProfileStore";
import { User } from "@/types/common-types";
import { motion } from "framer-motion";
import { AnimationLoading } from "@/components/lottie/AnimationLoading";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;
const Home = () => {
  const { ref, inView } = useInView();

  //set for contest page
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const [postType, setPostType] = useState<PostTypeEnum>(PostTypeEnum.POST);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
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
    type: postType,
    isVerified: PostVerificationType.ACCEPTED,
  });
  const [tabValue, setTabValue] = useState<string>("all");
  const handleTabChange = (value: string) => {
    setTabValue(value);
    setPostType(value === "all" ? PostTypeEnum.POST : PostTypeEnum.PROJECT);
    setTypeModal(value === "all" ? PostTypeEnum.POST : PostTypeEnum.PROJECT);
  };
  const [show, setTypeModal] = useProfileStore((state) => [
    state.show,
    state.setTypeModal,
  ]);
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

  // useEffect(() => {
  //   if (isLoading) {
  //     showLoading();
  //   } else {
  //     hideLoading();
  //   }
  // }, [isLoading, showLoading, hideLoading]);
  if (isLoading) {
    return (
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70 text-6xl">
        <div className="flex flex-col items-center">
          <AnimationLoading className="w-[400px] h-[400px]" />
        </div>
      </div>
    );
  }
  return (
    <>
      {/* <div className="flex justify-end items-center px-8">
        {
          tabValue === "project" && (
            <CommonButton
              variant="secondary"
              className="w-full !rounded-3xl h-12"
              onClick={handleOpenModal}
            >
              Đăng dự án
            </CommonButton>
          )
        }
      </div> */}
      <Tabs
        onValueChange={handleTabChange}
        defaultValue="all"
        className="w-full"
      >
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="project">Dự án</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="overflow-y-auto">
          {!isLoading && (
            <>
              {flattenedPosts.map((item: PostType, index: number) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  // whileHover={{
                  //   scale: 1.01,
                  //   transition: { duration: 0.2 }
                  // }}
                >
                  <div className="p-4 relative">
                    <div className="text-sm text-gray-500 absolute top-7 right-4">
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
                      taggedUsers={get(item, "tagged_users", []) as User[]}
                      specialName={get(item, "postedBy.specialName", "")}
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
                    <hr className="border-t border-gray-200" />
                  )}
                </motion.div>
              ))}

              {/* Loading indicator and intersection observer target */}
              <motion.div
                ref={ref}
                className="p-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isFetchingNextPage
                  ? "Đang tải thêm bài viết..."
                  : !hasNextPage && flattenedPosts.length > 0
                  ? ""
                  : ""}
              </motion.div>
            </>
          )}
        </TabsContent>
        <TabsContent value="project" className="overflow-y-auto">
          {!isLoading && (
            <>
              {flattenedPosts.map((item: PostType, index: number) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  // whileHover={{
                  //   scale: 1.01,
                  //   transition: { duration: 0.2 }
                  // }}
                >
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
                      specialName={get(item, "postedBy.specialName", "")}
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
                </motion.div>
              ))}

              {/* Loading indicator and intersection observer target */}
              <motion.div
                ref={ref}
                className="p-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isFetchingNextPage
                  ? "Đang tải thêm bài viết..."
                  : !hasNextPage && flattenedPosts.length > 0
                  ? ""
                  : ""}
              </motion.div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Home;
