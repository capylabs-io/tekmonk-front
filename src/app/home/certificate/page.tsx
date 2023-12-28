import { ArrowLeft } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button";

function Page() {
  const certificates = [
    {
      name: "Lập trình Python - Lớp Cơ bản",
      type: "Khoá học Code",
      mission: "10",
      progress: "10%",
      imageUrl: "/image/profile/certificate-logo.png",
      author: "TekMonk",
      createdAt: "20/11/2023",
    },
    {
      name: "Lập trình Python -Lớp Nâng Cao",
      type: "Khoá học Code",
      mission: "10",
      progress: "10%",
      imageUrl: "/image/profile/certificate-logo.png",
      author: "TekMonk",
      createdAt: "20/11/2023",
    },
    {
      name: "Lập trình Blockchain Game",
      type: "Khoá học Code",
      mission: "10",
      progress: "10%",
      imageUrl: "/image/profile/certificate-logo.png",
      author: "TekMonk",
      createdAt: "20/11/2023",
    },
    {
      name: "Lập trình Web - Lớp Cơ bản",
      type: "Khoá học Code",
      mission: "10",
      progress: "10%",
      imageUrl: "/image/profile/certificate-logo.png",
      author: "TekMonk",
      createdAt: "20/11/2023",
    },
  ];
  return (
    <div className="mt-3">
      <div className="text-primary-900 flex gap-x-2 px-6 items-center">
        <ArrowLeft size={18} className="text-gray-600" />
        <span>Chứng chỉ</span>
      </div>
      {certificates.map((certificate, index) => {
        return (
          <>
            <div
              className="flex gap-x-2 items-center px-6 mt-10"
              key={certificate.name}
            >
              <Image
                src={certificate.imageUrl || ""}
                alt="certificate"
                width={120}
                height={120}
              />
              <div className="flex flex-col w-full justify-center">
                <span className="text-primary-950 text-base">
                  {certificate.name}
                </span>
                <div className="flex w-full justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Cấp bởi: {certificate.author}
                  </div>
                  <Button className="text-xs text-black" outlined>
                    Xem chi tiết
                  </Button>
                </div>
                <span className="text-sm text-gray-600">
                  Cấp ngày: {certificate.createdAt}
                </span>
              </div>
            </div>
            <hr className="border-t border-gray-200 my-4" />
          </>
        );
      })}
    </div>
  );
}

export default Page;
