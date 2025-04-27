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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">Chứng chỉ</DialogTitle>
        </DialogHeader>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.map((certificate) => (
              <CommonCard
                key={certificate.id}
                className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm h-[88px] flex items-center gap-2"
              >
                <Image
                  src={get(certificate, "certificate.certificatePdfConfig.backgroundUrl") || ""}
                  alt={certificate.certificate?.name || "Certificate"}
                  width={100}
                  height={100}
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/image/placeholder.png";
                  }}
                />
                <div className="flex flex-col items-start justify-between h-full w-full text-gray-500 text-sm">
                  <div className="text-SubheadSm text-gray-95">
                    {certificate.certificate?.name ||
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
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Chưa có chứng chỉ nào</p>
          </div>
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
