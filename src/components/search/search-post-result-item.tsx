"use client";

import { Post } from "../home/Post";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { Button } from "../ui/button";
import { PostType, PostVerificationType } from "@/types";
import { useInfiniteLatestPost } from "@/hooks/use-post";
import classNames from "classnames";
import { CommonLoading } from "../common/CommonLoading";

type Props = {
  searchData: string;
  page?: number;
  limit?: number;
  filterParam?: string;
  className?: string;
};

export const SearchPostResultItem = ({
  searchData,
  page = 1,
  limit = 10,
  filterParam = "all",
  className,
}: Props) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteLatestPost({
      page,
      limit,
      searchTerm: searchData,
      isVerified: PostVerificationType.ACCEPTED,
    });
  console.log("data", data);

  useEffect(() => {
    if (data) {
      const allPosts = data.pages.flatMap((page: any) => page?.data || []);
      setPosts(allPosts);
    }
  }, [data, searchData]);

  if (isLoading) {
    return <CommonLoading />;
  }

  if (posts.length === 0) {
    return <div className="p-4">Không tìm thấy bài viết</div>;
  }

  return (
    <div className={classNames("space-y-4", className)}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-70">Bài viết</p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Post
            key={`post-${post.id}`}
            data={post}
            imageUrl={get(
              post,
              "postedBy.imageURL",
              "/image/home/profile-pic.png"
            )}
            thumbnailUrl={post.thumbnail || ""}
            userName={get(post, "postedBy.username", "")}
            specialName={get(post, "postedBy.specialName", "")}
            createdAt={post.createdAt || ""}
            likedCount={post.likeCount?.toString() || "0"}
            commentCount={post.commentCount?.toString() || "0"}
            postName={post.name || ""}
            postContent={post.content || ""}
            isAllowClickDetail={true}
            hideSocial={true}
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-60 disabled:opacity-50 transition-colors"
          >
            {isFetchingNextPage ? (
              <span className="flex items-center">
                <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Đang tải...
              </span>
            ) : (
              "Xem thêm"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
