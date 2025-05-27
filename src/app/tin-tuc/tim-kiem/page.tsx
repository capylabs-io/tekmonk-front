"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TNews } from "@/types/common-types";
import { CommonCard } from "@/components/common/CommonCard";
import { CommonTag } from "@/components/common/CommonTag";
import { Input } from "@/components/common/Input";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import qs from "qs";
import { ReqGetAllNews, ReqGetRamdomNews } from "@/requests/news";
import { get } from "lodash";
import moment from "moment";
import { SearchNewContent } from "@/components/news/SearchNewContent";
import classNames from "classnames";
import { CommonLoading } from "@/components/common/CommonLoading";
import { CommonEmptyState } from "@/components/common/CommonEmptyState";
import { useSearchParams } from "next/navigation";
export default function SearchNews() {
  //use state
  const router = useCustomRouter();
  const [searchValue, setSearchValue] = useState("");

  const searchParams = useSearchParams();
  const value = searchParams.get("value") || "";
  useEffect(() => {
    setSearchValue(value);
  }, [value]);
  // use query 
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchNews,
  } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: ["news", searchValue],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const queryString = qs.stringify({
          pagination: {
            page: pageParam,
            pageSize: 4,
          },
          filters: {
            type: "news",
            status: "public",
            $or: [
              {
                title: {
                  $contains: searchValue,
                },
              },
              {
                tags: {
                  $contains: searchValue,
                },
              },
            ],
          },
          populate: "*",
        });
        return await ReqGetAllNews(queryString);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.meta?.pagination.pageCount
        ? allPages.length + 1
        : undefined;
    },
  });

  const { data: randomNews, isLoading: isLoadingRandomNews } = useQuery({
    queryKey: ["news/random"],
    queryFn: async () => {
      try {
        return await ReqGetRamdomNews("news");
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });

  const handleSearchNews = (value: string) => {
    setSearchValue(value);
    refetchNews();
  };
  if (isLoading) {
    return <CommonLoading />;
  }
  return (
    <>
      <div
        className={classNames(
          "w-full container mx-auto mt-16 grid grid-cols-3 gap-12 pt-[28px] pb-[64px] overflow-y-auto h-max"
        )}
      >
        <div className="lg:col-span-2 col-span-3">
          <SearchNewContent
            onBack={() => {
              router.push(ROUTE.NEWS);
            }}
            value={searchValue}
            onSearch={handleSearchNews}
            data={data?.pages.flatMap((page) => page.data) || []}
          />
        </div>
        <div className="col-span-1 flex-col gap-8 lg:flex hidden">
          <div className="text-HeadingSm text-[#320130]">
            Tin tức liên quan
          </div>
          {randomNews?.data && randomNews?.data?.length > 0 && (
            <SuggestComponent data={randomNews?.data || []} />
          )}
          <Image
            src="/image/home/banner-layout.png"
            alt="Default"
            width={220}
            height={350}
            className="w-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </>
  );
}

const SuggestComponent = ({ data }: { data: TNews[] }) => {
  const router = useCustomRouter();
  const handleRedirect = (id: number) => {
    router.push(`${ROUTE.NEWS}/${id}`);
  };
  return (
    <div className="flex flex-col gap-4">
      {data.map((newsItem) => (
        <div
          key={newsItem.id}
          className="h-[80px] w-full flex items-start justify-center gap-4 cursor-pointer"
          onClick={() => handleRedirect(newsItem.id)}
        >
          <Image
            src={newsItem.thumbnail ? newsItem.thumbnail : ""}
            alt=""
            width={108}
            height={80}
            className="h-full object-cover rounded-2xl"
          />
          <div className="flex-1 flex flex-col gap-2">
            <time className="text-BodySm text-gray-70">
              {moment(newsItem.startTime).format("DD/MM/YYYY HH:mm")}
            </time>
            <div
              className="text-SubheadMd text-gray-95 line-clamp-2 overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: (get(newsItem, "title", "") || "")
                  .replace(/<[^>]+>/g, "")
                  .trim()
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};
