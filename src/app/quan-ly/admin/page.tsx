"use client";

import { AccountTypeDialog } from "@/components/account/AccountTypeDialog";
import AccountTable, {
  generateMockUsers,
} from "@/components/admin/account-table";
import { CommonButton } from "@/components/common/button/CommonButton";
import { CommonCard } from "@/components/common/CommonCard";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ArrowLeft, PanelLeft, Trash2 } from "lucide-react";
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const router = useCustomRouter();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleAccountTypeSelect = (type: string) => {
    console.log("Selected account type:", type);
    setIsDialogOpen(false);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const mockUsers = generateMockUsers();

  // Calculate pagination indexes
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = mockUsers.slice(startIndex, endIndex);

  // Sort users if needed
  const sortedUsers = [...paginatedUsers].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.id - b.id;
    }
    return b.id - a.id;
  });

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
          {mockUsers.length === 0 ? (
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
                <TableBody>
                  {sortedUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="cursor-pointer"
                      onClick={() => router.push(`/quan-ly/admin/${user.id}`)}
                    >
                      <TableCell className="text-right">{user.id}</TableCell>
                      <TableCell>
                        <div
                          className="max-w-[200px] truncate"
                          title={user.name}
                        >
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className="max-w-[150px] truncate"
                          title={user.username}
                        >
                          {user.username}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className="max-w-[200px] truncate"
                          title={user.email}
                        >
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className="max-w-[100px] truncate"
                          title={user.status}
                        >
                          {user.status}
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-square-pen"
                          >
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                          </svg>
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add delete handler here
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        <StudentTablePagination
          totalItems={mockUsers.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      <CreateClassDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
