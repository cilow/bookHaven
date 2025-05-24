import type { BookType } from "@/lib/types";
import { fetchBooks } from "@/services/bookService";
import { useEffect, useState } from "react";

function useBooks() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  return { books, isLoading };
}

export default useBooks;
