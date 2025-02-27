import { useState } from "react";
import StudentTablePagination from "./student-table-pagination";
import { Input } from "../common/Input";
import { ChevronRight } from "lucide-react";

interface Student {
  id: number;
  name: string;
  username: string;
}

const mockStudents: Student[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Võ Minh Khôi`,
  username: `minhkhoi.vo`,
}));

export default function StudentList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedStudents = filteredStudents.slice(startIndex, endIndex);

  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-center py-4">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Tìm kiếm học viên"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e)}
            className="w-[411px]"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden border-none px-4 ">
        <table className="min-w-full divide-y divide-gray-20 border">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                STT
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                Tên học viên
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                Tên tài khoản
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedStudents.map((student, index) => (
              <tr key={student.id} className="">
                <td className="px-6 py-4 whitespace-nowrap text-BodySm text-gray-95">
                  {startIndex + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-BodySm text-gray-95">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-BodySm text-gray-95">
                  {student.username}
                </td>
                <td className="flex items-center h-full justify-end whitespace-nowrap text-BodySm text-gray-95">
                  <ChevronRight
                    color="#AC9EB1"
                    className="my-auto mt-3 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <StudentTablePagination
          totalItems={filteredStudents.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          showEllipsisThreshold={7}
        />
      </div>
    </div>
  );
}
