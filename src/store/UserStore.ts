import { postLogin, getMe, ReqRegister } from "@/requests/login";
import { Certificate, User } from "@/types/common-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Định nghĩa kiểu State và Actions
type State = {
  jwt: string | null;
  refreshToken: string | null;
  userInfo: User | null;
  userCertificate: Certificate[] | null;
  candidateNumber: string | null;
  codeCombatId: string | null;
  isSubmitted: boolean;
  isUpdated: boolean | null;
};

type Actions = {
  login: (body: any) => Promise<void>;
  register: (body: any) => Promise<void>;
  clear: () => void;
  getMe: () => Promise<void>;
  isConnected: () => boolean;
  setRefreshToken: (refreshToken: string) => void;
  setJwt: (jwt: string) => void;
  setIsUpdated: (data: boolean) => void;
};

// Khởi tạo giá trị mặc định cho state
const defaultStates: State = {
  jwt: null,
  refreshToken: null,
  userInfo: null,
  userCertificate: null,
  candidateNumber: null,
  codeCombatId: null,
  isSubmitted: false,
  isUpdated: null,
};

// Tạo store sử dụng Zustand
export const useUserStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...defaultStates,
      isConnected: () => !!get().jwt && !!get().userInfo && get().userInfo?.blocked === false,
      login: async (body) => {
        const response = await postLogin(body);
        if (!response) {
          return;
        }
        set({
          jwt: response.jwt,
          refreshToken: response.refreshToken,
          userInfo: response.user,
        });
        return response.user;
      },
      register: async (body) => {
        const response = await ReqRegister(body);
        if (!response) {
          return;
        }
        set({
          jwt: response.jwt,
          userInfo: response.user,
        });
        return response.user;
      },
      clear: () => {
        set({
          ...defaultStates,
        });
      },
      getMe: async () => {
        try {
          const response = await getMe();
          if (response) {
            set({
              userInfo: response,
            });
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      },
      setRefreshToken: (refreshToken) => {
        set({ refreshToken: refreshToken });
      },
      setJwt: (jwt) => {
        set({ jwt: jwt });
      },
      setIsUpdated: (data: boolean) => {
        set({ isUpdated: data });
      },
    }),
    { name: "userStore" }
  )
);
