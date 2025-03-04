"use client";

import { ArrowLeft, ArrowDown, ArrowUp, PanelLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CommonButton } from "@/components/common/button/CommonButton";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { CommonCard } from "@/components/common/CommonCard";

interface Student {
  id: number;
  name: string;
  studentId: string;
  attendance: boolean;
  participation: boolean;
  homework: boolean;
  test: boolean;
}

export default function SessionDetailPage({
  params,
}: {
  params: { id: string; sessionId: string };
}) {
  const router = useCustomRouter();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [studentAttendance, setStudentAttendance] = useState<Student[]>([
    {
      id: 1,
      name: "Võ Minh Khôi",
      studentId: "3897441",
      attendance: true,
      participation: true,
      homework: false,
      test: false,
    },
    {
      id: 2,
      name: "Lê Hoàng Anh",
      studentId: "3897441",
      attendance: true,
      participation: false,
      homework: false,
      test: false,
    },
    {
      id: 3,
      name: "Nguyễn Xuân Thái",
      studentId: "3897441",
      attendance: true,
      participation: true,
      homework: true,
      test: false,
    },
  ]);

  const handleCheckboxChange = (
    studentId: number,
    field: keyof Omit<Student, "id" | "name" | "studentId">
  ) => {
    setStudentAttendance((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? { ...student, [field]: !student[field] }
          : student
      )
    );
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the attendance data
    console.log("Saving attendance data:", {
      sessionId: params.sessionId,
      attendance: studentAttendance,
    });
    // Add your API call here
  };

  const handleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setStudentAttendance((prev) =>
      [...prev].sort((a, b) => {
        if (sortDirection === "asc") {
          return b.id - a.id;
        } else {
          return a.id - b.id;
        }
      })
    );
  };

  return (
    <div className="">
      <div className="flex items-center gap-4 p-4 border-b">
        <CommonCard
          size="small"
          className="w-8 h-8 !rounded-[6px] flex items-center justify-center"
        >
          <PanelLeft width={17} height={17} />
        </CommonCard>
        <div className="flex items-center justify-center">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-70" />
          </button>
          <div className="text-SubheadLg text-gray-95">Buổi 1</div>
        </div>
        <CommonButton onClick={handleSave} className="ml-auto h-9 w-[58px]">
          Lưu
        </CommonButton>
      </div>

      <div className="space-y-6 p-4">
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-20">
          <table className="w-full rounded-lg">
            <thead>
              <tr className="text-SubheadSm text-gray-95">
                <th
                  className="py-4 text-center cursor-pointer select-none"
                  onClick={handleSort}
                >
                  <div className="flex items-center gap-2 text-SubheadSm text-gray-95 justify-center">
                    STT
                    {sortDirection === "asc" ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="py-4 px-6 text-left text-SubheadSm text-gray-95">
                  Tên học viên
                </th>
                <th className="py-4 px-6 text-left text-SubheadSm text-gray-95">
                  Mã học viên
                </th>
                <th className="py-4 px-6 text-center text-SubheadSm text-gray-95">
                  Điểm danh
                </th>
                <th className="py-4 px-6 text-center text-SubheadSm text-gray-95">
                  Phát biểu
                </th>
                <th className="py-4 px-6 text-center text-SubheadSm text-gray-95">
                  Bài tập
                </th>
                <th className="py-4 px-6 text-center text-SubheadSm text-gray-95">
                  Tốc độ
                </th>
              </tr>
            </thead>
            <tbody>
              {studentAttendance.map((student) => (
                <tr key={student.id} className="border-t border-gray-100">
                  <td className="py-4 px-6 text-BodySm text-gray-95 text-right">
                    {student.id}
                  </td>
                  <td className="py-4 px-6 text-BodySm text-gray-95 ">
                    {student.name}
                  </td>
                  <td className="py-4 px-6 text-BodySm text-gray-95">
                    {student.studentId}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <input
                      type="checkbox"
                      checked={student.attendance}
                      onChange={() =>
                        handleCheckboxChange(student.id, "attendance")
                      }
                      className="w-4 h-4 accent-primary-50 rounded border-gray-300"
                    />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <input
                      type="checkbox"
                      checked={student.participation}
                      onChange={() =>
                        handleCheckboxChange(student.id, "participation")
                      }
                      className="w-4 h-4 accent-primary-50 rounded border-gray-300"
                    />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <input
                      type="checkbox"
                      checked={student.homework}
                      onChange={() =>
                        handleCheckboxChange(student.id, "homework")
                      }
                      className="w-4 h-4 accent-primary-50 rounded border-gray-300"
                    />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <input
                      type="checkbox"
                      checked={student.test}
                      onChange={() => handleCheckboxChange(student.id, "test")}
                      className="w-4 h-4 accent-primary-50 rounded border-gray-300"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
