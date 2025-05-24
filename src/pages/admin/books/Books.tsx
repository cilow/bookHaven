import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import useBooks from "@/hooks/useBooks";
import type { BookType, Column } from "@/lib/types";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";
const bookColumns: Column<BookType>[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "author",
    label: "Author",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "stock",
    label: "Stock",
  },
  {
    key: "sellingPrice",
    label: "Price",
    render: (value) => `$${value.toFixed(2)}`,
  },
  {
    key: "publishedDate",
    label: "Published",
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    key: "actions",
    label: "Actions",
    render: (_, order: BookType) => (
      <div className="flex justify-center gap-2">
        <Button variant="ghost" size="icon" asChild className=" cursor-pointer">
          <Link to={`/admin/books/${order.id}`}>
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
function Books() {
  const { books } = useBooks();
  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Books Management</h1>
        <Button asChild>
          <Link to="/admin/books/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Book
          </Link>
        </Button>
      </div>
      <DataTable columns={bookColumns} data={books} />
    </div>
  );
}

export default Books;
