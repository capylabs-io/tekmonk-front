"use client";
import React from "react";
import { FileItem } from "./file-upload";
import { Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
interface ImageGridProps {
  files: FileItem[];
  onDelete: (id: string) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ files, onDelete }) => {
  // Determine the grid layout based on number of files
  const getGridLayout = () => {
    switch (files.length) {
      case 0:
        return "";
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-2 md:grid-cols-4";
      case 4:
        return "grid-cols-2 md:grid-cols-3";
      default:
        return "grid-cols-2 md:grid-cols-4";
    }
  };

  // Generate specific class for each item based on its position
  const getItemClass = (index: number) => {
    if (files.length === 1) {
      return "col-span-1";
    } else if (files.length === 2) {
      return "col-span-1";
    } else if (files.length === 3) {
      return index === 0
        ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
        : "col-span-1 md:col-span-1";
    } else if (files.length === 4) {
      return index === 0
        ? "col-span-2 row-span-2 md:col-span-1 md:row-span-2"
        : "col-span-1";
    } else {
      return index === 0
        ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
        : "col-span-1";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };

  // Display only first 5 items in grid, with counter on the last one if more
  const displayFiles = files.length > 5 ? files.slice(0, 5) : files;
  const remainingCount = files.length - 5;

  return (
    <motion.div
      className={`grid gap-2 ${getGridLayout()}`}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {displayFiles.map((fileItem, index) => {
        const isImage = fileItem.file.type.startsWith("image/");
        const isVideo = fileItem.file.type.startsWith("video/");
        const isLastWithMore = index === 4 && remainingCount > 0;

        return (
          <motion.div
            key={fileItem.id}
            className={`relative rounded-lg overflow-hidden aspect-square ${getItemClass(
              index
            )}`}
            variants={itemVariants}
          >
            {/* File Preview */}
            {isImage && (
              <Image
                src={fileItem.previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                width={64}
                height={64}
              />
            )}
            {isVideo && (
              <video className="w-full h-full object-cover" controls={false}>
                <source src={fileItem.previewUrl} type={fileItem.file.type} />
              </video>
            )}

            {/* Uploading Overlay */}
            {fileItem.status === "uploading" && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <Progress value={fileItem.progress} className="w-2/3 mb-2" />
                <p className="text-white text-sm">{fileItem.progress}%</p>
              </div>
            )}

            {/* Remaining Count Overlay */}
            {isLastWithMore && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                <div className="text-white text-2xl font-bold flex items-center">
                  <Plus className="h-6 w-6 mr-1" />
                  {remainingCount}
                </div>
              </div>
            )}

            {/* Delete Button - only shown on hover and not for the "more" overlay */}
            {!isLastWithMore && (
              <button
                onClick={() => onDelete(fileItem.id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white opacity-0 hover:bg-black/80 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
