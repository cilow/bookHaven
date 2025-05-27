import type { BookType } from "@/lib/types";
import { fetchBooks } from "@/services/bookService";
import { useEffect, useState } from "react";
function useBooks() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadBooks = async () => {
    setIsLoading(true);
    try {
      const data = await fetchBooks();
      console.log("Fetched books:", data);
      // ✅ Transform snake_case to camelCase
      const transformedBooks: BookType[] = data.map((book: any) => ({
        ...book,
        categoryId: book.category.id,
      }));

      setBooks(transformedBooks);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return { books, isLoading, refetch: loadBooks };
}

export default useBooks;
