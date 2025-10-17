import { useSupabaseAuth } from '@/components/providers/supabase-auth-provider'
import { TSignIn } from '@/features/auth/schemas/auth.schema'
import type { UserAttributes } from '@supabase/supabase-js'
import { useMutation } from '@tanstack/react-query'

function useSignIn() {
  const handler = useSupabaseAuth((state) => state.signIn)

  const { mutate: signIn, ...rest } = useMutation({
    mutationFn: (data: TSignIn) => handler(data),
  })
  return { signIn, ...rest }
}

function useUpdateUser() {
  const handler = useSupabaseAuth((state) => state.updateUser)

  const { mutate: updateUser, ...rest } = useMutation({
    mutationFn: (data: UserAttributes) => handler(data),
  })
  return { updateUser, ...rest }
}

function useSignOut() {
  const handler = useSupabaseAuth((state) => state.signOut)
  const { mutate: signOut, ...rest } = useMutation({
    mutationFn: () => handler(),
    onSuccess() {
      window.location.href = '/admin/signin'
    },
  })
  return { signOut, ...rest }
}

function useResetPasswordForEmail() {
  const handler = useSupabaseAuth((state) => state.resetPasswordForEmail)
  const { mutate: resetPasswordForEmail, ...rest } = useMutation({
    mutationFn: (email: string) => handler(email),
  })
  return { resetPasswordForEmail, ...rest }
}

function useResetPassword() {
  const resetPasswordHandler = useSupabaseAuth((state) => state.resetPassword)
  const { mutate: resetPassword, ...rest } = useMutation({
    mutationFn: ({ accessToken, newPassword }: { accessToken: string; newPassword: string }) =>
      resetPasswordHandler(accessToken, newPassword),
  })
  return { resetPassword, ...rest }
}

function useCurrentUser() {
  return useSupabaseAuth((state) => state.user)
}

function useCurrentSession() {
  return useSupabaseAuth((state) => state.session)
}

export const authHooks = {
  useSignIn,
  useSignOut,
  useCurrentUser,
  useUpdateUser,
  useResetPassword,
  useCurrentSession,
  useResetPasswordForEmail,
}
