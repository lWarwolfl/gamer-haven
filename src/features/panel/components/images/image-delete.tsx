'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { SubmitButton } from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import { useDeleteImage } from '@/features/panel/mutations/images/useDeleteImage.mutation'
import { TListImagesAction } from '@/server/image/listImages.action'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

export type ImageDeleteProps = { data: TListImagesAction['images'][number] }

export default function ImageDelete({ data }: ImageDeleteProps) {
  const tActions = useTranslations('global.actions')
  const t = useTranslations('panel.images.delete')

  const [open, setOpen] = useState(false)

  const { mutate: mutateDeleteImage, isPending: isPendingDeleteImage } = useDeleteImage()

  function onSubmit() {
    mutateDeleteImage(data.id, {
      onSuccess: () => {
        toast.success(t('success', { name: data.name }))
      },
    })
  }

  return (
    <ResponsiveDialog
      title={t('title', { name: data.name })}
      description={t('description')}
      trigger={
        <Button variant="outline" size="sm">
          {tActions('delete')}
          <Icon icon="ph:trash-duotone" className="text-destructive size-4" />
        </Button>
      }
      action={
        <SubmitButton
          onClick={() => onSubmit()}
          loading={isPendingDeleteImage}
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
