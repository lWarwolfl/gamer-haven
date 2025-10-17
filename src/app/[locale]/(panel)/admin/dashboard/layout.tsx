import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/features/panel/components/common/app-sidebar'
import PanelHeader from '@/features/panel/components/common/panel-header'
import { PropsWithChildren } from 'react'

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PanelHeader />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
