"use client";
import React, { useState } from "react";
import { X, Edit, Trash2, FileImage, FileVideo, Move } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileItem } from "./file-upload";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

interface FilePreviewProps {
  fileItem: FileItem;
  onDelete: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  fileItem,
  onDelete,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isImage = fileItem.file.type.startsWith("image/");
  const isVideo = fileItem.file.type.startsWith("video/");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: fileItem.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <>
      <motion.div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`
          relative rounded-lg overflow-hidden border border-gray-200
          aspect-square cursor-grab active:cursor-grabbing group
          ${isDragging ? "ring-2 ring-primary shadow-lg" : ""}
        `}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        animate={{
          opacity: isDragging ? 0.8 : 1,
          boxShadow: isDragging
            ? "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
            : "0 1px 3px rgba(0,0,0,0.12)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Move handle */}
        <div className="absolute top-2 left-2 p-1 rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <Move className="h-4 w-4" />
        </div>

        {/* Preview */}
        {isImage && (
          <AnimatePresence>
            <motion.img
              src={fileItem.previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        )}
        {isVideo && (
          <video className="w-full h-full object-cover" controls={false}>
            <source src={fileItem.previewUrl} type={fileItem.file.type} />
          </video>
        )}
        {!isImage && !isVideo && (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            {fileItem.file.type.includes("image") ? (
              <FileImage className="h-12 w-12 text-gray-400" />
            ) : (
              <FileVideo className="h-12 w-12 text-gray-400" />
            )}
          </div>
        )}

        {/* Status overlay */}
        <AnimatePresence>
          {fileItem.status === "uploading" && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Progress value={fileItem.progress} className="w-2/3 mb-2" />
              <motion.p
                className="text-white text-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {fileItem.progress}%
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-60 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit className="h-4 w-4" />
          </motion.button>
          <motion.button
            type="button"
            onClick={onDelete}
            className="p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-60 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Type indicator */}
        <div className="absolute bottom-2 left-2 flex items-center px-2 py-1 rounded-full bg-black bg-opacity-50 text-white text-xs">
          {isImage && <FileImage className="h-3 w-3 mr-1" />}
          {isVideo && <FileVideo className="h-3 w-3 mr-1" />}
          <span>{fileItem.file.name.split(".").pop()}</span>
        </div>
      </motion.div>

      {/* Edit dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa hình ảnh</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <motion.div
              className="aspect-square bg-gray-100 rounded-md overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              {isImage && (
                <img
                  src={fileItem.previewUrl}
                  alt="Xem trước"
                  className="w-full h-full object-contain"
                />
              )}
              {isVideo && (
                <video className="w-full h-full object-contain" controls>
                  <source src={fileItem.previewUrl} type={fileItem.file.type} />
                </video>
              )}
            </motion.div>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground truncate">
                {fileItem.file.name}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
