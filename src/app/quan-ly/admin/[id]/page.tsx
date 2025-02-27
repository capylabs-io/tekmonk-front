"use client";

import { CommonButton } from "@/components/common/button/CommonButton";
import { CommonCard } from "@/components/common/CommonCard";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ClassDetail() {
  const router = useCustomRouter();
  const params = useParams();
  const classId = params.id;
  const [activeTab, setActiveTab] = useState("general");

  // Mock data - replace with actual API call
  const classData = {
    id: classId,
    name: "UI/UX Design",
    code: "UI/UX Design khóa 4",
    instructor: "Minh Khôi",
    status: "Đang hoạt động",
    duration: "11/03/2023 - 11/04/2024",
  };

  const tabs = [
    { id: "general", label: "Thông tin chung" },
    { id: "students", label: "Học viên" },
    { id: "teachers", label: "Giảng viên" },
    { id: "progress", label: "Tiến trình" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="grid grid-cols-2 gap-6 max-w-2xl">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">
                Mã lớp
              </label>
              <div className="text-base">{classData.code}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">
                Tên khóa
              </label>
              <div className="text-base">{classData.name}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">
                Giảng viên
              </label>
              <div className="text-base">{classData.instructor}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">
                Trạng thái
              </label>
              <div className="text-base">{classData.status}</div>
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium text-gray-500">
                Thời gian
              </label>
              <div className="text-base">{classData.duration}</div>
            </div>
          </div>
        );
      case "students":
        return (
          <div className="p-4">
            Student list content will be implemented here
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
      <div className="flex items-center gap-4 p-4 border-b">
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

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">{renderTabContent()}</div>
    </div>
  );
}
