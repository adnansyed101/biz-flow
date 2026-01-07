import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Factory,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  Package,
} from 'lucide-react'

export const Route = createFileRoute('/production')({
  component: ProductionPage,
})

const batches = [
  {
    id: 'B-2024-089',
    product: 'Product A - Standard',
    startDate: '2024-01-15',
    targetUnits: 500,
    completedUnits: 450,
    status: 'in_progress',
    rawMaterialCost: 2500,
    laborCost: 800,
  },
  {
    id: 'B-2024-088',
    product: 'Product B - Premium',
    startDate: '2024-01-14',
    targetUnits: 300,
    completedUnits: 300,
    status: 'completed',
    rawMaterialCost: 4200,
    laborCost: 1200,
  },
  {
    id: 'B-2024-087',
    product: 'Product A - Standard',
    startDate: '2024-01-13',
    targetUnits: 600,
    completedUnits: 600,
    status: 'completed',
    rawMaterialCost: 3100,
    laborCost: 950,
  },
  {
    id: 'B-2024-086',
    product: 'Product C - Economy',
    startDate: '2024-01-12',
    targetUnits: 1000,
    completedUnits: 750,
    status: 'in_progress',
    rawMaterialCost: 1800,
    laborCost: 600,
  },
]

function ProductionPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Production</h1>
          <p className="page-description">
            Track production batches, output, and manufacturing costs
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          New Batch
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-chart-3/10">
              <Clock className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">5</p>
              <p className="text-sm text-muted-foreground">Active Batches</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-success/10">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12,450</p>
              <p className="text-sm text-muted-foreground">Units This Month</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Factory className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$4.25</p>
              <p className="text-sm text-muted-foreground">Avg Cost/Unit</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-warning/10">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-sm text-muted-foreground">Need Attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search batches..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {batches.map((batch) => {
          const progress = Math.round(
            (batch.completedUnits / batch.targetUnits) * 100,
          )
          const totalCost = batch.rawMaterialCost + batch.laborCost
          const costPerUnit = totalCost / batch.completedUnits

          return (
            <div
              key={batch.id}
              className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {batch.id}
                    </h3>
                    <span
                      className={
                        batch.status === 'completed'
                          ? 'badge-success'
                          : 'badge-warning'
                      }
                    >
                      {batch.status === 'completed'
                        ? 'Completed'
                        : 'In Progress'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {batch.product}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Started</p>
                  <p className="text-sm font-medium text-foreground">
                    {batch.startDate}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      Production Progress
                    </span>
                    <span className="font-medium text-foreground">
                      {batch.completedUnits} / {batch.targetUnits} units
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Cost Breakdown */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Raw Materials
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      ${batch.rawMaterialCost.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Labor Cost</p>
                    <p className="text-sm font-medium text-foreground">
                      ${batch.laborCost.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Cost/Unit</p>
                    <p className="text-sm font-medium text-primary">
                      ${costPerUnit.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Finished Goods Summary */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Finished Goods Inventory
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="p-3 rounded-lg bg-primary/10">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3,450</p>
              <p className="text-sm text-muted-foreground">
                Product A - Standard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="p-3 rounded-lg bg-chart-4/10">
              <Package className="w-6 h-6 text-chart-4" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1,280</p>
              <p className="text-sm text-muted-foreground">
                Product B - Premium
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="p-3 rounded-lg bg-chart-2/10">
              <Package className="w-6 h-6 text-chart-2" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">5,120</p>
              <p className="text-sm text-muted-foreground">
                Product C - Economy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
