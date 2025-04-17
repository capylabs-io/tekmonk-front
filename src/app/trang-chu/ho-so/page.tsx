"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@/store/UserStore";
import { Button } from "@/components/common/button/Button";
import { Settings } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { UserStat } from "@/components/profile/UserStat";
import { Post } from "@/components/home/Post";
import { get } from "lodash";
import { useUserAvatarStore } from "@/store/UserAvatarStore";
import { MissionProgress } from "@/components/profile/mission-progress";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import { AchievementProfile } from "@/components/profile/achievement-profile";
import { CertificateProfile } from "@/components/profile/certificate-proifile";
import { useQuery } from "@tanstack/react-query";
import { getListPostCustom } from "@/requests/post";
import qs from "qs";

const Profile: React.FC = () => {
  const router = useCustomRouter();
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const [showAvatarModal] = useUserAvatarStore((state) => [state.show]);
  const getMe = useUserStore((state) => state.getMe);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMe();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  // TODO: DATA of my posts
  const { data: myPosts, refetch: refetchListPostCustom } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["custom-posts"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify(
          {
            page: 1,
            limit: 100,
            sort: "desc",
            authorId: userInfo?.id,
          },
          { encodeValuesOnly: true }
        );
        return await getListPostCustom(queryString);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    enabled: !!userInfo?.id,
  });
  return (
    <>
      <div className="text-xl text-primary-900 px-8">Hồ sơ cá nhân</div>
      <div className="w-full flex justify-center bg-[url('/image/profile/profile-banner.png')] bg-no-repeat bg-cover h-[220px] relative mt-4">
        <div className="border-[5px] border-white p-3 rounded-full flex flex-col bg-[#FEF0C7] bg-[url('/image/profile/avatar-x2.png')] items-center justify-center absolute left-8 -bottom-8 h-[152px] w-[152px]" />
      </div>
      <div className="flex w-full justify-between mt-14 px-6">
        <div>
          <div className="truncate flex gap-x-2 items-center">
            <span className="text-xl font-bold text-primary-950">
              {userInfo?.username}
            </span>
            <span
              className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
            >
              {get(userInfo, "userRank")}
            </span>
          </div>
          <div className="text-base text-primary-950">
            {get(userInfo, "specialName")}
          </div>
        </div>
        <div className="flex gap-x-2">
          <Button outlined className="text-primary-900 text-sm border">
            Hồ sơ
          </Button>
          <Button
            outlined
            className="border border-primary-60 !bg-primary-10 rounded-lg !p-3"
            onClick={showAvatarModal}
          >
            <Settings size={24} className="text-primary-600" />
          </Button>
        </div>
      </div>
      <Tabs defaultValue="personal" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="personal">Cá nhân</TabsTrigger>
          <TabsTrigger value="project">Dự án</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="overflow-y-auto">
          <div className="px-6 mt-3">
            <div className="text-primary-900">THÔNG SỐ CHUNG</div>
            <UserStat />
          </div>
          <hr className="border-t border-gray-200 my-4" />
          <div className="px-6 mt-3">
            <div className="flex w-full justify-between items-center text-SubheadSm text-primary-950">
              <div className="text-gray-95 text-SubheadLg">Nhiệm vụ</div>
              <div
                className="cursor-pointer"
                onClick={() => router.push(ROUTE.MISSION)}
              >
                Xem thêm
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <MissionProgress />
            </div>
          </div>
          <hr className="border-t border-gray-200 my-4" />
          <div className="px-6 mt-3 mb-8">
            <div className="flex w-full justify-between items-center text-SubheadSm text-primary-950">
              <div className="text-gray-95 text-SubheadLg">Thành tựu</div>
              <div
                className="cursor-pointer"
                onClick={() => router.push(ROUTE.MISSION)}
              >
                Xem thêm
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <AchievementProfile />
            </div>
          </div>
          <hr className="border-t border-gray-200 my-4" />
          {/* TODO:  */}
          <div className="px-6 mt-4 mb-8">
            <div className="flex w-full justify-between items-center text-SubheadSm text-primary-950">
              <div className="text-gray-95 text-SubheadLg">Chứng chỉ</div>
              {/* <div className="cursor-pointer">Xem thêm</div> */}
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <CertificateProfile />
            </div>
          </div>
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
          <Post
            imageUrl="bg-[url('/image/home/profile-pic.png')]"
            thumbnailUrl="/image/new/new-pic.png"
            userName="Andy Lou"
            specialName="Bá Vương Học Đường"
            userRank={
              <span
                className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
              >
                IV
              </span>
            }
            createdAt="23s"
            likedCount="6.2"
            commentCount="61"
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

// export default WithAuth(Profile);
export default Profile;
