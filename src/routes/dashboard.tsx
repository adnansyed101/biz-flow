import { createFileRoute } from '@tanstack/react-router'
import {
  DollarSign,
  TrendingUp,
  Package,
  Truck,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import StatCard from '@/components/dasboard/StatCard'
import RecentActivity from '@/components/dasboard/RecentActivity'
import ModuleCards from '@/components/dasboard/ModuleCards'
import RevenueChart from '@/components/dasboard/RevenueChart'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="page-header">Dashboard Overview</h1>
        <p className="page-description">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$284,520"
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-green-600/10 text-success"
        />
        <StatCard
          title="Net Profit"
          value="$68,240"
          change="+8.2% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          title="Inventory Value"
          value="$145,800"
          change="1,234 items in stock"
          changeType="neutral"
          icon={Package}
          iconColor="bg-chart-3/10 text-chart-3"
        />
        <StatCard
          title="Pending Deliveries"
          value="38"
          change="12 dispatched today"
          changeType="neutral"
          icon={Truck}
          iconColor="bg-chart-4/10 text-chart-4"
        />
      </div>

      {/* Alerts Banner */}
      <div className="flex items-center gap-4 p-4 bg-warning/10 border border-warning/20 rounded-xl">
        <AlertCircle className="w-5 h-5 text-warning" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            5 invoices are overdue and require attention
          </p>
          <p className="text-sm text-muted-foreground">
            Total outstanding: $23,450
          </p>
        </div>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View details →
        </button>
      </div>

      {/* Charts & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Quick Access Modules */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Access
        </h2>
        <ModuleCards />
      </div>

      {/* Key Metrics Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            This Month's Performance
          </h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>This Month</th>
              <th>Last Month</th>
              <th>Change</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium">Procurement Costs</td>
              <td>$45,230</td>
              <td>$42,180</td>
              <td className="text-destructive flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" /> +7.2%
              </td>
              <td>
                <span className="badge-warning">Above Target</span>
              </td>
            </tr>
            <tr>
              <td className="font-medium">Production Output</td>
              <td>12,450 units</td>
              <td>11,230 units</td>
              <td className="text-success flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" /> +10.9%
              </td>
              <td>
                <span className="badge-success">On Track</span>
              </td>
            </tr>
            <tr>
              <td className="font-medium">Delivery Rate</td>
              <td>96.5%</td>
              <td>94.2%</td>
              <td className="text-success flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" /> +2.3%
              </td>
              <td>
                <span className="badge-success">Excellent</span>
              </td>
            </tr>
            <tr>
              <td className="font-medium">Payment Collection</td>
              <td>$198,450</td>
              <td>$185,320</td>
              <td className="text-success flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" /> +7.1%
              </td>
              <td>
                <span className="badge-primary">Improving</span>
              </td>
            </tr>
            <tr>
              <td className="font-medium">Outstanding Receivables</td>
              <td>$34,520</td>
              <td>$38,450</td>
              <td className="text-success flex items-center gap-1">
                <ArrowDownRight className="w-4 h-4" /> -10.2%
              </td>
              <td>
                <span className="badge-success">Improving</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
