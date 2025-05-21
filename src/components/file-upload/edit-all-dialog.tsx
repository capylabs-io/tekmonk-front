"use client";
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileItem } from "./file-upload";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { FileImage, FileVideo, Trash2, Edit, Grip, Image } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
// import { toast } from "sonner";

interface EditAllDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  onFilesChange?: (files: File[]) => void;
}

export const EditAllDialog: React.FC<EditAllDialogProps> = ({
  isOpen,
  setIsOpen,
  files,
  setFiles,
  onFilesChange,
}) => {
  const [editingFile, setEditingFile] = useState<FileItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReorder = (reorderedFiles: FileItem[]) => {
    setFiles(reorderedFiles);
    if (onFilesChange) {
      onFilesChange(reorderedFiles.map((item) => item.file));
    }
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => {
      const updated = prev.filter((file) => file.id !== id);
      if (onFilesChange) {
        onFilesChange(updated.map((item) => item.file));
      }
      return updated;
    });
  };

  const handleReplaceClick = (file: FileItem) => {
    setEditingFile(file);
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 100);
  };

  const handleFileReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingFile || !e.target.files || e.target.files.length === 0) return;

    const newFile = e.target.files[0];
    const isImage = newFile.type.startsWith("image/");
    const isVideo = newFile.type.startsWith("video/");

    // Validate file type
    if (!isImage && !isVideo) {
      // toast.error("Only images and videos are allowed");
      return;
    }

    // Create a preview URL for the new file
    const previewUrl = URL.createObjectURL(newFile);

    // Replace the file while keeping the same ID
    setFiles((prev: any) => {
      const updated = prev.map((file: any) =>
        file.id === editingFile.id
          ? {
              ...file,
              file: newFile,
              previewUrl,
              status: "success",
              progress: 100,
            }
          : file
      );

      if (onFilesChange) {
        onFilesChange(updated.map((item: any) => item.file));
      }

      return updated;
    });

    // toast.success("File replaced successfully");
    setEditingFile(null);

    // Reset input
    if (e.target) {
      e.target.value = "";
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col bg-white">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa tệp đã tải lên</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-4 max-h-[60vh] bg-white overflow-y-auto custom-scrollbar">
            <AnimatePresence initial={false}>
              <Reorder.Group
                axis="y"
                values={files}
                onReorder={handleReorder}
                className="space-y-2"
              >
                {files.map((file) => {
                  const isImage = file.file.type.startsWith("image/");
                  const isVideo = file.file.type.startsWith("video/");

                  return (
                    <Reorder.Item
                      key={file.id}
                      value={file}
                      as="div"
                      className="rounded-lg overflow-hidden border border-border"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center p-3 gap-3 bg-background"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                        whileTap={{ scale: 0.98 }}
                        layoutId={`file-${file.id}`}
                      >
                        {/* Drag Handle */}
                        <div className="flex items-center justify-center p-2 cursor-grab active:cursor-grabbing touch-none">
                          <Grip className="h-4 w-4 text-muted-foreground" />
                        </div>

                        {/* Preview Thumbnail */}
                        <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                          {isImage && (
                            <img
                              src={file.previewUrl}
                              alt={file.file.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                          {isVideo && (
                            <div className="h-full w-full flex items-center justify-center bg-blue-50">
                              <FileVideo className="h-8 w-8 text-blue-400" />
                            </div>
                          )}
                          {!isImage && !isVideo && (
                            <div className="h-full w-full flex items-center justify-center bg-gray-50">
                              <FileImage className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {file.file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handleReplaceClick(file)}
                            title="Thay thế hình ảnh"
                          >
                            <Image className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(file.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>

                      {file.status === "uploading" && (
                        <div className="h-1 bg-primary/20">
                          <div
                            className="h-full bg-primary transition-all duration-300 ease-in-out"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            </AnimatePresence>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hidden file input for replacing files */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileReplace}
      />
    </>
  );
};
