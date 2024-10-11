import classNames from "classnames";
import Image from "next/image";

type Props = {
  imgSrc: string;
  width: number;
  height: number;
  className?: string;
  onRemove: () => void; // Add this prop
};

export const ImgSubmitPreview = ({
  imgSrc,
  width,
  height,
  className,
  onRemove,
}: Props) => {
  const classes = classNames(["border rounded-md", className]);

  return (
    <div className="relative group">
      <Image
        src={imgSrc}
        alt="Preview Image"
        width={width}
        height={height}
        className={classes}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-x cursor-pointer absolute -top-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onRemove} // Add this onClick handler
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </svg>
    </div>
  );
};
