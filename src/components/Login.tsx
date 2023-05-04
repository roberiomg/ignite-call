import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { ArrowRight, Check } from 'phosphor-react'
import { Button } from '@roberiomg-ui/react'
// import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'

import { z } from 'zod'

import { signIn, useSession } from 'next-auth/react'

const loginformSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido.' }),
  senha: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
})

type LoginformData = z.infer<typeof loginformSchema>

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginformData>({
    resolver: zodResolver(loginformSchema),
  })

  //   const router = useRouter()

  async function handleLogin(data: LoginformData) {
    try {
      await api.post('/users', {
        email: data.email,
        senha: data.senha,
      })

      //   await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }

      console.error(err)
    }
  }

  const session = useSession()
  // const router = useRouter()

  const isSignedId = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  // async function handleNavigateToNextStep() {
  //   await router.push('/register/time-intervals')
  // }

  return (
    <div className="flex flex-col bg-zinc-700 text-zinc-300 rounded-lg p-2 w-96 space-y-2">
      <form className="space-y-2" onSubmit={handleSubmit(handleLogin)}>
        <label>
          <p>E-mail</p>
          <input
            className="w-full rounded"
            placeholder="Digite seu e-mail"
            {...register('email')}
          />

          {errors.email && <form>{errors.email.message}</form>}
        </label>

        <label>
          <p>Senha</p>
          <input
            type="password"
            className="w-full rounded"
            placeholder="Dica: escolha uma senha com 6 caracters ou mais"
            {...register('senha')}
          />
        </label>

        <button
          className="w-full p-2 rounded text-zinc-200 font-bold bg-cyan-700 hover:bg-cyan-900"
          type="submit"
          disabled={isSubmitting}
        >
          ENTRAR
        </button>
        <div className="text-center">----- ou -----</div>
        <div>Realize seu cadastro.</div>

        <div>
          <div>
            {isSignedId ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
