'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { SubmitButton } from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import { useDeleteModVersion } from '@/features/panel/mutations/mod-versions/useDeleteModVersion.mutation'
import { TListModVersionsByModIdAction } from '@/server/mod-version/listModVersionsByModId.action'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

export type ModVersionDeleteProps = { data: TListModVersionsByModIdAction['modVersions'][number] }

export default function ModVersionDelete({ data }: ModVersionDeleteProps) {
  const tActions = useTranslations('global.actions')
  const t = useTranslations('panel.mod-versions.delete')

  const [open, setOpen] = useState(false)

  const { mutate: mutateDeleteModVersion, isPending: isPendingDeleteModVersion } =
    useDeleteModVersion()

  function onSubmit() {
    mutateDeleteModVersion(data.id, {
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
          loading={isPendingDeleteModVersion}
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
