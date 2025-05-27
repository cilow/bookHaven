import { z } from "zod";
// Category schema
export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  createdAt: z.string(),
  updatedAt: z.string(),
});
// For full category object (e.g. from DB)
export const fullCategorySchema = categorySchema.extend({
  id: z.number(),
});

// Book schema

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().min(10, "ISBN must be at least 10 characters"),
  description: z.string().optional(),
  purchasePrice: z.number(),
  sellingPrice: z.number(),
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
  publisher: z.string().optional(),
  publishedDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date")
    .optional(),
  pages: z
    .number({ invalid_type_error: "Pages must be a number" })
    .int("Pages must be an integer")
    .min(1, "Book must have at least 1 page"),
  coverImage: z
    .any()
    .refine((file) => file?.[0], { message: "Cover image is required" })
    .optional(),
  category_id: z
    .number({ invalid_type_error: "Category is required" })
    .int("Invalid category ID"),
});

// For full validation including server fields
export const fullBookSchema = bookSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type BookFormInput = z.infer<typeof bookSchema>;

// Base user schema
export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN"]),
  avatar: z.string().optional(),
  phone: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Type for database use
export type UserFormType = z.infer<typeof userSchema>;

// For full user object (e.g. from DB)
export const fullUserSchema = userSchema.extend({
  id: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string(),
});

// Registration-specific schema
export const registerSchema = userSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormType = z.infer<typeof loginSchema>;

// supplier schema
export const supplierSchema = z.object({
  name: z.string(),
  contactName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
});

// For full supplier object (e.g. from DB)
export const fullSupplierSchema = supplierSchema.extend({
  id: z.number(),
});
// If you want the inferred TypeScript type:
export type SupplierFormType = z.infer<typeof supplierSchema>;

// Purchase schema
export const purchaseSchema = z.object({
  purchaseDate: z.string(), // Consider z.coerce.date() if you want to handle date parsing
  total: z.number(),
  notes: z.string().optional(),
  supplier: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
});
// For full purchase object (e.g. from DB)
export const fullPurchaseSchema = purchaseSchema.extend({
  id: z.number(),
});
// If you want the inferred TypeScript type:
export type PurchaseFormType = z.infer<typeof purchaseSchema>;
