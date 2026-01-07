import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Truck,
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  User,
} from 'lucide-react'

export const Route = createFileRoute('/main/distribution')({
  component: DistributionPage,
})

const deliveries = [
  {
    id: 'DEL-2024-445',
    client: 'Store A - Downtown',
    address: '123 Main St, Downtown',
    items: 50,
    value: 2500,
    status: 'in_transit',
    driver: 'John D.',
    eta: '2:30 PM',
  },
  {
    id: 'DEL-2024-444',
    client: 'Store B - Uptown',
    address: '456 Oak Ave, Uptown',
    items: 35,
    value: 1750,
    status: 'delivered',
    driver: 'Mike S.',
    eta: 'Completed',
  },
  {
    id: 'DEL-2024-443',
    client: 'Store C - West Side',
    address: '789 Pine Rd, West Side',
    items: 80,
    value: 4200,
    status: 'pending',
    driver: 'Pending',
    eta: 'Tomorrow',
  },
  {
    id: 'DEL-2024-442',
    client: 'Store D - East End',
    address: '321 Elm Blvd, East End',
    items: 25,
    value: 1200,
    status: 'returned',
    driver: 'Tom K.',
    eta: 'Returned',
  },
]

const clients = [
  {
    name: 'Store A - Downtown',
    orders: 45,
    revenue: 125000,
    outstanding: 5200,
  },
  { name: 'Store B - Uptown', orders: 38, revenue: 98500, outstanding: 3100 },
  {
    name: 'Store C - West Side',
    orders: 52,
    revenue: 142000,
    outstanding: 8400,
  },
  { name: 'Store D - East End', orders: 29, revenue: 76200, outstanding: 0 },
]

function DistributionPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-success" />
      case 'in_transit':
        return <Truck className="w-4 h-4 text-primary animate-pulse-soft" />
      case 'returned':
        return <XCircle className="w-4 h-4 text-destructive" />
      default:
        return <Clock className="w-4 h-4 text-warning" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'badge-success'
      case 'in_transit':
        return 'badge-primary'
      case 'returned':
        return 'badge-destructive'
      default:
        return 'badge-warning'
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Distribution & Delivery</h1>
          <p className="page-description">
            Manage orders, deliveries, and track shipments
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          New Order
        </Button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Truck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">In Transit</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-warning/10">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">26</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-success/10">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-sm text-muted-foreground">Delivered Today</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-chart-3/10">
              <MapPin className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">96.5%</p>
              <p className="text-sm text-muted-foreground">Delivery Rate</p>
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search deliveries..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>
      {/* Deliveries List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Active Deliveries
          </h3>
          {deliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(delivery.status)}
                  <span className="font-medium text-foreground">
                    {delivery.id}
                  </span>
                  <span className={getStatusBadge(delivery.status)}>
                    {delivery.status
                      .replace('_', ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  ${delivery.value.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {delivery.client}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {delivery.items} items
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {delivery.driver}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {delivery.eta}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clients Summary */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">
              Client Summary
            </h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th>Outstanding</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.name} className="hover:bg-muted/50">
                  <td className="font-medium">{client.name}</td>
                  <td>{client.orders}</td>
                  <td>${(client.revenue / 1000).toFixed(0)}K</td>
                  <td>
                    <span
                      className={
                        client.outstanding > 0
                          ? 'text-warning font-medium'
                          : 'text-success'
                      }
                    >
                      ${client.outstanding.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
