import {getPostsPagination, uploadMedia, uploadPost} from "@/requests/post";
import {TPostUpload, SingleResponseDto} from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Actions = {
  getAllPost: () => Promise<void>;
  createPost: (user_id: string, post: TPostUpload) => Promise<SingleResponseDto>;
  clearList: () => void;
  uploadMedia: (formData: FormData) => Promise<SingleResponseDto>;
};

type State = {
  posts: TPostUpload[];
  page: number;
  limit: number;
};
const defaultValueStates: State = {
  posts: [],
  page: 1,
  limit: 10,
};
//create store using Zustand
export const usePostStore = create<State & Actions>()((set, get) => ({
  ...defaultValueStates,
  getAllPost: async () => {
    //fetch all post
    const response = await getPostsPagination(get().page, get().limit);
    if (!response) {
      return;
    }
    set({
      posts: [...get().posts, ...response.posts],
    });
  },
  createPost: async (user_id: string, post: TPostUpload): Promise<SingleResponseDto> => {
    return await uploadPost(user_id, post);
  },
  clearList: () => {
    set({
      ...defaultValueStates,
    });
  },
    uploadMedia: async (formData: FormData): Promise<SingleResponseDto> => {
      return await uploadMedia(formData);
    },
}));
