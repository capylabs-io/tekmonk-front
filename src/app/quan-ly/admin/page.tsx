"use client";

import { CommonButton } from "@/components/common/button/CommonButton";
import { CommonCard } from "@/components/common/CommonCard";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { Edit, PanelLeft, Trash2 } from "lucide-react";
import { useState } from "react";
import { CreateClassDialog } from "@/components/admin/CreateClassDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StudentTablePagination from "@/components/admin/student-table-pagination";
import { useQuery } from "@tanstack/react-query";
import { useSnackbarStore } from "@/store/SnackbarStore";
import qs from "qs";
import { ReqGetClasses } from "@/requests/class";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div
      className="w-[300px] h-[200px] bg-contain bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/admin/empty-data.png')" }}
    />
    <p className="text-gray-500 mt-4">Không có dữ liệu</p>
    <p className="text-gray-500">Tạo tài khoản mới cho học viên để bắt đầu</p>
    <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700">
      Tạo tài khoản
    </button>
  </div>
);

export default function Admin() {
  const router = useCustomRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  /* UseStore */
  const [error] = useSnackbarStore((state) => [state.error]);

  /* UseQuery */
  const { data: classes } = useQuery({
    queryKey: ["class"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          populate: "*",
        });
        return await ReqGetClasses(queryString);
      } catch (err) {
        error("Lỗi", "Không thể lấy thông tin lớp học");
      }
    },
    refetchOnWindowFocus: false,
  });
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <>
      <div className="w-full h-full border-r border-gray-20 overflow-y-auto">
        <div className="flex items-center gap-4 p-4 border-b">
          <CommonCard
            size="small"
            className="w-8 h-8 !rounded-[6px] flex items-center justify-center"
          >
            <PanelLeft width={17} height={17} />
          </CommonCard>
          <div className="flex items-center justify-center">
            <div className="text-SubheadLg text-gray-95">Lớp học</div>
          </div>
          <CommonButton className="ml-auto h-9" onClick={handleOpenDialog}>
            Tạo lớp
          </CommonButton>
        </div>
        <div className="p-4 flex-1">
          {classes && classes.meta.pagination.total === 0 ? (
            <EmptyState />
          ) : (
            <div className="rounded-md border min-w-[800px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>STT</TableHead>
                    <TableHead>Mã lớp</TableHead>
                    <TableHead>Tên khóa</TableHead>
                    <TableHead>Tên giảng viên</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-BodySm">
                  {classes &&
                    classes.data.map((item) => (
                      <TableRow
                        key={item.id}
                        className="cursor-pointer"
                        onClick={() => router.push(`/quan-ly/admin/${item.id}`)}
                      >
                        <TableCell className="text-right">{item.id}</TableCell>
                        <TableCell>
                          <div
                            className="max-w-[200px] truncate"
                            title={item.code}
                          >
                            {item.code}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className="max-w-[150px] truncate"
                            title={item.course?.name}
                          >
                            {item.course?.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className="max-w-[200px] truncate"
                            title={item.teacher?.username}
                          >
                            {item.teacher?.username}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[100px] truncate">
                            {new Date(item.endTime) > new Date()
                              ? "Đang diễn ra"
                              : "Đã kết thúc"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add edit handler here
                            }}
                          >
                            <Edit className="h-4 w-4" color="#7C6C80" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add delete handler here
                            }}
                          >
                            <Trash2 className="h-4 w-4" color="#7C6C80" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        {classes && (
          <StudentTablePagination
            totalItems={classes.meta.pagination.total}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>

      <CreateClassDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
