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
import { useUpdateGameVersion } from '@/features/panel/mutations/game-versions/useUpdateGameVersion.mutation'
import {
  gameVersionUpdateSchema,
  GameVersionUpdateSchemaProps,
} from '@/features/panel/schemas/gameVersion.schema'
import { TListGameVersionsByGameIdAction } from '@/server/game-version/listGameVersionsByGameId.action'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export type GameVersionUpdateDrawerProps = {
  data: TListGameVersionsByGameIdAction['gameVersions'][number]
}

export default function GameVersionUpdateDrawer({ data }: GameVersionUpdateDrawerProps) {
  const tActions = useTranslations('global.actions')
  const t = useTranslations('panel.game-versions.update')

  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<GameVersionUpdateSchemaProps>({
    mode: 'onSubmit',
    resolver: zodResolver(gameVersionUpdateSchema),
    defaultValues: {
      id: data.id,
      version: data.version,
    },
  })

  const { mutate: mutateUpdateGameVersion, isPending: isPendingUpdateGameVersion } =
    useUpdateGameVersion()

  function onSubmit(values: GameVersionUpdateSchemaProps) {
    mutateUpdateGameVersion(values, {
      onSuccess: (res) => {
        if (res) toast.success(t('success', { name: res[0].version }))

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
          id="game-update-form"
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
                    placeholder="1.21.5"
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

          <SubmitButton onClick={form.handleSubmit(onSubmit)} loading={isPendingUpdateGameVersion}>
            {tActions('save')}
          </SubmitButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
