import Image from 'next/image'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

import { api } from '../lib/api'

import AppNlwMobileImg from '../assets/app-trilha-ignite.png'
import Logo from '../assets/logo.svg'
import AvatarsImg from '../assets/avatares.png'
import CheckImg from '../assets/check.svg'

interface PoolProps {
  poolCount: number
  userCount: number
  guessCount: number
}

type FormInput = {
  titlePool: string
}

export default function Pool({ guessCount, poolCount, userCount }: PoolProps) {
  const { register, handleSubmit, setValue } = useForm<FormInput>()

  async function handleCreatePool({ titlePool }: FormInput) {
    try {
      const { data } = await api.post('pool', {
        title: titlePool,
      })

      await navigator.clipboard.writeText(data.code)

      toast.success(
        'Bolão criado com sucesso! o código do seu bolão foi copiado para sua area de transferência',
        {
          duration: 20000,
        },
      )

      setValue('titlePool', '')
    } catch {
      toast.error('Erro em criar o seu bolão')
    }
  }

  return (
    <div className="max-w-[1440px] h-screen mx-auto grid grid-cols-2 flex items-center justify-center gap-28">
      <main className="max-w-[489px]">
        <Image src={Logo} alt="Logo do NLW" />

        <h1 className="mt-[60px] mb-10 text-5xl font-bold text-white">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="flex items-center gap-2 mb-10">
          <Image src={AvatarsImg} alt="" />
          <strong className="font-bold text-xl text-white">
            <span className="text-ignite-500">+{userCount} </span>
            pessoas já estão usando
          </strong>
        </div>

        <form
          onSubmit={handleSubmit(handleCreatePool)}
          className="flex items-center gap-2 w-full"
        >
          <input
            {...register('titlePool')}
            placeholder="Qual nome do seu bolão?"
            type="text"
            className="flex-1 h-[58px] rounded bg-gray-800 text-gray-200 text-sm border placeholder:text-gray-200 border-gray-400 px-6 py-4"
          />
          <button
            className="bg-yellow-500 h-[58px] w-[171px] rounded px-6 text-sm font-bold text-gray-950"
            type="submit"
          >
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="h-[102px] border-t border-gray-400 mt-10 flex items-center justify-between">
          <div className="flex gap-6 items-center">
            <Image src={CheckImg} alt="" />
            <span className="flex flex-col text-white">
              <span className="font-bold text-2xl">+{poolCount}</span>
              Bolões criados
            </span>
          </div>

          <div className="border border-gray-400 h-[50%]" />

          <div className="flex gap-6 items-center">
            <Image src={CheckImg} alt="" />
            <span className="flex flex-col text-white">
              <span className="font-bold text-2xl">+{guessCount}</span>
              Palpites enviados
            </span>
          </div>
        </div>
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = getCookie('nlw-token', { req })

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const [poolCountResponse, userCountResponse, guessCountResponse] =
    await Promise.all([
      api.get('/pools/count'),
      api.get('/users/count'),
      api.get('/guesses/count'),
    ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      userCount: userCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
    },
  }
}
