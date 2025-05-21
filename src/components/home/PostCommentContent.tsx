"use client";
import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { CommentCard } from "./CommentCard";
import { Button } from "../common/button/Button";
import { addCommentPost } from "@/requests/post";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { PostComment } from "@/types/common-types";
import { containsForbiddenWords } from "@/validation/validate-forbiden-word";
import { ActionGuard } from "../common/ActionGuard";
import { useInView } from "react-intersection-observer";
import { useInfiniteComment } from "@/hooks/use-comment";

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
  const { ref, inView } = useInView();
  const { success, error } = useSnackbarStore();
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);

  const {
    data: listComment,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchListPostComment,
  } = useInfiniteComment({
    page: 1,
    limit: 2,
    postId: postId,
  });

  // Load more comments when the user scrolls to the bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        {listComment?.pages?.map((page, pageIndex) =>
          page.data.map((item: PostComment, index: number) => (
            <CommentCard
              key={`${pageIndex}-${index}`}
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
          ))
        )}

        {/* Loading indicator and intersection observer reference */}
        {hasNextPage && (
          <div ref={ref} className="flex justify-center py-4">
            {isFetchingNextPage ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-70 border-t-transparent"></div>
            ) : (
              <div className="h-4"></div> // Invisible element to trigger intersection
            )}
          </div>
        )}
      </div>
    </div>
  );
};
