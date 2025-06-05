"use client";
import { useQuery } from "@tanstack/react-query";
import { AuthGuard } from "@/components/hoc/auth-guard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CommonCard } from "@/components/common/CommonCard";
import { ReqGetCertificateHistories } from "@/requests/certificate";
import CustomCertificateEditor from "@/components/certificate/CustomCertificateEditor";
import { CommonButton } from "@/components/common/button/CommonButton";
import { useState } from "react";
import qs from "qs";
import { get } from "lodash";
import moment from "moment";
import { useUserStore } from "@/store/UserStore";
import { useCertificateHistory } from "@/hooks/use-certificate-history";
import Image from "next/image";
import {
  CertificateHistory,
  CertificatePdfFieldConfig,
} from "@/types/certificate";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ArrowLeft } from "lucide-react";

const TOTAL_CERTIFICATES = 4;
const PAGE = 1;
const ITEMS_PER_PAGE = 6;
export default function CertificatePage() {
  const router = useCustomRouter();
  const [page, setPage] = useState(PAGE);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const [isOpenDetailCertificate, setIsOpenDetailCertificate] = useState(false);
  const [certificateHistorySelected, setCertificateHistorySelected] =
    useState<CertificateHistory | null>(null);
  const { data: certificates, isLoading } = useQuery({
    queryKey: ["certificates", userInfo?.id],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: [
          "certificate",
          "student",
          "certificate.course",
          "certificate.certificatePdfConfig",
          "certificate.certificatePdfConfig.fields",
        ],
        filters: {
          student: { id: userInfo?.id },
        },
        pagination: {
          page: 1,
          pageSize: TOTAL_CERTIFICATES,
        },
      });
      return await ReqGetCertificateHistories(queryString);
    },
    enabled: !!userInfo?.id,
    refetchOnWindowFocus: false,
  });

  const { data: certificateHistory } = useCertificateHistory({
    page,
    pageSize: itemsPerPage,
    id: userInfo?.id || 0,
  });

  return (
    <AuthGuard>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 pb-4 border-b border-gray-200">
          <div className="text-SubheadLg text-gray-95 flex items-center gap-x-1">
            <ArrowLeft size={24} onClick={() => router.back()} />
            <div>Chứng chỉ</div>
          </div>
          <div></div>
        </div>

        <div className="flex flex-col gap-4 mt-4 p-4">
          {!certificates?.data ||
            (certificates.data.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 px-4 rounded-lg bg-white">
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  Chưa có chứng chỉ nào
                </h3>
                <p className="text-sm text-gray-500 text-center max-w-md">
                  Hoàn thành khóa học để nhận chứng chỉ
                </p>
              </div>
            ))}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certificates?.data?.map((certificate) => {
              let imgUrl = get(
                certificate,
                "certificate.certificatePdfConfig.backgroundUrl",
                ""
              );
              // if (imgUrl == null) {
              //   imgUrl = "/image/placeholder.png";
              // }
              return (
                <CommonCard
                  onClick={() => {
                    setCertificateHistorySelected(certificate);
                    setIsOpenDetailCertificate(true);
                  }}
                  key={certificate.id}
                  className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm h-[88px] flex items-center gap-3"
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
                      Tên khoá học:{" "}
                      <span className="text-gray-95 font-medium">
                        {get(certificate, "certificate.course.name", "")}
                      </span>
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
      </div>

      <Dialog
        open={isOpenDetailCertificate}
        onOpenChange={setIsOpenDetailCertificate}
      >
        <DialogContent className="w-[1200px] h-[700px] overflow-auto bg-white">
          <DialogHeader>
            <DialogTitle>Chi tiết chứng chỉ</DialogTitle>
            <DialogDescription>
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2  gap-x-4 max-w-[500px]">
                  <div className="text-base font-medium text-gray-60">
                    Tên chứng chỉ:
                  </div>
                  <div className="text-base">
                    {certificateHistorySelected?.certificate.name}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 max-w-[500px]">
                  <div className="text-base font-medium text-gray-60">
                    Khoá học:
                  </div>
                  <div className="text-base">
                    {certificateHistorySelected?.certificate.course?.name}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 max-w-[500px]">
                  <div className="text-base font-medium text-gray-60">
                    Ngày tạo:
                  </div>
                  <div className="text-base">
                    {moment(
                      get(certificateHistorySelected, "createdAt", "")
                    ).format("DD/MM/YYYY")}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-base font-medium text-gray-60">
                    Xem trước chứng chỉ:
                  </div>
                  <div>
                    <CustomCertificateEditor
                      initialFields={
                        certificateHistorySelected?.certificate
                          .certificatePdfConfig?.fields
                          ? certificateHistorySelected?.certificate.certificatePdfConfig?.fields.map(
                            (field: CertificatePdfFieldConfig) => ({
                              id: String(field.id || Date.now()),
                              label: field.label || "",
                              value: field.value || "",
                              htmlContent: field.value || "",
                              position: {
                                x: field.positionX || 0,
                                y: field.positionY || 0,
                              },
                              fontSize: Number(field.fontSize) || 18,
                              fontWeight: field.fontWeight || "normal",
                              color: field.color || "#000000",
                              fontFamily: field.fontFamily || "Roboto",
                              textAlign: field.textAlign || "center",
                            })
                          )
                          : []
                      }
                      initialBackgroundImage={
                        certificateHistorySelected?.certificate
                          .certificatePdfConfig?.backgroundUrl || null
                      }
                      isPreviewCertificate={true}
                    />
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <CommonButton onClick={() => setIsOpenDetailCertificate(false)}>
              Đóng
            </CommonButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthGuard>
  );
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}/${year}`;
};
