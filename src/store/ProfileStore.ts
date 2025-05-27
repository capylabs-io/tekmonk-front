import { PostTypeEnum } from "@/types";
import { create } from "zustand";

type State = {
  isShowing: boolean;
  content: string;
  type: PostTypeEnum;
};

type Actions = {
  show: () => void;
  hide: () => void;
  setTypeModal: (type: PostTypeEnum) => void;
};

export const useProfileStore = create<State & Actions>((set) => ({
  type: PostTypeEnum.POST,
  isShowing: false,
  content: "",
  show: () =>
    set({
      isShowing: true,
    }),
  hide: () =>
    set({
      isShowing: false,
      content: "",
    }),
  setTypeModal: (type: PostTypeEnum) =>
    set({
      type,
    }),
}));
