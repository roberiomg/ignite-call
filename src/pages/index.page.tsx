import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Login from '@/components/Login'
import { NextSeo } from 'next-seo'

// import { api } from "../../../lib/axios"

export default function Home() {
  return (
    <>
      <NextSeo title="Advogando e Programando..." />
      <main className="h-screen flex flex-col justify-between p-2 bg-gradient-to-r from-cyan-600 to-blue-300">
        <Header />
        <div />
        <div className="grid-cols-2 flex p-4 gap-10 justify-between">
          <div>
            <p className="text-lg text-justify font-semibold">TESTE</p>
            <br />
            <div>
              <p className="text-zinc-200 text-2xl">Por apenas</p>
              <p className="text-zinc-200 text-5xl font-bold">
                R$ 29,90 / mês.
              </p>
            </div>
          </div>
          <div>
            <Login />
          </div>
          <div></div>
        </div>
        <Footer />
      </main>
    </>
  )
}
