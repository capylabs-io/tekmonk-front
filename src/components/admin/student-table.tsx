"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import StudentTablePagination from "./student-table-pagination";
import Image from "next/image";
import { CommonButton } from "../common/button/CommonButton";

interface Student {
  id: number;
  name: string;
  username: string;
  email: string;
  status: string;
}

const mockData: Student[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: "Võ Minh Khôi",
  username: "minhkhoi.vo",
  email: "minhkhoi.ba@gmail.com",
  status: "Đang hoạt động",
}));
// const mockData: Student[] = [];

export default function StudentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = mockData.slice(startIndex, endIndex);
  // const currentData: Student[] = [].slice(startIndex, endIndex);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">STT</TableHead>
              <TableHead>Tên học viên</TableHead>
              <TableHead>Tên tài khoản</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length ? (
              currentData.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.username}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700">
                      {student.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-square-pen"
                        >
                          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="!p-0">
                  <div className="w-full h-[440px] flex flex-col items-center justify-center gap-4">
                    <Image
                      alt="empty-state"
                      src="/admin/empty-data.png"
                      width={300}
                      height={200}
                    />
                    <div className="flex flex-col items-center">
                      <div className="text-SubheadLg text-gray-70">
                        Không có dữ liệu
                      </div>
                      <div className="text-BodyMd text-gray-50">
                        Tạo tài khoản mới cho học viên để bắt đầu
                      </div>
                    </div>
                    <CommonButton className="h-9 w-[120px]  ">
                      <span className="text-SubheadSm text-gray-00">
                        Tạo tài khoản
                      </span>
                    </CommonButton>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <StudentTablePagination
        totalItems={mockData.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        showEllipsisThreshold={5}
      />
    </div>
  );
}
