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
import { useCreateGameVersion } from '@/features/panel/mutations/game-versions/useCreateGameVersion.mutation'
import {
  gameVersionCreateSchema,
  GameVersionCreateSchemaProps,
} from '@/features/panel/schemas/gameVersion.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export type GameVersionCreateDrawerProps = { gameId: string }

export default function GameVersionCreateDrawer({ gameId }: GameVersionCreateDrawerProps) {
  const tActions = useTranslations('global.actions')
  const t = useTranslations('panel.game-versions.create')

  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<GameVersionCreateSchemaProps>({
    mode: 'onSubmit',
    resolver: zodResolver(gameVersionCreateSchema),
    defaultValues: {
      gameId,
      version: '',
    },
  })

  const { mutate: mutateCreateGameVersion, isPending: isPendingCreateGameVersion } =
    useCreateGameVersion()

  function onSubmit(values: GameVersionCreateSchemaProps) {
    mutateCreateGameVersion(values, {
      onSuccess: (res) => {
        toast.success(t('success', { name: res[0].version }))

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
              name="version"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">{t('version-label')}</FieldLabel>

                  <Input
                    {...field}
                    id="title"
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

          <SubmitButton onClick={form.handleSubmit(onSubmit)} loading={isPendingCreateGameVersion}>
            {tActions('submit')}
          </SubmitButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
