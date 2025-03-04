"use client";

import Image from "next/image";
export const TeacherList = () => {
  //mock data with type User here

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <Image
          alt={"teacher Image"}
          src={""}
          width={100}
          height={100}
          className=""
        />
        <div className="flex flex-col items-start justify-center">
          <div className="text-SubheadLg text-gray-95">Hieu</div>
          <div className="text-BodySm text-gray-95">D.O.B: Hieu@gmail.com</div>
          <div className="text-BodySm text-gray-95">Mã số: 123123123</div>
          <div className="text-BodySm text-gray-95">SĐT: 0912391231</div>
        </div>
      </div>
    </div>
  );
};
