import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Users,
  Plus,
  Search,
  Filter,
  Briefcase,
  Factory,
  Truck,
  DollarSign,
} from 'lucide-react'

export const Route = createFileRoute('/hr')({
  component: HRPage,
})

const employees = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Production Manager',
    department: 'Production',
    salary: 4500,
    type: 'monthly',
  },
  {
    id: 2,
    name: 'Jane Doe',
    role: 'Delivery Driver',
    department: 'Distribution',
    salary: 150,
    type: 'daily',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Warehouse Worker',
    department: 'Production',
    salary: 120,
    type: 'daily',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    role: 'Accountant',
    department: 'Operations',
    salary: 3800,
    type: 'monthly',
  },
  {
    id: 5,
    name: 'Tom Brown',
    role: 'Procurement Officer',
    department: 'Operations',
    salary: 3500,
    type: 'monthly',
  },
]

const costAllocation = [
  { department: 'Production', employees: 18, cost: 28450, percentage: 45 },
  { department: 'Distribution', employees: 12, cost: 18200, percentage: 29 },
  { department: 'Operations', employees: 15, cost: 16550, percentage: 26 },
]

function HRPage() {
  const totalMonthlyCost = costAllocation.reduce((sum, d) => sum + d.cost, 0)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">HR & Payroll</h1>
          <p className="page-description">
            Manage workforce costs and labor allocation
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">45</p>
              <p className="text-sm text-muted-foreground">Total Employees</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-chart-2/10">
              <Factory className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">18</p>
              <p className="text-sm text-muted-foreground">Production Staff</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-chart-3/10">
              <Truck className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Delivery Staff</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-success/10">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                ${(totalMonthlyCost / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-muted-foreground">Monthly Payroll</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Allocation */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          HR Cost Allocation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {costAllocation.map((dept) => (
            <div key={dept.department} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                {dept.department === 'Production' ? (
                  <Factory className="w-5 h-5 text-chart-2" />
                ) : dept.department === 'Distribution' ? (
                  <Truck className="w-5 h-5 text-chart-3" />
                ) : (
                  <Briefcase className="w-5 h-5 text-primary" />
                )}
                <span className="font-medium text-foreground">
                  {dept.department}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Employees</span>
                  <span className="font-medium text-foreground">
                    {dept.employees}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Cost</span>
                  <span className="font-medium text-foreground">
                    ${dept.cost.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {dept.percentage}% of total
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search employees..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Employees Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Pay Type</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-muted/50">
                <td className="font-medium">{employee.name}</td>
                <td>{employee.role}</td>
                <td>
                  <span className="badge-primary">{employee.department}</span>
                </td>
                <td className="capitalize">{employee.type}</td>
                <td className="font-medium">
                  ${employee.salary.toLocaleString()}
                  <span className="text-muted-foreground font-normal">
                    /{employee.type === 'monthly' ? 'mo' : 'day'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
