'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { SubmitButton } from '@/components/common/submit-button'
import { authHooks } from '@/features/auth/hooks/auth.hook'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default function Logout({ children }: PropsWithChildren) {
  const t = useTranslations('panel.sidebar.logout')

  const router = useRouter()
  const { signOut, isPending: isSignoutPending } = authHooks.useSignOut()

  function onSubmit() {
    signOut(undefined, {
      onSuccess: () => {
        router.push('/admin/signin')
      },
    })
  }

  return (
    <ResponsiveDialog
      title={t('title')}
      description={t('description')}
      trigger={children}
      action={
        <SubmitButton onClick={() => onSubmit()} loading={isSignoutPending} variant="destructive">
          {t('button')}
        </SubmitButton>
      }
    />
  )
}
