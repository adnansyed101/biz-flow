import { useNavigate } from "react-router-dom";
import {
  Package,
  Factory,
  Truck,
  FileText,
  Calculator,
  Users,
  ArrowRight,
} from "lucide-react";

const modules = [
  {
    name: "Procurement",
    description: "Manage suppliers and raw materials",
    href: "/procurement",
    icon: Package,
    stats: "23 pending orders",
    color: "bg-chart-1/10 text-chart-1",
  },
  {
    name: "Production",
    description: "Track batches and output",
    href: "/production",
    icon: Factory,
    stats: "5 active batches",
    color: "bg-chart-2/10 text-chart-2",
  },
  {
    name: "Distribution",
    description: "Manage deliveries and logistics",
    href: "/distribution",
    icon: Truck,
    stats: "12 in transit",
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    name: "Invoicing",
    description: "Generate and track invoices",
    href: "/invoicing",
    icon: FileText,
    stats: "8 pending payments",
    color: "bg-chart-4/10 text-chart-4",
  },
  {
    name: "Accounting",
    description: "Track costs and expenses",
    href: "/accounting",
    icon: Calculator,
    stats: "Updated today",
    color: "bg-primary/10 text-primary",
  },
  {
    name: "HR & Payroll",
    description: "Manage workforce costs",
    href: "/hr",
    icon: Users,
    stats: "45 employees",
    color: "bg-chart-5/10 text-chart-5",
  },
];

const ModuleCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modules.map((module, index) => (
        <div
          key={module.name}
          onClick={() => navigate(module.href)}
          className="module-card group animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-xl ${module.color}`}>
              <module.icon className="w-6 h-6" />
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-foreground">
              {module.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {module.description}
            </p>
            <p className="text-sm font-medium text-primary mt-3">
              {module.stats}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleCards;
