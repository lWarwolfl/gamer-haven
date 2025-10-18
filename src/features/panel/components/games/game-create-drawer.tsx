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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCreateGame } from '@/features/panel/mutations/games/useCreateGame.mutation'
import { gameCreateSchema, GameCreateSchemaProps } from '@/features/panel/schemas/game.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function GameCreateDrawer() {
  const tActions = useTranslations('global.actions')
  const t = useTranslations('panel.games.create')

  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<GameCreateSchemaProps>({
    mode: 'onSubmit',
    resolver: zodResolver(gameCreateSchema),
    defaultValues: {
      title: '',
      description: '',
      slug: '',
      images: [{ url: '' }],
      logo: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'images',
  })

  const { mutate: mutateCreateGame, isPending: isPendingCreateGame } = useCreateGame()

  function onSubmit(values: GameCreateSchemaProps) {
    mutateCreateGame(values, {
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
                    placeholder={t('images-placeholder')}
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

            <div className="flex flex-col gap-3">
              <Label>{t('images-label')}</Label>

              <Button
                type="button"
                variant="outline"
                onClick={() => append({ url: '' })}
                disabled={fields.length >= 10}
                className="flex-1"
              >
                {t('add')} <Icon icon="ph:plus" className="size-5" />
              </Button>

              {fields.map((field, index) => (
                <Controller
                  key={`images.${index}.url`}
                  name={`images.${index}.url`}
                  control={form.control}
                  render={({ field: { ...field }, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="relative">
                      <div className="flex items-center gap-2">
                        <Input
                          {...field}
                          id={`image-file-${index}`}
                          type="text"
                          autoComplete="off"
                          placeholder={t('images-placeholder')}
                          aria-invalid={fieldState.invalid}
                        />

                        <Button size="icon" variant="outline" onClick={() => remove(index)}>
                          <Icon icon="ph:x" className="text-destructive size-4.5" />

                          <span className="sr-only">{t('delete')}</span>
                        </Button>
                      </div>

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              ))}
            </div>
          </FieldGroup>
        </form>

        <DrawerFooter className="mx-auto max-w-3xl max-sm:w-full sm:flex-row">
          <DrawerClose asChild>
            <Button variant="outline">{tActions('cancel')}</Button>
          </DrawerClose>

          <SubmitButton onClick={form.handleSubmit(onSubmit)} loading={isPendingCreateGame}>
            {tActions('submit')}
          </SubmitButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
