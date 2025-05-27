import { create } from "zustand";

type State = {
  /**
   * The loader is shown if `show()` has been called more times than `hide()` \
   * I.e. it will stop showing once `hide()` has been called as many times as `show()` (once all loading operations are complete)
   */
  isShowing: boolean;
};

type Actions = {
  show: (content?: string) => void;
  hide: () => void;
};

export const useUserAvatarStore = create<State & Actions>((set) => ({
  isShowing: false,
  show: () =>
    set((state) => ({
      isShowing: true,
    })),
  hide: () =>
    set((state) => ({
      isShowing: false,
    })),
}));
