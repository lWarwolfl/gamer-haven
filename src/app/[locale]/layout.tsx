import { type PropsWithChildren } from 'react'

export default async function MainLayout({ children }: PropsWithChildren) {
  return <main className="flex min-h-dvh flex-col p-4 md:p-6">{children}</main>
}
