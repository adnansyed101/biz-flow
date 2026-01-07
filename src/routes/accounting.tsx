import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Calculator,
  Plus,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'

export const Route = createFileRoute('/accounting')({
  component: AccountingPage,
})

const costBreakdown = [
  { name: 'Procurement', value: 45230, color: 'hsl(221, 83%, 53%)' },
  { name: 'Production', value: 28450, color: 'hsl(142, 76%, 36%)' },
  { name: 'Distribution', value: 12800, color: 'hsl(38, 92%, 50%)' },
  { name: 'HR & Payroll', value: 35200, color: 'hsl(280, 67%, 54%)' },
  { name: 'Operations', value: 8500, color: 'hsl(0, 84%, 60%)' },
]

const expenses = [
  {
    id: 1,
    date: '2024-01-15',
    category: 'Procurement',
    description: 'Raw materials - Supplier ABC',
    amount: 15200,
  },
  {
    id: 2,
    date: '2024-01-14',
    category: 'Distribution',
    description: 'Fuel and logistics',
    amount: 2450,
  },
  {
    id: 3,
    date: '2024-01-14',
    category: 'Production',
    description: 'Equipment maintenance',
    amount: 3200,
  },
  {
    id: 4,
    date: '2024-01-13',
    category: 'Operations',
    description: 'Utilities - Electricity',
    amount: 1850,
  },
  {
    id: 5,
    date: '2024-01-12',
    category: 'HR & Payroll',
    description: 'Weekly wages payout',
    amount: 12500,
  },
]

function AccountingPage() {
  const totalCosts = costBreakdown.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Accounting & Cost Management</h1>
          <p className="page-description">
            Track expenses and manage cost centers across the business
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Add Expense
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-destructive/10">
              <TrendingDown className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                ${(totalCosts / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-muted-foreground">Total Costs</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-success/10">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$284.5K</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$68.2K</p>
              <p className="text-sm text-muted-foreground">Net Profit</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-chart-3/10">
              <Calculator className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24%</p>
              <p className="text-sm text-muted-foreground">Profit Margin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Breakdown Chart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Cost Breakdown
          </h3>
          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    '',
                  ]}
                  contentStyle={{
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(214, 32%, 91%)',
                    borderRadius: '8px',
                  }}
                />
                <Legend
                  formatter={(value) => (
                    <span className="text-sm text-foreground">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost by Category */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Cost by Category
          </h3>
          <div className="space-y-4">
            {costBreakdown.map((item) => {
              const percentage = ((item.value / totalCosts) * 100).toFixed(1)
              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ${item.value.toLocaleString()} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Recent Expenses
          </h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-muted/50">
                <td>{expense.date}</td>
                <td>
                  <span className="badge-primary">{expense.category}</span>
                </td>
                <td>{expense.description}</td>
                <td className="font-medium text-destructive">
                  -${expense.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
