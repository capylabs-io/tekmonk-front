"use client";
import { CommonButton } from "@/components/common/button/CommonButton";
import { TabItem, TabNavigation } from "@/components/common/TabNavigation";
import { AuthGuard } from "@/components/hoc/auth-guard";
import { MissionCard } from "@/components/mission/MissionCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusFilter } from "@/contants/misison/status-filter";
import {
  ReqClaimAchievement,
  ReqGetAllAchievementsInfo,
} from "@/requests/achievement";
import { ReqClaimMission, ReqGetMissionInfo } from "@/requests/mission";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useUserStore } from "@/store/UserStore";
import { Achievement, Mission } from "@/types/common-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Filter } from "lucide-react";
import qs from "qs";
import { useState } from "react";
import Image from "next/image";
import CommonPagination from "@/components/admin/common-pagination";
import { CommonEmptyState } from "@/components/common/CommonEmptyState";
// Filter dropdown component
const MissionFilter = ({
  filterValue,
  onFilterChange,
}: {
  filterValue: string;
  onFilterChange: (value: string) => void;
}) => {
  return (
    <div className="flex items-center mt-4">
      <div className="flex flex-row items-center px-3 py-2.5 gap-1 w-[240px] h-10 bg-white border border-[#DDD0DD] rounded-lg">
        <Filter className="w-5 h-5 text-[#BC4CAC] flex-none" />
        <span className="text-sm leading-5 font-light text-[#1A0C1D] flex-none font-kanit">
          Hiển thị:
        </span>
        <Select value={filterValue} onValueChange={onFilterChange}>
          <SelectTrigger className="border-0 p-0 h-5 min-h-0 shadow-none focus:ring-0 focus:ring-offset-0 ml-1">
            <SelectValue
              placeholder="Tất cả"
              className="text-sm leading-5 font-medium text-[#1A0C1D] font-kanit"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={StatusFilter.ALL} className="cursor-pointer">
              Tất cả
            </SelectItem>
            <SelectItem
              value={StatusFilter.COMPLETED}
              className="cursor-pointer"
            >
              Đã xong
            </SelectItem>
            <SelectItem
              value={StatusFilter.IN_PROGRESS}
              className="cursor-pointer"
            >
              Đang làm
            </SelectItem>
            <SelectItem
              value={StatusFilter.UNCLAIMED}
              className="cursor-pointer"
            >
              Chưa nhận
            </SelectItem>
            <SelectItem value={StatusFilter.CLAIMED} className="cursor-pointer">
              Đã nhận
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default function MissionPage() {
  /** UseState */
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [filterValue, setFilterValue] = useState<string>(StatusFilter.ALL);
  const [claimDialog, setClaimDialog] = useState<boolean>(false);
  const [claimData, setClaimData] = useState<Mission | Achievement | null>(
    null
  );
  /** UseStore */
  const [error, success] = useSnackbarStore((state) => [
    state.error,
    state.success,
  ]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const [getMe, userInfo] = useUserStore((state) => [
    state.getMe,
    state.userInfo,
  ]);

  /** UseQuery */
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["mission-list", page, pageSize, filterValue],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          page,
          pageSize,
          status: filterValue,
        });

        return await ReqGetMissionInfo(queryString);
      } catch (err) {
        console.log("mission page => ", err);
      }
    },
    refetchOnWindowFocus: false,
  });
  //mutate update function
  const { mutate: updateMission } = useMutation({
    mutationFn: async (id: number) => {
      try {
        show();
        await ReqClaimMission(id);
        setClaimDialog(true);
      } catch (err) {
        console.log("mission page => ", err);
        error("Lỗi", "Lỗi khi cập nhật nhiệm vụ");
      } finally {
        hide();
        queryClient.invalidateQueries({
          queryKey: ["mission-list"],
        });
        await getMe();
      }
    },
  });

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  // Render mission content
  const renderMissionContent = () => {
    return (
      <div className="px-4 py-6">
        {isLoading ? (
          <div className="text-center w-full py-10">
            <p className="text-gray-500">Đang tải...</p>
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <>
            <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.data.map((mission, index: number) => (
                <MissionCard
                  key={index}
                  data={mission}
                  onClick={() => {
                    updateMission(mission.historyId ?? 0); // Add null check with default value
                    setClaimData(mission);
                  }}
                />
              ))}
            </div>
            <div className="flex w-full mx-auto">
              <CommonPagination
                currentPage={page}
                itemsPerPage={pageSize}
                totalItems={data?.meta?.pagination?.total}
                showDetails={false}
                onPageChange={(page) => setPage(page)}
                onItemsPerPageChange={(pageSize) => setPageSize(pageSize)}
              />
            </div>
          </>
        ) : (
          <CommonEmptyState />
        )}
      </div>
    );
  };

  return (
    <AuthGuard>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4">
          <div className="text-SubheadLg text-gray-95">
            <span>Nhiệm vụ</span>
          </div>
        </div>

        {/* Filter Component */}
        <div className="w-full flex justify-end px-4">
          <MissionFilter
            filterValue={filterValue}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Tab Content */}
        <div>{renderMissionContent()}</div>

        {/* Show Dialog when user click to claim here */}
        <Dialog open={claimDialog} onOpenChange={setClaimDialog}>
          <DialogContent className="max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle>
                <div className="text-primary-900 text-SubheadLg font-medium">
                  <span>Chúc mừng</span>
                </div>
              </DialogTitle>
              <DialogDescription>
                <div className="text-BodyMd text-gray-70 flex items-center gap-x-1">
                  Bạn đã nhận được{" "}
                  <span className="font-bold text-primary-900">
                    {claimData?.reward ? claimData?.reward : 0}
                  </span>{" "}
                  <Image
                    src="/image/home/coin.png"
                    alt="coin pic"
                    width={24}
                    height={24}
                  />{" "}
                  <span className="text-gray-70 flex items-center gap-x-1">
                    đồng và{" "}
                    <span className="font-bold text-primary-900 flex items-center gap-x-1">
                      {claimData?.points}
                      <Image
                        src="/image/PointIcon.png"
                        alt="coin pic"
                        width={24}
                        height={24}
                      />
                    </span>{" "}
                    <span className="text-gray-70">điểm</span>
                  </span>
                </div>
              </DialogDescription>
              <DialogFooter>
                <CommonButton
                  className="w-full"
                  onClick={() => {
                    setClaimDialog(false);
                  }}
                >
                  <span>Đồng ý</span>
                </CommonButton>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </AuthGuard>
  );
}
