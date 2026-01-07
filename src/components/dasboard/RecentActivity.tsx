import { Package, Factory, Truck, FileText, Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "procurement",
    title: "New purchase order created",
    description: "PO-2024-0156 for raw materials",
    time: "2 hours ago",
    icon: Package,
    iconBg: "bg-chart-1/10 text-chart-1",
  },
  {
    id: 2,
    type: "production",
    title: "Production batch completed",
    description: "Batch #B-2024-089 - 500 units",
    time: "4 hours ago",
    icon: Factory,
    iconBg: "bg-chart-2/10 text-chart-2",
  },
  {
    id: 3,
    type: "delivery",
    title: "Delivery dispatched",
    description: "Order #ORD-2024-445 to Store A",
    time: "5 hours ago",
    icon: Truck,
    iconBg: "bg-chart-3/10 text-chart-3",
  },
  {
    id: 4,
    type: "invoice",
    title: "Invoice paid",
    description: "INV-2024-0234 - $12,500",
    time: "6 hours ago",
    icon: FileText,
    iconBg: "bg-chart-4/10 text-chart-4",
  },
  {
    id: 5,
    type: "procurement",
    title: "Supplier payment processed",
    description: "Payment to Supplier XYZ",
    time: "8 hours ago",
    icon: Package,
    iconBg: "bg-chart-1/10 text-chart-1",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`p-2 rounded-lg ${activity.iconBg}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {activity.description}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
              <Clock className="w-3 h-3" />
              {activity.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
