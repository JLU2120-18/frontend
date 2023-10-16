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
  // FIXME
  businessInfo: any;
  setBusinessInfo: (businessInfo: any) => void;
  reset: () => void;
}

export const useUserStore = create<State>()(
  (set) => ({
    userInfo: {},
    businessInfo: {},
    setUserInfo: (userInfo: UserInfo) => set((state) => {
      state.userInfo = userInfo;
      return state;
    }),
    setBusinessInfo: (businessInfo: any) => set((state) => {
      state.businessInfo = businessInfo;
      return state;
    }),
    reset: () => set((state: State) => {
      state.userInfo = {};
      state.businessInfo = {};
      return state;
    }),
  }),
);
