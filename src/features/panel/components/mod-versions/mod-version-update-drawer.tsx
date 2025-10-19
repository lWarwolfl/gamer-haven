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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUpdateModVersion } from '@/features/panel/mutations/mod-versions/useUpdateModVersion.mutation'
import { useListGameVersionsByGameId } from '@/features/panel/queries/game-versions/useListGameVersionsByGameId.query'
import {
  modVersionUpdateSchema,
  ModVersionUpdateSchemaProps,
} from '@/features/panel/schemas/modVersion.schema'
import { TListModVersionsByModIdAction } from '@/server/mod-version/listModVersionsByModId.action'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export type ModVersionUpdateDrawerProps = {
  data: TListModVersionsByModIdAction['modVersions'][number]
}

export default function ModVersionUpdateDrawer({ data }: ModVersionUpdateDrawerProps) {
  const tActions = useTranslations('global.actions')
  const t = useTranslations('panel.mod-versions.update')

  const [open, setOpen] = useState<boolean>(false)

  const { data: dataGameVersions, isLoading: isLoadingGameVersions } = useListGameVersionsByGameId({
    limit: 50,
    gameId: data.mod.game.id,
  })

  const form = useForm<ModVersionUpdateSchemaProps>({
    mode: 'onSubmit',
    resolver: zodResolver(modVersionUpdateSchema),
    defaultValues: {
      id: data.id,
      version: data.version,
      description: data.description,
      url: data.url,
      gameVersions: data.modVersionGameVersions.map((item) => {
        return { version: item.gameVersion.id }
      }),
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'gameVersions',
  })

  const { mutate: mutateUpdateModVersion, isPending: isPendingUpdateModVersion } =
    useUpdateModVersion()

  function onSubmit(values: ModVersionUpdateSchemaProps) {
    mutateUpdateModVersion(values, {
      onSuccess: (res) => {
        if (res) toast.success(t('success', { name: res.modVersions[0].version }))

        setOpen(false)
        form.reset(form.formState.defaultValues)
      },
    })
  }

  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <Button size="sm" variant="outline">
          {tActions('update')}
          <Icon icon="ph:pencil-simple-duotone" stroke="2px" className="size-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t('title', { name: data.version })}</DrawerTitle>
          <DrawerDescription>{t('description')}</DrawerDescription>
        </DrawerHeader>

        <form
          id="mod-version-update-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-3xl overflow-x-visible"
        >
          <FieldGroup className="max-h-[75vh] overflow-y-auto px-3 py-1.5">
            <Controller
              name="version"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="version">{t('version-label')}</FieldLabel>

                  <Input
                    {...field}
                    id="version"
                    type="text"
                    placeholder="1.1.0"
                    required
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="url">{t('url-label')}</FieldLabel>

                  <Input
                    {...field}
                    id="url"
                    type="text"
                    placeholder={t('url-placeholder')}
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

                  <Input
                    {...field}
                    id="description"
                    type="text"
                    placeholder={t('description-placeholder')}
                    required
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="flex flex-col gap-3">
              <Label>{t('game-verions-label')}</Label>

              <Button
                type="button"
                variant="outline"
                onClick={() => append({ version: '' })}
                disabled={fields.length >= 10}
                className="flex-1"
              >
                {t('add')} <Icon icon="ph:plus" className="size-5" />
              </Button>

              {fields.map((field, index) => (
                <Controller
                  key={`gameVersions.${index}.version`}
                  name={`gameVersions.${index}.version`}
                  control={form.control}
                  render={({ field: { ...field }, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="relative">
                      <div className="flex items-center gap-2">
                        <Select {...field} disabled={isLoadingGameVersions}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t('game-verions-placeholder')} />
                          </SelectTrigger>

                          <SelectContent>
                            {dataGameVersions
                              ? dataGameVersions.gameVersions.map((item) => (
                                  <SelectItem key={item.id} value={item.id}>
                                    {item.version}
                                  </SelectItem>
                                ))
                              : null}
                          </SelectContent>
                        </Select>

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

          <SubmitButton onClick={form.handleSubmit(onSubmit)} loading={isPendingUpdateModVersion}>
            {tActions('save')}
          </SubmitButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
