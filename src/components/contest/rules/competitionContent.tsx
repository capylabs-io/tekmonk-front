"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExamTable } from "../ExamTable";

export const CompetitionContent = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-12">
      <div>
        <div className="text-2xl font-bold mb-4">Bảng đấu</div>
        <p className="mb-4">
          Thí sinh đăng ký theo đúng lớp học hiện tại theo năm học 2024 - 2025
        </p>
        <div className="border rounded-lg overflow-x-auto">
          <ExamTable />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">
          Các thời điểm quan trọng của giải đấu
        </h2>
        <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-bold text-black border-r whitespace-nowrap">Vòng thi</TableHead>
              <TableHead className="font-bold text-black border-r whitespace-nowrap">Vòng Loại</TableHead>
              <TableHead className="font-bold text-black whitespace-nowrap">Vòng Quốc gia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b">
              <TableCell className="font-medium border-r whitespace-nowrap">Hạn đăng kí</TableCell>
              <TableCell className="border-r">23:59 24/11/2024</TableCell>
              <TableCell>Theo thông báo của Ban Tổ chức sau khi có kết quả Vòng Loại</TableCell>
            </TableRow>
            <TableRow className="border-b">
              <TableCell className="font-medium border-r whitespace-nowrap">Thời gian thi</TableCell>
              <TableCell className="border-r">08/12/2024</TableCell>
              <TableCell>21/12/2024</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium border-r whitespace-nowrap">Địa điểm, hình thức thi</TableCell>
              <TableCell className="border-r">
                <p>Bảng A, B, C: Tham gia thi tập trung tại các điểm thi tại Hà Nội do Ban Tổ chức lựa chọn.</p>
                <p className="mt-2">Bảng D: Nộp bài trực tuyến theo hướng dẫn của Ban Tổ chức.</p>
              </TableCell>
              <TableCell>Thi trực tiếp (tại Cung Thiếu Nhi Hà Nội)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      </div>
    </div>
  );
};
