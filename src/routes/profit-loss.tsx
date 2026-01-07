import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

export const Route = createFileRoute('/profit-loss')({
  component: ProfitLossPage,
})

const monthlyData = [
  { month: 'Jan', revenue: 245000, costs: 186000, profit: 59000 },
  { month: 'Feb', revenue: 258000, costs: 192000, profit: 66000 },
  { month: 'Mar', revenue: 242000, costs: 188000, profit: 54000 },
  { month: 'Apr', revenue: 275000, costs: 198000, profit: 77000 },
  { month: 'May', revenue: 290000, costs: 208000, profit: 82000 },
  { month: 'Jun', revenue: 284520, costs: 216280, profit: 68240 },
]

const productProfitability = [
  {
    product: 'Product A - Standard',
    revenue: 125000,
    cost: 85000,
    profit: 40000,
    margin: 32,
  },
  {
    product: 'Product B - Premium',
    revenue: 98500,
    cost: 58000,
    profit: 40500,
    margin: 41,
  },
  {
    product: 'Product C - Economy',
    revenue: 61020,
    cost: 48280,
    profit: 12740,
    margin: 21,
  },
]

const clientProfitability = [
  {
    client: 'Store A - Downtown',
    revenue: 85000,
    orders: 45,
    avgOrder: 1889,
    margin: 28,
  },
  {
    client: 'Store B - Uptown',
    revenue: 72000,
    orders: 38,
    avgOrder: 1895,
    margin: 32,
  },
  {
    client: 'Store C - West Side',
    revenue: 68500,
    orders: 52,
    avgOrder: 1317,
    margin: 25,
  },
  {
    client: 'Store D - East End',
    revenue: 59020,
    orders: 29,
    avgOrder: 2035,
    margin: 35,
  },
]

function ProfitLossPage() {
  const currentMonth = monthlyData[monthlyData.length - 1]
  const previousMonth = monthlyData[monthlyData.length - 2]

  const revenueChange = (
    ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) *
    100
  ).toFixed(1)
  const profitChange = (
    ((currentMonth.profit - previousMonth.profit) / previousMonth.profit) *
    100
  ).toFixed(1)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Profit & Loss</h1>
          <p className="page-description">
            Financial performance insights and profitability analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4" />
            This Month
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card bg-linear-to-br from-success/10 to-success/5 border-success/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-foreground mt-1">
                ${(currentMonth.revenue / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-success flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4" />
                {revenueChange}% from last month
              </p>
            </div>
            <div className="p-3 rounded-xl bg-success/20">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>

        <div className="stat-card bg-linear-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Costs
              </p>
              <p className="text-3xl font-bold text-foreground mt-1">
                ${(currentMonth.costs / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                76% of revenue
              </p>
            </div>
            <div className="p-3 rounded-xl bg-destructive/20">
              <TrendingDown className="w-6 h-6 text-destructive" />
            </div>
          </div>
        </div>

        <div className="stat-card bg-linear-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Net Profit
              </p>
              <p className="text-3xl font-bold text-foreground mt-1">
                ${(currentMonth.profit / 1000).toFixed(1)}K
              </p>
              <p
                className={`text-sm flex items-center gap-1 mt-1 ${
                  Number(profitChange) >= 0
                    ? 'text-success'
                    : 'text-destructive'
                }`}
              >
                {Number(profitChange) >= 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {profitChange}% from last month
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary/20">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Profit Margin
              </p>
              <p className="text-3xl font-bold text-foreground mt-1">24%</p>
              <p className="text-sm text-muted-foreground mt-1">Target: 25%</p>
            </div>
            <div className="p-3 rounded-xl bg-chart-4/20">
              <TrendingUp className="w-6 h-6 text-chart-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly P&L Chart */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Monthly Performance
        </h3>
        <div className="h-87.5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} barGap={0}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(214, 32%, 91%)"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(214, 32%, 91%)',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  '',
                ]}
              />
              <Legend />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="hsl(142, 76%, 36%)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="costs"
                name="Costs"
                fill="hsl(0, 84%, 60%)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="profit"
                name="Profit"
                fill="hsl(221, 83%, 53%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Profitability Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Profitability */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">
              Product Profitability
            </h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Revenue</th>
                <th>Profit</th>
                <th>Margin</th>
              </tr>
            </thead>
            <tbody>
              {productProfitability.map((product) => (
                <tr key={product.product} className="hover:bg-muted/50">
                  <td className="font-medium">{product.product}</td>
                  <td>${(product.revenue / 1000).toFixed(0)}K</td>
                  <td className="text-success font-medium">
                    ${(product.profit / 1000).toFixed(0)}K
                  </td>
                  <td>
                    <span
                      className={
                        product.margin >= 30
                          ? 'badge-success'
                          : product.margin >= 25
                            ? 'badge-primary'
                            : 'badge-warning'
                      }
                    >
                      {product.margin}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Client Profitability */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">
              Client Profitability
            </h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Revenue</th>
                <th>Avg Order</th>
                <th>Margin</th>
              </tr>
            </thead>
            <tbody>
              {clientProfitability.map((client) => (
                <tr key={client.client} className="hover:bg-muted/50">
                  <td className="font-medium">{client.client}</td>
                  <td>${(client.revenue / 1000).toFixed(0)}K</td>
                  <td>${client.avgOrder.toLocaleString()}</td>
                  <td>
                    <span
                      className={
                        client.margin >= 30
                          ? 'badge-success'
                          : client.margin >= 25
                            ? 'badge-primary'
                            : 'badge-warning'
                      }
                    >
                      {client.margin}%
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
