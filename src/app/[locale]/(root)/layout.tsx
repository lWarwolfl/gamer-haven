import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { type PropsWithChildren } from 'react'

export default async function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-dvh p-4 md:p-6">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 md:gap-6">
        <Header />

        {children}

        <Footer />
      </div>
    </main>
  )
}
