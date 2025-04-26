import { useId } from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  className?: string;
  strokeWidth?: number;
  strokeColor?: string;
  lineSpacing?: number;
  [key: string]: any;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = 0,
  y = 0,
  className,
  strokeWidth = 0.5,
  strokeColor = "currentColor",
  lineSpacing = 2,
  ...props
}: GridPatternProps) {
  const id = useId();

  // Tính toán vị trí đường ngang và dọc để tăng khoảng cách
  const hLineY = height / 2; // Đường ngang ở giữa ô
  const vLineX = width / 2; // Đường dọc ở giữa ô

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full stroke-neutral-300/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width * lineSpacing}
          height={height * lineSpacing}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          {/* Đường ngang ở giữa */}
          <line
            x1="0"
            y1={hLineY}
            x2={width * lineSpacing}
            y2={hLineY}
            strokeWidth={strokeWidth}
            stroke={strokeColor}
          />
          {/* Đường dọc ở giữa */}
          <line
            x1={vLineX}
            y1="0"
            x2={vLineX}
            y2={height * lineSpacing}
            strokeWidth={strokeWidth}
            stroke={strokeColor}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default GridPattern; 