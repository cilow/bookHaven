import { z } from "zod";
import dayjs from "dayjs";
export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  purchasePrice: z.number().min(0, "Must be 0 or more"),
  sellingPrice: z.number().min(0, "Must be 0 or more"),
  stock: z.number().min(0, "Must be 0 or more"),
  publisher: z.string().optional(),
  publishedDate: z
    .string()
    .refine((val) => dayjs(val, "YYYY-MM-DD", true).isValid(), {
      message: "Invalid date format (YYYY-MM-DD)",
    }),
  pages: z.number().min(1, "Must be at least 1"),
  coverImage: z.any().refine((file) => file?.length === 1, {
    message: "Cover image is required",
  }),
  category: z.string().min(1, "Category is required"),
});

export type BookFormType = z.infer<typeof bookSchema>;
// For full validation including server fields
export const fullBookSchema = bookSchema.extend({
  id: z.number(),
});
export type BookFormInput = z.infer<typeof bookSchema>;
