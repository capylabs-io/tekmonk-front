"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchResultItem } from "@/components/search/SearchResultItem";
import { ROUTE } from "@/contants/router";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { getListPost } from "@/requests/post";
import { ReqCustomGetUsers } from "@/requests/user";
import qs from "qs";
import { get } from "lodash";
import { User } from "@/types/common-types";
import { AnimationLoading } from "@/components/lottie/AnimationLoading";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const filterParam = searchParams.get("filter") || "all";
  const router = useCustomRouter();

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [userResults, setUserResults] = useState<User[]>([]);

  // Pagination state
  const [postPage, setPostPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [hasMoreUsers, setHasMoreUsers] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const ITEMS_FOR_ALL_FILTER = 3;

  const buildQueryString = (page: number) => {
    const pageSize =
      filterParam === "all" ? ITEMS_FOR_ALL_FILTER : ITEMS_PER_PAGE;

    const queryOptions: Record<string, any> = {
      populate: "postedBy",
      pagination: {
        page,
        pageSize,
      },
    };

    // Build filters based on the filter parameter
    if (filterParam === "hashtag") {
      queryOptions.filters = {
        tags: {
          $contains: queryParam,
        },
      };
    } else if (filterParam === "posts") {
      queryOptions.filters = {
        name: {
          $contains: queryParam,
        },
      };
    } else {
      // Default "all" filter
      queryOptions.filters = {
        $or: [
          {
            name: {
              $contains: queryParam,
            },
          },
          {
            tags: {
              $contains: queryParam,
            },
          },
        ],
      };
    }

    return qs.stringify(queryOptions);
  };

  const buildUserQueryString = (page: number) => {
    const pageSize =
      filterParam === "all" ? ITEMS_FOR_ALL_FILTER : ITEMS_PER_PAGE;

    return qs.stringify({
      username: {
        $contains: queryParam,
      },
      pagination: {
        page,
        pageSize,
      },
    });
  };

  const fetchSearchResults = async (resetResults: boolean = true) => {
    if (!queryParam) {
      setSearchResults([]);
      setUserResults([]);
      setHasMorePosts(false);
      setHasMoreUsers(false);
      return;
    }

    try {
      if (resetResults) {
        setIsLoading(true);
        setPostPage(1);
        setUserPage(1);
      } else {
        setLoadingMore(true);
      }

      // In production, you'd want to remove this artificial delay
      if (resetResults) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // Only fetch posts if filter is 'all' or 'posts' or 'hashtag'
      if (
        filterParam === "all" ||
        filterParam === "posts" ||
        filterParam === "hashtag"
      ) {
        const currentPostPage = resetResults ? 1 : postPage;
        const queryString = buildQueryString(currentPostPage);
        const results = await getListPost(queryString);

        const posts = results.data || [];
        const pagination = results.meta?.pagination;

        if (resetResults) {
          setSearchResults(posts);
        } else {
          setSearchResults((prev) => [...prev, ...posts]);
        }

        // Check if there are more posts to load
        setHasMorePosts(pagination?.page < pagination?.pageCount);

        if (!resetResults) {
          setPostPage((prev) => prev + 1);
        }
      } else if (resetResults) {
        setSearchResults([]);
        setHasMorePosts(false);
      }

      // Only fetch users if filter is 'all' or 'people'
      if (filterParam === "all" || filterParam === "people") {
        const currentUserPage = resetResults ? 1 : userPage;
        const userQueryString = buildUserQueryString(currentUserPage);
        const userResults = await ReqCustomGetUsers(userQueryString);

        const users = userResults.data || [];
        const pagination = userResults.meta?.pagination;

        if (resetResults) {
          setUserResults(users);
        } else {
          setUserResults((prev) => [...prev, ...users]);
        }

        // Check if there are more users to load
        setHasMoreUsers(pagination?.page < pagination?.pageCount);

        if (!resetResults) {
          setUserPage((prev) => prev + 1);
        }
      } else if (resetResults) {
        setUserResults([]);
        setHasMoreUsers(false);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      if (resetResults) {
        setSearchResults([]);
        setUserResults([]);
      }
      setHasMorePosts(false);
      setHasMoreUsers(false);
    } finally {
      if (resetResults) {
        setIsLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const loadMoreResults = async () => {
    if (loadingMore) return;

    await fetchSearchResults(false);
  };

  const navigateToFilter = (filter: string) => {
    router.replace(
      `/tim-kiem?q=${encodeURIComponent(queryParam)}&filter=${filter}`
    );
  };

  useEffect(() => {
    setSearchQuery(queryParam);
    fetchSearchResults(true);
  }, [queryParam, filterParam]);

  const handleBackToNewFeed = () => {
    router.push(ROUTE.NEWS_FEED);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70 text-6xl">
          <div className="flex flex-col items-center">
            <AnimationLoading className="w-[400px] h-[400px]" />
          </div>
        </div>
      );
    }

    if (!queryParam) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Search className="h-12 w-12 text-gray-30 mb-4" />
          <p className="text-gray-60 text-center">
            Nhập từ khóa để tìm kiếm nội dung
          </p>
        </div>
      );
    }

    const hasResults = searchResults.length > 0 || userResults.length > 0;
    const hasMoreContent = hasMorePosts || hasMoreUsers;

    return (
      <div className="space-y-4">
        <p className="text-gray-60">
          Kết quả tìm kiếm cho:{" "}
          <span className="font-medium text-gray-90">
            &quot;{queryParam}&quot;
          </span>
        </p>

        {hasResults ? (
          <div className="space-y-6">
            {userResults.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-70">Người dùng</p>
                  {filterParam === "all" && hasMoreUsers && (
                    <button
                      onClick={() => navigateToFilter("people")}
                      className="text-sm text-primary-50 hover:text-primary-60 font-medium"
                    >
                      Xem tất cả người dùng
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {userResults.map((user) => (
                    <SearchResultItem
                      key={`user-${user.id}`}
                      id={user.id.toString()}
                      type="people"
                      title={user.username}
                      imageUrl={user.imageURL}
                      authorName={user.fullName || user.username}
                    />
                  ))}
                </div>
                {filterParam === "people" && hasMoreUsers && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={loadMoreResults}
                      disabled={loadingMore}
                      className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-60 disabled:opacity-50 transition-colors"
                    >
                      {loadingMore ? (
                        <span className="flex items-center">
                          <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Đang tải...
                        </span>
                      ) : (
                        "Xem thêm"
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {searchResults.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  {userResults.length > 0 && (
                    <p className="text-sm font-medium text-gray-70">Bài viết</p>
                  )}
                  {filterParam === "all" && hasMorePosts && (
                    <button
                      onClick={() => navigateToFilter("posts")}
                      className="text-sm text-primary-50 hover:text-primary-60 font-medium"
                    >
                      Xem tất cả bài viết
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {searchResults.map((result) => (
                    <SearchResultItem
                      key={`post-${result.id}`}
                      id={result.id}
                      type="post"
                      title={result.name}
                      imageUrl={result.thumbnail}
                      date={result.createdAt}
                      authorName={get(result, "postedBy.username", "")}
                      authorAvatar={get(result, "postedBy.avatar", "")}
                      tags={result.tags}
                    />
                  ))}
                </div>
                {(filterParam === "posts" || filterParam === "hashtag") &&
                  hasMorePosts && (
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={loadMoreResults}
                        disabled={loadingMore}
                        className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-60 disabled:opacity-50 transition-colors"
                      >
                        {loadingMore ? (
                          <span className="flex items-center">
                            <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Đang tải...
                          </span>
                        ) : (
                          "Xem thêm"
                        )}
                      </button>
                    </div>
                  )}
              </div>
            )}

            {filterParam !== "all" && !hasMorePosts && !hasMoreUsers && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => navigateToFilter("all")}
                  className="px-4 py-2 bg-gray-20 text-gray-70 rounded-lg hover:bg-gray-30 transition-colors"
                >
                  Quay lại tìm kiếm tổng hợp
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-60">
              Không tìm thấy kết quả nào phù hợp với từ khóa &quot;
              {queryParam}&quot;
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-2">
        <ArrowLeft
          className="h-5 w-5 mr-1 hover:text-primary-50 cursor-pointer"
          onClick={handleBackToNewFeed}
        />
        <SearchHeader />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 rounded-xl p-4">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
