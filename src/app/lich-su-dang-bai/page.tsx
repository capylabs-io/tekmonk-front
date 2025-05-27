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
import { useInView } from "react-intersection-observer";
import { User } from "@/types/common-types";
import { useInfiniteLatestPost } from "@/hooks/use-post";
import { Clock, XCircle } from "lucide-react";
import { CommonEmptyState } from "@/components/common/CommonEmptyState";
import { CommonLoading } from "@/components/common/CommonLoading";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

const StatusBadge = ({ status }: { status: PostVerificationType }) => {
  switch (status) {
    case PostVerificationType.PENDING:
      return (
        <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md text-sm">
          <Clock size={16} />
          <span>Đang chờ duyệt</span>
        </div>
      );
    case PostVerificationType.DENIED:
      return (
        <div className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-md text-sm">
          <XCircle size={16} />
          <span>Đã bị từ chối</span>
        </div>
      );
    default:
      return null;
  }
};

const HistoryPage = () => {
  const { ref, inView } = useInView();
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const [postStatus, setPostStatus] = useState<PostVerificationType>(
    PostVerificationType.ACCEPTED
  );

  const {
    data: acceptedPostsData,
    isLoading: isLoadingAccepted,
    fetchNextPage: fetchNextPageAccepted,
    hasNextPage: hasNextPageAccepted,
    isFetchingNextPage: isFetchingNextPageAccepted,
    refetch: refetchAccepted,
  } = useInfiniteLatestPost({
    page: DEFAULT_PAGE,
    limit: DEFAULT_PAGE_SIZE,
    isVerified: PostVerificationType.ACCEPTED,
    authorId: userInfo?.id,
  });

  const {
    data: pendingPostsData,
    isLoading: isLoadingPending,
    fetchNextPage: fetchNextPagePending,
    hasNextPage: hasNextPagePending,
    isFetchingNextPage: isFetchingNextPagePending,
    refetch: refetchPending,
  } = useInfiniteLatestPost({
    page: DEFAULT_PAGE,
    limit: DEFAULT_PAGE_SIZE,
    isVerified: PostVerificationType.PENDING,
    authorId: userInfo?.id,
  });

  const {
    data: deniedPostsData,
    isLoading: isLoadingDenied,
    fetchNextPage: fetchNextPageDenied,
    hasNextPage: hasNextPageDenied,
    isFetchingNextPage: isFetchingNextPageDenied,
    refetch: refetchDenied,
  } = useInfiniteLatestPost({
    page: DEFAULT_PAGE,
    limit: DEFAULT_PAGE_SIZE,
    isVerified: PostVerificationType.DENIED,
    authorId: userInfo?.id,
  });

  const getCurrentData = () => {
    switch (postStatus) {
      case PostVerificationType.ACCEPTED:
        return {
          data: acceptedPostsData,
          isLoading: isLoadingAccepted,
          fetchNextPage: fetchNextPageAccepted,
          hasNextPage: hasNextPageAccepted,
          isFetchingNextPage: isFetchingNextPageAccepted,
          refetch: refetchAccepted,
        };
      case PostVerificationType.PENDING:
        return {
          data: pendingPostsData,
          isLoading: isLoadingPending,
          fetchNextPage: fetchNextPagePending,
          hasNextPage: hasNextPagePending,
          isFetchingNextPage: isFetchingNextPagePending,
          refetch: refetchPending,
        };
      case PostVerificationType.DENIED:
        return {
          data: deniedPostsData,
          isLoading: isLoadingDenied,
          fetchNextPage: fetchNextPageDenied,
          hasNextPage: hasNextPageDenied,
          isFetchingNextPage: isFetchingNextPageDenied,
          refetch: refetchDenied,
        };
      default:
        return {
          data: acceptedPostsData,
          isLoading: isLoadingAccepted,
          fetchNextPage: fetchNextPageAccepted,
          hasNextPage: hasNextPageAccepted,
          isFetchingNextPage: isFetchingNextPageAccepted,
          refetch: refetchAccepted,
        };
    }
  };

  const handleTabChange = (value: string) => {
    setPostStatus(value as PostVerificationType);
  };

  const handleLikedPostClick = async (data: PostType) => {
    try {
      showLoading();
      await likePost({
        postId: get(data, "id"),
      });

      // Refetch based on current tab
      const { refetch } = getCurrentData();
      refetch();
    } catch (error) {
      console.log("error", error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    const { hasNextPage, fetchNextPage, isFetchingNextPage } = getCurrentData();
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    inView,
    postStatus,
    acceptedPostsData,
    pendingPostsData,
    deniedPostsData,
  ]);

  // Get current data based on selected tab
  const {
    data: currentPageData,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = getCurrentData();

  // Flatten posts from all pages
  const flattenedPosts =
    currentPageData?.pages?.flatMap((page) => page?.data || []) || [];

  const renderPostList = () => {
    if (isLoading) {
      return <CommonLoading />;
    }

    if (flattenedPosts.length === 0) {
      return <CommonEmptyState />;
    }

    return (
      <>
        {flattenedPosts.map((item: PostType, index: number) => (
          <div key={item.id || index}>
            <div className="px-8 relative">
              {postStatus !== PostVerificationType.ACCEPTED && (
                <div className="absolute top-2 right-8 z-10">
                  <StatusBadge status={postStatus} />
                </div>
              )}
              <div className="text-sm text-gray-500 absolute top-2 right-8">
                {moment(get(item, "createdAt", ""))
                  .format("DD/MM/YYYY")
                  .toString()}
              </div>
              <Post
                isAllowClickDetail={
                  postStatus === PostVerificationType.ACCEPTED
                }
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
                onUpdatePost={() => {
                  const { refetch } = getCurrentData();
                  refetch();
                }}
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
    );
  };

  // Get total counts for each tab
  const pendingTotal = get(
    pendingPostsData,
    "pages[0].meta.pagination.total",
    0
  );
  const deniedTotal = get(deniedPostsData, "pages[0].meta.pagination.total", 0);
  const acceptedTotal = get(
    acceptedPostsData,
    "pages[0].meta.pagination.total",
    0
  );

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
            Bài đã được chấp nhận ({acceptedTotal})
          </TabsTrigger>
          <TabsTrigger value={PostVerificationType.PENDING}>
            Bài đang chờ duyệt ({pendingTotal})
          </TabsTrigger>
          <TabsTrigger value={PostVerificationType.DENIED}>
            Bài đã bị từ chối ({deniedTotal})
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value={PostVerificationType.ACCEPTED}
          className="overflow-y-auto"
        >
          {renderPostList()}
        </TabsContent>

        <TabsContent
          value={PostVerificationType.PENDING}
          className="overflow-y-auto"
        >
          {renderPostList()}
        </TabsContent>

        <TabsContent
          value={PostVerificationType.DENIED}
          className="overflow-y-auto"
        >
          {renderPostList()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HistoryPage;
