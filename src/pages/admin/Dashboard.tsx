import { Card, CardContent } from "@/components/ui/card";
import useBooks from "@/hooks/useBooks";
import { useOrders } from "@/hooks/user-orders";

import {
  BookOpen,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo } from "react";

function Dashboard() {
  const { books } = useBooks();
  const { orders } = useOrders();
  const stats = useMemo(
    () => [
      {
        title: "Total Revenue",
        value: "$12,345.67",
        description: "Last 30 days",
        icon: <DollarSign className="h-5 w-5 text-muted-foreground" />,
        change: "+12.5%",
        trend: "up",
      },
      {
        title: "Orders",
        value: String(orders.length),
        description: "Last 30 days",
        icon: <ShoppingCart className="h-5 w-5 text-muted-foreground" />,
        change: "+8.2%",
        trend: "up",
      },
      {
        title: "Products",
        value: String(books.length),
        description: "Total books",
        icon: <BookOpen className="h-5 w-5 text-muted-foreground" />,
        change: "+4",
        trend: "up",
      },
      {
        title: "Customers",
        value: "1,234",
        description: "Total registered",
        icon: <Users className="h-5 w-5 text-muted-foreground" />,
        change: "+21.3%",
        trend: "up",
      },
    ],
    [books.length, orders.length]
  );

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full p-2 bg-muted">{stat.icon}</div>
              </div>
              <div className="flex items-center mt-4">
                <span
                  className={`text-xs font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  } flex items-center`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                  )}
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
