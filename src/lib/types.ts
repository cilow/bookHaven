export interface BookType {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  description: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  publisher: string;
  publishedDate: string;
  pages: number;
  coverImage: string | FileList | File; // Accept both file and string URL
  categoryId: number; // flat field for form use
}

export interface Sale {
  id: number;
  saleDate: string; // use string if coming from JSON (ISO date string)
  total: number;
  user: {
    user_id: number;
    name: string;
    email: string;
  };
}

export interface Column<T> {
  key: keyof T | "actions";
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
}

export type Role = "USER" | "ADMIN"; // Match your backend enum

export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  avatar?: string | File | FileList;
  phone?: string;

  // Address fields
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;

  createdAt: string; // ISO 8601 string (e.g. "2025-05-26T12:00:00Z")
  updatedAt: string;
}
export interface RegisterUserType extends UserType {
  confirmPassword: string; // For registration forms
}
// Supplier interface
export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string; // Use `Date` if you convert it from ISO
  updatedAt: string;
}

export interface PurchaseType {
  id: number;
  purchaseDate: string; // ISO date string, e.g., "2025-05-26"
  total: number;
  notes: string;
  supplier_id: number;
}

// Category interface
export interface CategoryType {
  id: number;
  name: string;
  createdAt: string; // Use `Date` if you convert it from ISO
  updatedAt: string;
}

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED"; // Match your PaymentStatus enum

export interface Payment {
  id: string;
  amount: string; // Use string to represent BigDecimal
  paymentDate: string; // ISO date string (e.g. "2025-05-28")
  method: string; // You can change to enum if needed
  status: PaymentStatus;
  order_id: string;
  user_id: number;
}
export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"; // Match your OrderStatus enum

export interface OrderType {
  id: string;
  orderDate: string;
  total: string;
  status: OrderStatus;
  items: number;
  user_id: number;
}
export interface OrderItemType {
  id: number;
  quantity: number;
  unitPrice: string;
  order_id: string;
  book_id: number;
}
