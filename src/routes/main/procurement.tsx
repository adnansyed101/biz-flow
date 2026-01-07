import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Building,
  Truck,
  AlertCircle,
} from 'lucide-react'

export const Route = createFileRoute('/main/procurement')({
  component: ProcurementPage,
})

const suppliers = [
  {
    id: 1,
    name: 'ABC Raw Materials',
    contact: 'John Smith',
    email: 'john@abcraw.com',
    outstanding: 12500,
    orders: 45,
    status: 'active',
  },
  {
    id: 2,
    name: 'XYZ Supplies Co',
    contact: 'Jane Doe',
    email: 'jane@xyzsupplies.com',
    outstanding: 8200,
    orders: 32,
    status: 'active',
  },
  {
    id: 3,
    name: 'Global Materials Ltd',
    contact: 'Mike Johnson',
    email: 'mike@globalmats.com',
    outstanding: 0,
    orders: 28,
    status: 'active',
  },
]

const purchaseOrders = [
  {
    id: 'PO-2024-0156',
    supplier: 'ABC Raw Materials',
    date: '2024-01-15',
    items: 5,
    total: 15200,
    status: 'pending',
  },
  {
    id: 'PO-2024-0155',
    supplier: 'XYZ Supplies Co',
    date: '2024-01-14',
    items: 3,
    total: 8450,
    status: 'approved',
  },
  {
    id: 'PO-2024-0154',
    supplier: 'Global Materials Ltd',
    date: '2024-01-13',
    items: 8,
    total: 22100,
    status: 'received',
  },
  {
    id: 'PO-2024-0153',
    supplier: 'ABC Raw Materials',
    date: '2024-01-12',
    items: 4,
    total: 11800,
    status: 'received',
  },
]

function ProcurementPage() {
  const [activeTab, setActiveTab] = useState<
    'orders' | 'suppliers' | 'materials'
  >('orders')

  return (
    
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Procurement</h1>
          <p className="page-description">
            Manage suppliers, purchase orders, and raw material inventory
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          New Purchase Order
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">23</p>
              <p className="text-sm text-muted-foreground">Pending Orders</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-success/10">
              <Building className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Active Suppliers</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-chart-3/10">
              <Truck className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$45.2K</p>
              <p className="text-sm text-muted-foreground">This Month</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-warning/10">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$20.7K</p>
              <p className="text-sm text-muted-foreground">Outstanding</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit">
        {[
          { id: 'orders', label: 'Purchase Orders' },
          { id: 'suppliers', label: 'Suppliers' },
          { id: 'materials', label: 'Raw Materials' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Purchase Orders Table */}
      {activeTab === 'orders' && (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Supplier</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50">
                  <td className="font-medium text-primary">{order.id}</td>
                  <td>{order.supplier}</td>
                  <td>{order.date}</td>
                  <td>{order.items} items</td>
                  <td className="font-medium">
                    ${order.total.toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={
                        order.status === 'received'
                          ? 'badge-success'
                          : order.status === 'approved'
                            ? 'badge-primary'
                            : 'badge-warning'
                      }
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Suppliers Table */}
      {activeTab === 'suppliers' && (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Total Orders</th>
                <th>Outstanding</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-muted/50">
                  <td className="font-medium">{supplier.name}</td>
                  <td>{supplier.contact}</td>
                  <td className="text-muted-foreground">{supplier.email}</td>
                  <td>{supplier.orders}</td>
                  <td className="font-medium">
                    ${supplier.outstanding.toLocaleString()}
                  </td>
                  <td>
                    <span className="badge-success">Active</span>
                  </td>
                  <td>
                    <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Materials Table */}
      {activeTab === 'materials' && (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Raw Materials Catalog
          </h3>
          <p className="text-muted-foreground mb-4">
            Manage your raw material inventory and stock levels
          </p>
          <Button>
            <Plus className="w-4 h-4" />
            Add Material
          </Button>
        </div>
      )}
    </div>
  )
}
