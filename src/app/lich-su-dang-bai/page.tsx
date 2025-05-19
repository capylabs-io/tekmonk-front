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
    data: currentPageData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteLatestPost({
    page: DEFAULT_PAGE,
    limit: DEFAULT_PAGE_SIZE,
    isVerified: postStatus,
    type: PostTypeEnum.POST,
    authorId: userInfo?.id,
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

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten posts from all pages
  const flattenedPosts =
    currentPageData?.pages?.flatMap((page) => page?.data || []) || [];

  const renderPostList = () => {
    if (isLoading) {
      return <div className="p-8 text-center">Truy xuất dữ liệu...</div>;
    }

    if (flattenedPosts.length === 0) {
      return (
        <div className="p-8 text-center mx-auto">Không có bài viết nào</div>
      );
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
