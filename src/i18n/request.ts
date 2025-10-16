import { cookies } from 'next/headers'
import { cache } from 'react'

const getRequestConfig = cache(async () => {
  const cookie = await cookies()

  const locale = cookie.get('NEXT_LOCALE')?.value || process.env.DEFAULT_LANGUAGE

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})

export default getRequestConfig
