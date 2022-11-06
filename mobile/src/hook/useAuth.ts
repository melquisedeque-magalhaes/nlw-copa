import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import * as GoogleProvider from 'expo-auth-session/providers/google'
import { useEffect, useState } from 'react'
// import { UserData } from '../@types/user'

export function useAuth() {
  const [isUserLoading, setIsUserLoading] = useState(false)
  // const [user, setUser] = useState<UserData>()

  WebBrowser.maybeCompleteAuthSession()

  const [request, response, promptAsync] = GoogleProvider.useAuthRequest({
    clientId: '766104894573-keer5s6nr1oa0bpeh6ov0jg1hqd87g49.apps.googleusercontent.com',
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