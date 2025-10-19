'use client'

import { RichTextEditor } from '@/components/common/rich-text-editor'
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
import { Textarea } from '@/components/ui/textarea'
import { useCreateMod } from '@/features/panel/mutations/mods/useCreateMod.mutation'
import { modCreateSchema, ModCreateSchemaProps } from '@/features/panel/schemas/mod.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export type ModCreateDrawerProps = { gameId: string }

export default function ModCreateDrawer({ gameId }: ModCreateDrawerProps) {
  const tActions = useTranslations('global.actions')
  const t = useTranslations('panel.mods.create')

  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<ModCreateSchemaProps>({
    mode: 'onSubmit',
    resolver: zodResolver(modCreateSchema),
    defaultValues: {
      gameId,
      title: '',
      description: '',
      slug: '',
      logo: '',
      body: '',
    },
  })

  const { mutate: mutateCreateMod, isPending: isPendingCreateMod } = useCreateMod()

  function onSubmit(values: ModCreateSchemaProps) {
    mutateCreateMod(values, {
      onSuccess: (res) => {
        toast.success(t('success', { name: res[0].title }))

        setOpen(false)
        form.reset(form.formState.defaultValues)
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
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">{t('title-label')}</FieldLabel>

                  <Input
                    {...field}
                    id="title"
                    type="text"
                    placeholder={t('title-placeholder')}
                    required
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="logo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="logo">{t('logo-label')}</FieldLabel>

                  <Input
                    {...field}
                    id="logo"
                    type="text"
                    placeholder={t('logo-placeholder')}
                    required
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="slug"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="slug">{t('slug-label')}</FieldLabel>

                  <Input
                    {...field}
                    id="slug"
                    type="text"
                    placeholder={t('slug-placeholder')}
                    required
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">{t('description-label')}</FieldLabel>

                  <Textarea
                    {...field}
                    id="description"
                    autoComplete="off"
                    placeholder={t('description-placeholder')}
                    required
                    rows={5}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="body"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="body">{t('body-label')}</FieldLabel>

                  <RichTextEditor content={field.value} onChange={field.onChange} />
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

          <SubmitButton onClick={form.handleSubmit(onSubmit)} loading={isPendingCreateMod}>
            {tActions('submit')}
          </SubmitButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
