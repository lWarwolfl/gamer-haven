'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { SubmitButton } from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import { useDeleteGame } from '@/features/panel/mutations/useDeleteGame.mutation'
import { TListGamesAction } from '@/server/game/listGames.action'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export type GameDeleteProps = { data: TListGamesAction[number] }

export default function GameDelete({ data }: GameDeleteProps) {
  const tActions = useTranslations('global.actions')
  const t = useTranslations('panel.games.delete')

  const [open, setOpen] = useState(false)

  const router = useRouter()
  const { mutate: mutateDeleteGame, isPending: isPendingDeleteGame } = useDeleteGame()

  function onSubmit() {
    mutateDeleteGame(data.id, {
      onSuccess: () => {
        toast.success(t('success', { name: data.title }))
      },
    })
  }

  return (
    <ResponsiveDialog
      title={t('title', { name: data.title })}
      description={t('description')}
      trigger={
        <Button variant="secondary" size="sm">
          {tActions('delete')} <Icon icon="ph:trash" className="text-destructive size-4.5" />
        </Button>
      }
      action={
        <SubmitButton
          onClick={() => onSubmit()}
          loading={isPendingDeleteGame}
          variant="destructive"
        >
          {tActions('delete')}
        </SubmitButton>
      }
      open={open}
      setOpen={setOpen}
    />
  )
}
