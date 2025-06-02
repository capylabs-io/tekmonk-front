"use client";
import React from "react";
import { Upload, FileImage, FileVideo } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadAreaProps {
  isDragging: boolean;
  onClick: () => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({
  isDragging,
  onClick,
}) => {
  return (
    <motion.div
      className={`
        border-2 border-dashed !border-gray-30 rounded-lg p-8 text-center cursor-pointer
        transition-all duration-200 ease-in-out
        ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-300/10 hover:border-primary-50"
        }
      `}
      onClick={onClick}
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
            {isDragging ? "Thả tệp vào đây" : "Tải lên tệp"}
          </h3>
          <p className="mb-2 text-sm text-gray-500">
            {isDragging ? "Thả để tải lên" : "Kéo và thả hoặc nhấp để duyệt"}
          </p>
          <motion.div
            className="flex items-center text-xs text-gray-400 gap-2"
            animate={{ opacity: isDragging ? 0.7 : 1 }}
          >
            <FileImage className="h-4 w-4" />
            <span>Hình ảnh</span>
            {/* <span className="mx-1">•</span>
            <FileVideo className="h-4 w-4" />
            <span>Video</span> */}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
