import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import * as GoogleProvider from 'expo-auth-session/providers/google'
import { useEffect, useState } from 'react'
import { CLIENT_ID_GOOGLE } from '@env'
// import { UserData } from '../@types/user'

export function useAuth() {
  const [isUserLoading, setIsUserLoading] = useState(false)
  // const [user, setUser] = useState<UserData>()

  WebBrowser.maybeCompleteAuthSession()

  const [request, response, promptAsync] = GoogleProvider.useAuthRequest({
    clientId: CLIENT_ID_GOOGLE,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signInWithGoogle(accessToken: string) {
    console.log("Token", accessToken)
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  async function signIn() {
    try {
      setIsUserLoading(true)

      await promptAsync()

    }catch (err) {
      console.log(err)
      throw err
    }
    finally {
      setIsUserLoading(false)
    }
  }
  
  function signOut() {}

  return {
    signIn,
    signOut,
    isUserLoading
  }
}