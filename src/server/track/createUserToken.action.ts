'use server'

import { cookies } from 'next/headers'
import { v4 } from 'uuid'

export async function createUserTokenAction() {
  const cookieS = await cookies()
  const userToken = cookieS.get('user_token')

  if (!userToken?.value) {
    cookieS.set('user_token', v4())
  }
}
