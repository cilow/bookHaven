import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useCategories from "@/hooks/use-categories";
import { fetchBookById, updateBook } from "@/services/bookService";
import { toast } from "sonner";
import type { BookType } from "@/lib/types";

export default function UpdateBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset, // ✅ use reset instead of setValue
  } = useForm<BookType>();

  const { categories } = useCategories();
  const coverImage = watch("coverImage");

  const coverImagePreview =
    coverImage instanceof FileList && coverImage.length > 0
      ? URL.createObjectURL(coverImage[0])
      : typeof coverImage === "string"
      ? coverImage
      : undefined;

  const selectedCategoryName = categories.find(
    (cat) => cat.id === watch("categoryId")
  )?.name;

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      try {
        const book = await fetchBookById(Number(id));
        if (book) {
          reset(book); // ✅ use reset to set all form values
        } else {
          toast.error("Book not found");
          navigate("/admin/books");
        }
      } catch (err) {
        toast.error("Error loading book");
        console.error(err);
      }
    };

    fetchBook();
  }, [id, reset, navigate]);

  const onSubmit: SubmitHandler<BookType> = async (data) => {
    try {
      const updatedData = {
        ...data,
        coverImage: coverImage instanceof FileList ? coverImage[0] : coverImage,
      };
      await updateBook(Number(id), updatedData);
      toast.success("Book updated!");
      navigate("/admin/books");
    } catch (err) {
      toast.error("Error updating book");
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" asChild className="mr-4">
          <Link to="/admin/books">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Update Book</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Edit Book Details</CardTitle>
                <CardDescription>Modify the book information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" {...register("title")} />
                    {errors.title && (
                      <p className="text-red-500">{errors.title.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" {...register("author")} />
                    {errors.author && (
                      <p className="text-red-500">{errors.author.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    {...register("description")}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register("purchasePrice", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellingPrice">Selling Price ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register("sellingPrice", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      type="number"
                      {...register("stock", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoryId">Category</Label>
                    <Controller
                      control={control}
                      name="categoryId"
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value?.toString() ?? ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem
                                key={cat.id}
                                value={cat.id.toString()}
                              >
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input id="publisher" {...register("publisher")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publishedDate">Published Date</Label>
                    <Input id="publishedDate" {...register("publishedDate")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pages">Pages</Label>
                    <Input
                      type="number"
                      {...register("pages", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input id="isbn" {...register("isbn")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <Input type="file" {...register("coverImage")} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/admin/books">Cancel</Link>
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Update Book
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Book appearance</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-40 h-56 bg-muted rounded-lg overflow-hidden mb-4">
                {coverImagePreview ? (
                  <img
                    src={coverImagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <h3 className="font-bold text-center">
                {watch("title") || "Book Title"}
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-2">
                by {watch("author") || "Author Name"}
              </p>
              <p className="font-medium text-center">
                ${watch("sellingPrice")?.toFixed(2) || "0.00"}
              </p>
              <div className="mt-2 text-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {selectedCategoryName || "Category"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
