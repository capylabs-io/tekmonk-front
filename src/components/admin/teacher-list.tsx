"use client";

import { User } from "@/types/common-types";
import Image from "next/image";
export const TeacherList = () => {
  //mock data with type User here
  const users: User[] = [
    {
      id: "1",
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phoneNumber: "0987654321",
      username: "nguyenvana",
      imageURL: "/avatars/teacher1.jpg",
      role: {
        name: "teacher",
      },
    },
  ];
  return (
    <div className="p-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-4">
          <Image
            alt={"teacher Image"}
            src={user.imageURL}
            width={100}
            height={100}
            className=""
          />
          <div className="flex flex-col items-start justify-center">
            <div className="text-SubheadLg text-gray-95">{user.fullName}</div>
            <div className="text-BodySm text-gray-95">D.O.B: {user.email}</div>
            <div className="text-BodySm text-gray-95">Mã số: {user.id}</div>
            <div className="text-BodySm text-gray-95">
              SĐT: {user.phoneNumber}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
