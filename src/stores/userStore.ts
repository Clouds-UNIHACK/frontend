import { create } from "zustand";

interface UserStore {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: string) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
