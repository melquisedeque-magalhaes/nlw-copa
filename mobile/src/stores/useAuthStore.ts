import create from 'zustand'
import { UserData } from '../@types/user'

interface AuthStore {
  user: UserData
  setUser: (state: UserData) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: {} as UserData,
  setUser: (user) => set((state) => ({ ...state, user })),
}))

