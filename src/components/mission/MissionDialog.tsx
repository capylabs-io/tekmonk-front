"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Achievement, Mission } from "@/types/common-types";
import { MissionCard } from "./MissionCard";
import { CardState } from "./types";
import { getCardState } from "./utils";
import CommonPagination from "../admin/common-pagination";
import { MissionHistory } from "@/types/mission-history";
import { AchievementHistory } from "@/types/achievement-history";
import { CommonEmptyState } from "../common/CommonEmptyState";
type MissionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: MissionHistory[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
};

export const MissionDialog = ({
  open,
  onOpenChange,
  data,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: MissionDialogProps) => {
  // Filter missions to only include completed ones

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">Nhiệm vụ</DialogTitle>
        </DialogHeader>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((mission, index) => (
              <MissionCard
                key={`${mission.mission?.id}-${index}`}
                data={mission.mission as Mission}
                onClick={() => { }}
                isShowButtonClaim={false}
              />
            ))}
          </div>
        ) : (
          <CommonEmptyState />
          // <div className="text-center py-8">
          //   <p className="text-gray-500">
          //     Chưa có nhiệm vụ nào có thể đạt được
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
