import { AvatarConfig } from "@/types/common-types";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  avatarConfig?: AvatarConfig;
  customClassName?: string;
};
export const AvatarLayer = ({ avatarConfig, customClassName }: Props) => {
  return (
    <div
      className={cn(
        "border-2 border-gray-30 bg-[rgb(245,245,245)] relative overflow-hidden",
        customClassName
      )}
    >
      {avatarConfig?.frontHair && (
        <Image
          src={avatarConfig?.frontHair?.image || ""}
          alt={avatarConfig?.frontHair?.name || ""}
          fill
          className={cn("object-cover absolute z-[4]")}
        />
      )}
      {avatarConfig?.backHair && (
        <Image
          src={avatarConfig?.backHair?.image || ""}
          alt={avatarConfig?.backHair?.name || ""}
          fill
          className={cn("object-cover absolute z-[2]")}
        />
      )}
      {avatarConfig?.cloth && (
        <Image
          src={avatarConfig?.cloth?.image || ""}
          alt={avatarConfig?.cloth?.name || ""}
          fill
          className={cn("object-cover absolute z-[3]")}
        />
      )}
      {avatarConfig?.mouth && (
        <Image
          src={avatarConfig?.mouth?.image || ""}
          alt={avatarConfig?.mouth?.name || ""}
          fill
          className={cn("object-cover absolute z-[4]")}
        />
      )}
      {avatarConfig?.eye && (
        <Image
          src={avatarConfig?.eye?.image || ""}
          alt={avatarConfig?.eye?.name || ""}
          fill
          className={cn("object-cover absolute z-[3]")}
        />
      )}
      {avatarConfig?.theme && (
        <Image
          src={avatarConfig?.theme?.image || ""}
          alt={avatarConfig?.theme?.name || ""}
          fill
          className={cn("object-cover absolute z-[1]")}
        />
      )}
      {avatarConfig?.special && (
        <Image
          src={avatarConfig?.special?.image || ""}
          alt={avatarConfig?.special?.name || ""}
          fill
          className={cn("object-cover absolute z-[5]")}
        />
      )}
    </div>
  );
};
