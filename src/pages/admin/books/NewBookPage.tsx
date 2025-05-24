import useBooks from "@/hooks/useBooks";
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
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { BookType } from "@/lib/types";
import { bookSchema, type BookFormInput } from "@/lib/schemas/book";
import { zodResolver } from "@hookform/resolvers/zod";
export default function NewBookPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<BookFormInput>({
    resolver: zodResolver(bookSchema),
  });
  const { books } = useBooks();
  const categories = Array.from(new Set(books.map((b) => b.category)));
  //   const navigate = useNavigate();
  // Watch individual fields
  const title = watch("title");
  const author = watch("author");
  const sellingPrice = watch("sellingPrice");
  const category = watch("category");
  const coverImage = watch("coverImage");

  // Generate a preview image URL
  const coverImagePreview = coverImage?.[0]
    ? URL.createObjectURL(coverImage[0])
    : null;
  const onSubmit: SubmitHandler<BookFormInput> = (data) => {
    const formData = {
      ...data,
      coverImage: (data.coverImage as FileList)[0]?.name,
    };
    console.log(formData);
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
        <h1 className="text-3xl font-bold">Add New Book</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Book Details</CardTitle>
                <CardDescription>
                  Enter the information for the new book
                </CardDescription>
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
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      {...register("purchasePrice", { valueAsNumber: true })}
                    />
                    {errors.purchasePrice && (
                      <p className="text-red-500">
                        {errors.purchasePrice.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellingPrice">Selling Price ($)</Label>
                    <Input
                      id="sellingPrice"
                      type="number"
                      {...register("sellingPrice", { valueAsNumber: true })}
                    />
                    {errors.sellingPrice && (
                      <p className="text-red-500">
                        {errors.sellingPrice.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      {...register("stock", { valueAsNumber: true })}
                    />
                    {errors.stock && (
                      <p className="text-red-500">{errors.stock.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      onValueChange={(value) => {
                        const event = { target: { value, name: "category" } };
                        register("category").onChange(event);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-red-500">{errors.category.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input id="publisher" {...register("publisher")} />
                    {errors.publisher && (
                      <p className="text-red-500">{errors.publisher.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publishedDate">Published Date</Label>
                    <Input
                      id="publishedDate"
                      placeholder="YYYY-MM-DD"
                      {...register("publishedDate")}
                    />
                    {errors.publishedDate && (
                      <p className="text-red-500">
                        {errors.publishedDate.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pages">Pages</Label>
                    <Input
                      id="pages"
                      type="number"
                      {...register("pages", { valueAsNumber: true })}
                    />
                    {errors.pages && (
                      <p className="text-red-500">{errors.pages.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input id="isbn" {...register("isbn")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <Input
                    id="coverImage"
                    type="file"
                    {...register("coverImage")}
                  />
                  {errors.coverImage && (
                    <p className="text-red-500">image is requried</p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/admin/books">Cancel</Link>
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Create Book
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
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <h3 className="font-bold text-center">{title || "Book Title"}</h3>
              <p className="text-sm text-muted-foreground text-center mb-2">
                by {author || "Author Name"}
              </p>
              <p className="font-medium text-center">
                ${sellingPrice ? sellingPrice.toFixed(2) : "0.00"}
              </p>
              <div className="mt-2 text-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {category || "Category"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
/*
 //   console.log(categories);
  //   const [customCategory, setCustomCategory] = useState("");

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors, isSubmitting },
  //     watch,
  //     setValue,
  //   } = useForm<BookFormType>({
  //     resolver: zodResolver(bookSchema),
  //     defaultValues: {
  //       title: "",
  //       author: "",
  //       description: "",
  //       price: 0,
  //       category: categories[0] || "",
  //       publishedDate: new Date().toISOString().slice(0, 10),
  //       pages: 1,
  //       isbn: "",
  //       coverImage: "/placeholder.svg?height=400&width=300",
  //     },
  //   });

  //   const selectedCategory = watch("category");

  //   const onSubmit = async (data: BookFormType) => {
  //     try {
  //       // Replace with real API logic
  //       console.log("Book created", data);
  //       toast("Book created successfully");
  //       navigate("/admin/books");
  //     } catch (err) {
  //       toast.error("Failed to create book" + err);
  //     }
  //   };
<div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" asChild className="mr-4">
          <Link to="/admin/books">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Add New Book</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Book Details</CardTitle>
              <CardDescription>Fill in all the book info</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
             
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input {...register("title")} />
                  <p className="text-red-500 text-sm">
                    {errors.title?.message}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input {...register("author")} />
                  <p className="text-red-500 text-sm">
                    {errors.author?.message}
                  </p>
                </div>
              </div>

          
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea {...register("description")} rows={5} />
                <p className="text-red-500 text-sm">
                  {errors.description?.message}
                </p>
              </div>

             
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("price")}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.price?.message}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(val) => {
                      setValue("category", val);
                      if (val === "__new__") setCustomCategory("");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                      <SelectItem value="__new__">+ Add New</SelectItem>
                    </SelectContent>
                  </Select>
                  {selectedCategory === "__new__" && (
                    <div className="pt-2">
                      <Input
                        placeholder="New Category"
                        value={customCategory}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomCategory(val);
                          setValue("category", val);
                        }}
                      />
                    </div>
                  )}
                  <p className="text-red-500 text-sm">
                    {errors.category?.message}
                  </p>
                </div>
              </div>

              <Separator />

              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Published Date</Label>
                  <Input type="date" {...register("publishedDate")} />
                  <p className="text-red-500 text-sm">
                    {errors.publishedDate?.message}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Pages</Label>
                  <Input type="number" {...register("pages")} />
                  <p className="text-red-500 text-sm">
                    {errors.pages?.message}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>ISBN</Label>
                  <Input {...register("isbn")} />
                  <p className="text-red-500 text-sm">{errors.isbn?.message}</p>
                </div>
              </div>

         
              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <Input {...register("coverImage")} />
                <p className="text-red-500 text-sm">
                  {errors.coverImage?.message}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link to="/admin/books">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" /> Create Book
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

      
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Book appearance</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-40 h-56 bg-muted rounded-lg overflow-hidden mb-4">
                <img
                  src={watch("coverImage") || "/placeholder.svg"}
                  alt={watch("title") || "Book cover"}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-center">
                {watch("title") || "Book Title"}
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-2">
                by {watch("author") || "Author Name"}
              </p>
              <p className="font-medium text-center">
                ${watch("price")?.toFixed(2) || "0.00"}
              </p>
              <div className="mt-2 text-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {watch("category")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
*/
