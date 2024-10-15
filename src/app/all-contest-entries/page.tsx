"use client";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContestSubmissionPagination } from "@/requests/contestSubmit";
import { ContestSubmission } from "@/types/contestSubmit";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounceValue";
import { EmptySearch } from "@/components/common/EmptySearch";
import { ImageCustom } from "@/components/common/ImageCustom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchInterface() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tag = searchParams.get("tag") || "";
  const keyword = searchParams.get("search") || "";

  const [search, setSearch] = useState(keyword);
  const debouncedSearch = useDebounce(search, 500);
  const [searchResults, setSearchResults] = useState<ContestSubmission[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getContestSubmissionPagination(
          page,
          12,
          debouncedSearch,
          tag
        );
        setSearchResults(response.data);
        const totalPages = Math.ceil(response.meta.pagination.total / 12);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page, debouncedSearch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const navigateDetailItem = (id: string) => {
    router.push(`/all-contest-entries/${id}`);
  };

  const SkeletonCard = () => (
    <div className="hover:cursor-pointer">
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <Skeleton className="w-full h-48" />
        </CardHeader>
      </Card>
      <CardContent className="p-4">
        <Skeleton className="h-4 w-1/4 mb-2" />
        <Skeleton className="h-6 w-full" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-4 w-1/3" />
      </CardFooter>
    </div>
  );

  return (
    <div className="mx-auto pb-5 space-y-6">
      <Image
        src={`/image/contestentries/Banner.png`}
        alt={`Banner`}
        width={720}
        height={480}
        priority
        style={{ objectFit: "contain" }}
        quality={100}
      />
      <div className="w-[500px] flex items-center border rounded-lg h-12 mx-auto px-3 overflow-hidden">
        <Select defaultValue={tag == "" ? "candidateNumber" : "tag"}>
          <SelectTrigger className="w-[240px] border-0 border-r rounded-none focus:outline-none focus:ring-0">
            <SelectValue placeholder="Tìm kiếm theo" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectLabel>Loại</SelectLabel>
              <SelectItem value="tag">Tag</SelectItem>
              <SelectItem value="candidateNumber">Số báo danh</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Tìm kiếm bài thi"
          className="w-full h-full ml-1 py-2 text-bodyLg border-none rounded-none focus-visible:outline-none focus-visible:ring-0"
          value={tag != "" ? tag : search}
          onChange={(e) => setSearch(e.target.value)}
        />
          <svg
            className="h-8 w-8 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-4">
        {loading
          ? Array(12)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)
          : searchResults.map((card, _) => (
              <div
                key={card.id}
                className="hover:cursor-pointer flex flex-col"
                onClick={() => navigateDetailItem(card.id)}
              >
                <Card className="overflow-hidden flex-1 items-center justify-center">
                  <CardHeader className="p-0 items-center w-full h-full min-h-[148px] justify-center">
                    <AspectRatio ratio={16 / 9}>
                      <ImageCustom
                        src={
                          card.thumbnail?.url
                            ? card?.thumbnail.url
                            : "/image/new/new-pic.png"
                        }
                        alt="Into the Breach"
                        fill
                        loading="lazy"
                        quality={30}
                        className="object-contain"
                      />
                    </AspectRatio>
                  </CardHeader>
                </Card>
                <CardContent className="p-4">
                  <div className="text-bodySm text-gray-800">
                    #{card.contest_entry?.candidateNumber}
                  </div>
                  <div className="text-SubheadXs text-gray-800 line-clamp-2">
                    {card.title}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="text-bodySm text-gray-800">
                    {card.contest_entry?.user.fullName || "Unknown"}
                  </div>
                </CardFooter>
              </div>
            ))}
      </div>
      {searchResults.length === 0 && !loading && (
        <EmptySearch
          message="Oops! Không thể tìm thấy bài thi nào"
          buttonText="Tải lại"
          onAction={() => setSearch("")}
        />
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= page - 1 && pageNumber <= page + 1)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === page}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (pageNumber === page - 2 || pageNumber === page + 2) {
              return <PaginationEllipsis key={pageNumber} />;
            }
            return null;
          })}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
