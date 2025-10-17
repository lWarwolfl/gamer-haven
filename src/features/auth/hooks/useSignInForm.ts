import { authHooks } from '@/features/auth/hooks/auth.hook'
import { type TSignIn, signInSchema } from '@/features/auth/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type TUseSignInFormProps = { defaultEmail?: string; onSuccess?: () => void }
export const useSignInForm = (props?: TUseSignInFormProps) => {
  const { defaultEmail, onSuccess } = props || {}
  const [authorized, setAuthorized] = useState(false)
  const { signIn, isPending: isPendingSignIn } = authHooks.useSignIn()

  const form = useForm<TSignIn>({
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: defaultEmail || '',
      password: '',
    },
  })

  function onSubmit(data: TSignIn) {
    signIn(data, {
      onSuccess: (res) => {
        if (!res.error) {
          setAuthorized(true)
          onSuccess?.()
        } else toast.error(res.error.message)
      },
    })
  }

  const isAuthPending = isPendingSignIn || authorized

  return {
    form,
    onSubmit,
    isAuthPending,
  }
}
