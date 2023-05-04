import { Scales } from 'phosphor-react'

export default function Header() {
  return (
    <div className="flex justify-between p-3 rounded bg-gradient-to-r from-zinc-800 ">
      <strong className="flex items-center gap-2 text-gray-100">
        <Scales className="text-2xl" />
        ADVOG CAPARAÓ
      </strong>
      <strong>Bem vindo a região do Caparaó!</strong>
    </div>
  )
}
