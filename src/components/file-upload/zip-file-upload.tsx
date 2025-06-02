"use client";
import React, { useState, useRef } from "react";
import { X, FileArchive, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnackbarStore } from "@/store/SnackbarStore";

interface ZipFileUploadProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  error?: string;
  className?: string;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ACCEPTED_FILE_TYPES = ["application/zip", "application/x-zip-compressed"];

export const ZipFileUpload: React.FC<ZipFileUploadProps> = ({
  value,
  onChange,
  error,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showError] = useSnackbarStore((state) => [state.error]);

  const validateFile = (file: File): { valid: boolean; message?: string } => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return {
        valid: false,
        message: "Chỉ chấp nhận tệp ZIP",
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        message: "Kích thước tệp vượt quá giới hạn 100MB",
      };
    }

    return { valid: true };
  };

  const handleFile = (file: File) => {
    const validation = validateFile(file);

    if (!validation.valid) {
      showError("Lỗi", validation.message || "Lỗi tải lên tệp");
      return;
    }

    onChange?.(file);
  };

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
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={`w-full ${className}`}>
      {value ? (
        <motion.div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileArchive className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                  {value.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(value.size)}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-1 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
            >
              <X size={16} className="text-red-600" />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-all duration-200 ease-in-out
            ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-primary-50"
            }
          `}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          whileTap={{ scale: 0.98 }}
          whileHover={!isDragging ? { scale: 1.01 } : {}}
          animate={{
            borderColor: isDragging ? "var(--primary)" : "var(--border)",
            backgroundColor: isDragging
              ? "rgba(var(--primary), 0.05)"
              : "transparent",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDragging ? "dragging" : "idle"}
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="mb-3 p-3 rounded-full bg-primary/10"
                animate={{
                  scale: isDragging ? [1, 1.1, 1] : 1,
                  rotate: isDragging ? [0, 5, -5, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  repeat: isDragging ? Infinity : 0,
                  repeatType: "reverse",
                }}
              >
                <Upload className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="mb-1 font-medium text-gray-900">
                {isDragging ? "Thả tệp ZIP vào đây" : "Tải lên tệp ZIP"}
              </h3>
              <p className="mb-2 text-sm text-gray-500">
                {isDragging
                  ? "Thả để tải lên"
                  : "Kéo và thả hoặc nhấp để duyệt"}
              </p>
              <div className="flex items-center text-xs text-gray-400 gap-2">
                <FileArchive className="h-4 w-4" />
                <span>Tệp ZIP (tối đa 100MB)</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".zip,application/zip,application/x-zip-compressed"
        onChange={handleInputChange}
        className="hidden"
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
