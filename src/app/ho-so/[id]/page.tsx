"use client";
import { Button as CommonButton } from "@/components/common/button/Button";
import { Button } from "@/components/ui/button";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { Post } from "@/components/home/Post";
import { AchievementProfile } from "@/components/profile/achievement-profile";
import { CertificateProfile } from "@/components/profile/certificate-profile";
import { MissionProgress } from "@/components/profile/mission-progress";
import { UserStat } from "@/components/profile/UserStat";
import { useGetUserQueryById } from "@/hooks/use-user-query";
import { getListPostCustom } from "@/requests/post";
import { useUserAvatarStore } from "@/store/UserAvatarStore";
import { useUserStore } from "@/store/UserStore";
import { PostType } from "@/types/posts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "lodash";
import { Dot, Edit, Edit2, Settings, Share2, SquareUser } from "lucide-react";
import moment from "moment";
import { useParams } from "next/navigation";
import qs from "qs";
import { useState } from "react";
import { Achievement } from "@/types/common-types";
import { Mission } from "@/types/common-types";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { CommonLoading } from "@/components/common/CommonLoading";
import { CommonEmptyState } from "@/components/common/CommonEmptyState";
import { UpdateInfoDialog } from "@/components/profile/UpdateInfoDialog";
import { TitleSelectModal } from "@/components/profile/TitleSelectModal";
import { ReqUpdateUser } from "@/requests/user";
import Image from "next/image";
import { StudentClass } from "@/components/profile/student-class";
import { cn } from "@/lib/utils";
import { ReqGetAvatarConfig } from "@/requests/avatar-config";
import { AvatarConfigModal } from "@/components/avatar/AvatarConfigModal";
import { AvatarLayer } from "@/components/avatar/AvatarLayer";

export default function Profile() {
  const { id } = useParams();
  const router = useCustomRouter();
  const [show, hide] = useUserAvatarStore((state) => [state.show, state.hide]);
  const { data: guestInfor, refetch: refetchUserInfo } = useGetUserQueryById(
    id as string
  );
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const [success] = useSnackbarStore((state) => [state.success]);
  const queryClient = useQueryClient();
  const [dataMission, setDataMission] = useState<Mission[] | Achievement[]>([]);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data: dataAvatarConfig, refetch: refetchAvatarConfig } = useQuery({
    queryKey: ["avatar-config", guestInfor?.id],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: ["frontHair", "backHair", "cloth", "mouth", "eye", "theme", "special"],
        filters: {
          user: {
            id: {
              $eq: Number(guestInfor?.id),
            }
          },
        },

      });
      const res = await ReqGetAvatarConfig(queryString);
      return res.data;
    },
    enabled: !!userInfo?.id,
    refetchOnWindowFocus: false,
  });

  const { data: myPosts, isLoading: isLoadingPosts } = useQuery({
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

  const handleShareProfile = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/ho-so/${guestInfor?.id}`;
    window.navigator.clipboard.writeText(url);
    success("Hồ sơ cá nhân ", "Đã copy link hồ sơ");
  };

  const showAvatarModal = () => {
    show();
  };

  const openUpdateDialog = () => {
    setUpdateDialogOpen(true);
  };

  const handleOpenTitleModal = () => setShowTitleModal(true);

  const handleSaveTitle = async (title: string) => {
    setSaving(true);
    try {
      await ReqUpdateUser(guestInfor?.id?.toString(), { specialName: title });
      success("Hồ sơ cá nhân ", "Cập nhật danh hiệu thành công");
      setShowTitleModal(false);
      queryClient.invalidateQueries({ queryKey: ["custom-posts"] });
    } catch (error) {
      console.log("Error ", error);
    } finally {
      setSaving(false);
      refetchUserInfo();
    }
  };

  if (isLoadingPosts) {
    return <CommonLoading />;
  }
  return (
    <div className="w-full">
      <div className="text-SubheadLg text-gray-95 px-4">Hồ sơ cá nhân</div>
      <div className="w-full flex justify-center bg-[url('/image/profile/profile-banner.png')] bg-no-repeat bg-cover h-[220px] relative mt-4">
        <div className="absolute left-8 -bottom-8 w-max h-max">
          {dataAvatarConfig && dataAvatarConfig.length > 0 ? (
            <AvatarLayer avatarConfig={dataAvatarConfig[0]} customClassName="h-[152px] w-[152px] relative p-3 !border-[5px] !border-white !rounded-full" />
          ) : (
            <div className="border-[5px] border-white p-3 rounded-full flex flex-col bg-[#FEF0C7] bg-[url('/image/profile/avatar-x2.png')] items-center justify-center h-[152px] w-[152px]" />
          )}
        </div>
      </div>
      <div className="w-full mt-14 px-6">
        <div className="flex gap-x-1 items-center">
          <div className="truncate flex gap-x-2 items-center">
            <span className="text-subheadLg font-bold text-primary-950">
              {guestInfor?.username}
            </span>
          </div>
          <Dot size={24} />
          <div className="text-bodyMd text-primary-950">
            {get(guestInfor, "specialName")}
          </div>
        </div>


        <div className="flex gap-x-2 mt-3">

          {userInfo && userInfo.id === guestInfor?.id && (
            <CommonButton
              outlined
              className="border-2 border-gray-30 rounded-lg !px-2 !py-1 text-sm flex items-center"
              onClick={handleOpenTitleModal}
            >
              <div className="flex items-center gap-x-1">
                <Image src="/image/icon/crown.png" alt="setting" width={18} height={18} />
                <div className="text-bodyMd text-primary-900">Cài đặt danh hiệu</div>
              </div>
            </CommonButton>
          )}
          {userInfo && userInfo.id === guestInfor?.id && (
            <>
              <CommonButton
                outlined
                className="border-2 border-gray-30 rounded-lg !px-2 !py-1 text-sm flex items-center"
                onClick={showAvatarModal}
              >
                <div className="flex items-center gap-x-1">
                  <SquareUser size={18} className="text-gray-50" />
                  <div className="text-bodyMd text-primary-900">Ảnh đại diện</div>
                </div>
              </CommonButton>
              <CommonButton
                outlined
                className="border-2 border-gray-30 rounded-lg !px-2 !py-1 text-sm flex items-center"
                onClick={openUpdateDialog}
              >
                <div className="flex items-center gap-x-1">
                  <Settings size={18} className="text-gray-50" />
                  <div className="text-bodyMd text-primary-900">Thông tin hồ sơ</div>
                </div>
              </CommonButton>
            </>
          )}
          <CommonButton
            outlined
            className="border-2 border-gray-30 rounded-lg !px-2 !py-1 text-sm flex items-center"
            onClick={handleShareProfile}
          >
            <div className="flex items-center gap-x-1">
              <Share2 size={18} className="text-gray-50" />
              <div className="text-bodyMd text-primary-900">Chia sẻ hồ sơ</div>
            </div>
          </CommonButton>
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
          <StudentClass id={guestInfor?.id} />
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
                    specialName={get(item, "postedBy.specialName", "")}
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
          {myPosts?.data.length === 0 && <CommonEmptyState />}
        </TabsContent>
      </Tabs>

      {/* Update Information Dialog */}
      <UpdateInfoDialog
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />
      <TitleSelectModal
        open={showTitleModal}
        onOpenChange={setShowTitleModal}
        currentTitle={guestInfor?.specialName || ""}
        onSave={handleSaveTitle}
      />
      <AvatarConfigModal onSubmit={refetchAvatarConfig} />

    </div>
  );
}
