'use client'

import { ChevronsUpDown } from 'lucide-react'

import LanguageSelector from '@/components/common/language-selector'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { authHooks } from '@/features/auth/hooks/auth.hook'
import Logout from '@/features/panel/components/common/logout'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'

export function NavUser() {
  const t = useTranslations('panel.sidebar.user-nav')

  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <NavUser.Identity />

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <NavUser.Identity />
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <LanguageSelector className="mt-2 mb-1 w-full" />

            <Logout>
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start text-start font-normal"
              >
                <Icon icon="ph:sign-out" className="size-5" />

                {t('logout')}
              </Button>
            </Logout>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

NavUser.Identity = function Identity() {
  const user = authHooks.useCurrentUser()

  return (
    <>
      <Avatar className="size-9 rounded-lg">
        <AvatarFallback className="rounded-lg">A</AvatarFallback>
      </Avatar>

      <div className="grid flex-1 gap-0.5 text-left text-[13px] leading-tight">
        <span className="text-muted-foreground truncate font-medium">Admin</span>

        <span className="truncate text-xs">{user ? user.email : null}</span>
      </div>
    </>
  )
}
