import { create } from 'zustand';

export interface UserInfo {
  id: string;
  username: string;
  role: 'employee' | 'commission' | 'payroll';
  jwt: string;
}

interface State {
  userInfo: Partial<UserInfo>;
  setUserInfo: (userInfo: UserInfo) => void;
  reset: () => void;
}


export const useUserStore = create<State>()(
  (set) => ({
    userInfo: {},
    setUserInfo: (userInfo: UserInfo) => set((state) => {
      state.userInfo = userInfo;
      return state;
    }),
    reset: () => set((state: State) => {
      state.userInfo = {};
      return state;
    }),
  }),
);
