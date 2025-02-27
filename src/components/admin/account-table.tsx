"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import StudentTablePagination from "./student-table-pagination";
import { Pencil, Trash2 } from "lucide-react";
import { EditUserDialog } from "./dialogs/edit-user-dialog";
import { DeactivateUserDialog } from "./dialogs/deactivate-user-dialog";
import { DeleteUserDialog } from "./dialogs/delete-user-dialog";

import { EditingUserData, User } from "./types";

class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return this.seed / 2147483647;
  }

  nextInt(max: number): number {
    return Math.floor(this.next() * max);
  }
}

export const generateMockUsers = (): User[] => {
  const random = new SeededRandom(12345); // Fixed seed for consistent results
  const firstNames = ["Nguyen", "Tran", "Le", "Pham", "Hoang"];
  const middleNames = ["Van", "Thi", "Duc", "Minh", "Hoang"];
  const lastNames = ["A", "B", "C", "D"];
  const statuses = ["Active", "Inactive"];
  const users: User[] = [];

  for (let i = 1; i <= 1000; i++) {
    const firstName = firstNames[random.nextInt(firstNames.length)];
    const middleName = middleNames[random.nextInt(middleNames.length)];
    const lastName = lastNames[random.nextInt(lastNames.length)];
    const fullName = `${firstName} ${middleName} ${lastName}`;
    const username = `${firstName.toLowerCase()}${middleName.toLowerCase()}${lastName.toLowerCase()}${i}`;
    const email = `${username}@example.com`;

    // Distribute roles using seeded random
    let role;
    const randomValue = random.next() * 100;
    if (randomValue < 70) role = "student";
    else if (randomValue < 85) role = "teacher";
    else if (randomValue < 95) role = "manager";
    else role = "admin";

    users.push({
      id: i,
      name: fullName,
      username,
      email,
      status: statuses[random.nextInt(statuses.length)],
      role,
    });
  }

  return users;
};

export const AccountTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("student");
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [mockUsers, setMockUsers] = useState<User[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<EditingUserData | null>(null);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      const updatedUsers = mockUsers.filter(
        (user) => user.id !== userToDelete.id
      );
      setMockUsers(updatedUsers);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  useEffect(() => {
    setMockUsers(generateMockUsers());
  }, []);

  useEffect(() => {
    if (mockUsers.length > 0) {
      const filtered = mockUsers.filter((user) => user.role === activeTab);
      setSortedUsers(filtered);
    }
  }, [activeTab, mockUsers]);

  const tabs = [
    { id: "student", label: "Học viên" },
    { id: "teacher", label: "Giảng viên" },
    { id: "manager", label: "Quản lý lớp" },
    { id: "admin", label: "Quản trị viên" },
  ];

  const filteredUsers = sortedUsers.filter((user) => user.role === activeTab);
  const totalItems = filteredUsers.length;

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleEdit = (user: User) => {
    setEditingUser({ ...user });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editingUser) return;

    const updatedUsers = mockUsers.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );

    setMockUsers(updatedUsers);
    setEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleDeleteById = (userId: number) => {
    console.log(`Delete user with ID: ${userId}`);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sorted = [...sortedUsers].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });

    setSortedUsers(sorted);
  };

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

  const getTableHeaders = () => {
    switch (activeTab) {
      case "student":
        return [
          { label: "STT", sortable: true },
          { label: "Tên học viên" },
          { label: "Tên tài khoản" },
          { label: "Email" },
          { label: "Trạng thái" },
          { label: "Thao tác", align: "right" },
        ];
      case "teacher":
        return [
          { label: "STT", sortable: true },
          { label: "Tên giảng viên" },
          { label: "Tên tài khoản" },
          { label: "Email" },
          { label: "Trạng thái" },
          { label: "Thao tác", align: "right" },
        ];
      case "manager":
        return [
          { label: "STT", sortable: true },
          { label: "Tên người dùng" },
          { label: "Tên tài khoản" },
          { label: "Email" },
          { label: "Loại" },
          { label: "Thao tác", align: "right" },
        ];
      default:
        return [
          { label: "STT", sortable: true },
          { label: "Tên người dùng" },
          { label: "Tên tài khoản" },
          { label: "Email" },
          { label: "Trạng thái" },
          { label: "Thao tác", align: "right" },
        ];
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-wrap border-b border-gray-200 mb-4 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[120px] max-w-[144px] py-2 px-4 text-center text-sm font-medium ${
              activeTab === tab.id
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="rounded-md border min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow>
                {getTableHeaders().map((header, index) => (
                  <TableHead
                    key={index}
                    className={`${header.sortable ? "cursor-pointer" : ""} ${
                      header.align === "right" ? "text-right" : ""
                    } ${index === 0 ? "w-[100px]" : ""}`}
                    onClick={header.sortable ? handleSort : undefined}
                  >
                    <div className="flex items-center gap-2">
                      {header.label}
                      {header.sortable && (
                        <span className="inline-block">
                          {sortOrder === "asc" ? (
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
                            >
                              <path d="m18 15-6-6-6 6" />
                            </svg>
                          ) : (
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
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((user) => {
                  return (
                    <TableRow key={user.id}>
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
                          onClick={() => handleEdit(user)}
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
                          onClick={() => handleDelete(user)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      )}

      {filteredUsers.length > 0 && (
        <StudentTablePagination
          totalItems={totalItems}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}

      <EditUserDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        user={editingUser}
        onUserChange={setEditingUser}
        onSubmit={handleEditSubmit}
        onDeactivate={() => setDeactivateDialogOpen(true)}
      />

      <DeactivateUserDialog
        open={deactivateDialogOpen}
        onOpenChange={setDeactivateDialogOpen}
        onConfirm={() => {
          setDeactivateDialogOpen(false);
          setEditDialogOpen(false);
        }}
      />

      <DeleteUserDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        user={userToDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AccountTable;
