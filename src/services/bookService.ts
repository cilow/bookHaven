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
  const response = await axios.post(API_BASE, book);
  return response.data;
};

export const updateBook = async (
  id: number,
  book: Partial<BookType>
): Promise<BookType> => {
  const response = await axios.put(`${API_BASE}/${id}`, book);
  return response.data;
};
