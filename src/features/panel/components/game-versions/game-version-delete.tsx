'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { SubmitButton } from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import { useDeleteGameVersion } from '@/features/panel/mutations/game-versions/useDeleteGameVersion.mutation'
import { TListGameVersionsByGameIdAction } from '@/server/game-version/listGameVersionsByGameId.action'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

export type GameVersionDeleteProps = {
  data: TListGameVersionsByGameIdAction['gameVersions'][number]
}

export default function GameVersionDelete({ data }: GameVersionDeleteProps) {
  const tActions = useTranslations('global.actions')
  const t = useTranslations('panel.game-versions.delete')

  const [open, setOpen] = useState(false)

  const { mutate: mutateDeleteGameVersion, isPending: isPendingDeleteGameVersion } =
    useDeleteGameVersion()

  function onSubmit() {
    mutateDeleteGameVersion(data.id, {
      onSuccess: () => {
        toast.success(t('success', { name: data.version }))
      },
    })
  }

  return (
    <ResponsiveDialog
      title={t('title', { name: data.version })}
      description={t('description')}
      trigger={
        <Button variant="destructive" size="sm">
          {tActions('delete')}
          <Icon icon="ph:trash-duotone" className="size-4" />
        </Button>
      }
      action={
        <SubmitButton
          onClick={() => onSubmit()}
          loading={isPendingDeleteGameVersion}
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
