"use client";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PostCommentContent } from "@/components/home/PostCommentContent";
import { Post } from "@/components/home/Post";
import { PostType } from "@/types";
import { get } from "lodash";
import moment from "moment";
import { findPost } from "@/requests/post";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";

export default function Page({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState<PostType>();
  const [hideLoading, showLoading] = useLoadingStore((state) => [state.hide, state.show])
  const [showError] = useSnackbarStore((state) => [state.error])

  const fetchPost = async (id: number) => {
    try {
      showLoading()
      const res = await findPost(id)
      if (res) {
        setCurrentPost(get(res, 'attributes'))
      }
    } catch (error) {
      console.log('error', error);
      showError('Lỗi', "Không tìm thấy bài viết")
    } finally {
      hideLoading()
    }
  }
  useEffect(() => {
    if (params.id) {
      fetchPost(params.id)
    }
  }, [params])

  return (
    <>
      <div className="flex justify-between px-4 pb-[10px] item-center border-b">
        <div className="flex gap-2 item-center">
          <ArrowLeft
            size={24}
            className="text-gray-600"
            onClick={() => router.back()}
          />
          <span className="text-SubheadLg">Bài đăng</span>
        </div>
      </div>
      <div className="mt-3 px-6">
        <Post
          data={currentPost}
          imageUrl="bg-[url('/image/home/profile-pic.png')]"
          thumbnailUrl={get(currentPost, 'thumbnail') || ''}
          userName="Andy Lou"
          specialName={get(currentPost, 'postedBy.skills', '')}
          userRank={
            <span
              className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
            >
              IV
            </span>
          }
          postContent={get(currentPost, 'content', '')}
          postName={get(currentPost, 'name', '')}
          createdAt={moment(get(currentPost, 'createdAt', '')).format('DD/MM/YYYY').toString()}
          likedCount={get(currentPost, 'likeCount', 0).toString() || '0'}
          commentCount={get(currentPost, 'commentCount', 0).toString() || '0'}
        />
        <div className="mt-3">
          <PostCommentContent />
        </div>
      </div>
    </>
  );
};
