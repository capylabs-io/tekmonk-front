import { create } from 'zustand';

type State = {
  isShowing: boolean;
  content: string;
};

type Actions = {
  show: (content: string) => void;
  hide: () => void;
};

export const useProfileStore = create<State & Actions>((set) => ({
  isShowing: false,
  content: '',
  show: (content) =>
    set({
      isShowing: true,
      content,
    }),
  hide: () =>
    set({
      isShowing: false,
      content: '',
    }),
}));
