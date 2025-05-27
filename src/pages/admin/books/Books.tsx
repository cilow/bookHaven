import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useBooks from "@/hooks/useBooks";
import type { BookType, Column } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useMemo, useState } from "react";
import { deleteBook } from "@/services/bookService";
import useCategories from "@/hooks/use-categories";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";

function Books() {
  const { books, isLoading, refetch } = useBooks();
  const { categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [bookToDelete, setBookToDelete] = useState<BookType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });
  console.log(books);
  const bookColumns: Column<BookType>[] = useMemo(
    () => [
      {
        key: "coverImage",
        label: "Cover",
        render: (value) => (
          <img
            src={
              typeof value === "string"
                ? value
                : URL.createObjectURL(value as File)
            }
            alt="Book Cover"
            className="w-12 h-16 object-cover rounded"
          />
        ),
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
        key: "categoryId",
        label: "Category",
        render: (value) => {
          const category = categories.find((cat) => cat.id === value);

          return category ? category.name : "Uncategorized";
        },
      },
      {
        key: "isbn",
        label: "ISBN",
      },
      {
        key: "pages",
        label: "Pages",
      },
      {
        key: "publisher",
        label: "Publisher",
      },
      {
        key: "purchasePrice",
        label: "Purchase Price",
        render: (value) => `$${value.toFixed(2)}`,
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
        render: (_, book: BookType) => (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="cursor-pointer"
            >
              <Link to={`/admin/books/${book.id}`}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive cursor-pointer"
              onClick={() => {
                setBookToDelete(book);
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
    [categories]
  );

  return (
    <div className="py-4 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Books Management</h1>
        <Button asChild>
          <Link to="/admin/books/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Book
          </Link>
        </Button>
      </div>

      <Card className="mb-6 overflow-x-auto">
        <CardHeader>
          <CardTitle>Books</CardTitle>
          <CardDescription>
            Manage your books, edit their details, or remove them.
          </CardDescription>
        </CardHeader>
        {isLoading ? (
          <Spinner />
        ) : (
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title or author..."
                  className="pl-8 w-full"
                />
              </div>
              <div className="flex gap-4">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={String(category.id)}
                      ></SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DataTable columns={bookColumns} data={filteredBooks} />
          </CardContent>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{bookToDelete?.title}</strong>? This action cannot be
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
                if (bookToDelete) {
                  try {
                    await deleteBook(Number(bookToDelete.id));
                    toast.success("Book deleted successfully");
                    setDialogOpen(false);
                    setBookToDelete(null);
                    await refetch();
                  } catch (error) {
                    toast.error("Failed to delete book");
                    console.error("Delete book error:", error);
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

export default Books;
