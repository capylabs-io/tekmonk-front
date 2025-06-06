"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import qs from "qs";
import CommonPagination from "@/components/admin/common-pagination";
import { CommonCard } from "@/components/common/CommonCard";
import { CommonTag } from "@/components/common/CommonTag";
import { Input } from "@/components/common/Input";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { BannerCard } from "@/components/new/BannerCard";
import { LandingFooter } from "@/components/new/NewsFooter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROUTE } from "@/contants/router";
import Image from "next/image";
import { useState } from "react";
import { Banknote, Users } from "lucide-react";
import { ReqGetAllNews } from "@/requests/news";
import Loading from "../loading";
import { get } from "lodash";
import { CommonButton } from "@/components/common/button/CommonButton";
import classNames from "classnames";
import { CommonEmptyState } from "@/components/common/CommonEmptyState";
const PAGE_SIZE = 4;

export default function Hiring() {
  const router = useCustomRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  const [searchQuery, setSearchQuery] = useState("");
  const [textSearch, setTextSearch] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["hiring", currentPage, sortOrder, textSearch], // include searchQuery in the query key
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          pagination: {
            page: currentPage,
            pageSize: PAGE_SIZE,
          },
          filters: {
            type: "hiring",
            status: "public",
            ...(searchQuery && {
              $or: [
                {
                  title: {
                    $contains: searchQuery, // filter by textSearch if it exists
                  },
                },
                {
                  tags: {
                    $contains: searchQuery, // filter by textSearch if it exists
                  },
                },
              ],
            }),
          },
          sort: [{ createdAt: sortOrder === "asc" ? "desc" : "asc" }],
          populate: "*",
        });
        return await ReqGetAllNews(queryString);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });

  const handleRedirectDetail = (id: number) => {
    router.push(`${ROUTE.HIRING}/${id}`);
  };

  const handleSearch = (value?: string) => {
    setTextSearch(value || searchQuery);
    refetch();
  };
  const hiringContent = (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex items-center justify-between ">
        <Input
          type="text"
          isSearch={true}
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Tìm kiếm sự kiện theo từ khoá"
          customClassNames="max-w-[410px] h-10"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          // onSearch={handleSearch}
        />
        <div className="flex items-center gap-1">
          <div className="text-BodySm text-gray-70">Hiển thị theo:</div>
          {/* show select item */}
          <Select onValueChange={setSortOrder}>
            <SelectTrigger
              className="w-[100px] h-8 border border-gray-30 rounded-[4px]"
              style={{ boxShadow: "0px 2px 0px #DDD0DD" }}
            >
              <SelectValue
                placeholder={sortOrder === "asc" ? "Mới nhất" : "Cũ nhất"}
              />
            </SelectTrigger>
            <SelectContent className="bg-gray-00">
              <SelectGroup>
                <SelectItem
                  value="asc"
                  className="cursor-pointer hover:bg-primary-10"
                >
                  Mới nhất
                </SelectItem>
                <SelectItem
                  value="desc"
                  className="cursor-pointer hover:bg-primary-10"
                >
                  Cũ nhất
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {textSearch !== "" && (
        <div className="mt-4 text-gray-50 text-SubheadMd text-start w-full">
          Tìm thấy{" "}
          <span className="text-primary-95">
            {(data?.data && data?.data?.length) || 0}
          </span>{" "}
          kết quả phù hợp với từ khoá:{" "}
          <span className="text-primary-95">&quot;{textSearch}&quot;</span>
        </div>
      )}
      {/* show item grid here */}
      {isLoading ? (
        <div className="w-full flex flex-col items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="w-full gap-6 grid grid-cols-3">
          {data?.data && data?.data?.length > 0 ? (
            data.data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full max-h-[411px] flex flex-col items-center gap-4 self-stretch"
                >
                  <Image
                    alt=""
                    src={item.thumbnail ? item.thumbnail : ""}
                    width={411}
                    height={220}
                    className="w-full h-[220px] object-cover rounded-2xl hover:cursor-pointer"
                    onClick={() => handleRedirectDetail(item.id)}
                  />
                  <div className="w-full flex flex-col gap-2 flex-grow">
                    <div
                      className="text-HeadingSm text-gray-95 line-clamp-2 w-full overflow-hidden text-ellipsis flex-grow hover:cursor-pointer hover:underline hover:text-primary-95"
                      onClick={() => handleRedirectDetail(item.id)}
                      dangerouslySetInnerHTML={{
                        __html: (get(item, "title", "") || "")
                          .replace(/<[^>]+>/g, "")
                          .trim(),
                      }}
                    ></div>
                    <div
                      className="text-BodySm text-gray-95 flex gap-2 items-center hover:cursor-pointer hover:underline hover:text-primary-95"
                      onClick={() => handleRedirectDetail(item.id)}
                    >
                      <Banknote className="text-gray-70" size={16} />
                      <div>
                        Mức lương:{" "}
                        {item.minSalary && item.maxSalary
                          ? `${item.minSalary} - ${item.maxSalary}`
                          : "Lương thỏa thuận"}
                      </div>
                    </div>
                    <div
                      className="text-BodySm text-gray-95 flex gap-2 items-center hover:cursor-pointer hover:underline hover:text-primary-95"
                      onClick={() => handleRedirectDetail(item.id)}
                    >
                      <Users className="text-gray-70" size={16} />
                      <div>
                        Số lượng tuyển dụng:{" "}
                        {item.recruitmentNumber || "Không xác định"}
                      </div>
                    </div>
                    <div className="flex items-start gap-2 justify-start">
                      {item.tags?.split(",").map((tag, tagIndex) => {
                        return (
                          <CommonTag
                            key={tagIndex}
                            className="tag-class"
                            onClick={() => {
                              setTextSearch(tag);
                              setSearchQuery(tag);
                            }}
                          >
                            {tag}
                          </CommonTag>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3">
              <CommonEmptyState />
            </div>
          )}
        </div>
      )}
      <div className="w-full flex justify-center">
        <CommonPagination
          showDetails={false}
          totalItems={data?.meta?.pagination?.total || 0}
          currentPage={currentPage}
          itemsPerPage={PAGE_SIZE}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={() => {}}
          className="max-w-[444px]"
        />
      </div>
    </div>
  );
  return (
    <div
      className={classNames(
        "w-full container mx-auto flex flex-col items-center gap-8 py-7 mt-16"
      )}
    >
      <BannerCard className="w-full rounded-3xl h-[500px]" type="hiring">
        <div className="flex flex-col items-center gap-6 z-10">
          <div className="text-DisplayMd text-gray-10">
            Tuyển dụng tại TekMonk
          </div>
          <div className="text-center text-SubheadLg text-gray-10 max-w-[560px]">
            Cùng nhau gieo mầm công nghệ – Nơi bạn truyền cảm hứng cho thế hệ
            lập trình viên tương lai!
          </div>
        </div>
      </BannerCard>
      {hiringContent}
    </div>
  );
}
