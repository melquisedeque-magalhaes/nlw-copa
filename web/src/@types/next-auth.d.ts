/* eslint-disable no-unused-vars */
import { Session as SessionNextAuth } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends SessionNextAuth {
    accessToken: string
    user: {
      id: string
    }
  }
}
