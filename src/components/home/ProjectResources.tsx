"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  ExternalLink,
  FileText,
  Link2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ProjectResourcesProps {
  projectFile?: string;
  projectLink?: string;
}

export const ProjectResources: React.FC<ProjectResourcesProps> = ({
  projectFile,
  projectLink,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!projectFile && !projectLink) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.2,
          ease: "easeInOut",
        },
      },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.3,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.3,
          delay: 0.1,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <motion.div
      className="mt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative p-3 bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-indigo-50/80 rounded-xl border border-slate-200/40 shadow-sm backdrop-blur-sm">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
        <div className="absolute -top-0.5 -left-0.5 w-4 h-4 bg-gradient-to-br from-primary-70/15 to-transparent rounded-full blur-md"></div>
        <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-gradient-to-br from-indigo-400/10 to-transparent rounded-full blur-lg"></div>

        <div className="relative z-10">
          {/* Header - Always visible */}
          <motion.div
            className="flex items-center justify-between cursor-pointer group"
            variants={itemVariants}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-primary-70 to-primary-80 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-800 group-hover:text-primary-70 transition-colors duration-200">
                  Tài nguyên dự án
                </h4>
                <p className="text-xs text-slate-500">
                  {projectFile && projectLink ? "2 tài liệu" : "1 tài liệu"}
                </p>
              </div>
            </div>

            <motion.div
              className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100/80 group-hover:bg-primary-70 group-hover:text-white transition-all duration-200"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3 h-3" />
            </motion.div>
          </motion.div>

          {/* Expandable Content */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                className="overflow-hidden"
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
              >
                <div className="pt-3 space-y-2">
                  {projectFile && (
                    <motion.div variants={itemVariants} className="group">
                      <a
                        href={projectFile}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <motion.div
                          className="relative p-2.5 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/40 hover:border-primary-70/40 transition-all duration-200 group-hover:shadow-md group-hover:shadow-primary-70/5"
                          whileHover={{
                            scale: 1.005,
                            y: -1,
                          }}
                          whileTap={{ scale: 0.995 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        >
                          {/* Subtle shine effect */}
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:translate-x-full"></div>

                          <div className="relative flex items-center gap-3">
                            <motion.div
                              className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-primary-60 to-primary-80 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200"
                              whileHover={{ rotate: 3 }}
                            >
                              <Download className="w-3.5 h-3.5 text-white" />
                            </motion.div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h5 className="text-xs font-medium text-slate-900 group-hover:text-primary-70 transition-colors duration-200">
                                  Tải xuống file dự án
                                </h5>
                                <motion.div
                                  className="opacity-0 group-hover:opacity-100 transition-all duration-200"
                                  initial={{ scale: 0.8 }}
                                  whileHover={{ scale: 1 }}
                                >
                                  <div className="px-1.5 py-0.5 bg-primary-70 text-white text-[10px] rounded-full">
                                    Mới
                                  </div>
                                </motion.div>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                Nhấp để tải về máy tính
                              </p>
                            </div>

                            <motion.div
                              className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity duration-200"
                              whileHover={{ x: 2 }}
                            >
                              <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary-70 group-hover:text-white transition-all duration-200">
                                <Download className="w-2.5 h-2.5" />
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </a>
                    </motion.div>
                  )}

                  {projectLink && (
                    <motion.div variants={itemVariants} className="group">
                      <a
                        href={projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <motion.div
                          className="relative p-2.5 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/40 hover:border-emerald-400/40 transition-all duration-200 group-hover:shadow-md group-hover:shadow-emerald-400/5"
                          whileHover={{
                            scale: 1.005,
                            y: -1,
                          }}
                          whileTap={{ scale: 0.995 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        >
                          {/* Subtle shine effect */}
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:translate-x-full"></div>

                          <div className="relative flex items-center gap-3">
                            <motion.div
                              className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200"
                              whileHover={{ rotate: 3 }}
                            >
                              <Link2 className="w-3.5 h-3.5 text-white" />
                            </motion.div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h5 className="text-xs font-medium text-slate-900 group-hover:text-emerald-600 transition-colors duration-200">
                                  Liên kết dự án
                                </h5>
                                <motion.div
                                  className="opacity-0 group-hover:opacity-100 transition-all duration-200"
                                  initial={{ scale: 0.8 }}
                                  whileHover={{ scale: 1 }}
                                >
                                  <div className="px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] rounded-full">
                                    Live
                                  </div>
                                </motion.div>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                                {projectLink}
                              </p>
                            </div>

                            <motion.div
                              className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity duration-200"
                              whileHover={{ x: 2 }}
                            >
                              <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200">
                                <ExternalLink className="w-2.5 h-2.5" />
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </a>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
