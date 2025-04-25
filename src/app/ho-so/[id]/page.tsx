"use client";
import { Button } from "@/components/common/button/Button";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { Post } from "@/components/home/Post";
import { AchievementProfile } from "@/components/profile/achievement-profile";
import { CertificateProfile } from "@/components/profile/certificate-proifile";
import { MissionProgress } from "@/components/profile/mission-progress";
import { UserStat } from "@/components/profile/UserStat";
import { useGetUserQuery } from "@/hooks/use-user-query";
import { getListPostCustom } from "@/requests/post";
import { useUserAvatarStore } from "@/store/UserAvatarStore";
import { useUserStore } from "@/store/UserStore";
import { PostType } from "@/types/posts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "lodash";
import { Settings } from "lucide-react";
import moment from "moment";
import { useParams } from "next/navigation";
import qs from "qs";
import { useState } from "react";
import { Achievement } from "@/types/common-types";
import { Mission } from "@/types/common-types";

export default function Profile() {
  const { id } = useParams();
  const router = useCustomRouter();
  const [show, hide] = useUserAvatarStore((state) => [state.show, state.hide]);
  const { data: guestInfor } = useGetUserQuery(id as string);
  const [userInfo] = useUserStore((state) => [state.userInfo]);

  const queryClient = useQueryClient();
  const [dataMission, setDataMission] = useState<Mission[] | Achievement[]>([]);

  const { data: myPosts } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["custom-posts"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify(
          {
            page: 1,
            limit: 100,
            sort: "desc",
            authorId: guestInfor?.id,
          },
          { encodeValuesOnly: true }
        );
        return await getListPostCustom(queryString);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    enabled: !!guestInfor?.id,
  });

  const showAvatarModal = () => {
    show();
  };

  return (
    <div className="w-full">
      <div className="text-SubheadLg text-gray-95 px-4">Hồ sơ cá nhân</div>
      <div className="w-full flex justify-center bg-[url('/image/profile/profile-banner.png')] bg-no-repeat bg-cover h-[220px] relative mt-4">
        <div className="border-[5px] border-white p-3 rounded-full flex flex-col bg-[#FEF0C7] bg-[url('/image/profile/avatar-x2.png')] items-center justify-center absolute left-8 -bottom-8 h-[152px] w-[152px]" />
      </div>
      <div className="flex w-full justify-between mt-14 px-6">
        <div>
          <div className="truncate flex gap-x-2 items-center">
            <span className="text-xl font-bold text-primary-950">
              {guestInfor?.username}
            </span>
            <span
              className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
            >
              {get(guestInfor, "userRank")}
            </span>
          </div>
          <div className="text-base text-primary-950">
            {get(guestInfor, "specialName")}
          </div>
        </div>
        <div className="flex gap-x-2">
          {/* <Button outlined className="text-primary-900 text-sm border">
            Hồ sơ
          </Button> */}
          {userInfo && userInfo.id === guestInfor?.id && (
            <Button
              outlined
              className="border border-primary-60 !bg-primary-10 rounded-lg !p-3"
              onClick={showAvatarModal}
            >
              <Settings size={24} className="text-primary-600" />
            </Button>
          )}
        </div>
      </div>
      <Tabs defaultValue="personal" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="personal">Cá nhân</TabsTrigger>
          <TabsTrigger value="project">Dự án</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="overflow-y-auto w-full">
          <div className="px-6 mt-3">
            <div className="text-primary-900">THÔNG SỐ CHUNG</div>
            <UserStat id={guestInfor?.id} />
          </div>
          <hr className="border-t border-gray-200 my-4" />
          <MissionProgress id={guestInfor?.id} />
          <hr className="border-t border-gray-200 my-4" />
          <AchievementProfile id={guestInfor?.id} />
          <hr className="border-t border-gray-200 my-4" />
          <CertificateProfile id={guestInfor?.id} />
          {/* <div className="px-6 mt-3">
            <div className="text-primary-900">KĨ NĂNG</div>
            <div className="mt-7 leading-1">
              <p className="text-gray-700 text-xs">LỰC CHIẾN</p>
              <p
                className={`${delaGothicOne.className} text-primary-700 text-[40px]`}
              >
                67
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="Mike"
                  dataKey="A"
                  stroke="#E4E7EC"
                  fill="#DC58C8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div> */}
        </TabsContent>
        <TabsContent value="project" className="overflow-y-auto">
          {myPosts &&
            myPosts.data.map((item: PostType, index: number) => (
              <>
                <div className="px-8 relative">
                  <div className="text-sm text-gray-500 absolute top-2 right-8">
                    {moment(get(item, "createdAt", ""))
                      .format("DD/MM/YYYY")
                      .toString()}
                  </div>
                  <Post
                    isAllowClickDetail
                    data={item}
                    imageUrl="bg-[url('/image/home/profile-pic.png')]"
                    thumbnailUrl={get(item, "thumbnail") || ""}
                    userName={guestInfor?.username || "User"}
                    specialName={get(item, "postedBy.skills", "")}
                    userRank={
                      <span
                        className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
                      >
                        IV
                      </span>
                    }
                    postContent={get(item, "content", "")}
                    postName={get(item, "name", "")}
                    createdAt={moment(get(item, "createdAt", ""))
                      .format("DD/MM/YYYY")
                      .toString()}
                    likedCount={get(item, "likeCount", 0).toString() || "0"}
                    commentCount={
                      get(item, "commentCount", 0).toString() || "0"
                    }
                  />
                </div>
                {index !== myPosts.data.length - 1 && (
                  <hr className="border-t border-gray-200 my-4" />
                )}
              </>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
