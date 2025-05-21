"use client";
import React, { useState, useRef, useCallback } from "react";
import { X, PencilIcon, UploadIcon } from "lucide-react";
// import { toast } from "sonner";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { ImageGrid } from "./image-grid";
import { EditAllDialog } from "./edit-all-dialog";
import { UploadArea } from "./upload-area";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { get } from "lodash";

export interface FileItem {
  id: string;
  file: File;
  previewUrl: string;
  progress: number;
  status: "uploading" | "success" | "error";
  errorMessage?: string;
}

interface FileUploadProps {
  maxFiles?: number;
  maxSizeInMB?: number;
  acceptedFileTypes?: string[];
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  maxFiles = 10,
  maxSizeInMB = 5,
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"],
  onFilesChange,
  className,
}) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [warn, error] = useSnackbarStore((state) => [state.warn, state.error]);

  const validateFile = (file: File): { valid: boolean; message?: string } => {
    if (!acceptedFileTypes.includes(file.type)) {
      return {
        valid: false,
        message: `Loại tệp không hợp lệ. Các loại được chấp nhận: ${acceptedFileTypes
          .map((type) => type.split("/")[1])
          .join(", ")}`,
      };
    }

    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeInMB) {
      return {
        valid: false,
        message: `Kích thước tệp vượt quá giới hạn ${maxSizeInMB}MB`,
      };
    }

    return { valid: true };
  };

  const simulateUpload = (fileItem: FileItem): Promise<void> => {
    return new Promise((resolve) => {
      const duration = 1000; // Fixed duration of 1 second for all uploads
      const interval = 50;
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = Math.min(Math.round((currentStep / steps) * 100), 100);

        setFiles((prevFiles) =>
          prevFiles.map((f) => (f.id === fileItem.id ? { ...f, progress } : f))
        );

        if (progress === 100) {
          clearInterval(timer);
          setFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id === fileItem.id ? { ...f, status: "success" } : f
            )
          );
          resolve();
        }
      }, interval);
    });
  };

  const handleFiles = useCallback(
    async (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        warn("Tệp đã tải lên", `Bạn có thể tải lên tối đa ${maxFiles} tệp`);
        return;
      }

      const newFileItems: FileItem[] = [];

      for (const file of acceptedFiles) {
        const validation = validateFile(file);

        if (!validation.valid) {
          error("Lỗi", get(validation, "message", "Lỗi tải lên tệp"));
          continue;
        }

        const id = `file-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 9)}`;
        const previewUrl = URL.createObjectURL(file);

        const fileItem: FileItem = {
          id,
          file,
          previewUrl,
          progress: 0,
          status: "uploading",
        };

        newFileItems.push(fileItem);
      }

      if (newFileItems.length === 0) return;

      const updatedFiles = [...files, ...newFileItems];
      setFiles(updatedFiles);

      if (onFilesChange) {
        onFilesChange(updatedFiles.map((item) => item.file));
      }

      // Simulate upload for each new file in parallel
      const uploadPromises = newFileItems.map((fileItem) =>
        simulateUpload(fileItem)
      );
      await Promise.all(uploadPromises);
    },
    [files, maxFiles, onFilesChange, warn, error]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleDelete = (id: string) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.id !== id);
      if (onFilesChange) {
        onFilesChange(updatedFiles.map((item) => item.file));
      }
      return updatedFiles;
    });
  };

  const handleOpenFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {files.length === 0 ? (
        <div
          className=""
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <UploadArea
            isDragging={isDragging}
            onClick={() => fileInputRef.current?.click()}
          />
        </div>
      ) : null}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedFileTypes.join(",")}
        onChange={handleInputChange}
        className="hidden"
      />

      {files.length > 0 && (
        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">
              Tệp đã tải lên ({files.length})
            </h3>
            {/* Action buttons */}
            <div className="flex gap-x-2">
              <Button
                onClick={handleOpenFileInput}
                className="text-sm"
                size="sm"
                variant="outline"
              >
                <UploadIcon className="h-4 w-4 mr-1" /> Thêm ảnh
              </Button>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="text-sm"
                size="sm"
                variant="outline"
              >
                <PencilIcon className="h-4 w-4 mr-1" /> Chỉnh sửa tất cả
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFiles([])}
                className="text-sm"
              >
                <X className="h-4 w-4 mr-1" /> Xóa tất cả
              </Button>
            </div>
          </div>

          {/* Image Grid View */}
          <ImageGrid files={files} onDelete={handleDelete} />

          {/* Edit All Dialog */}
          <EditAllDialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            files={files}
            setFiles={setFiles}
            onFilesChange={onFilesChange}
          />
        </div>
      )}
    </div>
  );
};
