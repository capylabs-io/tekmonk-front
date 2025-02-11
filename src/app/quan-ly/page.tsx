"use client";

import StudentTable from "@/components/admin/student-table";
import { CommonButton } from "@/components/common/button/CommonButton";

export default function Admin() {
  return (
    <>
      <div className="w-full h-full border-r border-gray-20 overflow-y-auto">
        <div className="w-full h-auto min-h-[68px] flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 border-b border-gray-20">
          <div className="text-SubheadLg text-gray-95 mb-2 sm:mb-0">
            Học viên
          </div>
          <CommonButton
            className="h-9 w-full sm:w-[120px] text-gray-00"
            variant="primary"
          >
            <div className="text-SubheadSm">Tạo tài khoản</div>
          </CommonButton>
        </div>
        <div className="p-4 flex-1">
          <StudentTable />
        </div>
      </div>
    </>
  );
}
