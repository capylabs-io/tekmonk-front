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
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounceValue";

export default function SearchInterface() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [searchResults, setSearchResults] = useState<ContestSubmission[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getContestSubmissionPagination(
        page,
        12,
        debouncedSearch
      );
      setSearchResults(response.data);
      const totalPages = Math.ceil(response.meta.pagination.total / 12);
      setTotalPages(totalPages);
      setLoading(false);
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
          <Skeleton className="w-full h-72" />
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
    <div className="container mx-auto pb-5 space-y-6">
      <Image
        src={`/image/contestentries/Banner.png`}
        alt={`Banner`}
        width={960}
        height={480}
        priority
        style={{ objectFit: "contain" }}
        quality={100}
      />
      <div className="w-[394px] h-12 relative mx-auto">
        <Input
          type="text"
          placeholder="Tìm kiếm bài thi theo số báo danh"
          className="w-full h-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-bodyLg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
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
          : searchResults.map((card, index) => (
              <div
                key={card.id}
                className="hover:cursor-pointer flex flex-col"
                onClick={() => navigateDetailItem(card.id)}
              >
                <Card className="overflow-hidden flex-1 items-center justify-center">
                  <CardHeader className="p-0 items-center w-full h-full justify-center">
                    <Image
                      src={
                        card.thumbnail?.url
                          ? `http://localhost:1337${card?.thumbnail.url}`
                          : "/image/new/new-pic.png"
                      }
                      alt="Into the Breach"
                      width={212}
                      height={148}
                      loading="lazy"
                      className="object-contain"
                    />
                  </CardHeader>
                </Card>
                <CardContent className="p-4">
                  <div className="text-bodySm text-gray-800">#{card.id}</div>
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
