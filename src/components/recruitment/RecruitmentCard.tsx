import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  imageUrl: string;
  title: string;
  metadata: any;
  id?: number;
};
export const RecruitmentCard = ({ imageUrl, title, metadata, id }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    id && router.push(`recruitment/${id}`);
  };

  return (
    <div className="w-[337px] cursor-pointer" onClick={handleClick}>
      <Image
        src={imageUrl}
        alt="new pic"
        width={337}
        height={100}
        className="rounded-xl"
      />
      <div className="w-full mt-2 text-base">{title}</div>
      <div className="w-full mt-2 text-base text-primary-900">
        {metadata && metadata.salary}
      </div>
      <div className="flex flex-wrap gap-x-2 items-center mt-2">
        {metadata &&
          metadata.tags &&
          metadata.tags.map((tag: string, index: number) => (
            <div
              key={index}
              className="px-2 py-1 bg-gray-200 text-xs text-gray-500 rounded-md"
            >
              {tag}
            </div>
          ))}
      </div>
    </div>
  );
};
