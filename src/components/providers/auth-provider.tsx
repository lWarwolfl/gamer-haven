'use client'

import { default as useSupabase } from '@/lib/supabase/client'
import type { Session, User } from '@supabase/supabase-js'
import { useMutation } from '@tanstack/react-query'
import { createContext, memo, type PropsWithChildren, useContext, useState } from 'react'
import { createStore, type StoreApi, useStore } from 'zustand'

type AuthProvider = {
  user: User | null
  authorized: boolean
  session: Session | null
}

type UserProviderProps = PropsWithChildren & {
  initial: {
    user: User | null
    session: Session | null
  }
}

const AuthContext = createContext<StoreApi<AuthProvider> | undefined>(undefined)
const AuthProvider = memo(function UserProvider({ children, initial }: UserProviderProps) {
  const client = useSupabase()

  const [store] = useState(() =>
    createStore<AuthProvider>(() => ({
      authorized: Boolean(initial.user),
      ...initial,
    }))
  )

  client.auth.onAuthStateChange((event, data) => {
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
      window.location.href = '/auth/signin'
    }
  })

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
})

export default AuthProvider

export function useUserStore<T>(selector: (state: AuthProvider) => T) {
  const context = useContext(AuthContext)
  if (!context) throw new Error(`userContext.Provider is missing!`)
  return useStore(context, selector)
}

export function useCurrentUser() {
  return useUserStore((state) => state.user)
}

export function useCurrentSession() {
  return useUserStore((state) => state.session)
}

export function useGetSession() {
  const client = useSupabase()
  const {
    mutate: getSession,
    mutateAsync: getSessionSync,
    ...rest
  } = useMutation({
    mutationFn: () => client.auth.getSession(),
  })
  return { getSession, getSessionSync, ...rest }
}
