import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/features/panel/components/app-sidebar'
import PanelHeader from '@/features/panel/components/panel-header'
import { PropsWithChildren } from 'react'

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PanelHeader />

        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
