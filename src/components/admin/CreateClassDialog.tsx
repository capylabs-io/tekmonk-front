"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CommonButton } from "../common/button/CommonButton";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Input } from "../common/Input";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { ReqGetUsers } from "@/requests/user";
import { CommonTag } from "../common/CommonTag";
import StudentTablePagination from "./student-table-pagination";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import tekdojoAxios from "@/requests/axios.config";
import { BASE_URL } from "@/contants/api-url";
import { ReqCreateEnrollment } from "@/requests/enrollment";
import { ReqCreateClass } from "@/requests/class";
import { ReqCreateClassSession } from "@/requests/class-session";

interface CreateClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 1 | 2;

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function CreateClassDialog({
  open,
  onOpenChange,
}: CreateClassDialogProps) {
  const [step, setStep] = useState<Step>(1);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [value, onChange] = useState<Value>([new Date(), new Date()]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [className, setClassName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [numberClassSession, setNumberClassSession] = useState(1);

  //Use Store
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const [success, error] = useSnackbarStore((state) => [
    state.success,
    state.error,
  ]);
  /**
   * UseQuery
   */
  const { data: StudentList } = useQuery({
    queryKey: ["studentList"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          filters: {
            user_role: {
              code: {
                $eq: "STUDENT",
              },
            },
          },
          populate: "user_role",
          page: currentPage,
          pageSize: itemsPerPage,
        });
        return await ReqGetUsers(queryString);
      } catch (error) {
        console.log("error when fetching student list", error);
      }
    },
    refetchOnWindowFocus: false,
  });

  /**
   * Function fetching
   */

  const handleCreateClass = async () => {
    if (step == 1) return;
    try {
      /**
       * Class (startTime, endTime, className, teacherId)
       * Enrollments (userId, classId)[]
       */
      show();

      // Validate required fields
      if (!className) {
        error("Lỗi", "Vui lòng nhập tên lớp");
        return;
      }

      if (!courseId) {
        error("Lỗi", "Vui lòng chọn khóa học");
        return;
      }

      if (!teacherId) {
        error("Lỗi", "Vui lòng chọn giảng viên");
        return;
      }

      if (!value || !Array.isArray(value) || !value[0] || !value[1]) {
        error("Lỗi", "Vui lòng chọn thời gian bắt đầu và kết thúc");
        return;
      }

      // Format dates
      const startTime = value[0].toISOString();
      const endTime = value[1].toISOString();

      // Create class data
      const classData = {
        data: {
          name: className,
          code: `CLASS-${Math.floor(Math.random() * 10000)}`,
          startTime,
          endTime,
          status: "teaching",
          // teacher: teacherId,
          teacher: 1,
          // course: courseId,
        },
      };

      const newClass = await ReqCreateClass(classData);

      //create enrollment
      const enrollmentData = selectedStudents.map((studentId) => ({
        student: Number(studentId),
        class: newClass.id,
      }));
      // await ReqCreateEnrollment(enrollmentData);

      // //create new Class session with numberClassSession
      // await ReqCreateClassSession({
      //   class: newClass.id,
      //   numberClassSession: numberClassSession,
      // });
      success("Thành công", "Tạo mới lớp học thành công");
    } catch (err) {
      console.error("Error creating class:", err);
      error("Lỗi", "Có lỗi xảy ra khi tạo mới lớp học, vui lòng thử lại sau");
    } finally {
      hide();
    }
  };

  /**
   * Handle function
   */
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onOpenChange(false);
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Handle form submission
      console.log("Form submitted");
      await handleCreateClass();
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

  const filteredStudents = StudentList?.data
    ? StudentList.data.filter((student) =>
        student.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px] bg-white rounded-lg p-6">
        <DialogHeader>
          <div className="flex gap-4 mb-6">
            <DialogTitle className="text-xl font-semibold flex flex-col">
              <div>Tạo lớp học mới</div>
              <div>
                <span className="text-gray-500 text-sm font-normal">
                  B{step}:{" "}
                  {step === 1 ? "Thông tin chung" : "Thông tin học viên"}
                </span>
              </div>
            </DialogTitle>
          </div>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4 w-full">
            <div className="flex items-start justify-center">
              <div className="text-SubheadMd text-gray-60 w-[160px]">
                Khóa học
              </div>
              <select
                className="flex-1 w-full p-2 border border-gray-300 rounded-md"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              >
                <option value="">Chọn khóa</option>
                <option value="1">Khóa học lập trình Python</option>
                <option value="2">Khóa học lập trình Web</option>
                <option value="3">Khóa học lập trình Java</option>
              </select>
            </div>

            <div className="flex items-start justify-center">
              <div className="text-SubheadMd text-gray-60 w-[160px]">
                Thời gian bắt đầu - kết thúc
              </div>
              <div className="flex-1 items-center gap-2">
                <DateRangePicker
                  onChange={onChange}
                  value={value}
                  className="!outline-none !border-none w-full"
                />
              </div>
            </div>

            <div className="flex items-start justify-center w-full">
              <div className="text-SubheadMd text-gray-60 w-[160px] ">
                Số buổi học
              </div>
              <Input
                type="number"
                value={numberClassSession.toString()}
                onChange={(e) => setNumberClassSession(e)}
                customClassNames="flex-1 border-gray-300 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-start justify-center w-full">
              <div className="text-SubheadMd text-gray-60 w-[160px] ">
                Tên lớp
              </div>
              <Input
                placeholder="Nhập thông tin"
                type="text"
                value={className}
                onChange={(e) => setClassName(e)}
                customClassNames="flex-1 border-gray-300 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-start justify-center ">
              <div className="text-SubheadMd text-gray-60 w-[160px]">
                Giảng viên
              </div>
              <Input
                isSearch={true}
                placeholder="Vũ Minh Khôi #439857"
                type="text"
                value={teacherId}
                onChange={(e) => setTeacherId(e)}
                customClassNames="flex-1 !w-[464px] border-gray-300 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="max-h-[200px] overflow-auto custom-scrollbar p-2">
              {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-[160px] text-SubheadMd text-gray-60">
                    Học viên {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /**
           * This is step 2 of create class and add student and teacher
           */
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedStudents.map((selectedId) => {
                const student = StudentList?.data?.find(
                  (s) => s.id.toString() === selectedId
                );
                return student ? (
                  <CommonTag
                    key={student.id}
                    className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {student.username}
                    <button
                      onClick={() => handleStudentSelect(student.id.toString())}
                      className="text-purple-700 hover:text-purple-900"
                    >
                      x
                    </button>
                  </CommonTag>
                ) : null;
              })}
            </div>

            <Input
              isSearch={true}
              type="text"
              placeholder="Tìm kiếm học viên"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e)}
              customClassNames="w-full"
              customInputClassNames="w-full"
            />

            <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar px-2">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 cursor-pointer rounded-md"
                >
                  <div>
                    <div className="font-medium">{student.username}</div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id.toString())}
                    onChange={() => handleStudentSelect(student.id.toString())}
                    className="h-5 w-5 rounded border-gray-30"
                  />
                </div>
              ))}
            </div>
            {StudentList && (
              <StudentTablePagination
                showDetails={false}
                totalItems={StudentList.meta.pagination.total}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                onItemsPerPageChange={setItemPerPage}
                showEllipsisThreshold={7}
              />
            )}
          </div>
        )}

        <div className="flex justify-between gap-3 mt-8 ">
          <CommonButton onClick={handleBack} variant="secondary">
            <ArrowLeft />
            Quay lại
          </CommonButton>
          <CommonButton
            variant="primary"
            onClick={handleNext}
            className="flex items-center justify-center gap-1"
          >
            <div>{step === 1 ? "Tiếp theo" : "Tạo lớp"}</div>
            {step === 1 && <ArrowRight size={20} />}
          </CommonButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
