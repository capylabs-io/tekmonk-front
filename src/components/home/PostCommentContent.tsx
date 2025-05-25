"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Smile } from "lucide-react";
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
import dynamic from "next/dynamic";
import data from "@emoji-mart/data";

// Dynamically import emoji picker to avoid SSR issues
const Picker = dynamic(() => import("@emoji-mart/react"), { ssr: false });

type Props = {
  imageUrl?: string;
  postId?: number;
  onUpdateComment?: () => void;
  maxWords?: number; // Maximum number of words allowed
};

export const PostCommentContent = ({
  imageUrl,
  postId,
  onUpdateComment,
  maxWords = 100, // Default limit of 100 words
}: Props) => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
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

  // Function to count words (excluding emojis)
  const countWords = (text: string): number => {
    if (!text.trim()) return 0;

    // Simple approach: split by whitespace and filter out empty strings
    // This will count emojis as words, but it's a simpler and more reliable approach
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    return words.length;
  };

  // Get current word count
  const currentWordCount = countWords(text);
  const isOverLimit = currentWordCount > maxWords;
  const isAtLimit = currentWordCount === maxWords;

  // Load more comments when the user scrolls to the bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTextChange = (newText: string) => {
    // Check if adding this text would exceed the word limit
    const newWordCount = countWords(newText);

    if (newWordCount <= maxWords) {
      setText(newText);
    } else {
      // If over limit, show warning but don't update text
      error("Giới hạn từ", `Bình luận không được vượt quá ${maxWords} từ`);
    }
  };

  const handleSend = async () => {
    try {
      showLoading();

      // Validate text is not empty
      if (!text.trim()) {
        error("Lỗi", "Nội dung bình luận không được để trống");
        return;
      }

      // Check word limit
      if (isOverLimit) {
        error("Giới hạn từ", `Bình luận không được vượt quá ${maxWords} từ`);
        return;
      }

      // Check for forbidden words
      if (containsForbiddenWords(text)) {
        error(
          "Nội dung không phù hợp",
          "Bình luận chứa từ ngữ không được phép"
        );
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
      refetchListPostComment();
      onUpdateComment?.();
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    const newText = text + emoji.native;
    // Emojis don't count towards word limit, so we can add them freely
    setText(newText);
    setShowEmojiPicker(false);
  };

  return (
    <div className=" space-y-5 h-full">
      <ActionGuard
        actionName="Thêm bình luận"
        className="flex w-full cursor-pointer items-start gap-2"
      >
        <div
          className={`size-10 rounded-full border bg-cover bg-center bg-no-repeat`}
          style={{
            backgroundImage: `url(/image/home/profile-pic.png)`,
            height: 40,
            width: 40,
          }}
        ></div>
        <div className="w-full flex flex-col items-center bg-[#f0f2f5] rounded-lg px-2 py-1">
          <div className="relative flex h-auto w-full items-center justify-center">
            <textarea
              value={text}
              placeholder={`Viết bình luận (tối đa ${maxWords} từ)`}
              className="text-black min-h-10 min-w-0 flex-1 resize-none rounded-md bg-transparent px-3 pt-2 outline-none placeholder:text-gray-40"
              onChange={(e) => {
                handleTextChange(e.target.value);
                // Auto resize the textarea
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onFocus={(e) => {
                // Set initial height when focused
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              rows={1}
            />

            {/* Emoji picker */}
            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute left-0 bottom-14 z-[999]"
              >
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme="light"
                  previewPosition="none"
                  skinTonePosition="none"
                  searchPosition="top"
                  set="native"
                  maxFrequentRows={0}
                />
              </div>
            )}
          </div>

          {/* Word count and controls */}
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-2">
              <button
                className="rounded-full h-9 w-9 hover:bg-gray-100 items-center justify-center flex"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile size={18} className="text-gray-500" />
              </button>

              {/* Word count indicator */}
              <span
                className={`text-xs ${
                  isOverLimit
                    ? "text-red-500"
                    : isAtLimit
                    ? "text-yellow-500"
                    : "text-gray-500"
                }`}
              >
                {currentWordCount}/{maxWords}
              </span>
            </div>

            <Button
              className="!rounded-lg p-0 h-8 w-10"
              onClick={handleSend}
              disabled={text.length === 0 || isOverLimit}
            >
              <Send size={18} />
            </Button>
          </div>
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
