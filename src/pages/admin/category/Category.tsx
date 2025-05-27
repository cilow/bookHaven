import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import type { CategoryType, Column } from "@/lib/types";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useMemo, useState } from "react";
import { deleteCategory } from "@/services/categoryService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/Spinner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import useCategories from "@/hooks/use-categories";

function Category() {
  const { categories, isLoading, refetch } = useCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryType | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cateColumns = useMemo<Column<CategoryType>[]>(
    () => [
      {
        key: "name",
        label: "Category Name",
      },
      {
        key: "createdAt",
        label: "Created At",
        render: (value) => new Date(value).toLocaleDateString(),
      },
      {
        key: "updatedAt",
        label: "Updated At",
        render: (value) => new Date(value).toLocaleDateString(),
      },
      {
        key: "actions",
        label: "Actions",
        render: (_, category) => (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/admin/categories/${category.id}`}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive"
              onClick={() => {
                setCategoryToDelete(category);
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <Button asChild>
          <Link to="/admin/categories/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Category
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              Manage your categories, edit their details, or remove them.
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

            {categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                <span className="text-lg font-medium">No categories found</span>
                <p className="text-sm text-gray-500 mt-1">
                  Try adding a new category to get started.
                </p>
              </div>
            ) : (
              <DataTable columns={cateColumns} data={filteredCategories} />
            )}
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{categoryToDelete?.name}</strong>? This action cannot be
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
                if (categoryToDelete) {
                  await deleteCategory(categoryToDelete.id);
                  setDialogOpen(false);
                  setCategoryToDelete(null);
                  refetch();
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

export default Category;
