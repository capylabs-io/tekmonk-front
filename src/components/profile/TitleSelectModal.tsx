import { useEffect, useState } from "react";
import { Input } from "@/components/common/Input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ReqGetAchievementHistory
} from "@/requests/achievement";
import Image from "next/image";
import Loading from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { CommonEmptyState } from "../common/CommonEmptyState";
import { useUserStore } from "@/store/UserStore";
import CommonPagination from "../admin/common-pagination";
import { CommonButton } from "../common/button/CommonButton";

interface TitleSelectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTitle: string;
  onSave: (title: string) => Promise<void>;
}

export function TitleSelectModal({
  open,
  onOpenChange,
  currentTitle,
  onSave,
}: TitleSelectModalProps) {
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const { data, isLoading } = useQuery({
    queryKey: ["achievement-history-user", page, pageSize, userInfo],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          populate: "*",
          pagination: {
            page: page,
            pageSize: pageSize,
          },
          filters: {
            user: {
              id: userInfo?.id,
            },
          },
        });
        const res = await ReqGetAchievementHistory(queryString);
        console.log("achievement history ", res);
        return res;
      } catch (err) {
        console.log("Error ", err);
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (currentTitle) {
      setSelectedTitle(currentTitle);
    }
  }, [currentTitle]);

  const handleSave = async () => {
    if (!selectedTitle) return;
    setSaving(true);
    await onSave(selectedTitle);
    setSaving(false);
    setSearchTitle("");
  };

  return (
    open && ( 
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70 text-6xl">
        <div
          className="max-w-[480px] w-full rounded-2xl bg-gray-00 p-6 border-2 border-gray-30"
          style={{
            boxShadow: "0px 4px 0px #DDD0DD",
          }}
        >
          <div>
            <div className="text-2xl font-bold text-gray-95 mb-2">
              Chọn danh hiệu
            </div>
            <div className="text-gray-70 text-base mb-2">
              Danh hiệu hiện tại:{" "}
              <span className="font-bold text-primary-700">
                {currentTitle || "Chưa có"}
              </span>
            </div>
          </div>
          <Input
            type="text"
            placeholder="Tìm kiếm danh hiệu"
            isSearch
            value={searchTitle}
            onChange={setSearchTitle}
            customClassNames="mb-4"
          />
          <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
            <RadioGroup value={selectedTitle} onValueChange={setSelectedTitle}>
              {isLoading ? (
                <div className="text-center py-8">
                  <Loading />
                </div>
              ) : (
                <div className="border border-gray-30 rounded-md p-4">
                  {data?.data && data.data.length > 0 ? (
                    data.data
                      .filter((t) =>
                        t.achievement?.title
                          .toLowerCase()
                          .includes(searchTitle.toLowerCase())
                      )
                      .map((t, index) => (
                        <>
                          <div
                            key={t.id}
                            className="flex items-center gap-3 cursor-pointer"
                            // isActive={selectedTitle === t.achievement?.title}
                            onClick={() =>
                              setSelectedTitle(t.achievement?.title || "")
                            }
                          >
                            <Image
                              src={
                                t.achievement?.imageUrl ||
                                "/image/leaderboard/gold-medal.png"
                              }
                              alt="badge"
                              width={32}
                              height={32}
                            />
                            <span className="flex-1 text-gray-900 text-base">
                              {t.achievement?.title}
                            </span>
                            <RadioGroupItem
                              value={t.achievement?.title || ""}
                            />
                          </div>
                          {index !== data.data.length - 1 && (
                            <div className="border border-gray-20 h-[1px] my-2 w-full"></div>
                          )}
                        </>
                      ))
                  ) : (
                    <CommonEmptyState />
                  )}
                </div>
              )}
            </RadioGroup>
            <div className="flex w-full mx-auto">
              <CommonPagination
                currentPage={page}
                itemsPerPage={pageSize}
                totalItems={data?.meta?.pagination?.total || 0}
                showDetails={false}
                onPageChange={(page) => setPage(page)}
                onItemsPerPageChange={(pageSize) => setPageSize(pageSize)}
              />
            </div>
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <CommonButton
              variant="secondary"
              className="w-[100px]"
              onClick={() => {
                onOpenChange(false);
                setSearchTitle("");
              }}
            >
              Thoát
            </CommonButton>
            <CommonButton
              className="w-[100px]"
              onClick={handleSave}
              disabled={!selectedTitle || saving}
            >
              Lưu
            </CommonButton>
          </div>
        </div>
      </div>
    )
  );
}
