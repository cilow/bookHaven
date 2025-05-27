import type { BookType } from "@/lib/types";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/books";
export const fetchBooks = async (): Promise<BookType[]> => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const fetchBookById = async (id: number): Promise<BookType> => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const insertBook = async (
  book: Omit<BookType, "id" | "createdAt" | "updatedAt">
): Promise<BookType> => {
  console.log(book);
  let imageUrl = book.coverImage;

  // Step 1: Upload the image file if it's a File (not a string URL)
  if (book.coverImage instanceof File) {
    const formData = new FormData();
    formData.append("file", book.coverImage); // ✅ Actual File, not just the name

    const uploadResponse = await axios.post(
      `http://localhost:8080/api/images/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    imageUrl = uploadResponse.data.url;
  }

  // Step 2: Post book with image URL
  const newBook = {
    ...book,
    coverImage: imageUrl,
    category: { id: book.categoryId },
  };
  console.log(newBook);
  const response = await axios.post(API_BASE, newBook);
  console.log(response);
  return response.data;
};

export const updateBook = async (
  id: number,
  book: Partial<BookType>
): Promise<BookType> => {
  const response = await axios.put(`${API_BASE}/${id}`, book);
  return response.data;
};

export async function deleteBook(id: number) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to delete book");
  }

  // Only try to parse JSON if it's not a 204 No Content
  if (res.status !== 204) {
    return await res.json();
  }

  return null;
}
