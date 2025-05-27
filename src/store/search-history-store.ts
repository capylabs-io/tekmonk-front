import { postLogin, getMe, ReqRegister } from "@/requests/login";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Định nghĩa kiểu State và Actions
type State = {
  searchHistory: string[];
};

type Actions = {
  getSearchHistory: () => string[];
  addSearchHistory: (searchHistory: string) => void;
  removeSearchHistory: (searchHistory: string) => void;
  clearSearchHistory: () => void;
};

// Khởi tạo giá trị mặc định cho state
const defaultStates: State = {
  searchHistory: [],
};

// Tạo store sử dụng Zustand
export const useSearchHistoryStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...defaultStates,

      getSearchHistory: () => {
        return get().searchHistory;
      },

      addSearchHistory: (searchText: string) => {
        if (!searchText.trim()) return;

        set((state) => {
          // Remove the search text if it already exists (to move it to the front)
          const filteredHistory = state.searchHistory.filter(
            (item) => item !== searchText
          );

          // Add the new search text at the beginning
          const newHistory = [searchText, ...filteredHistory];

          // Keep only the 5 most recent searches
          return {
            searchHistory: newHistory.slice(0, 5),
          };
        });
      },

      removeSearchHistory: (searchText: string) => {
        set((state) => ({
          searchHistory: state.searchHistory.filter(
            (item) => item !== searchText
          ),
        }));
      },

      clearSearchHistory: () => {
        set({ searchHistory: [] });
      },
    }),
    { name: "search-history" }
  )
);
