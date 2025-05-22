"use client";

import { memo, useMemo } from "react";
import { FILTER_CATEGORY_ENUM } from "@/contants/search/filter-category";
import { SearchPostResultItem } from "./search-post-result-item";
import { SearchUserResultItem } from "./search-user-result-item";

type Props = {
  queryParam: string;
  filterParam: string;
};

export const SearchResultItem = memo((props: Props) => {
  const renderResult = useMemo(() => {
    switch (props.filterParam) {
      case FILTER_CATEGORY_ENUM.ALL:
        return (
          <>
            <SearchUserResultItem
              queryParam={props.queryParam}
              canSeeMoreDetail={true}
            />
            <SearchPostResultItem
              searchData={props.queryParam}
              filterParam={props.filterParam}
              className="mt-4"
            />
          </>
        );
      case FILTER_CATEGORY_ENUM.POSTS:
        return (
          <SearchPostResultItem
            searchData={props.queryParam}
            filterParam={props.filterParam}
          />
        );
      case FILTER_CATEGORY_ENUM.PEOPLE:
        return <SearchUserResultItem queryParam={props.queryParam} />;
      case FILTER_CATEGORY_ENUM.HASHTAG:
        return (
          <SearchPostResultItem
            searchData={props.queryParam}
            filterParam={props.filterParam}
          />
        );
      default:
        return null;
    }
  }, [props.filterParam, props.queryParam]);

  return (
    <div className="space-y-4">
      <p className="text-gray-60">
        Kết quả tìm kiếm cho:{" "}
        <span className="font-medium text-gray-90">
          &quot;{props.queryParam}&quot;
        </span>
      </p>
      <div>{renderResult}</div>
    </div>
  );
});

SearchResultItem.displayName = "SearchResultItem";
