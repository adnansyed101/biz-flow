import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

const invoices = [
  {
    id: 'INV-2024-0234',
    client: 'Store A - Downtown',
    date: '2024-01-15',
    dueDate: '2024-01-30',
    amount: 12500,
    paid: 12500,
    status: 'paid',
  },
  {
    id: 'INV-2024-0233',
    client: 'Store B - Uptown',
    date: '2024-01-14',
    dueDate: '2024-01-29',
    amount: 8200,
    paid: 5000,
    status: 'partial',
  },
  {
    id: 'INV-2024-0232',
    client: 'Store C - West Side',
    date: '2024-01-10',
    dueDate: '2024-01-25',
    amount: 15800,
    paid: 0,
    status: 'overdue',
  },
  {
    id: 'INV-2024-0231',
    client: 'Store D - East End',
    date: '2024-01-08',
    dueDate: '2024-01-23',
    amount: 6400,
    paid: 0,
    status: 'pending',
  },
]

export const Route = createFileRoute('/invoicing')({
  component: InvoicingPage,
})

function InvoicingPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return 'badge-success'
      case 'partial':
        return 'badge-primary'
      case 'overdue':
        return 'badge-destructive'
      default:
        return 'badge-warning'
    }
  }

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paid, 0)
  const totalOverdue = invoices
    .filter((inv) => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount - inv.paid, 0)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Invoicing & Payments</h1>
          <p className="page-description">
            Generate invoices and track payment collections
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Create Invoice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                ${(totalAmount / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-muted-foreground">Total Invoiced</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-success/10">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                ${(totalPaid / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-muted-foreground">Collected</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-warning/10">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-destructive/10">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                ${(totalOverdue / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-muted-foreground">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search invoices..." className="pl-10" />
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

      {/* Invoices Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Client</th>
              <th>Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-muted/50">
                <td className="font-medium text-primary">{invoice.id}</td>
                <td>{invoice.client}</td>
                <td>{invoice.date}</td>
                <td>{invoice.dueDate}</td>
                <td className="font-medium">
                  ${invoice.amount.toLocaleString()}
                </td>
                <td className="text-success">
                  ${invoice.paid.toLocaleString()}
                </td>
                <td
                  className={
                    invoice.amount - invoice.paid > 0
                      ? 'text-destructive font-medium'
                      : ''
                  }
                >
                  ${(invoice.amount - invoice.paid).toLocaleString()}
                </td>
                <td>
                  <span className={getStatusBadge(invoice.status)}>
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
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

      {/* Payment Methods Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-success/10">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
            <h3 className="font-semibold text-foreground">Cash on Delivery</h3>
          </div>
          <p className="text-2xl font-bold text-foreground">$45,200</p>
          <p className="text-sm text-muted-foreground mt-1">
            Collected this month
          </p>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Advance Payments</h3>
          </div>
          <p className="text-2xl font-bold text-foreground">$28,500</p>
          <p className="text-sm text-muted-foreground mt-1">
            Received this month
          </p>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-warning/10">
              <FileText className="w-5 h-5 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground">Credit Sales</h3>
          </div>
          <p className="text-2xl font-bold text-foreground">$34,520</p>
          <p className="text-sm text-muted-foreground mt-1">
            Outstanding balance
          </p>
        </div>
      </div>
    </div>
  )
}
