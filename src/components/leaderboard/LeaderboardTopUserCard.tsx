import React from "react";
import Image from "next/image";
import classNames from "classnames";
import { AvatarLayer } from "../avatar/AvatarLayer";
import { AvatarConfig, User } from "@/types/common-types";
import { TabIcon } from "./TabIcons";
import { UserRankingType } from "@/types/users";
import { useCustomRouter } from "../common/router/CustomRouter";

type Props = {
  rank: number;
  imageUrl: string;
  name: string;
  specialName: string;
  score: string;
  customClassNames?: string;
  user?: User;
  avatarConfig?: AvatarConfig;
  rankingType: UserRankingType;
};

export const LeaderboardTopUserCard = ({
  rank,
  imageUrl,
  name,
  specialName,
  score,
  customClassNames,
  avatarConfig,
  rankingType,
  user,
}: Props) => {
  const router = useCustomRouter();
  const BACKGROUND = (value: number) => {
    switch (value) {
      case 1:
        return "/image/leaderboard/gold-background.png";
      case 2:
        return "/image/leaderboard/silver-background.png";
      case 3:
        return "/image/leaderboard/bronze-background.png";
      default:
        return;
    }
  };
  const CARD_ASSETS = (value: number) => {
    switch (value) {
      case 1:
        return "bg-[#F9FFCA] border-[#F2E370]";
      case 2:
        return "bg-gray-10 border-gray-30";
      case 3:
        return "bg-[#FFEAD9] border-[#EE9F48]";
      default:
        return;
    }
  };
  const IMAGE = (value: number) => {
    switch (value) {
      case 1:
        return "!border-[#F2E370] h-[80px] w-[80px]";
      case 2:
        return "!border-gray-10 h-[80px] w-[80px]";
      case 3:
        return "!border-[#EE9F48] h-[80px] w-[80px]";
      default:
        return;
    }
  };
  const BOX_SHADOW = (value: number) => {
    switch (value) {
      case 1:
        return "0px 8px 0px #DAC20F";
      case 2:
        return "0px 8px 0px #AC9FB1";
      case 3:
        return "0px 8px 0px #D67A17";
      default:
        return;
    }
  };
  const CARD_SHADOW = (value: number) => {
    switch (value) {
      case 1:
        return "shadow-[0px_6px_0px_#DAC20F] before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0px_4px_0px_#DAC20F]";
      case 2:
        return "shadow-[0px_6px_0px_#AC9FB1] before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0px_4px_0px_#AC9FB1]";
      case 3:
        ``;
        return "shadow-[0px_6px_0px_#D67A17] before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0px_4px_0px_#D67A17]";
      default:
        return;
    }
  };
  const userImage = IMAGE(rank);
  const backgroundImage = BACKGROUND(rank);
  const cardAssets = CARD_ASSETS(rank);
  const boxShadow = BOX_SHADOW(rank);
  const cardShadow = CARD_SHADOW(rank);
  // const cardMedal = MEDAL(rank);
  return (
    <div className={classNames("flex flex-col w-[200px]", customClassNames)}>
      <div
        style={{
          boxShadow: boxShadow,
        }}
        className={classNames(
          "border-2 relative flex flex-col justify-center items-center rounded-2xl",
          cardAssets
        )}
      >
        <Image
          src={backgroundImage || ""}
          alt="avatar pic"
          width={200}
          height={116}
          className="rounded-t-xl !h-[116px]"
        />
        {avatarConfig ? (
          <AvatarLayer
            avatarConfig={avatarConfig}
            customClassName={classNames(
              "rounded-full justify-center bg-no-repeat bg-cover !border-[5px] !absolute mb-16",
              userImage,
              cardShadow
            )}
          />
        ) : (
          <div
            className={classNames(
              "rounded-full justify-center bg-no-repeat bg-cover border-[5px] absolute mb-16 bg-white",
              !!imageUrl && imageUrl,
              userImage,
              cardShadow
            )}
          ></div>
        )}
        <div className="flex flex-col justify-center items-center w-full h-[100%-100px] p-4">
          <div
            className="text-gray-95 text-[15px] text-center line-clamp-2 !leading-4 cursor-pointer hover:underline"
            onClick={() => {
              user && router.push(`/ho-so/${user?.id}`);
            }}
          >
            {name}
          </div>
          <div className="text-gray-50 text-BodyXs text-center mt-1">
            {specialName}
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-95 text-HeadingMd">
            <TabIcon type={rankingType} />
            <span>{score}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
