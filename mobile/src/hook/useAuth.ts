import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import * as GoogleProvider from 'expo-auth-session/providers/google'
import { useEffect, useState } from 'react'
import { useToast } from 'native-base'

import { api } from '../lib/api'
import { useAuthStore } from '../stores/useAuthStore'
import { MeResponse } from '../typings/MeResponse'

export function useAuth() {
  const [isUserLoading, setIsUserLoading] = useState(false)
  const { setUser } = useAuthStore()

  const toast = useToast()

  WebBrowser.maybeCompleteAuthSession()

  const [ , response, promptAsync  ] = GoogleProvider.useAuthRequest({
    clientId: process.env.CLIENT_ID_GOOGLE,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signInWithGoogle(access_token: string) {
    console.log('access_token', access_token)

    try {
      setIsUserLoading(true)

      const responseAuth = await api.post('user', {
        access_token
      })
  
      api.defaults.headers.common['Authorization'] = `Bearer ${responseAuth.data.token}`

      const { data } = await api.get<MeResponse>('me')

      setUser({
        avatarUrl: data.avatarUrl,
        name: data.name
      })

      toast.show({
        title: 'Login realizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })

    }catch(err) {
      console.error(err)

      toast.show({
        title: 'Ocorreu um erro ao fazer seu no login!',
        placement: 'top',
        bgColor: 'red.500'
      })
    }finally {
      setIsUserLoading(false)
    }
    
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) 
      signInWithGoogle(response.authentication.accessToken)
    
  }, [response])

  async function signIn() {
    try {
      setIsUserLoading(true)

      await promptAsync()

    }catch (err) {
      console.log(err)

      toast.show({
        title: 'Ocorreu um erro ao fazer seu no login!',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    finally {
      setIsUserLoading(false)
    }
  }
  
  function signOut() {
    setUser({
      avatarUrl: null,
      name: null
    })
  }

  return {
    signIn,
    signOut,
    isUserLoading
  }
}