"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { GraduationCap, Users, UserCog, Settings } from "lucide-react";
import { useState } from "react";
import { StudentRegistrationDialog } from "./StudentRegistrationDialog";
import { TeacherRegistrationDialog } from "./TeacherRegistrationDialog";
import { ManagerRegistrationDialog } from "./ManagerRegistrationDialog";
import { AdminRegistrationDialog } from "./AdminRegistrationDialog";

type AccountType = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const accountTypes: AccountType[] = [
  {
    id: "student",
    title: "HỌC VIÊN",
    description: "Tài khoản cho học sinh",
    icon: <GraduationCap className="h-12 w-12 text-primary-600" />,
  },
  {
    id: "teacher",
    title: "GIẢNG VIÊN",
    description: "Tài khoản dành cho giảng viên và trợ giảng",
    icon: <Users className="h-12 w-12 text-primary-600" />,
  },
  {
    id: "manager",
    title: "QUẢN LÝ LỚP",
    description: "Tài khoản dành cho nhân viên quản lý lớp học",
    icon: <UserCog className="h-12 w-12 text-primary-600" />,
  },
  {
    id: "admin",
    title: "QUẢN TRỊ VIÊN",
    description: "Tài khoản quản lý hệ thống, duyệt và phê duyệt",
    icon: <Settings className="h-12 w-12 text-primary-600" />,
  },
];

interface AccountTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (accountType: string) => void;
}

export function AccountTypeDialog({
  open,
  onOpenChange,
  onSelect,
}: AccountTypeDialogProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showManagerForm, setShowManagerForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    if (selectedType === "student") {
      setShowStudentForm(true);
    } else if (selectedType === "teacher") {
      setShowTeacherForm(true);
    } else if (selectedType === "manager") {
      setShowManagerForm(true);
    } else if (selectedType === "admin") {
      setShowAdminForm(true);
    }
  };

  const handleManagerFormSubmit = (data: any) => {
    onSelect("manager");
    onOpenChange(false);
  };

  const handleAdminFormSubmit = (data: any) => {
    onSelect("admin");
    onOpenChange(false);
  };

  if (showManagerForm) {
    return (
      <ManagerRegistrationDialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setShowManagerForm(false);
            setSelectedType(null);
          }
          onOpenChange(isOpen);
        }}
        onSubmit={handleManagerFormSubmit}
      />
    );
  }

  if (showAdminForm) {
    return (
      <AdminRegistrationDialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setShowAdminForm(false);
            setSelectedType(null);
          }
          onOpenChange(isOpen);
        }}
        onSubmit={handleAdminFormSubmit}
      />
    );
  }

  const handleTeacherFormSubmit = (data: any) => {
    onSelect("teacher");
    onOpenChange(false);
  };

  if (showTeacherForm) {
    return (
      <TeacherRegistrationDialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setShowTeacherForm(false);
            setSelectedType(null);
          }
          onOpenChange(isOpen);
        }}
        onSubmit={handleTeacherFormSubmit}
      />
    );
  }

  if (showStudentForm) {
    return (
      <StudentRegistrationDialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setShowStudentForm(false);
            setSelectedType(null);
          }
          onOpenChange(isOpen);
        }}
        onSubmit={(data: any) => {
          onSelect("student");
          onOpenChange(false);
        }}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[896px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center mb-4">
            Tạo tài khoản mới
          </DialogTitle>
          <div className="text-gray-600 text-center mb-4">
            Lựa chọn loại tài khoản
          </div>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 p-4">
          {accountTypes.map((type) => (
            <div
              key={type.id}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-xl border-2",
                selectedType === type.id
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200",
                "hover:border-primary-600 hover:bg-primary-50 cursor-pointer transition-all",
                "focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
              )}
              onClick={() => handleTypeSelect(type.id)}
              role="button"
              tabIndex={0}
            >
              {type.icon}
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {type.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 text-center">
                {type.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <button
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => {
              setSelectedType(null);
              onOpenChange(false);
            }}
          >
            Thoát
          </button>
          <button
            className={cn(
              "px-6 py-2 rounded-full transition-colors",
              selectedType
                ? "bg-primary-600 text-white hover:bg-primary-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
            onClick={handleContinue}
            disabled={!selectedType}
          >
            Tiếp tục
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
