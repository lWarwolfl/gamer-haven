'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { useMediaQuery } from '@/lib/hooks/useMediaQuery.hook'
import { useTranslations } from 'next-intl'

export type ResponsiveDialogProps = React.PropsWithChildren & {
  trigger: React.ReactNode
  action: React.ReactNode
  title: string
  description: string
}

export function ResponsiveDialog({
  children,
  trigger,
  action,
  title,
  description,
}: ResponsiveDialogProps) {
  const t = useTranslations('responsive-dialog')

  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>

            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {children}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t('cancel')}</Button>
            </DialogClose>

            {action}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>

          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        {children}

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{t('cancel')}</Button>
          </DrawerClose>

          {action}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
