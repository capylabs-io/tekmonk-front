"use client";
import { ReactNode, useMemo, useState } from "react";
import classNames from "classnames";
import { ROUTE } from "@/contants/router";
import { useCustomRouter } from "../common/router/CustomRouter";
import { User } from "@/types/common-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ReqGetAvatarConfig } from "@/requests/avatar-config";
import qs from "qs";
import { cn } from "@/lib/utils";
type Props = {
  userId: number;
  imageUrl: string;
  userName: string;
  userRank?: ReactNode;
  specialName?: string;
  onClick?: () => void;
  taggedUsers?: User[];
};
export const ProfileInfoBox = ({
  userId,
  imageUrl,
  userName,
  userRank,
  specialName,
  onClick,
  taggedUsers,
}: Props) => {
  const router = useCustomRouter();
  const [taggedUsersDialogOpen, setTaggedUsersDialogOpen] = useState(false);
  const taggedList = useMemo(() => {
    return taggedUsers?.filter(
      (user) => user.id.toString() !== userId.toString()
    );
  }, [taggedUsers, userId]);
  const { data: dataAvatarConfig, refetch: refetchAvatarConfig } = useQuery({
    queryKey: ["avatar-config", userId],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: [
          "frontHair",
          "backHair",
          "cloth",
          "mouth",
          "eye",
          "theme",
          "special",
        ],
        filters: {
          user: {
            id: {
              $eq: Number(userId),
            },
          },
        },
      });
      const res = await ReqGetAvatarConfig(queryString);
      return res.data;
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
  return (
    <div
      className="flex items-center gap-x-2 justify-center hover:cursor-pointer"
      onClick={onClick}
    >
      {/* <div className="h-10 w-10 rounded-full flex flex-col bg-yellow-100 items-center justify-center">
        <Image
          src={imageUrl}
          alt="profile pic"
          width={32}
          height={32}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div> */}
      {dataAvatarConfig && dataAvatarConfig.length > 0 ? (
        <div
          className="border-[5px] border-white bg-white rounded-full w-10 h-10 relative overflow-hidden"
          style={{}}
        >
          {dataAvatarConfig[0]?.frontHair && (
            <Image
              src={dataAvatarConfig[0]?.frontHair?.image || ""}
              alt={dataAvatarConfig[0]?.frontHair?.name || ""}
              fill
              className={cn("object-cover absolute z-[4]")}
            />
          )}
          {dataAvatarConfig[0]?.backHair && (
            <Image
              src={dataAvatarConfig[0]?.backHair?.image || ""}
              alt={dataAvatarConfig[0]?.backHair?.name || ""}
              fill
              className={cn("object-cover absolute z-[2]")}
            />
          )}
          {dataAvatarConfig[0]?.cloth && (
            <Image
              src={dataAvatarConfig[0]?.cloth?.image || ""}
              alt={dataAvatarConfig[0]?.cloth?.name || ""}
              fill
              className={cn("object-cover absolute z-[3]")}
            />
          )}
          {dataAvatarConfig[0]?.mouth && (
            <Image
              src={dataAvatarConfig[0]?.mouth?.image || ""}
              alt={dataAvatarConfig[0]?.mouth?.name || ""}
              fill
              className={cn("object-cover absolute z-[4]")}
            />
          )}
          {dataAvatarConfig[0]?.eye && (
            <Image
              src={dataAvatarConfig[0]?.eye?.image || ""}
              alt={dataAvatarConfig[0]?.eye?.name || ""}
              fill
              className={cn("object-cover absolute z-[3]")}
            />
          )}
          {dataAvatarConfig[0]?.theme && (
            <Image
              src={dataAvatarConfig[0]?.theme?.image || ""}
              alt={dataAvatarConfig[0]?.theme?.name || ""}
              fill
              className={cn("object-cover absolute z-[1]")}
            />
          )}
          {dataAvatarConfig[0]?.special && (
            <Image
              src={dataAvatarConfig[0]?.special?.image || ""}
              alt={dataAvatarConfig[0]?.special?.name || ""}
              fill
              className={cn("object-cover absolute z-[5]")}
            />
          )}
        </div>
      ) : (
        <div
          className={classNames(
            "h-10 w-10 rounded-full flex flex-col bg-yellow-100 items-center justify-center",
            imageUrl && imageUrl
          )}
        />
      )}

      <div>
        <div className="truncate flex gap-x-2 items-center hover:underline hover:text-primary-70">
          <span className="text-base font-bold">{userName}</span>
          {taggedList && taggedList?.length > 0 && (
            <div className="flex items-center gap-1">
              cùng với
              <div
                className="text-primary-70 hover:text-primary-80 font-medium hover:underline"
                onClick={() =>
                  router.push(`${ROUTE.PROFILE}/${taggedList[0]?.id}`)
                }
              >
                {taggedList[0]?.username}
              </div>
              {taggedList.length > 1 && (
                <>
                  và{" "}
                  <div
                    className="text-primary-70 hover:text-primary-80 font-medium hover:underline"
                    onClick={() => setTaggedUsersDialogOpen(true)}
                  >
                    {taggedList.length - 1} người khác.
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500 inline-flex gap-1 items-center">
          {userRank} {specialName ? specialName : "Thường dân"}
        </div>
      </div>
      <Dialog
        open={taggedUsersDialogOpen}
        onOpenChange={setTaggedUsersDialogOpen}
      >
        <DialogContent className="w-[680px] bg-white">
          <DialogHeader className="px-4">
            <DialogTitle className="text-HeadingSm font-semibold text-gray-95">
              Người dùng được tag
            </DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <div className="max-h-[400px] overflow-y-auto">
              {taggedUsers &&
                taggedUsers.slice(1).map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 py-2 border-b border-gray-200 last:border-0"
                  >
                    {dataAvatarConfig && dataAvatarConfig.length > 0 ? (
                      <div
                        className="border-[5px] border-white bg-white rounded-full w-10 h-10 relative overflow-hidden"
                        style={{}}
                      >
                        {dataAvatarConfig[0]?.frontHair && (
                          <Image
                            src={dataAvatarConfig[0]?.frontHair?.image || ""}
                            alt={dataAvatarConfig[0]?.frontHair?.name || ""}
                            fill
                            className={cn("object-cover absolute z-[4]")}
                          />
                        )}
                        {dataAvatarConfig[0]?.backHair && (
                          <Image
                            src={dataAvatarConfig[0]?.backHair?.image || ""}
                            alt={dataAvatarConfig[0]?.backHair?.name || ""}
                            fill
                            className={cn("object-cover absolute z-[2]")}
                          />
                        )}
                        {dataAvatarConfig[0]?.cloth && (
                          <Image
                            src={dataAvatarConfig[0]?.cloth?.image || ""}
                            alt={dataAvatarConfig[0]?.cloth?.name || ""}
                            fill
                            className={cn("object-cover absolute z-[3]")}
                          />
                        )}
                        {dataAvatarConfig[0]?.mouth && (
                          <Image
                            src={dataAvatarConfig[0]?.mouth?.image || ""}
                            alt={dataAvatarConfig[0]?.mouth?.name || ""}
                            fill
                            className={cn("object-cover absolute z-[4]")}
                          />
                        )}
                        {dataAvatarConfig[0]?.eye && (
                          <Image
                            src={dataAvatarConfig[0]?.eye?.image || ""}
                            alt={dataAvatarConfig[0]?.eye?.name || ""}
                            fill
                            className={cn("object-cover absolute z-[3]")}
                          />
                        )}
                        {dataAvatarConfig[0]?.theme && (
                          <Image
                            src={dataAvatarConfig[0]?.theme?.image || ""}
                            alt={dataAvatarConfig[0]?.theme?.name || ""}
                            fill
                            className={cn("object-cover absolute z-[1]")}
                          />
                        )}
                        {dataAvatarConfig[0]?.special && (
                          <Image
                            src={dataAvatarConfig[0]?.special?.image || ""}
                            alt={dataAvatarConfig[0]?.special?.name || ""}
                            fill
                            className={cn("object-cover absolute z-[5]")}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={"/image/home/profile-pic.png"}
                          alt={user.username || "User"}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p
                        className="font-medium text-gray-800 hover:text-primary-70 hover:underline cursor-pointer"
                        onClick={() => {
                          router.push(`/ho-so/${user.id}`);
                          setTaggedUsersDialogOpen(false);
                        }}
                      >
                        {user.username}
                      </p>
                      <p className="text-xs text-gray-500">{user.username}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={() => setTaggedUsersDialogOpen(false)}
                className="bg-primary-70 hover:bg-primary-80 text-white"
              >
                Đóng
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
