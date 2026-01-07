import * as React from 'react'
import { NavMain } from '@/components/sidebar/nav-main'
import { NavUser } from '@/components/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Links } from '@/lib/types/general.type'
import { Building2 } from 'lucide-react'

// This is sample data.
const user = {
  name: 'Md Adnan',
  email: 'adnan.arbree.solutions@gmail.com',
  avatar: '/demo.jpg',
  role: 'hr',
}

type AppSidebarProps = {
  links: Links
  props?: React.ComponentProps<typeof Sidebar>
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ links, ...props }) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">
              BusinessCore
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {links.map((link) => (
          <NavMain key={link.label} links={link} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
