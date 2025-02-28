import { UserType } from "@/types/auth";
import { create } from "zustand";

interface AuthState {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const savedUser: string | null = localStorage.getItem("user");
const user: UserType | null = savedUser ? JSON.parse(savedUser) : null;

export const useAuth = create<AuthState>((set) => ({
  user,
  setUser: (user) => {
    set({ user });
  },
}));
