import type { BookType } from "@/lib/types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface CartItem {
  book: BookType;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (book: BookType) => void;
  updateQuantity: (book: BookType, quantity: number) => void;
  removeFromCart: (book: BookType) => void;
  clearCart: () => void;
  itemCount: number;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to parse saved cart:", error);
        }
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (book: BookType) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.book.id === book.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { book, quantity: 1 }];
    });
  };

  const updateQuantity = (book: BookType, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.book.id === book.id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (book: BookType) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.book.id !== book.id)
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
