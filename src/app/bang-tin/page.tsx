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
import { useEffect, useState, useCallback } from "react";
import { useInfiniteLatestPost } from "@/hooks/use-post";
import { useInView } from "react-intersection-observer";
import { useProfileStore } from "@/store/ProfileStore";
import { User } from "@/types/common-types";
import { motion } from "framer-motion";
import { CommonLoading } from "@/components/common/CommonLoading";
import { CommonEmptyState } from "@/components/common/CommonEmptyState";
import { ProfileUpdateReminder } from "@/components/notification/ProfileUpdateReminder";
import { UpdateInfoDialog } from "@/components/profile/UpdateInfoDialog";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { formatTimeToVietnamese } from "@/lib/utils";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

const Home = () => {
  const { ref, inView } = useInView();

  //set for contest page
  const [userInfo, isUpdated, isConnected] = useUserStore((state) => [
    state.userInfo,
    state.isUpdated,
    state.isConnected,
  ]);

  // Use a single state for tab management
  const [activeTab, setActiveTab] = useState<string>("all");
  const [postType, setPostType] = useState<PostTypeEnum>(PostTypeEnum.POST);

  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const [success] = useSnackbarStore((state) => [state.success]);

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

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [show, setTypeModal] = useProfileStore((state) => [
    state.show,
    state.setTypeModal,
  ]);
  // Memoize the tab change handler to prevent unnecessary re-renders
  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value);
      const newPostType =
        value === "all" ? PostTypeEnum.POST : PostTypeEnum.PROJECT;
      setPostType(newPostType);
      setTypeModal(newPostType);
    },
    [setTypeModal]
  );

  // Memoize the like post handler
  const handleLikedPostClick = useCallback(
    async (data: PostType) => {
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
    },
    [showLoading, hideLoading, refetch]
  );

  const handleOpenUpdateDialog = useCallback(() => {
    if (!isConnected() || isUpdated) {
      return;
    }
    setUpdateDialogOpen(true);
  }, [isConnected, isUpdated]);

  const handleUpdateDialogClose = useCallback(
    (updated: boolean) => {
      setUpdateDialogOpen(false);
      if (updated) {
        success("Thành công", "Thông tin cá nhân đã được cập nhật");
      }
    },
    [success]
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const flattenedPosts =
    currentPageData?.pages?.flatMap((page) => page?.data || []) || [];

  if (isLoading) {
    return <CommonLoading />;
  }

  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
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
                >
                  <div className="p-4 relative">
                    <div className="text-sm text-gray-500 absolute top-7 right-4">
                      {formatTimeToVietnamese(get(item, "createdAt", ""))}
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
              {flattenedPosts.length === 0 && <CommonEmptyState />}
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
              {flattenedPosts.length === 0 && <CommonEmptyState />}
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

      {/* Profile Update Reminder Dialog */}
      {/* <ProfileUpdateReminder onUpdateClick={handleOpenUpdateDialog} /> */}

      {/* Update Information Dialog */}
      {/* <UpdateInfoDialog
        open={updateDialogOpen}
        onOpenChange={handleUpdateDialogClose}
      /> */}
    </>
  );
};

export default Home;
