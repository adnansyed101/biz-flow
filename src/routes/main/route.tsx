import { createFileRoute, Outlet } from '@tanstack/react-router'
import MainLayout from '@/providers/main-layout'

import {
  TrendingUp,
  Package,
  Truck,
  LayoutDashboard,
  Factory,
  FileText,
  Calculator,
  Users,
} from 'lucide-react'

export const Route = createFileRoute('/main')({
  component: RouteComponent,
})

const links = [
  {
    label: 'Essential Linnks',
    items: [
      { title: 'Dashboard', url: '/main/dashboard', icon: LayoutDashboard },
      { title: 'Procurement', url: '/main/procurement', icon: Package },
      { title: 'Production', url: '/main/production', icon: Factory },
      { title: 'Distribution', url: '/main/distribution', icon: Truck },
      { title: 'Invoicing', url: '/main/invoicing', icon: FileText },
      { title: 'Accounting', url: '/main/accounting', icon: Calculator },
      { title: 'HR & Payroll', url: '/main/hr', icon: Users },
      { title: 'Profit & Loss', url: '/main/profit-loss', icon: TrendingUp },
    ],
  },
]

function RouteComponent() {
  return (
    <MainLayout links={links}>
      <Outlet />
    </MainLayout>
  )
}
