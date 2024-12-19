"use client";
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export interface User {
    id: string | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    email: string | null | undefined;
    address: string;
};

interface AuthState {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}


const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {} as User,
      setUser: (user: User) => set({ user }),
      clearUser: ()=> set({ user: {} as User})
    }),
    {
      name: 'auth_storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useAuthStore