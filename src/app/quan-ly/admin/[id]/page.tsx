"use client";

import { CommonButton } from "@/components/common/button/CommonButton";
import { CommonCard } from "@/components/common/CommonCard";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReqGetClasses, ReqDeleteClass } from "@/requests/class";
import { ReqGetEnrollments } from "@/requests/enrollment";
import { ReqGetUsers } from "@/requests/user";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { ArrowLeft, Edit, Trash, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import qs from "qs";
import { useState } from "react";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useLoadingStore } from "@/store/LoadingStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { User } from "@/types/common-types";
import { DeleteClassDialog } from "@/components/admin/dialogs/delete-class-dialog";
import { Input } from "@/components/common/Input";
import classNames from "classnames";

export default function ClassDetail() {
  const router = useCustomRouter();
  const { id: classId } = useParams();
  const [activeTab, setActiveTab] = useState("info");
  const [formData, setFormData] = useState({
    courseName: "",
    classNames: "",
    duration: "",
    teacherName: "",
    status: "",
  });
  const { success, error } = useSnackbarStore();
  const { show, hide } = useLoadingStore();
  const [addStudentDialogOpen, setAddStudentDialogOpen] = useState(false);
  const [availableStudents, setAvailableStudents] = useState<User[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const tabs = [
    { id: "info", label: "Thông tin chung" },
    { id: "students", label: "Học viên" },
    { id: "teachers", label: "Giảng viên" },
    { id: "progress", label: "Tiến trình" },
  ];

  /** UseQuery */
  const { data: classDetail } = useQuery({
    queryKey: ["class-detail", classId],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          populate: "*",
        });
        const response = await ReqGetClasses(
          `${queryString}&filters[id][$eq]=${classId}`
        );
        if (response.data && response.data.length > 0) {
          const classDetail = response.data[0];
          // Update form data with class details
          setFormData({
            courseName: classDetail.course?.name || "",
            classNames: classDetail.name || "",
            duration: `${classDetail.startTime || ""} - ${
              classDetail.endTime || ""
            }`,
            teacherName: classDetail.teacher?.fullName || "",
            status:
              new Date(classDetail.endTime) > new Date()
                ? "Đang diễn ra"
                : "Đã kết thúc",
          });
          return classDetail;
        }
        return null;
      } catch (error) {
        console.error("Error fetching class details:", error);
        return null;
      }
    },
    refetchOnWindowFocus: false,
  });

  const { data: enrollmentData, refetch: refetchEnrollmentData } = useQuery({
    queryKey: ["enrollment-data", classId],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          filters: {
            class: {
              id: {
                $eq: classId,
              },
            },
          },
          populate: "*",
        });

        return await ReqGetEnrollments(queryString);
      } catch (error) {
        console.error("Error fetching enrollment data:", error);
      }
    },
  });

  /**
   * React Query Mutations
   */
  const { mutate: removeStudentMutation } = useMutation({
    mutationFn: (enrollmentId: number) => {
      // Implement the API call to delete enrollment
      // This is a placeholder until the actual API is available
      return new Promise<void>((resolve) => {
        console.log(`Deleting enrollment with ID: ${enrollmentId}`);
        setTimeout(() => resolve(), 1000);
      });
    },
    onSuccess: () => {
      success("Thành công", "Đã xóa học viên khỏi lớp học");
      // Refetch enrollment data
      refetchEnrollmentData();
    },
    onError: (err) => {
      console.error("Error removing student:", err);
      error("Lỗi", "Có lỗi xảy ra khi xóa học viên khỏi lớp học");
    },
    onSettled: () => {
      hide();
    },
  });

  const { mutate: addStudentMutation } = useMutation({
    mutationFn: (studentIds: number[]) => {
      // Implement the API call to add students to class
      // This is a placeholder until the actual API is available
      return new Promise<void>((resolve) => {
        console.log(
          `Adding students with IDs: ${studentIds.join(
            ", "
          )} to class ${classId}`
        );
        setTimeout(() => resolve(), 1000);
      });
    },
    onSuccess: () => {
      success("Thành công", "Đã thêm học viên vào lớp học");
      // Refetch enrollment data
      refetchEnrollmentData();
      // Reset selected students
      setSelectedStudents([]);
      // Close dialog
      setAddStudentDialogOpen(false);
    },
    onError: (err) => {
      console.error("Error adding students:", err);
      error("Lỗi", "Có lỗi xảy ra khi thêm học viên vào lớp học");
    },
    onSettled: () => {
      hide();
    },
  });

  const { mutate: deleteClassMutation, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => {
      // Call the API to delete the class
      return ReqDeleteClass(Number(id));
    },
    onSuccess: () => {
      success("Thành công", "Đã xóa lớp học thành công");
      // Navigate back to the class list page
      router.push("/quan-ly/admin");
    },
    onError: (err) => {
      console.error("Error deleting class:", err);
      error("Lỗi", "Có lỗi xảy ra khi xóa lớp học");
    },
    onSettled: () => {
      hide();
      setDeleteDialogOpen(false);
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    // Implement API call to update class data
    console.log("Updating class data:", formData);
  };

  const handleRemoveStudent = (enrollmentId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa học viên này khỏi lớp học?")) {
      show();
      removeStudentMutation(enrollmentId);
    }
  };

  /**
   * Function handlers
   */
  const handleOpenAddStudentDialog = async () => {
    try {
      // Fetch available students
      const queryString = qs.stringify({
        filters: {
          user_role: {
            code: {
              $eq: "STUDENT",
            },
          },
        },
        populate: "user_role",
      });

      const response = await ReqGetUsers(queryString);

      // Filter out students already in the class
      const enrolledStudentIds =
        enrollmentData?.data.map((enrollment: any) => enrollment.student?.id) ||
        [];

      const filteredStudents = response.data.filter(
        (student: User) => !enrolledStudentIds.includes(student.id)
      );

      setAvailableStudents(filteredStudents);
      setAddStudentDialogOpen(true);
    } catch (err) {
      console.error("Error fetching available students:", err);
      error("Lỗi", "Có lỗi xảy ra khi tải danh sách học viên");
    }
  };

  const handleAddStudents = () => {
    if (selectedStudents.length === 0) {
      error("Lỗi", "Vui lòng chọn ít nhất một học viên");
      return;
    }

    show();
    addStudentMutation(selectedStudents);
  };

  const handleToggleSelectStudent = (studentId: number) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const filteredStudents = availableStudents.filter((student) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      student.username?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.fullName?.toLowerCase().includes(searchLower)
    );
  });

  const handleDeleteClass = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!classId) return;

    show();
    deleteClassMutation(classId.toString());
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return (
          classDetail && (
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-SubheadSm text-gray-95 w-24">
                    Khóa học
                  </div>
                  <Input
                    type="text"
                    value={classDetail.course?.name}
                    onChange={(e) => handleInputChange("name", e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-SubheadSm text-gray-95 w-24">
                    Tên lớp
                  </div>
                  <Input
                    type="text"
                    value={classDetail.name}
                    onChange={(e) => handleInputChange("code", e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-SubheadSm text-gray-95 w-24">
                    Duration
                  </div>
                  <Input
                    type="text"
                    value={classDetail.startTime}
                    onChange={(e) => handleInputChange("duration", e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-SubheadSm text-gray-95 w-24">
                    GV phụ trách
                  </div>
                  <Input
                    type="text"
                    value={classDetail.teacher?.fullName || ""}
                    onChange={(e) => handleInputChange("instructor", e)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-SubheadSm text-gray-95 w-24">
                    Trạng thái
                  </div>
                  <Input
                    type="text"
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e)}
                  />
                </div>
              </div>

              <div className="flex justify-start">
                <button
                  onClick={handleUpdate}
                  className="flex items-center gap-2 border cursor-pointer border-[#D0D5DD] rounded-lg px-4 py-2"
                >
                  <Edit width={16} height={16} />
                  <div>Cập nhật</div>
                </button>
              </div>
            </div>
          )
        );
      case "students":
        return (
          <div className="p-4">
            {enrollmentData?.data && enrollmentData.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="text-SubheadSm text-gray-95">
                    <TableHead className="w-[100px]">STT</TableHead>
                    <TableHead>Tên học viên</TableHead>
                    <TableHead>Tên tài khoản</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-BodySm">
                  {enrollmentData.data.map((enrollment, index: number) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="text-right">{index + 1}</TableCell>
                      <TableCell>
                        {enrollment.student?.fullName ||
                          enrollment.student?.username}
                      </TableCell>
                      <TableCell>{enrollment.student?.username}</TableCell>
                      <TableCell>{enrollment.student?.email}</TableCell>
                      <TableCell>
                        {enrollment.student?.blocked
                          ? "Đã vô hiệu hoá"
                          : "Đang hoạt động"}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-full text-BodySm text-gray-95"
                          onClick={() => {
                            // Handle view student details
                            console.log(
                              "View student details",
                              enrollment.student
                            );
                          }}
                        >
                          <Edit width={16} height={16} />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-full"
                          onClick={() => handleRemoveStudent(enrollment.id)}
                        >
                          <Trash width={16} height={16} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div
                  className="w-[300px] h-[200px] bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: "url('/admin/empty-data.png')" }}
                />
                <p className="text-gray-500 mt-4">Không có học viên</p>
                <p className="text-gray-500">
                  Thêm học viên vào lớp để bắt đầu
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
                  onClick={handleOpenAddStudentDialog}
                >
                  Thêm học viên
                </button>
              </div>
            )}
          </div>
        );
      case "teachers":
        return (
          <div className="p-4">
            Teacher list content will be implemented here
          </div>
        );
      case "progress":
        return (
          <div className="p-4">
            Progress tracking content will be implemented here
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full border-r border-gray-20 overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <CommonCard
            size="small"
            className="w-8 h-8 !rounded-[6px] flex items-center justify-center cursor-pointer"
            onClick={() => router.back()}
          >
            <ArrowLeft width={17} height={17} />
          </CommonCard>
          <div className="flex items-center justify-center">
            <div className="text-SubheadLg text-gray-95">Chi tiết lớp học</div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-4 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-primary-60 text-primary-95"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">{renderTabContent()}</div>

      {/* Add Student Dialog */}
      <Dialog
        open={addStudentDialogOpen}
        onOpenChange={setAddStudentDialogOpen}
      >
        <DialogContent className="w-[680px] bg-white">
          <DialogHeader className="px-4">
            <DialogTitle className="text-HeadingSm font-semibold text-gray-95">
              Thêm học viên vào lớp
            </DialogTitle>
          </DialogHeader>

          <div className="p-4">
            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm học viên..."
                className="w-full p-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Student List */}
            <div className="max-h-[400px] overflow-y-auto border rounded-md">
              {filteredStudents.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead>Tên học viên</TableHead>
                      <TableHead>Tên tài khoản</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-BodySm ">
                    {filteredStudents.map((student) => (
                      <TableRow
                        key={student.id}
                        className={
                          selectedStudents.includes(student.id)
                            ? "bg-blue-50"
                            : ""
                        }
                      >
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={() =>
                              handleToggleSelectStudent(student.id)
                            }
                            className="w-4 h-4"
                          />
                        </TableCell>
                        <TableCell>
                          {student.fullName || student.username}
                        </TableCell>
                        <TableCell>{student.username}</TableCell>
                        <TableCell>{student.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  {searchQuery
                    ? "Không tìm thấy học viên phù hợp"
                    : "Không có học viên khả dụng"}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-4">
              <div>
                <span className="text-sm text-gray-500">
                  Đã chọn {selectedStudents.length} học viên
                </span>
              </div>
              <div className="flex gap-2">
                <CommonButton
                  variant="secondary"
                  onClick={() => setAddStudentDialogOpen(false)}
                >
                  Hủy
                </CommonButton>
                <CommonButton
                  variant="primary"
                  onClick={handleAddStudents}
                  disabled={selectedStudents.length === 0}
                >
                  Thêm vào lớp
                </CommonButton>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Class Dialog */}
      <DeleteClassDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        classData={classDetail || null}
        isLoading={isDeleting}
      />
    </div>
  );
}
