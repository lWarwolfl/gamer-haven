'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useLinks } from '@/lib/hooks/useLinks.hook'
import { usePathHelper } from '@/lib/hooks/usePathHelper.hook'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function NavMain() {
  const t = useTranslations('panel.sidebar.main-nav')
  const { panelItems } = useLinks()
  const { doseIncludePath, isCurrentPath } = usePathHelper()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t('title')}</SidebarGroupLabel>

      <SidebarMenu>
        {panelItems
          .filter((item) => item.type === 'main')
          .map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                className={cn({ 'pointer-events-none': isCurrentPath(item.path) })}
                variant={
                  item.path === '/admin/dashboard'
                    ? isCurrentPath(item.path)
                      ? 'outline'
                      : 'default'
                    : doseIncludePath(item.path)
                      ? 'outline'
                      : 'default'
                }
                asChild
              >
                <Link href={item.path}>
                  <Icon icon={item.icon} className="size-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
