import React, { useState, useRef, useCallback } from "react";
import {
  Upload,
  X,
  FileImage,
  FileVideo,
  Move,
  PencilIcon,
} from "lucide-react";
// import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { ImageGrid } from "./image-grid";
import { EditAllDialog } from "./edit-all-dialog";
import { UploadArea } from "./upload-area";

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    return new Promise((resolve, reject) => {
      const duration = Math.random() * 2000 + 500; // Between 500ms and 2.5s
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
          // Simulate a small chance of error for demo purposes
          if (Math.random() > 0.9) {
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.id === fileItem.id
                  ? { ...f, status: "error", errorMessage: "Tải lên thất bại" }
                  : f
              )
            );
            reject(new Error("Lỗi tải lên ngẫu nhiên"));
          } else {
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.id === fileItem.id ? { ...f, status: "success" } : f
              )
            );
            resolve();
          }
        }
      }, interval);
    });
  };

  const handleFiles = useCallback(
    async (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        // toast.error(`You can upload a maximum of ${maxFiles} files`);
        return;
      }

      const newFileItems: FileItem[] = [];

      for (const file of acceptedFiles) {
        const validation = validateFile(file);

        if (!validation.valid) {
          // toast.error(validation.message);
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

      // Simulate upload for each new file
      newFileItems.forEach((fileItem) => {
        simulateUpload(fileItem).catch(() => {
          // Error handling is done inside simulateUpload
        });
      });
    },
    [files, maxFiles, onFilesChange]
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

  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        if (onFilesChange) {
          onFilesChange(newItems.map((item) => item.file));
        }

        return newItems;
      });
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className="mb-4"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadArea
          isDragging={isDragging}
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFileTypes.join(",")}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">
              Tệp đã tải lên ({files.length})
            </h3>
            {/* Floating Edit All Button */}
            <div className="flex gap-x-2">
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
