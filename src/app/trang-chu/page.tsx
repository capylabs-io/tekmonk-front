"use client";
import React, { useMemo, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { Post } from "@/components/home/Post";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import { getListPostCustom, likePost } from "@/requests/post";
import { PostType, PostTypeEnum, PostVerificationType } from "@/types";
import moment from "moment";
import { get } from "lodash";
import { useLoadingStore } from "@/store/LoadingStore";
import { useUserStore } from "@/store/UserStore";
import { CommonButton } from "@/components/common/button/CommonButton";
import { useProfileStore } from "@/store/ProfileStore";

const Home = () => {
  //set for contest page
  const router = useCustomRouter();
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const [tabValue, setTabValue] = useState<string>("all");
  const handleTabChange = (value: string) => {
    setTabValue(value);
  };
  const [show, hide, setTypeModal] = useProfileStore((state) => [state.show, state.hide, state.setTypeModal]);
  const handleOpenModal = () => {
    setTypeModal(PostTypeEnum.PROJECT);
    show();
  };
  const { data, refetch: refetchListPostCustom } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["custom-posts"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify(
          {
            page: 1,
            limit: 100,
            sort: "desc",
          },
          { encodeValuesOnly: true }
        );
        return await getListPostCustom(queryString);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  const handleLikedPostClick = async (data: PostType) => {
    try {
      showLoading();
      await likePost({
        postId: get(data, "id"),
      });
      refetchListPostCustom();
    } catch (error) {
      console.log("error", error);
    } finally {
      hideLoading();
    }
  };
  const listPost = useMemo(() => {
    return data
      ? data.filter(
        (item: PostType) => item.isVerified === PostVerificationType.ACCEPTED
      )
      : [];
  }, [data]);
  const listProject = useMemo(() => {
    return data
      ? data.filter(
        (item: PostType) => item.isVerified === PostVerificationType.ACCEPTED && item.type === PostTypeEnum.PROJECT
      )
      : [];
  }, [data]);
  return (
    <>
      <div className="flex justify-between items-center px-8">
        <div className="text-xl text-primary-900">Trang chủ
        </div>
        {
          tabValue === "project" && (
            <CommonButton
              variant="secondary"
              className="w-full !rounded-3xl h-12"
              onClick={handleOpenModal}
            >
              Đăng dự án
            </CommonButton>
          )
        }
      </div>
      <Tabs onValueChange={handleTabChange} defaultValue="all" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="project">Dự án</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="overflow-y-auto">
          {listPost.map((item: PostType, index: number) => (
            <>
              <div className="px-8 relative">
                <div className="text-sm text-gray-500 absolute top-2 right-8">{moment(get(item, 'createdAt', '')).format('DD/MM/YYYY').toString()}</div>
                <Post
                  isAllowClickDetail
                  data={item}
                  imageUrl="bg-[url('/image/home/profile-pic.png')]"
                  thumbnailUrl={get(item, "thumbnail") || ""}
                  userName={userInfo?.username || "User"}
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
                  commentCount={get(item, "commentCount", 0).toString() || "0"}
                  onLikedPostClick={handleLikedPostClick}
                  onUpdatePost={refetchListPostCustom}
                />
              </div>
              {index !== listPost.length - 1 && (
                <hr className="border-t border-gray-200 my-4" />
              )}
            </>
          ))}
        </TabsContent>
        <TabsContent value="project" className="overflow-y-auto">
          {listProject.map((item: PostType, index: number) => (
            <>
              <div className="px-8 relative">
                <div className="text-sm text-gray-500 absolute top-2 right-8">{moment(get(item, 'createdAt', '')).format('DD/MM/YYYY').toString()}</div>
                <Post
                  isAllowClickDetail
                  data={item}
                  imageUrl="bg-[url('/image/home/profile-pic.png')]"
                  thumbnailUrl={get(item, "thumbnail") || ""}
                  userName={userInfo?.username || "User"}
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
                  commentCount={get(item, "commentCount", 0).toString() || "0"}
                  onLikedPostClick={handleLikedPostClick}
                  onUpdatePost={refetchListPostCustom}
                />
              </div>
              {index !== listPost.length - 1 && (
                <hr className="border-t border-gray-200 my-4" />
              )}
            </>
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Home;
