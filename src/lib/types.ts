export interface OrderType {
  id: string; // e.g., "ORD-1001"
  orderDate: string; // ISO date string format, or use Date if you parse it
  total: number; // BigDecimal in Java -> number in TS
  status: string;
  items: number;
  user: {
    name: string;
    email: string;
  };
}

export interface BookType {
  id: number;
  title: string;
  author: string;
  isbn: string;
  description: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  publisher: string;
  publishedDate: string; // You can change to `Date` if you parse it
  pages: number;
  coverImage: string;
  category: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
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
