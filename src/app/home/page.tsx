"use client";
import React, { use, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { Post } from "@/components/home/Post";
import WithAuth from "@/components/hoc/WithAuth";
import { useRouter } from "next/navigation";

const Home = () => {
  //set for contest page
  const router = useRouter();
  useEffect(() => {
    if (router) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <div className="text-xl text-primary-900 px-8">Trang chủ</div>
      <Tabs defaultValue="all" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="play">Sân chơi</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="overflow-y-auto">
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
          <hr className="border-t border-gray-200 my-4" />
          <Post
            imageUrl="bg-[url('/image/user/profile-pic-2.png')]"
            thumbnailUrl="/image/new/new-pic-2.png"
            userName="Lauren Linh"
            specialName="Học Bá Thanh Xuân"
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
          <hr className="border-t border-gray-200 my-4" />
          <Post
            imageUrl="bg-[url('/image/user/profile-pic-2.png')]"
            thumbnailUrl="/image/new/new-pic-2.png"
            userName="Lauren Linh"
            specialName="Học Bá Thanh Xuân"
            userRank={
              <span
                className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
              >
                V
              </span>
            }
            createdAt="23s"
            likedCount="6.2"
            commentCount="61"
          />
          <hr className="border-t border-gray-200 my-4" />
          <div className="flex justify-between">
            <iframe
              src="https://www.addictinggames.com/embed/html5-games/10000301"
              className="rounded-xl w-full"
              width="604"
              height="940"
              style={{ border: "none" }}
              scrolling="no"
              title="Game"
            />
            {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/fPzsWFJ2JG8?si=LxVvu4u1eLcfFioY" ></iframe> */}
            {/* <iframe width="604" height="700" src="https://www.addictinggames.com/embed/html5-games/10000373" scrolling="no"></iframe> */}
          </div>
        </TabsContent>
        <TabsContent value="play" className="overflow-y-auto">
          Play
        </TabsContent>
      </Tabs>
    </>
  );
};

export default WithAuth(Home);
