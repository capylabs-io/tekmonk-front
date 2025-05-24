"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CertificateHistory } from "@/types/certificate";
import Image from "next/image";
import { get } from "lodash";
import { CommonCard } from "../common/CommonCard";
import CommonPagination from "../admin/common-pagination";
import { useState } from "react";
import { CommonEmptyState } from "../common/CommonEmptyState";

type CertificateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CertificateHistory[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
};

export const CertificateDialog = ({
  open,
  onOpenChange,
  data,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: CertificateDialogProps) => {
  // const [certificateHistorySelected, setCertificateHistorySelected] = useState<CertificateHistory | null>(null);
  console.log('data', data);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">Chứng chỉ</DialogTitle>
        </DialogHeader>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.map((certificate) => {
              let imgUrl = get(certificate, "certificate.certificatePdfConfig.backgroundUrl", "");
              if (imgUrl == null || imgUrl == "") {
                imgUrl = "/image/app-logox5.png";
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
        ) : (
          <CommonEmptyState />
          // <div className="text-center py-8">
          //   <p className="text-gray-500">Chưa có chứng chỉ nào</p>
          // </div>
        )}
        <CommonPagination
          showDetails={false}
          totalItems={totalItems}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </DialogContent>
    </Dialog>
  );
};

// Helper function to format date as "MM/YYYY"
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}/${year}`;
};
