"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
import { SearchHeader } from "@/components/search/SearchHeader";
import {
  SearchResultItem,
  type SearchResultType,
} from "@/components/search/SearchResultItem";
import { ROUTE } from "@/contants/router";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { getListPost } from "@/requests/post";
import qs from "qs";
import { get } from "lodash";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const filterParam = searchParams.get("filter") || "all";
  const router = useCustomRouter();

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const buildQueryString = () => {
    const queryOptions: Record<string, any> = {
      populate: "postedBy",
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

  const fetchSearchResults = async () => {
    if (!queryParam) {
      setSearchResults([]);
      return;
    }

    try {
      setIsLoading(true);

      const queryString = buildQueryString();

      // In production, you'd want to remove this artificial delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const results = await getListPost(queryString);
      setSearchResults(results.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSearchQuery(queryParam);
    fetchSearchResults();
  }, [queryParam, filterParam]);

  const handleBackToBangTin = () => {
    router.push(ROUTE.NEWS_FEED);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-60"></div>
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

    return (
      <div className="space-y-4">
        <p className="text-gray-60">
          Kết quả tìm kiếm cho:{" "}
          <span className="font-medium text-gray-90">
            &quot;{queryParam}&quot;
          </span>
        </p>

        {searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((result) => (
              <SearchResultItem
                key={result.id}
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
          onClick={handleBackToBangTin}
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
