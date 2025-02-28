"use client";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { CommonCard } from "@/components/common/CommonCard";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { ReqGetClasses } from "@/requests/class";

export default function Page() {
  const router = useCustomRouter();
  const [activeTab, setActiveTab] = useState("teaching");

  /**
   * UseQuery
   */
  const { data } = useQuery({
    queryKey: ["class", activeTab],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          filters: {
            status: {
              $eq: activeTab,
            },
          },
          populate: "*",
        });
        return await ReqGetClasses(queryString);
      } catch (error) {
        console.log("failed to fetch class", error);
      }
    },
    refetchOnWindowFocus: false,
  });

  const teachingClassData = [
    {
      id: 1,
      code: "1320-ADF",
      title: "Khóa học dạy làm giàu cho trẻ nhỏ từ 7-17 tuổi",
      students: 20,
      maxStudents: 20,
      sessions: 12,
      startDate: "2024-01-15",
      endDate: "2024-04-15",
    },
    {
      id: 2,
      code: "1321-ADF",
      title: "Khóa học dạy AI cho trẻ nhỏ từ 7-17 tuổi",
      students: 18,
      maxStudents: 20,
      sessions: 12,
      startDate: "2024-02-01",
      endDate: "2024-05-01",
    },
  ];

  const completedClassData = [
    {
      id: 3,
      code: "1319-ADF",
      title: "Khóa học lập trình Python cơ bản",
      students: 15,
      maxStudents: 15,
      sessions: 10,
      startDate: "2023-10-01",
      endDate: "2023-12-15",
    },
    {
      id: 4,
      code: "1318-ADF",
      title: "Khóa học Scratch cho trẻ em",
      students: 12,
      maxStudents: 15,
      sessions: 8,
      startDate: "2023-11-01",
      endDate: "2023-12-31",
    },
  ];

  const displayedClasses =
    activeTab === "teaching" ? teachingClassData : completedClassData;

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-10 rounded-lg">
          <BookOpen className="w-6 h-6 text-primary-70" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-95">Lớp học của tôi</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          className={`pb-4 px-2 ${
            activeTab === "teaching"
              ? "text-primary-70 border-b-4 border-primary-70 font-medium"
              : "text-gray-70"
          }`}
          onClick={() => setActiveTab("teaching")}
        >
          Đang dạy
        </button>
        <button
          className={`pb-4 px-2 ${
            activeTab === "ended"
              ? "text-primary-70 border-b-4 border-primary-70 font-medium"
              : "text-gray-70"
          }`}
          onClick={() => setActiveTab("ended")}
        >
          Đã kết thúc
        </button>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data &&
          data.data.map((classItem) => (
            <CommonCard
              key={classItem.id}
              onClick={() =>
                router.push(`/quan-ly/lop-hoc-cua-toi/${classItem.id}`)
              }
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-[152px] flex flex-col items-start"
            >
              <div className="text-gray-95 font-medium mb-2 h-[48px] w-full overflow-hidden">
                {classItem.name}
              </div>
              <div className="text-gray-95 text-sm space-y-1 h-[48px] text-BodySm flex-1">
                <p>Mã lớp: {classItem.code}</p>
                <p>Số buổi: {classItem.classSessionCount} buổi</p>
                <p>Sĩ số: {classItem.enrollmentCount}</p>
              </div>
            </CommonCard>
          ))}
      </div>
    </div>
  );
}
