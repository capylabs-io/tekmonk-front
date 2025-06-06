"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Achievement } from "@/types/common-types";
import { MissionCard } from "./MissionCard";
import CommonPagination from "../admin/common-pagination";
import { AchievementHistory } from "@/types/achievement-history";
import { CommonEmptyState } from "../common/CommonEmptyState";
type AchievementHistoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: AchievementHistory[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
};

export const AchievementHistoryDialog = ({
  open,
  onOpenChange,
  data,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: AchievementHistoryDialogProps) => {
  // Filter missions to only include completed ones

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">Thành tựu</DialogTitle>
        </DialogHeader>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((mission, index) => (
              <MissionCard
                key={`${mission.achievement?.id}-${index}`}
                data={mission.achievement as Achievement}
                onClick={() => {}}
                isShowButtonClaim={false}
              />
            ))}
          </div>
        ) : (
          <CommonEmptyState />
          // <div className="text-center py-8">
          //   <p className="text-gray-500">
          //     Chưa có thành tựu nào có thể đạt được
          //   </p>
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
