"use client";
import React, { use, useEffect, useMemo } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { Post } from "@/components/home/Post";
import WithAuth from "@/components/hoc/WithAuth";
import { useRouter } from "next/navigation";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { CreateProfileModal } from "@/components/home/CreateProfileModal";
import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import { getListPost, getListPostCustom } from "@/requests/post";
import { PostVerificationType } from "@/types";
import moment from "moment";
import { get } from "lodash";

const Home = () => {
  //set for contest page
  const router = useCustomRouter();
  const { data, isLoading, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify(
          {
            pagination: {
              page: 1,
              pageSize: 100,
            },
            // filters: {
            //   isVerified: {
            //     $in: activeTab !== 'history' ? [PostVerificationType.PENDING] : [PostVerificationType.DENIED, PostVerificationType.ACCEPTED],
            //   },
            // },
            sort: ["id:asc"],
            populate: "*",
          },
          { encodeValuesOnly: true }
        );
        return await getListPost(queryString);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  const { data: listPostCustom, refetch: refetchListPostCustom } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["custom-posts"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify(
          {
            page: 1,
            limit: 100,
          },
          { encodeValuesOnly: true }
        );
        return await getListPostCustom(queryString);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  const listPost = useMemo(() => {
    return data
      ? data.data?.filter(
          (item) => item.isVerified === PostVerificationType.ACCEPTED
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
          {listPost.map((item, index) => (
            <>
              <Post
                data={item}
                imageUrl="bg-[url('/image/home/profile-pic.png')]"
                thumbnailUrl={get(item, "thumbnail") || ""}
                userName="Andy Lou"
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
              />
              {index !== listPost.length - 1 && (
                <hr className="border-t border-gray-200 my-4" />
              )}
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
