import Image from 'next/image'
import { GoogleLogo } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import toast, { Toaster } from 'react-hot-toast'

import AppNlwMobileImg from '../assets/app-trilha-ignite.png'
import Logo from '../assets/logo.svg'
import { useEffect } from 'react'
import { api } from '../lib/api'

export default function Login() {
  const { status, data } = useSession()

  const { push } = useRouter()

  async function authenticated() {
    try {
      const response = await api.post('/user', {
        access_token: data?.accessToken,
      })

      toast.success('Login realizado com sucesso!')

      setCookie('nlw-token', response.data.token)

      push('/bolao')
    } catch {
      toast.error('Ocorreu um erro ao fazer seu login, tente novamente!')
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      authenticated()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <div className="max-w-[1440px] h-screen mx-auto grid grid-cols-2 flex items-center justify-center gap-28">
      <main className="max-w-[489px]">
        <Image src={Logo} alt="Logo do NLW" />

        <h1 className="mt-[60px] mb-10 text-5xl font-bold font-sans text-white">
          Faça login e crie seu bolão!
        </h1>

        <button
          onClick={() => signIn('google')}
          className="h-14 w-full bg-red-500 rounded font-sans font-bold text-white mt-16 flex items-center justify-center gap-2 hover:bg-red-600 transition-colors uppercase"
        >
          <GoogleLogo weight="bold" color="#fff" size={24} />
          ENTRAR COM GOOGLE
        </button>
      </main>

      <Image
        quality={100}
        alt="dois celulares com o aplicativo do NLW aberto"
        src={AppNlwMobileImg}
      />
      <Toaster />
    </div>
  )
}
