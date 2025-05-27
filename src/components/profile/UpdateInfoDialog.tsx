"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateInfoStep1 } from "@/components/cap-nhat-thong-tin/Step1";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/UserStore";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import {
  updateUserInfoSchema,
  UpdateUserInfoSchema,
} from "@/validation/UpdateUserInfo";
import { updateUserProfile } from "@/requests/user";
import { useQueryClient } from "@tanstack/react-query";
import { last } from "lodash";
import { handleConfettiClick } from "@/contants/confetti";
import { AchievementLottie } from "@/components/lottie/achievement";
import { CheckCircle2 } from "lucide-react";
import { CommonButton } from "../common/button/CommonButton";

interface UpdateInfoDialogProps {
  open: boolean;
  onOpenChange: (updated: boolean) => void;
}

export const UpdateInfoDialog = ({
  open,
  onOpenChange,
}: UpdateInfoDialogProps) => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const [user, getMe, setIsUpdated] = useUserStore((state) => [
    state.userInfo,
    state.getMe,
    state.setIsUpdated,
  ]);

  const [isShowing, show, hide] = useLoadingStore((state) => [
    state.isShowing,
    state.show,
    state.hide,
  ]);
  const [error, success] = useSnackbarStore((state) => [
    state.error,
    state.success,
  ]);
  const queryClient = useQueryClient();

  // Initialize form with default values
  const methods = useForm<UpdateUserInfoSchema>({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: {
      stepOne: {
        fullName: user?.fullName || "",
        schoolName: last(user?.user_profiles)?.schoolName || "",
        studentAddress: user?.studentAddress || "",
        dateOfBirth: user?.dateOfBirth
          ? new Date(user.dateOfBirth)
          : new Date(),
        className: last(user?.user_profiles)?.className || "",
        schoolAddress: last(user?.user_profiles)?.schoolAddress || "",
        parentName: user?.parentName || "",
        parentPhoneNumber: user?.parentPhoneNumber || "",
        parentEmail: user?.parentEmail || "",
      },
      stepTwo: {
        email: user?.email || "",
        username: user?.username || "",
        password: "",
        confirmPassword: "",
      },
    },
    mode: "onChange", // Validate on change for better user experience
  });

  const handleSubmit = methods.handleSubmit(async (data) => {
    show();
    try {
      // Prepare data for API call
      const userData = {
        fullName: data.stepOne.fullName,
        schoolName: data.stepOne.schoolName,
        address: data.stepOne.studentAddress,
        dateOfBirth: data.stepOne.dateOfBirth,
        className: data.stepOne.className,
        schoolAddress: data.stepOne.schoolAddress,
        parentName: data.stepOne.parentName,
        parentPhoneNumber: data.stepOne.parentPhoneNumber,
        parentEmail: data.stepOne.parentEmail,
        email: data.stepTwo.email,
        username: data.stepTwo.username,
        // Only include password if it's provided
        ...(data.stepTwo.password ? { password: data.stepTwo.password } : {}),
      };

      // Call the API to update user profile
      await updateUserProfile(userData);

      // Refresh user data to update the isUpdated status
      await getMe();

      // Show success dialog and trigger confetti
      setShowSuccessDialog(true);
      handleConfettiClick();

      // Update the user store
      setIsUpdated(true);
    } catch (err) {
      error("Lỗi", "Có lỗi xảy ra khi cập nhật thông tin");
      onOpenChange(false);
    } finally {
      hide();
    }
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    onOpenChange(true);
  };

  return (
    <>
      <Dialog open={open && !showSuccessDialog} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Cập nhật thông tin cá nhân
            </DialogTitle>
          </DialogHeader>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="mt-6">
                <UpdateInfoStep1 />
              </div>

              <div className="flex justify-end gap-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Hủy
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                  disabled={isShowing || !methods.formState.isValid}
                >
                  {isShowing ? "Đang cập nhật..." : "Cập nhật thông tin"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader className="pb-2">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 mb-4">
              <AchievementLottie className="h-16 w-16" />
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900 text-center">
              Chúc mừng! 🎉
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-center">
              Bạn đã cập nhật thông tin cá nhân thành công!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="flex items-start gap-3 p-4 rounded-md border">
              <CheckCircle2 className="h-5 w-5 text-primary-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">
                  Thông tin đã được cập nhật
                </p>
                <p className="text-primary-600 text-sm">
                  Bạn đã nhận được 100 điểm kinh nghiệm và mở khóa huy hiệu đặc
                  biệt!
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <CommonButton
              onClick={handleSuccessDialogClose}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Tuyệt vời!
            </CommonButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
