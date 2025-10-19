'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { SubmitButton } from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import { useDeleteMod } from '@/features/panel/mutations/mods/useDeleteMod.mutation'
import { TListModsByGameIdAction } from '@/server/mod/listModsByGameId.action'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

export type ModDeleteProps = { data: TListModsByGameIdAction['mods'][number] }

export default function ModDelete({ data }: ModDeleteProps) {
  const tActions = useTranslations('global.actions')
  const t = useTranslations('panel.mods.delete')

  const [open, setOpen] = useState(false)

  const { mutate: mutateDeleteMod, isPending: isPendingDeleteMod } = useDeleteMod()

  function onSubmit() {
    mutateDeleteMod(data.id, {
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
        <Button variant="destructive" size="sm">
          {tActions('delete')}
          <Icon icon="ph:trash-duotone" className="size-4" />
        </Button>
      }
      action={
        <SubmitButton onClick={() => onSubmit()} loading={isPendingDeleteMod} variant="destructive">
          {tActions('delete')}
        </SubmitButton>
      }
      open={open}
      setOpen={setOpen}
    />
  )
}
