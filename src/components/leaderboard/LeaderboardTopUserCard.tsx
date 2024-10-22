import React from "react";
import Image from "next/image";
import classNames from "classnames";

type Props = {
  rank: "first" | "second" | "third";
  imageUrl: string;
  name: string;
  specialName: string;
  score: string;
};

export const LeaderboardTopUserCard = ({
  rank,
  imageUrl,
  name,
  specialName,
  score,
}: Props) => {
  const CARD_DIMENSION = (value: string) => {
    switch (value) {
      case "first":
        return "w-[214px]";
      case "second":
        return "w-[180px]";
      case "third":
        return "w-[180px]";
      default:
        return;
    }
  };
  const BACKGROUND = (value: string) => {
    switch (value) {
      case "first":
        return "bg-[url('/image/leaderboard/gold-smoke.png')] h-[203px]";
      case "second":
        return "bg-[url('/image/leaderboard/silver-smoke.png')] h-[160px]";
      case "third":
        return "bg-[url('/image/leaderboard/bronze-smoke.png')] h-[160px]";
      default:
        return;
    }
  };
  const MEDAL = (value: string) => {
    switch (value) {
      case "first":
        return "/image/leaderboard/gold-medal.png";
      case "second":
        return "/image/leaderboard/silver-medal.png";
      case "third":
        return "/image/leaderboard/bronze-medal.png";
      default:
        return;
    }
  };
  const IMAGE = (value: string) => {
    switch (value) {
      case "first":
        return "border-[#E8EB70] h-[164px] w-[164px]";
      case "second":
        return "border-[#E8E6EF] h-[120px] w-[120px]";
      case "third":
        return "border-[#FFB361]  h-[120px] w-[120px]";
      default:
        return;
    }
  };
  const backgroundCard = BACKGROUND(rank);
  const dimesion = CARD_DIMENSION(rank);
  const cardMedal = MEDAL(rank);
  const userImage = IMAGE(rank);
  return (
    <div className={classNames("flex flex-col", dimesion)}>
      <div
        className={classNames(
          "bg-no-repeat bg-cover bg-center relative flex justify-center items-center",
          backgroundCard
        )}
      >
        <div
          className={classNames(
            "rounded-full justify-center bg-no-repeat bg-cover border-[5px]",
            !!imageUrl && imageUrl,
            userImage
          )}
        />
        <Image
          src={cardMedal || ""}
          alt="medal pic"
          width={rank === "first" ? 40 : 36}
          height={rank === "first" ? 44 : 36}
          className="absolute bottom-0"
        />
      </div>
      <div className="flex flex-col gap-y-1 text-white items-center mt-1">
        <div className="flex gap-x-2 items-center">
          <div className="h-4 w-4">
            <Image
              src="/image/gem/diamond-gem.png"
              alt="gem pic"
              width={16}
              height={16}
            />
          </div>
          <div className="text-SubheadSm !font-medium">{name}</div>
        </div>
        <div
          className={classNames(
            "text-SubheadXl",
            rank === "first" ? "text-[#FCD53F]" : "text-white"
          )}
        >
          {score}
        </div>
        <div className="text-SubheadXXs !font-medium">{specialName}</div>
      </div>
    </div>
  );
};
