"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SearchBar, SearchOption } from "@/components/common/SearchBar";
import { getContestSubmissionResult } from "@/requests/contestSubmit";
import { ContestSubmission } from "@/types/contestSubmit";
import get from "lodash/get";
import { useDebounce } from "@/hooks/useDebounceValue";

const searchOptions: SearchOption[] = [
  { value: "candidateNumber", label: "Số báo danh" },
  { value: "name", label: "Tên thí sinh" },
  { value: "project", label: "Dự án" },
];

export default function CompetitionResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [searchType, setSearchType] = useState(searchOptions[0].value);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<ContestSubmission[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  const fetchData = async () => {
    try {
      const response = await getContestSubmissionResult(
        currentPage,
        itemsPerPage,
        searchType === "name" ? searchTerm : "",
        searchType === "candidateNumber" ? searchTerm : "",
        searchType === "project" ? searchTerm : ""
      );
      setData(response.data);
      setTotalPages(Math.ceil(response.meta.pagination.total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, debouncedSearchTerm, searchType]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearchTypeChange = (value: string) => {
    setSearchType(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, searchType]);

  return (
    <div className="min-h-screen max-w-[720px] mx-auto bg-white">
      <Card className="w-full mx-auto border-l border-r border-b rounded-none border-t-0">
        <CardHeader className="w-full h-16 p-5">
          <CardTitle className="w-full h-16 text-2xl sm:text-SubheadLg text-primary-900 p-0">
            KẾT QUẢ
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full p-0">
          <div
            className="w-full h-64 bg-contain bg-no-repeat"
            style={{
              backgroundImage: "url('/image/contest/result-contest.png')",
            }}
          ></div>
          <SearchBar
            searchOptions={searchOptions}
            searchType={searchType}
            placeholder="Tìm kiếm kết quả"
            searchValue={searchTerm}
            onSearchValueChange={handleSearchChange}
            onSearchTypeChange={handleSearchTypeChange}
            customStyle="my-4"
          />
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="p-4">
                <TableRow>
                  <TableHead className="w-[20%] text-SubheadXs text-gray-700 text-center">
                    STT
                  </TableHead>
                  <TableHead className="text-SubheadXs text-gray-700 text-center">
                    THÍ SINH
                  </TableHead>
                  <TableHead className="text-center text-SubheadXs text-gray-700">
                    KẾT QUẢ
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((contestant, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <TableCell className="text-SubheadSm text-gray-500 text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="text-SubheadMd text-primary-950">
                          {get(contestant, "contest_entry.user.fullName", "")}
                        </span>{" "}
                        <span className="text-bodyMd text-gray-500">
                          {get(contestant, "contest_entry.candidateNumber", "")}
                        </span>
                      </div>
                      <div className="text-bodyMd text-gray-950">
                        {get(contestant, "title", "")}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-SubheadMd text-gray-950">
                      {get(contestant, "QualifiedExam", null) === null
                        ? "CHƯA CHẤM"
                        : get(contestant, "QualifiedExam")
                        ? "ĐẠT"
                        : "KHÔNG ĐẠT"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-between items-center px-2 pb-1">
            <div className="text-sm text-gray-500">
              Trang {currentPage} / {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Trước
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Sau
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
