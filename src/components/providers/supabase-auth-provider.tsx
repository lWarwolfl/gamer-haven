'use client'

import { HOST } from '@/config'
import useSupabaseClient from '@/lib/supabase/client'
import type {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
  Session,
  SignInWithPasswordCredentials,
  SignOut,
  SignUpWithPasswordCredentials,
  User,
  UserAttributes,
  UserResponse,
} from '@supabase/supabase-js'
import { createContext, memo, useContext, useState, type PropsWithChildren } from 'react'
import { createStore, useStore, type StoreApi } from 'zustand'

export type TResetPasswordForEmail =
  | {
      data: unknown
      error: null
    }
  | {
      data: null
      error: AuthError
    }

type AuthProvider = {
  user: User | null
  session: Session | null
  signIn: (credentials: SignInWithPasswordCredentials) => Promise<AuthTokenResponsePassword>
  signUp: (payload: SignUpWithPasswordCredentials) => Promise<AuthResponse>
  signOut: (options?: SignOut) => Promise<{ error: AuthError | null }>
  updateUser: (credential: UserAttributes) => Promise<UserResponse>
  resetPasswordForEmail: (email: string) => Promise<TResetPasswordForEmail>
  resetPassword: (accessToken: string, newPassword: string) => Promise<UserResponse>
}

const SupabaseAuthContext = createContext<StoreApi<AuthProvider> | undefined>(undefined)
export const SupabaseAuthProvider = memo(function UserProvider({
  children,
  session,
  user,
}: PropsWithChildren<{ session: Session | null; user: User | null }>) {
  const supabaseClient = useSupabaseClient()

  const [store] = useState(() =>
    createStore<AuthProvider>((set) => ({
      session: session,
      user: user,
      signIn: async (credentials) => {
        const result = await supabaseClient.auth.signInWithPassword(credentials)
        set({ user: result.data.user, session: result.data.session })
        return result
      },
      signUp: async (credentials) => {
        const result = await supabaseClient.auth.signUp({
          ...credentials,
        })
        set({ user: result.data.user, session: result.data.session })
        return result
      },
      signOut: async () => {
        const result = await supabaseClient.auth.signOut()
        if (!result.error) set({ user: null, session: null })
        return result
      },
      updateUser: async (credential) => {
        const result = await supabaseClient.auth.updateUser(credential)
        set({ user: result.data.user })
        return result
      },
      resetPasswordForEmail: async (email) => {
        return await supabaseClient.auth.resetPasswordForEmail(email, {
          redirectTo: `${HOST}/admin/reset`,
        })
      },
      resetPassword: async (newPassword) => {
        const result = await supabaseClient.auth.updateUser({
          password: newPassword,
        })
        set({ user: result.data.user })
        return result
      },
    }))
  )

  supabaseClient.auth.onAuthStateChange((event, data) => {
    if (event === 'TOKEN_REFRESHED') {
      store.setState({
        user: data?.user,
        session: data,
      })
    }

    if (event === 'SIGNED_IN' && data?.user) {
      store.setState({
        user: data?.user,
        session: data,
      })
    }

    if (event === 'SIGNED_OUT') {
      store.setState({
        user: data?.user,
        session: data,
      })
      window.location.href = '/admin/signin'
    }
  })

  return <SupabaseAuthContext.Provider value={store}>{children}</SupabaseAuthContext.Provider>
})

export function useSupabaseAuth<T>(selector: (state: AuthProvider) => T) {
  const context = useContext(SupabaseAuthContext)
  if (!context) throw new Error(`SupabaseAuthContext.Provider is missing!`)
  return useStore(context, selector)
}
