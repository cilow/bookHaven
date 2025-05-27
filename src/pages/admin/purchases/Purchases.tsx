import { DataTable } from "@/components/DataTable";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import useSuppliers from "@/hooks/useSuppliers";
import type { Column, PurchaseType } from "@/lib/types";
import { deletePurchase, fetchPurchases } from "@/services/purchaseService";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

function Purchases() {
  const [purchases, setPurchases] = useState<PurchaseType[]>([]);
  const { suppliers } = useSuppliers();
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseDelete, setPurchaseDelete] = useState<PurchaseType | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPurchases = useMemo(() => {
    if (suppliers.length === 0) {
      return [];
    }
    return purchases.filter((purchase) => {
      const supplier = suppliers.find((s) => s.id === purchase.supplier_id);
      if (!supplier) return false;
      return supplier.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [purchases, suppliers, searchQuery]);
  const columns: Column<PurchaseType>[] = [
    {
      key: "supplier_id",
      label: "Supplier",
      render: (value) => {
        const supplier = suppliers.find((s) => s.id === value);
        return (
          <div>
            <p className="font-medium">{supplier?.name}</p>
            <p className="text-xs text-muted-foreground">{supplier?.email}</p>
          </div>
        );
      },
    },
    {
      key: "purchaseDate",
      label: "Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "total",
      label: "Total ($)",
      render: (value: number) => value.toFixed(2),
    },
    {
      key: "notes",
      label: "Notes",
      render: (value: string) => (
        <p className="line-clamp-2 text-sm text-muted-foreground">{value}</p>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, purchase) => (
        <div className="flex justify-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/admin/purchases/${purchase.id}`}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={() => {
              setDialogOpen(true);
              setPurchaseDelete(purchase);
            }}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      ),
    },
  ];
  const loadPurchases = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPurchases();
      // Flatten supplier object to supplier_id
      const flatPurchases = data.map((purchase: any) => ({
        ...purchase,
        supplier_id: purchase.supplier.id,
      }));
      setPurchases(flatPurchases);
    } catch (error) {
      console.error("Failed to fetch Purchases", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadPurchases();
  }, []);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Purchases Management</h1>
        <Button asChild>
          <Link to="/admin/purchases/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Purchase
          </Link>
        </Button>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Purchases</CardTitle>
          <CardDescription>
            Manage your Purchases, edit their details, or remove them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="pl-8 w-full"
              />
            </div>
          </div>
          {isLoading || suppliers.length === 0 ? (
            <Spinner />
          ) : purchases.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
              <span className="text-lg font-medium">No Purchases found</span>
              <p className="text-sm text-gray-500 mt-1">
                Try adding a new purchase to get started.
              </p>
            </div>
          ) : (
            <DataTable columns={columns} data={filteredPurchases} />
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{purchaseDelete?.total}</strong>? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (purchaseDelete) {
                  try {
                    await deletePurchase(Number(purchaseDelete.id));
                    toast.success("Purchase deleted successfully");
                    setDialogOpen(false);
                    setPurchaseDelete(null);
                    await loadPurchases();
                  } catch (error) {
                    toast.error("Failed to delete purchase");
                    console.error("Delete purchase error:", error);
                  }
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Purchases;
