'use client'

import { SubmitButton } from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useCreateImage } from '@/features/panel/mutations/images/useCreateImage.mutation'
import { imageCreateSchema, ImageCreateSchemaProps } from '@/features/panel/schemas/image.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ImageCreateDrawer() {
  const tActions = useTranslations('global.actions')
  const t = useTranslations('panel.images.create')

  const [open, setOpen] = useState<boolean>(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const form = useForm<ImageCreateSchemaProps>({
    mode: 'onSubmit',
    resolver: zodResolver(imageCreateSchema),
    defaultValues: {
      name: '',
      image: {},
    },
  })

  const { mutate: mutateCreateImage, isPending: isPendingCreateImage } = useCreateImage()

  function onSubmit(values: ImageCreateSchemaProps) {
    mutateCreateImage(values, {
      onSuccess: (res) => {
        toast.success(t('success', { name: res[0].name }))

        setOpen(false)
      },
    })
  }

  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <Button>
          {tActions('create')} <Icon icon="ph:plus-bold" className="size-4.5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t('title')}</DrawerTitle>
          <DrawerDescription>{t('description')}</DrawerDescription>
        </DrawerHeader>

        <form
          id="game-create-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-3xl overflow-x-visible"
        >
          <FieldGroup className="max-h-[75vh] overflow-y-auto px-3 py-1.5">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">{t('name-label')}</FieldLabel>

                  <Input
                    {...field}
                    id="name"
                    type="text"
                    placeholder={t('name-placeholder')}
                    required
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image">{t('image-label')}</FieldLabel>

                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      width={700}
                      height={700}
                      alt="Preview"
                      className="mx-auto h-auto w-full max-w-md rounded-lg border"
                    />
                  )}

                  <Input
                    id="image"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        field.onChange(file)
                        const blobUrl = URL.createObjectURL(file)
                        setPreviewUrl(blobUrl)
                      }
                    }}
                    required
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DrawerFooter className="mx-auto max-w-3xl max-sm:w-full sm:flex-row">
          <DrawerClose asChild>
            <Button variant="outline">{tActions('cancel')}</Button>
          </DrawerClose>

          <SubmitButton onClick={form.handleSubmit(onSubmit)} loading={isPendingCreateImage}>
            {tActions('submit')}
          </SubmitButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
