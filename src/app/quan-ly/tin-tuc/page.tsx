"use client";

import StudentTable from "@/components/admin/student-table";
import { CommonButton } from "@/components/common/button/CommonButton";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StudentTablePagination from "@/components/admin/student-table-pagination";
// Sample data
const newsData: any[] = [
  {
    id: 1,
    image: "https://tekdojo-be.s3.ap-southeast-1.amazonaws.com/News/demo1.png",
    title:
      "TekMonk nhận đầu tư 15 triệu USD vòng Series B, dẫn đầu phát triển năng lực công nghệ Việt Nam",
    topics: ["Tin tức"],
    date: "10/11/2025 - 14:05",
  },
  {
    id: 2,
    image: "https://tekdojo-be.s3.ap-southeast-1.amazonaws.com/News/demo1.png",
    title:
      "TekMonk nhận đầu tư 15 triệu USD vòng Series B, dẫn đầu phát triển năng lực công nghệ Việt Nam",
    topics: ["Hướng dẫn"],
    date: "10/11/2025 - 14:05",
  },
  // Add more items as needed
];
export default function Page() {
  return (
    <div className="w-full h-full border-r border-gray-20 overflow-y-auto">
      <div className="w-full h-auto min-h-[68px] flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 border-b border-gray-20">
        <div className="text-SubheadLg text-gray-95 mb-2 sm:mb-0">Học viên</div>
        <CommonButton
          className="h-9 w-full sm:w-[120px] text-gray-00"
          variant="primary"
        >
          <div className="text-SubheadSm">Tạo tài khoản</div>
        </CommonButton>
      </div>
      <div className="p-4 flex-1">
        {/* <StudentTable /> */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">STT</TableHead>
              <TableHead className="w-[120px]">Ảnh bìa</TableHead>
              <TableHead>Tên bài viết</TableHead>
              <TableHead className="w-[200px]">Chủ đề</TableHead>
              <TableHead className="w-[180px]">Ngày đăng</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={100}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {item.topics.map((topic: any) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="bg-secondary/20"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-full flex items-center justify-center">
        <StudentTablePagination
          showDetails={true}
          totalItems={100}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={(page) => {}}
          onItemsPerPageChange={() => {}}
          className="max-w-[444px]"
        />
      </div>
    </div>
  );
}
