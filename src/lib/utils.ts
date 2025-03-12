import { PostVerificationType } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ConvertoStatusPostToText = (value: string) => {
  switch (value) {
    case PostVerificationType.PENDING:
      return 'Đợi duyệt'
    case PostVerificationType.DENIED:
      return 'Từ chối'
    case PostVerificationType.ACCEPTED:
      return 'Đã duyệt'
  }
}

const convertTimeToText = (value: string) => {
  switch (value) {
    case "year":
      return 'năm'
    case "month":
      return 'tháng'
    case "day":
      return 'ngày'
    case "week":
      return 'tuần'
    case "hour":
      return 'giờ'
    case "minute":
      return 'phút'
  }
}
export function timeAgo(timestamp: number): string {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${convertTimeToText(unit)}${interval > 1 && interval < 60 ? 'giây' : ''} trước`;
    }
  }

  return 'Bây giờ';
}