"use client";

import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchResultItem } from "@/components/search/SearchResultItem";
import { ROUTE } from "@/contants/router";
import { useCustomRouter } from "@/components/common/router/CustomRouter";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const filterParam = searchParams.get("filter") || "all";
  const router = useCustomRouter();

  const handleBackToNewFeed = () => {
    router.push(ROUTE.NEWS_FEED);
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
          <div className="flex-1 rounded-xl p-4">
            <SearchResultItem
              queryParam={queryParam}
              filterParam={filterParam}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
