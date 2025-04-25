"use client";

import { ReqGetCertificateHistories } from "@/requests/certificate";
import { useUserStore } from "@/store/UserStore";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { get } from "lodash";
import { CommonCard } from "../common/CommonCard";

export const CertificateProfile = ({ id }: { id: number }) => {
  const { data: certificates, isLoading } = useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: ["certificate", "student"],
        filters: {
          student: { id: id },
        },
        pagination: {
          page: 1,
          pageSize: 4,
        },
      });
      return await ReqGetCertificateHistories(queryString);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-gray-200 p-4 h-[120px] bg-white shadow-sm"
          >
            <Skeleton className="h-6 w-3/4 mb-4" />
            <div className="flex items-center">
              <Skeleton className="w-12 h-12 rounded-full mr-3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!certificates?.data || certificates.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 rounded-lg bg-white">
        <h3 className="text-lg font-medium text-gray-700 mb-1">
          Chưa có chứng chỉ nào
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-md">
          Hoàn thành khóa học để nhận chứng chỉ
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 mt-4 mb-8">
      <div className="flex w-full justify-between items-center text-SubheadSm text-primary-950">
        <div className="text-gray-95 text-SubheadLg">Chứng chỉ</div>
        {/* <div className="cursor-pointer">Xem thêm</div> */}
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {certificates.data.map((certificate) => (
            <CommonCard
              key={certificate.id}
              className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm h-[88px] flex items-center gap-2"
            >
              <Image
                src={get(certificate, "certificate.imgUrl") || ""}
                alt="Python"
                width={56}
                height={56}
                className="object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/image/placeholder.png";
                }}
              />
              <div className="flex flex-col items-start justify-between h-full w-full text-gray-500 text-sm">
                <div className="text-SubheadSm text-gray-95">
                  {certificate.certificate.name ||
                    "Lập trình Python - Lớp Nâng Cao"}
                </div>
                <div className="flex items-center text-BodyXs text-gray-600">
                  <span className="mr-1">Hoàn thành:</span>
                  <span className="">
                    {certificate.createdAt
                      ? formatDate(certificate.createdAt)
                      : "1/2025"}
                  </span>
                </div>
              </div>
            </CommonCard>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to format date as "MM/YYYY"
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}/${year}`;
};
