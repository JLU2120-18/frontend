import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface UserInfo {
  id: string;
  username: string;
  avatar: string;
}

interface State {
  userInfo: Partial<UserInfo>;
  setUserInfo: (userInfo: UserInfo) => void;
  reset: () => void;
}


export const useUserStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        userInfo: {},
        setUserInfo: (userInfo: UserInfo) => set((state) => {
          state.userInfo = userInfo;
          return state;
        }),
        reset: () => set((state) => {
          state.userInfo = {};
          return state;
        }),
      }),
      {
        name: 'user-store',
      },
    ),
  ),
);
