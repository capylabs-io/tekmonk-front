"use client";
import { CommonButton } from "@/components/common/button/CommonButton";
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
import { ReqClaimMission, ReqGetMissionInfo } from "@/requests/mission";
import { ReqGetClassSessionDetail } from "@/requests/class-session-detail";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useUserStore } from "@/store/UserStore";
import { Achievement, Mission } from "@/types/common-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Filter, BookOpen, Target } from "lucide-react";
import qs from "qs";
import { useState, useMemo } from "react";
import Image from "next/image";
import CommonPagination from "@/components/admin/common-pagination";
import { CommonEmptyState } from "@/components/common/CommonEmptyState";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { CommonCard } from "@/components/common/CommonCard";
import { get } from "lodash";

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
  const router = useCustomRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [filterValue, setFilterValue] = useState<string>(StatusFilter.ALL);
  const [claimDialog, setClaimDialog] = useState<boolean>(false);
  const [claimData, setClaimData] = useState<Mission | Achievement | null>(
    null
  );
  const [classId, setClassId] = useState<number | null>(null);
  const [isSystemMission, setIsSystemMission] = useState<boolean>(false);
  const [showMissionList, setShowMissionList] = useState<boolean>(false);
  const [selectedSource, setSelectedSource] = useState<string>("");

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

  // Fetch class session details
  const { data: classSessionDetail } = useQuery({
    queryKey: ["classSessionDetail"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          filters: {
            student: {
              id: {
                $in: [get(userInfo, ["id"], "")],
              },
            },
          },
          populate: "class_session.class, class_session.class.course",
        });

        return await ReqGetClassSessionDetail(queryString);
      } catch (error) {
        console.log("failed to fetch class", error);
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!userInfo?.id,
  });

  const myClassList = useMemo(() => {
    if (!classSessionDetail?.data?.length) return [];

    const uniqueClasses = new Map();

    classSessionDetail.data.forEach((session) => {
      const classData = session.class_session?.class;
      if (classData && !uniqueClasses.has(classData.id)) {
        uniqueClasses.set(classData.id, {
          ...classData,
          course: classData.course,
        });
      }
    });

    return Array.from(uniqueClasses.values());
  }, [classSessionDetail]);

  /** UseQuery */
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [
      "mission-list",
      page,
      pageSize,
      filterValue,
      classId,
      isSystemMission,
    ],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          page,
          pageSize,
          status: filterValue,
          classId: classId,
          isSystemMission: isSystemMission,
        });

        return await ReqGetMissionInfo(queryString);
      } catch (err) {
        console.log("mission page => ", err);
      }
    },
    refetchOnWindowFocus: false,
    enabled: showMissionList, // Only fetch when showing mission list
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

  const handleClassClick = (classItem: any) => {
    setClassId(classItem.id);
    setIsSystemMission(false);
    setSelectedSource(classItem.name);
    setShowMissionList(true);
  };

  const handleSystemMissionClick = () => {
    setClassId(null);
    setIsSystemMission(true);
    setSelectedSource("Nhiệm vụ hệ thống");
    setShowMissionList(true);
  };

  const handleBackToSelection = () => {
    setShowMissionList(false);
    setClassId(null);
    setIsSystemMission(false);
    setSelectedSource("");
    setPage(1);
  };

  // Render class selection cards
  const renderClassSelection = () => {
    return (
      <div className="px-4 py-6">
        <div className="mb-6">
          <h3 className="text-SubheadMd text-gray-95 font-semibold mb-4">
            Chọn nguồn nhiệm vụ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* System Mission Card */}
            <CommonCard
              className="rounded-xl border border-gray-200 p-6 bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={handleSystemMissionClick}
            >
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-primary-700" />
                </div>
                <div className="text-SubheadMd text-gray-95 font-semibold text-center">
                  Nhiệm vụ hệ thống
                </div>
                <div className="text-BodySm text-gray-600 text-center mt-2">
                  Nhiệm vụ chung cho tất cả người dùng
                </div>
              </div>
            </CommonCard>

            {/* Class Cards */}
            {myClassList.map((classItem) => (
              <CommonCard
                key={classItem.id}
                className="rounded-xl border border-gray-200 p-6 bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleClassClick(classItem)}
              >
                <div className="flex flex-col items-start justify-between h-full w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary-700" />
                    </div>
                    <div className="text-SubheadMd text-gray-95 font-semibold">
                      {get(classItem, "name", "")}
                    </div>
                  </div>

                  <div className="space-y-3 w-full">
                    <div className="flex items-center text-BodySm text-gray-600 bg-gray-100 p-2 rounded-lg">
                      <span className="font-medium text-gray-700 mr-2">
                        Khoá học:
                      </span>
                      <span className="text-gray-95">
                        {get(classItem, "course.name", "")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-BodySm">
                        <span className="font-medium text-gray-700 mr-2">
                          Trạng thái:
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            new Date(get(classItem, "endTime", "")).getTime() >
                            new Date().getTime()
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {new Date(get(classItem, "endTime", "")).getTime() >
                          new Date().getTime()
                            ? "Đang diễn ra"
                            : "Đã kết thúc"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CommonCard>
            ))}
          </div>

          {myClassList.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 px-4 rounded-lg mt-4">
              <CommonEmptyState />
              <p className="text-sm text-gray-500 text-center max-w-md mt-2">
                Bạn chưa tham gia lớp học nào. Chỉ có thể xem nhiệm vụ hệ thống.
              </p>
            </div>
          )}
        </div>
      </div>
    );
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
          <div className="text-SubheadLg text-gray-95 flex items-center gap-x-1">
            <ArrowLeft
              size={24}
              onClick={() => {
                if (showMissionList) {
                  handleBackToSelection();
                } else {
                  router.back();
                }
              }}
            />
            <div>
              {showMissionList ? `Nhiệm vụ - ${selectedSource}` : "Nhiệm vụ"}
            </div>
          </div>
        </div>

        {/* Filter Component - Only show when in mission list mode */}
        {showMissionList && (
          <div className="w-full flex justify-end px-4">
            <MissionFilter
              filterValue={filterValue}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {/* Content */}
        <div>
          {showMissionList ? renderMissionContent() : renderClassSelection()}
        </div>

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
