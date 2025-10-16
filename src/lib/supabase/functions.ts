import { createSupabaseServer } from '@/lib/supabase/server'
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const supabase = await createSupabaseServer()
  return (await supabase.auth.getUser()).data.user
})

export const getCurrentSession = cache(async () => {
  const supabase = await createSupabaseServer()
  return (await supabase.auth.getSession()).data.session
})

export const getUserIdentities = cache(async () => {
  const client = await createSupabaseServer()
  return (await client.auth.getUserIdentities()).data?.identities
})

export const getSession = cache(async () => {
  const client = await createSupabaseServer()
  return (await client.auth.getSession()).data.session
})
