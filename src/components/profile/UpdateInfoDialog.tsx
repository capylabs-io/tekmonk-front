"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateInfoStep1 } from "@/components/cap-nhat-thong-tin/Step1";
import { UpdateInfoStep2 } from "@/components/cap-nhat-thong-tin/Step2";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/UserStore";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import {
  updateUserInfoSchema,
  UpdateUserInfoSchema,
} from "@/validation/UpdateUserInfo";
import { updateUserProfile } from "@/requests/user";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpdateInfoDialog = ({
  open,
  onOpenChange,
}: UpdateInfoDialogProps) => {
  const [user] = useUserStore((state) => [state.userInfo]);
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
        schoolName: user?.userProfiles?.schoolName || "",
        studentAddress: user?.studentAddress || "",
        dateOfBirth: user?.dateOfBirth
          ? new Date(user.dateOfBirth)
          : new Date(),
        className: user?.className || "",
        schoolAddress: user?.userProfiles?.schoolAddress || "",
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

      // Invalidate queries to refresh user data
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ["user", user.id] });
      }

      success("Thành công!", "Cập nhật thông tin thành công");
      onOpenChange(false); // Close dialog after successful update
    } catch (err) {
      error("Lỗi", "Có lỗi xảy ra khi cập nhật thông tin");
    } finally {
      hide();
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Cập nhật thông tin cá nhân
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
                <TabsTrigger value="account">Thông tin tài khoản</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="mt-6">
                <UpdateInfoStep1 />
              </TabsContent>
              <TabsContent value="account" className="mt-6">
                <UpdateInfoStep2 />
              </TabsContent>
            </Tabs>

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
  );
};
