import React, { useState } from "react";
import { Send } from "lucide-react";
import { CommentCard } from "./CommentCard";
import { Button } from "../common/button/Button";
import { addCommentPost, getListCommentPost } from "@/requests/post";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { PostComment } from "@/types/common-types";
import { StrapiResponse } from "@/types/strapi-types";
import { containsForbiddenWords } from "@/validation/validate-forbiden-word";
import { ActionGuard } from "../common/ActionGuard";

type Props = {
  imageUrl?: string;
  postId?: number;
  onUpdateComment?: () => void;
};

// const mockMessages = [
//   {
//     name: 'Long',
//     username: 'Bá Vưong Học Đưòng',
//     time: Date.now(),
//     content: 'quá hay!!!',
//     interact: {
//       numberOflike: 23,
//       numberOfMessage: 10,
//       numberOfShare: 124,
//       numberOfView: 123,
//     },
//   },
//   {
//     name: 'Hải',
//     username: 'Bá Vưong Học Đưòng',
//     time: Date.now(),
//     content: 'Hay!!!!',
//     interact: {
//       numberOflike: 23,
//       numberOfMessage: 10,
//       numberOfShare: 124,
//       numberOfView: 123,
//     },
//   },
// ];

export const PostCommentContent = ({
  imageUrl,
  postId,
  onUpdateComment,
}: Props) => {
  const [text, setText] = useState("");
  const { success, error } = useSnackbarStore();
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const { data: listComment, refetch: refetchListPostComment } = useQuery<
    StrapiResponse<PostComment[]>
  >({
    refetchOnWindowFocus: false,
    queryKey: ["post-comment"],
    queryFn: async () => {
      try {
        if (!postId || isNaN(Number(postId)) || Number(postId) <= 0) {
          return { data: [] };
        }
        const queryString = qs.stringify(
          {
            populate: {
              commentedBy: {
                fields: ["username", "id"],
              },
              post: {
                fields: ["id"],
              },
            },
            filters: {
              post: {
                id: Number(postId),
              },
            },
            sort: ["createdAt:desc"],
            pagination: {
              page: 1,
              pageSize: 100,
            },
          },
          { encodeValuesOnly: true }
        );
        return await getListCommentPost(queryString);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  const handleSend = async () => {
    try {
      showLoading();
      if (containsForbiddenWords(text)) {
        error("Lỗi", "Nội dung bình luận không hợp lệ");
        return;
      }
      const res = await addCommentPost({
        content: text,
        postId: Number(postId),
      });
      if (res) {
        success("Thành công", "Đã thêm bình luận");
        setText("");
      }
    } catch (err) {
      console.log("error", err);
      error("Lỗi", "Đã xảy ra lỗi khi thêm bình luận");
    } finally {
      hideLoading();
      setText("");
      refetchListPostComment();
      onUpdateComment?.();
    }
  };

  return (
    <div className="space-y-5 h-full overflow-y-auto">
      <ActionGuard
        actionName="Thêm bình luận"
        className="flex w-full cursor-pointer items-center gap-2"
      >
        <div
          className={`size-10 rounded-full border bg-cover bg-center bg-no-repeat`}
          style={{
            backgroundImage: `url(/image/home/profile-pic.png)`,
            height: 40,
            width: 40,
          }}
        ></div>
        <div className="flex h-14 w-full items-center justify-center gap-1 rounded-lg border border-gray-300 px-3">
          <textarea
            value={text}
            placeholder="Viết bình luận"
            className="text-black h-10 min-w-0 flex-1 resize-none rounded-md bg-transparent px-3 py-2 outline-none"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            className="!rounded-lg"
            onClick={handleSend}
            disabled={text.length === 0}
          >
            <Send size={20} />
          </Button>
        </div>
      </ActionGuard>
      <div className="space-y-5">
        {listComment?.data?.map((item: PostComment, index: number) => (
          <CommentCard
            key={index}
            comment={item}
            name={item.commentedBy?.username}
            username={item.commentedBy?.username}
            time={item.createdAt}
            content={item.content}
            interact={{
              numberOflike: 0,
              numberOfMessage: 0,
              numberOfShare: 0,
              numberOfView: 0,
            }}
            onUpdateComment={refetchListPostComment}
          />
        ))}
      </div>
    </div>
  );
};
