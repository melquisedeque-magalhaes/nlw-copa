import Image from 'next/image'

import AppNlwMobileImg from '../assets/app-trilha-ignite.png'
import Logo from '../assets/logo.svg'
import AvatarsImg from '../assets/avatares.png'
import CheckImg from '../assets/check.svg'

export default function Home() {
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
            <span className="text-ignite-500">+12.592 </span>
            pessoas já estão usando
          </strong>
        </div>

        <form className="flex items-center gap-2 w-full">
          <input
            placeholder="Qual nome do seu bolão?"
            type="text"
            className="flex-1 h-[58px] rounded bg-gray-800 text-gray-200 text-sm border border-gray-400 px-6 py-4"
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
              <span className="font-bold text-2xl">+2.034</span>
              Bolões criados
            </span>
          </div>

          <div className="border border-gray-400 h-[50%]" />

          <div className="flex gap-6 items-center">
            <Image src={CheckImg} alt="" />
            <span className="flex flex-col text-white">
              <span className="font-bold text-2xl">+2.034</span>
              Bolões criados
            </span>
          </div>
        </div>
      </main>

      <Image
        quality={100}
        alt="dois celulares com o aplicativo do NLW aberto"
        src={AppNlwMobileImg}
      />
    </div>
  )
}
