import create from 'zustand'
import { UserData } from '../@types/user'

interface AuthStore {
  user: UserData
}

export const useAuthStore = create<AuthStore>(() => ({
  user: {} as UserData,
}))

