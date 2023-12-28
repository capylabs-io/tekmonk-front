import { Certificate, User } from '@/types/common-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  userInfo: User | null;
  userCertificate: Certificate[] | null;
};

type Actions = {

};

const defaultStates: State = {
  userInfo: {
    id: '1',
    username: 'Andy Lou',
    userRank: 'IV',
    specialName: 'Bá Vương Học Đường'
  },
  userCertificate: [
    {
      name: 'Lập trình Python - Lớp Nâng Cao',
      type: 'Khoá học Code',
      mission: '10',
      progress: '10%',
      imageUrl: '/image/profile/certificate-logo.png'
    }
  ]
  // userInfo: null,
};
export const useUserStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...defaultStates,
    }),
    { name: 'userStore' }
  )
);
