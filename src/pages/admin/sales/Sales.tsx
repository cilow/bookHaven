import { DataTable } from "@/components/DataTable";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import type { Column, Sale } from "@/lib/types";
import { fetchSales } from "@/services/salesService";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
export const saleColumns: Column<Sale>[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "saleDate",
    label: "Sale Date",
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    key: "total",
    label: "Total",
    render: (value) => `$${value.toFixed(2)}`,
  },
  {
    key: "user",
    label: "User",
    render: (_, item) => item.user?.name ?? "Unknown",
  },
  {
    key: "actions",
    label: "Actions",
    render: (_, order: Sale) => (
      <div className="flex justify-center gap-2">
        <Button variant="ghost" size="icon" asChild className=" cursor-pointer">
          <Link to={`/admin/sales/${order.id}`}>
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

function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const loadBooks = async () => {
        try {
          const data = await fetchSales();
          setSales(data);
        } catch (error) {
          console.error("Failed to fetch Sales:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadBooks();
    }, 300);

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) return <Spinner />;
  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sales Management</h1>
        <Button asChild>
          <Link to="/admin/sales/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Sale
          </Link>
        </Button>
      </div>
      <DataTable columns={saleColumns} data={sales} />
    </div>
  );
}

export default Sales;
