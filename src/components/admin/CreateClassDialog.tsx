"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { CommonButton } from "../common/button/CommonButton";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

interface CreateClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 1 | 2;

export function CreateClassDialog({
  open,
  onOpenChange,
}: CreateClassDialogProps) {
  const [step, setStep] = useState<Step>(1);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<[Date | null, Date | null]>([null, null]);

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onOpenChange(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Handle form submission
      console.log("Form submitted");
      onOpenChange(false);
    }
  };

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const mockStudents = [
    { id: "1", name: "Nguyễn Văn A", email: "nguyenvana@gmail.com" },
    { id: "2", name: "Nguyễn Văn A", email: "nguyenvana@gmail.com" },
    { id: "3", name: "Nguyễn Văn A", email: "nguyenvana@gmail.com" },
    { id: "4", name: "Nguyễn Văn A", email: "nguyenvana@gmail.com" },
    { id: "5", name: "Nguyễn Văn A", email: "nguyenvana@gmail.com" },
  ];

  const filteredStudents = mockStudents.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <DialogTitle>
              Tạo lớp học mới
              {step === 2 && (
                <span className="text-gray-500 text-sm font-normal ml-2">
                  B{step}: Thêm học viên
                </span>
              )}
            </DialogTitle>
          </div>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Khóa học</label>
              <select className="w-full p-2 border rounded-md">
                <option>Chọn khóa</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Thời gian bắt đầu - kết thúc
              </label>
              <div className="w-full">
                <DateRangePicker
                  onChange={(value) =>
                    setDate(value as [Date | null, Date | null])
                  }
                  value={date}
                  format="dd/MM/yyyy"
                  className="w-full p-2 border rounded-md bg-white"
                  clearIcon={null}
                  calendarIcon={null}
                  rangeDivider=" - "
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tên lớp</label>
              <Input placeholder="Nhập thông tin" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Giảng viên</label>
              <Input placeholder="Vũ Minh Khôi #419857" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedStudents.map((studentId) => {
                const student = mockStudents.find((s) => s.id === studentId);
                return (
                  <div
                    key={studentId}
                    className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {student?.name}
                    <button
                      onClick={() => handleStudentSelect(studentId)}
                      className="text-purple-700 hover:text-purple-900"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>

            <Input
              placeholder="Tìm kiếm học viên"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />

            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md"
                >
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentSelect(student.id)}
                    className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <CommonButton
            variant="primary"
            onClick={handleNext}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {step === 1 ? "Tiếp theo" : "Tạo lớp"}
          </CommonButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
