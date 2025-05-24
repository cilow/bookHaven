import { AddToCartButton } from "@/components/AddToCartButton";
import BookNotFound from "@/components/BookNotFound";
import { FavoriteButton } from "@/components/FavoriteButton";
import BookDetailSkeleton from "@/components/skeleton/BookDetailSkeleton";
import { Button } from "@/components/ui/button";
import type { BookType } from "@/lib/types";
import { fetchBookById } from "@/services/bookService";
import { ArrowLeft, BookOpen, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function BookDetails() {
  const { id: bookId } = useParams();
  const [book, setBook] = useState<BookType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bookId) return;

    setLoading(true); // ✅ set immediately

    const timer = setTimeout(() => {
      const loadBook = async () => {
        try {
          const data = await fetchBookById(Number(bookId));
          setBook(data);
        } catch (error) {
          console.error("Failed to fetch book:", error);
        } finally {
          setLoading(false); // ✅ ends after fetch
        }
      };

      loadBook();
    }, 300);

    // Cleanup timeout if component unmounts or bookId changes early
    return () => clearTimeout(timer);
  }, [bookId]);
  if (loading) return <BookDetailSkeleton />;

  if (!book) {
    return <BookNotFound />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant={"ghost"} className="mb-6" asChild>
        <Link to="/books">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-muted rounded-lg overflow-hidden">
          <img
            src={book?.coverImage}
            alt={book?.title}
            className="w-full object-cover aspect-[3/4]"
          />
        </div>
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{book?.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                by {book?.author}
              </p>
            </div>

            <FavoriteButton book={book} />
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              {book?.category}
            </div>
            <div className="text-sm text-muted-foreground">
              Published: {book?.publishedDate}
            </div>
          </div>

          <p className="text-2xl font-bold mb-6">
            ${book?.sellingPrice.toFixed(2)}
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-2">
              <BookOpen className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Format</p>
                <p className="text-muted-foreground">
                  Hardcover, {book?.pages} pages
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Truck className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Delivery</p>
                <p className="text-muted-foreground">
                  Free shipping on orders over $35
                </p>
              </div>
            </div>
          </div>

          <AddToCartButton book={book} className="w-full mb-8" />

          <div>
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-muted-foreground">{book?.description}</p>
          </div>
        </div>
      </div>

      {/* <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books
            .filter((b) => b.id !== bookId && b.category === book?.category)
            .slice(0, 5)
            .map((relatedBook) => (
              <Link
                to={`/books/${relatedBook.id}`}
                key={relatedBook.id}
                className="group"
              >
                <div className=" aspect-[3/4] bg-muted rounded overflow-hidden mb-2">
                  <img
                    src={relatedBook.coverImage}
                    alt={relatedBook.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium line-clamp-1 group-hover:text-primary">
                  {relatedBook.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  ${relatedBook.price.toFixed(2)}
                </p>
              </Link>
            ))}
        </div>
      </div> */}
    </div>
  );
}

export default BookDetails;
