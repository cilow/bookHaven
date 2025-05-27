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
import type { Column, Supplier } from "@/lib/types";
import { deleteSupplierById } from "@/services/supplierService";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import useSuppliers from "@/hooks/useSuppliers";

function Suppliers() {
  const { suppliers, isLoading, refetch } = useSuppliers();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteSupplier, setDeleteSupplier] = useState<Supplier | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const supplierColumns: Column<Supplier>[] = useMemo(
    () => [
      {
        key: "id",
        label: "ID",
      },
      {
        key: "name",
        label: "Supplier Name",
      },
      {
        key: "email",
        label: "Email",
        render: (value: string) => (
          <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
            {value}
          </a>
        ),
      },
      {
        key: "phone",
        label: "Phone",
      },
      {
        key: "address",
        label: "Address",
      },
      {
        key: "actions",
        label: "Actions",
        render: (_, supplier) => (
          <div className="flex justify-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/admin/suppliers/${supplier.id}`}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive cursor-pointer"
              onClick={() => {
                setDeleteSupplier(supplier);
                setDialogOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Suppliers Management</h1>
        <Button asChild>
          <Link to="/admin/suppliers/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Supplier
          </Link>
        </Button>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Suppliers</CardTitle>
            <CardDescription>
              Manage your suppliers, edit their details, or remove them.
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
            {filteredSuppliers.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                <span className="text-lg font-medium">No suppliers found</span>
                <p className="text-sm text-gray-500 mt-1">
                  Try adding a new supplier to get started.
                </p>
              </div>
            ) : (
              <DataTable columns={supplierColumns} data={filteredSuppliers} />
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteSupplier?.name}</strong>? This action cannot be
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
                if (deleteSupplier) {
                  await deleteSupplierById(deleteSupplier.id);
                  setDialogOpen(false);
                  setDeleteSupplier(null);
                  await refetch();
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

export default Suppliers;
