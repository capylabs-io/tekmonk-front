"use client";
import { useState } from "react";
import { MissionCard } from "@/components/mission/MissionCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import qs from "qs";
import { ReqClaimMission, ReqGetMissionInfo } from "@/requests/mission";
import {
  ReqClaimAchievement,
  ReqGetAllAchievementsInfo,
} from "@/requests/achievement";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { TabNavigation, TabItem } from "@/components/common/TabNavigation";
import { Achievement } from "@/types/common-types";
import { useLoadingStore } from "@/store/LoadingStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { StatusFilter } from "@/contants/misison/status-filter";
import { useUserStore } from "@/store/UserStore";

// Tab options
enum TabOptions {
  MISSION = "mission",
  ACHIEVEMENT = "achievement",
}

// Tab data
const TABS: TabItem[] = [
  { id: TabOptions.MISSION, label: "Nhiệm vụ" },
  { id: TabOptions.ACHIEVEMENT, label: "Thành tựu" },
];

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
  const [page] = useState(1);
  const [pageSize] = useState(30);
  const [activeTab, setActiveTab] = useState<string>(TabOptions.MISSION);
  const [filterValue, setFilterValue] = useState<string>(StatusFilter.ALL);

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
    queryKey: ["mission-achievement", activeTab, page, pageSize, filterValue],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          page,
          pageSize,
          status: filterValue,
        });

        if (activeTab === TabOptions.MISSION) {
          return await ReqGetMissionInfo(queryString);
        }
        return await ReqGetAllAchievementsInfo(queryString);
      } catch (err) {
        console.log("mission page => ", err);
        error("Lỗi", "Lỗi khi lấy dữ liệu");
        return { data: [] };
      }
    },
    refetchOnWindowFocus: false,
  });
  //mutate update function
  const { mutate: updateMission } = useMutation({
    mutationFn: async (id: number) => {
      try {
        show();
        if (activeTab === TabOptions.MISSION) {
          await ReqClaimMission(id);
        } else {
          await ReqClaimAchievement(id);
        }
        await getMe();
        success("Xong", "Nhận thành công");
      } catch (err) {
        console.log("mission page => ", err);
        error("Lỗi", "Lỗi khi cập nhật nhiệm vụ");
      } finally {
        hide();
        queryClient.invalidateQueries({
          queryKey: [
            "mission-achievement",
            activeTab,
            page,
            pageSize,
            filterValue,
          ],
        });
      }
    },
  });

  /** Functions */
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Reset filter when changing tabs
    setFilterValue(StatusFilter.ALL);
  };

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
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.data.map((mission, index: number) => (
              <MissionCard key={index} data={mission} onClick={updateMission} />
            ))}
          </div>
        ) : (
          <div className="text-center w-full py-10">
            <p className="text-gray-500">Không có nhiệm vụ nào</p>
          </div>
        )}
      </div>
    );
  };

  // Render achievement content
  const renderAchievementContent = () => {
    return (
      <div className="px-4 py-6">
        {isLoading ? (
          <div className="text-center w-full py-10">
            <p className="text-gray-500">Đang tải...</p>
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.data.map((achievement: Achievement, index: number) => (
              <MissionCard
                key={index}
                data={achievement}
                onClick={updateMission}
              />
            ))}
          </div>
        ) : (
          <div className="text-center w-full py-10">
            <p className="text-gray-500">Không có thành tựu nào</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between px-2">
        <div className="text-primary-900 text-SubheadLg font-medium">
          <span>Nhiệm vụ</span>
        </div>
        <div>
          <div className="flex items-center">
            <div className="text-yellow-500 font-semibold">
              {userInfo?.balance}
            </div>
            <div className="w-6 h-6 rounded-full bg-yellow-500 ml-2"></div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation
        tabs={TABS}
        activeTabId={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Filter Component */}
      <div className="w-full flex justify-end">
        <MissionFilter
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === TabOptions.MISSION
          ? renderMissionContent()
          : renderAchievementContent()}
      </div>
    </div>
  );
}
