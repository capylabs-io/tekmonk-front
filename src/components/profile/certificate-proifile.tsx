"use client";

import { ReqGetCertificateHistories } from "@/requests/certificate";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { get } from "lodash";
import { CommonCard } from "../common/CommonCard";
import { useState } from "react";
import { useCertificateHistory } from "@/hooks/use-certificate-history";
import { CertificateDialog } from "./certificate-dialog";

const TOTAL_CERTIFICATES = 4;
const PAGE = 1;
const ITEMS_PER_PAGE = 6;

export const CertificateProfile = ({ id }: { id: number }) => {
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [page, setPage] = useState(PAGE);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const { data: certificates, isLoading } = useQuery({
    queryKey: ["certificates", id],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: ['certificate', 'student', 'certificate.course', 'certificate.certificatePdfConfig', 'certificate.certificatePdfConfig.fields'],
        filters: {
          student: { id: id },
        },
        pagination: {
          page: 1,
          pageSize: TOTAL_CERTIFICATES,
        },
      });
      return await ReqGetCertificateHistories(queryString);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const { data: certificateHistory } = useCertificateHistory({
    page,
    pageSize: itemsPerPage,
    id,
  });

  const handleShowCertificateDialog = () => {
    setShowCertificateDialog(true);
  };

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
        <div className="cursor-pointer" onClick={handleShowCertificateDialog}>
          Xem thêm
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {certificates.data.map((certificate) => {
            let imgUrl = get(certificate, "certificate.certificatePdfConfig.backgroundUrl", "");
            if (imgUrl == null) {
              imgUrl = "/image/placeholder.png";
            }
            return (
              <CommonCard
                key={certificate.id}
                className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm h-max flex items-center gap-3"
              >
                <Image
                  src={imgUrl}
                  alt="Python"
                  width={100}
                  height={100}
                  className="object-contain"
                />
                <div className="flex flex-col items-start justify-between h-full w-full text-gray-500 text-sm">
                  <div className="text-SubheadSm text-gray-95">
                    {get(certificate, "certificate.name", "")}
                  </div>
                  <div className="text-BodyXs text-gray-600">
                    Tên khoá học: <span className="text-gray-95 font-medium">{get(certificate, "certificate.course.name", "")}</span>
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
            );
          })}
        </div>
      </div>

      <CertificateDialog
        open={showCertificateDialog}
        onOpenChange={setShowCertificateDialog}
        data={certificateHistory?.data || []}
        totalItems={certificateHistory?.meta.pagination.total || 0}
        currentPage={page}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setPage(page)}
        onItemsPerPageChange={(itemsPerPage) => setItemsPerPage(itemsPerPage)}
      />
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
