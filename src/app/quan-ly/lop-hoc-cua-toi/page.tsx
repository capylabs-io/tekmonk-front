"use client";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("teaching");

  const classData = [
    {
      id: 1,
      code: "1320-ADF",
      title: "Khóa học dạy làm giàu cho trẻ nhỏ từ 7-17 tuổi",
      students: 20,
      maxStudents: 20,
      sessions: 12,
    },
    {
      id: 2,
      code: "1320-ADF",
      title: "Khóa học dạy AI cho trẻ nhỏ từ 7-17 tuổi",
      students: 20,
      maxStudents: 20,
      sessions: 12,
    },
  ];

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          className={`pb-4 px-2 ${
            activeTab === "teaching"
              ? "text-primary-70 border-b-2 border-primary-70 font-medium"
              : "text-gray-70"
          }`}
          onClick={() => setActiveTab("teaching")}
        >
          Đang dạy
        </button>
        <button
          className={`pb-4 px-2 ${
            activeTab === "completed"
              ? "text-primary-70 border-b-2 border-primary-70 font-medium"
              : "text-gray-70"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Đã kết thúc
        </button>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {classData.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <h3 className="text-gray-95 font-medium mb-2">{classItem.title}</h3>
            <div className="text-gray-70 text-sm space-y-2">
              <p>Mã lớp: {classItem.code}</p>
              <p>Số buổi: {classItem.sessions} buổi</p>
              <p>Sĩ số: {classItem.students}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
