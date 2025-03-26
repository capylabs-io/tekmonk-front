"use client";
import React, { useState } from "react";
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
import { Achievement, Mission } from "@/types/common-types";
import { StrapiResponse } from "@/requests/strapi-response-pattern";
import { useLoadingStore } from "@/store/LoadingStore";

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

export default function MissionPage() {
  /** UseState */
  const [page] = useState(1);
  const [pageSize] = useState(30);
  const [activeTab, setActiveTab] = useState<string>(TabOptions.MISSION);

  /** UseStore */
  const [error, success] = useSnackbarStore((state) => [
    state.error,
    state.success,
  ]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);

  /** UseQuery */
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["mission-achievement", activeTab, page, pageSize],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          page,
          pageSize,
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
        success("Xong", "Nhận thành công");
      } catch (err) {
        console.log("mission page => ", err);
        error("Lỗi", "Lỗi khi cập nhật nhiệm vụ");
      } finally {
        hide();
        queryClient.invalidateQueries({
          queryKey: ["mission-achievement", activeTab, page, pageSize],
        });
      }
    },
  });

  /** Functions */
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Render mission content
  const renderMissionContent = () => {
    return (
      <div className="flex flex-wrap gap-6 px-[36px] py-6 items-start">
        {isLoading ? (
          <div className="text-center w-full py-10">
            <p className="text-gray-500">Đang tải...</p>
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <>
            {data.data.map((mission, index: number) => (
              <MissionCard key={index} data={mission} onClick={updateMission} />
            ))}
          </>
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
      <div className="flex flex-wrap gap-6 px-[36px] py-6 items-start">
        {isLoading ? (
          <div className="text-center w-full py-10">
            <p className="text-gray-500">Đang tải...</p>
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <>
            {data.data.map((achievement: Achievement, index: number) => (
              <MissionCard
                key={index}
                data={achievement}
                onClick={updateMission}
              />
            ))}
          </>
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
      </div>

      {/* Tab Navigation */}
      <TabNavigation
        tabs={TABS}
        activeTabId={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === TabOptions.MISSION
          ? renderMissionContent()
          : renderAchievementContent()}
      </div>
    </div>
  );
}
