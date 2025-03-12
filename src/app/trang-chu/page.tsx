"use client";
import React, { useMemo } from "react";
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
import { PostType, PostVerificationType } from "@/types";
import moment from "moment";
import { get } from "lodash";
import { useLoadingStore } from "@/store/LoadingStore";
import { useUserStore } from "@/store/UserStore";

const Home = () => {
  //set for contest page
  const router = useCustomRouter();
  const [showLoading, hideLoading] = useLoadingStore((state) => [state.show, state.hide])
  const [userInfo] = useUserStore((state) => [state.userInfo]);

  const { data, refetch: refetchListPostCustom } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["custom-posts"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify(
          {
            page: 1,
            limit: 100,
            sort: ["id:asc"],
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
      showLoading()
      await likePost({
        postId: get(data, 'id')
      })
      refetchListPostCustom()
    } catch (error) {
      console.log('error', error);
    } finally {
      hideLoading()
    }
  }
  const listPost = useMemo(() => {
    return data
      ? data.filter(
        (item: PostType) => item.isVerified === PostVerificationType.ACCEPTED
      )
      : [];
  }, [data]);
  return (
    <>
      <div className="text-xl text-primary-900 px-8">Trang chủ</div>
      <Tabs defaultValue="all" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="play">Sân chơi</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="overflow-y-auto">
          {listPost.map((item: PostType, index: number) => (
            <>
              <div className="px-8">
                <Post
                  isAllowClickDetail
                  data={item}
                  imageUrl="bg-[url('/image/home/profile-pic.png')]"
                  thumbnailUrl={get(item, 'thumbnail') || ''}
                  userName={userInfo?.username || 'User'}
                  specialName={get(item, 'postedBy.skills', '')}
                  userRank={
                    <span
                      className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
                    >
                      IV
                    </span>
                  }
                  postContent={get(item, 'content', '')}
                  postName={get(item, 'name', '')}
                  createdAt={moment(get(item, 'createdAt', '')).format('DD/MM/YYYY').toString()}
                  likedCount={get(item, 'likeCount', 0).toString() || '0'}
                  commentCount={get(item, 'commentCount', 0).toString() || '0'}
                  onLikedPostClick={handleLikedPostClick}
                />
              </div>
              {
                index !== listPost.length - 1 &&
                <hr className="border-t border-gray-200 my-4" />
              }
            </>
          ))}
        </TabsContent>
        <TabsContent value="play" className="overflow-y-auto">
          Play
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Home;
