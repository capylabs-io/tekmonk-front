"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserStore } from "@/store/UserStore";
import { CheckCircle2, Edit, Gift, Medal, Star, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../common/button/Button";
import { CommonButton } from "../common/button/CommonButton";
import { ReqGetAchievementHistory } from "@/requests/achievement-history";
import qs from "qs";

interface ProfileUpdateReminderProps {
  onUpdateClick: () => void;
}

export const ProfileUpdateReminder = ({
  onUpdateClick,
}: ProfileUpdateReminderProps) => {
  const [isUpdated, isConnected, userInfo, setIsUpdated] = useUserStore(
    (state) => [
      state.isUpdated,
      state.isConnected,
      state.userInfo,
      state.setIsUpdated,
    ]
  );
  const [open, setOpen] = useState(false);

  const handleGetAchievementHistory = async () => {
    if (!userInfo) return;
    if (isUpdated == false) {
      setOpen(true);
      return;
    }
    if (isUpdated == true) {
      setOpen(false);
      return;
    }
    const queryString = qs.stringify({
      filters: {
        user: {
          id: userInfo.id,
        },
      },
      populate: ["user"],
    });
    const achievementHistory = await ReqGetAchievementHistory(queryString);
    if (achievementHistory.data.length > 0) {
      setIsUpdated(true);
      setOpen(false);
    } else {
      setOpen(true);
      setIsUpdated(false);
    }
  };
  useEffect(() => {
    handleGetAchievementHistory();
  }, [isUpdated, isConnected]);

  const handleUpdateClick = () => {
    setOpen(false);
    onUpdateClick();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader className="pb-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 mb-2">
            <Trophy className="h-6 w-6 text-amber-600" />
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-900 text-center">
            Nhiệm vụ đặc biệt
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-center">
            Cập nhật đầy đủ thông tin cá nhân để nhận thưởng
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-md border border-amber-200">
            <div>
              <p className="text-gray-800 text-sm">
                Hoàn thành nhiệm vụ cập nhật thông tin cá nhân để mở khóa nhiều
                phần thưởng hấp dẫn và tính năng đặc biệt trên hệ thống.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Gift className="h-4 w-4 text-red-500" />
              <span>
                Nhận <span className="font-medium">500 điểm kinh nghiệm</span>{" "}
                vào tài khoản
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Medal className="h-4 w-4 text-amber-500" />
              <span>
                Mở khóa <span className="font-medium">huy hiệu đặc biệt</span>{" "}
                trên hồ sơ
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Star className="h-4 w-4 text-blue-500" />
              <span>
                Cơ hội tham gia{" "}
                <span className="font-medium">sự kiện độc quyền</span> sắp tới
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:justify-between sm:flex-row gap-3 pt-2">
          <CommonButton
            variant="secondary"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            Để sau
          </CommonButton>
          <CommonButton
            onClick={handleUpdateClick}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Edit className="h-4 w-4 mr-1" />
            Cập nhật ngay
          </CommonButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
