"use client";

import { useState, useMemo } from "react";
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

interface Contestant {
  rank: number;
  name: string;
  id: string;
  project: string;
  score: number;
}

const contestants: Contestant[] = [
  {
    rank: 1,
    name: "Lê Công Minh",
    id: "#5903483",
    project: "Dự án Chơi cờ tướng AI",
    score: 9500,
  },
  {
    rank: 2,
    name: "Phan Trọng Nghĩa",
    id: "#123594",
    project: "Dự án Giấc mơ VR",
    score: 9000,
  },
  {
    rank: 3,
    name: "Phạm Hoài Ngân",
    id: "#0703483",
    project: "Dự án Pikachu du đấy",
    score: 8500,
  },
  {
    rank: 4,
    name: "Lê Minh Châu",
    id: "#123594",
    project: "Dự án OpenAI",
    score: 7000,
  },
  {
    rank: 5,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Dự án Tesla cho trẻ em vùng cao",
    score: 8120,
  },
  {
    rank: 6,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Triển khai mô hình thuật toán đám mây",
    score: 8120,
  },
  {
    rank: 7,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 8,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 9,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 10,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 11,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 12,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 13,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 14,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 15,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 16,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
  {
    rank: 0,
    name: "Hoà Nhân",
    id: "#123594",
    project: "Cyber security for W3",
    score: 8120,
  },
];

export default function CompetitionResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredContestants = useMemo(() => {
    return contestants.filter(
      (contestant) =>
        contestant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contestant.project.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredContestants.length / itemsPerPage);
  const pageContestants = filteredContestants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen max-w-[720px] mx-auto bg-white mb-4">
      <Card className="w-full mx-auto boder">
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

          {/* <div className="mb-4">
            <Label htmlFor="search" className="text-sm font-medium text-gray-700">Tìm kiếm</Label>
            <Input
              id="search"
              type="text"
              placeholder="Tìm kiếm theo tên hoặc dự án..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
          </div> */}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="p-4">
                <TableRow>
                  <TableHead className="w-[20%] text-SubheadXs text-gray-700 text-center">
                    THỨ HẠNG
                  </TableHead>
                  <TableHead className="text-SubheadXs text-gray-700 text-center">
                    THÍ SINH
                  </TableHead>
                  <TableHead className="text-center text-SubheadXs text-gray-700">
                    ĐIỂM SỐ
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageContestants.map((contestant, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <TableCell className="text-SubheadSm text-gray-500 text-center">
                      {contestant.rank}
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="text-SubheadMd text-primary-950">
                          {contestant.name}
                        </span>{" "}
                        <span className="text-bodyMd text-gray-500">
                          {contestant.id}
                        </span>
                      </div>
                      <div className="text-bodyMd text-gray-950">
                        {contestant.project}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-SubheadMd text-gray-950">
                      {contestant.score}
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
