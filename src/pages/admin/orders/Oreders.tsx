import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/user-orders";
import type { Column, OrderType } from "@/lib/types";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";

const columns: Column<OrderType>[] = [
  { key: "id", label: "Order ID" },
  {
    key: "user",
    label: "User",
    render: (_, order) => (
      <div>
        <p className="font-medium">{order.user.name}</p>
        <p className="text-xs text-muted-foreground">{order.user.email}</p>
      </div>
    ),
  },
  { key: "orderDate", label: "Order Date" },
  { key: "items", label: "Items" },
  { key: "total", label: "Total ($)" },
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      let color = "";

      switch (value.toLowerCase()) {
        case "pending":
          color = "bg-yellow-100 text-yellow-800";
          break;
        case "shipped":
          color = "bg-blue-100 text-blue-800";
          break;
        case "delivered":
          color = "bg-green-100 text-green-800";
          break;
        case "cancelled":
          color = "bg-red-100 text-red-800";
          break;
        default:
          color = "bg-gray-100 text-gray-800";
      }

      return (
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}
        >
          {value}
        </span>
      );
    },
  },
  {
    key: "actions",
    label: "Actions",
    render: (_, order: OrderType) => (
      <div className="flex justify-center gap-2">
        <Button variant="ghost" className=" cursor-pointer" size="icon" asChild>
          <Link to={`/admin/users/${order.id}`}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    ),
  },
];

function Orders() {
  const { orders } = useOrders();
  console.log(orders);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <Button asChild>
          <Link to="/admin/orders/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Order
          </Link>
        </Button>
      </div>
      {/* <DataTable columns={columns} data={orders} /> */}
    </div>
  );
}

export default Orders;
