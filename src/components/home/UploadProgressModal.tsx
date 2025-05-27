"use client";

import { X, CheckCircle, AlertCircle, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useRef } from "react";

export interface UploadProgressItem {
  id: string;
  name: string;
  status: "pending" | "uploading" | "completed" | "error";
  progress: number;
  error?: string;
}

interface UploadProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: UploadProgressItem[];
  title?: string;
}

const StatusIcon = ({ status }: { status: UploadProgressItem["status"] }) => {
  const iconProps = { className: "h-5 w-5" };

  switch (status) {
    case "completed":
      return <CheckCircle {...iconProps} className="h-5 w-5 text-green-500" />;
    case "error":
      return <AlertCircle {...iconProps} className="h-5 w-5 text-red-500" />;
    default:
      return <Upload {...iconProps} className="h-5 w-5 text-blue-500" />;
  }
};

const StatusText = ({ status }: { status: UploadProgressItem["status"] }) => {
  const statusMap = {
    pending: "Đang chờ",
    uploading: "Đang tải lên",
    completed: "Hoàn thành",
    error: "Lỗi",
  };

  return <p className="text-xs text-gray-500">{statusMap[status]}</p>;
};

const StatusBadge = ({ status }: { status: UploadProgressItem["status"] }) => {
  const badgeMap = {
    uploading: null,
    completed: <span className="text-xs text-green-600">✓</span>,
    error: <span className="text-xs text-red-600">✗</span>,
    pending: null,
  };

  return <div className="text-right">{badgeMap[status]}</div>;
};

export const UploadProgressModal: React.FC<UploadProgressModalProps> = ({
  isOpen,
  onClose,
  items,
  title = "Đang tải lên tệp",
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const completedCount = items.filter(
    (item) => item.status === "completed"
  ).length;
  const errorCount = items.filter((item) => item.status === "error").length;
  const totalCount = items.length;
  const isAllCompleted = completedCount + errorCount === totalCount;

  // Find the currently uploading item
  const uploadingItem = items.find((item) => item.status === "uploading");

  // Auto scroll to the uploading item
  useEffect(() => {
    if (
      !isOpen ||
      !uploadingItem ||
      !itemRefs.current[uploadingItem.id] ||
      !scrollContainerRef.current
    ) {
      return;
    }

    const itemElement = itemRefs.current[uploadingItem.id];
    const containerElement = scrollContainerRef.current;

    if (itemElement) {
      const itemTop = itemElement.offsetTop;
      const itemHeight = itemElement.offsetHeight;
      const containerHeight = containerElement.clientHeight;

      // Calculate the desired scroll position to center the item
      const desiredScrollTop = itemTop - containerHeight / 2 + itemHeight / 2;

      // Smooth scroll to the item
      containerElement.scrollTo({
        top: Math.max(0, desiredScrollTop),
        behavior: "smooth",
      });
    }
  }, [isOpen, uploadingItem?.id]);

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 z-[60] flex h-full w-full items-center justify-center bg-black/60">
      <div className="relative mx-auto w-[500px] max-h-[70%] rounded-3xl bg-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">
              {completedCount}/{totalCount} tệp đã hoàn thành
              {errorCount > 0 && ` • ${errorCount} lỗi`}
            </p>
          </div>
          {isAllCompleted && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          )}
        </div>

        {/* Progress Items */}
        <div ref={scrollContainerRef} className="max-h-96 overflow-y-auto p-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                className={`border rounded-lg p-4 transition-all duration-300 ${item.status === "uploading"
                  ? "border-blue-300 bg-blue-50 shadow-md"
                  : "border-gray-200"
                  }`}
              >
                <div className="flex items-center justify-between mb-2 overflow-hidden px-2">
                  <div className="flex items-center space-x-3">
                    <StatusIcon status={item.status} />
                    <div className="w-full flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <StatusText status={item.status} />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.status === "uploading" && (
                      <span className="text-xs text-gray-500">
                        {item.progress}%
                      </span>
                    )}
                    <StatusBadge status={item.status} />
                  </div>
                </div>

                {item.status === "uploading" && (
                  <Progress value={item.progress} className="h-2" />
                )}

                {item.status === "error" && item.error && (
                  <p className="text-xs text-red-600 mt-2">{item.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        {isAllCompleted && (
          <div className="p-6 border-t ">
            <div className="flex items-center space-x-2">
              {errorCount === 0 ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-700">
                    Tất cả tệp đã được tải lên thành công!
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-700">
                    Hoàn thành với {errorCount} lỗi
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
