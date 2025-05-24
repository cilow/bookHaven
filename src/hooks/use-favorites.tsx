import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { BookType } from "@/lib/types";

interface FavoritesContextType {
  favorites: BookType[];
  addToFavorites: (book: BookType) => void;
  removeFromFavorites: (bookId: number) => void;
  isFavorite: (bookId: number) => boolean;
  clearFavorites: () => void;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<BookType[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites) as BookType[];
        setFavorites(parsed);
        setFavoriteIds(parsed.map((book) => book.id));
      } catch (error) {
        console.error("Failed to parse saved favorites:", error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites changes
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      localStorage.removeItem("favorites");
    }
  }, [favorites]);

  const addToFavorites = (book: BookType) => {
    if (!favoriteIds.includes(book.id)) {
      const updatedFavorites = [...favorites, book];
      setFavorites(updatedFavorites);
      setFavoriteIds(updatedFavorites.map((b) => b.id));
    }
  };

  const removeFromFavorites = (bookId: number) => {
    const updatedFavorites = favorites.filter((book) => book.id !== bookId);
    setFavorites(updatedFavorites);
    setFavoriteIds(updatedFavorites.map((b) => b.id));
  };

  const isFavorite = (bookId: number) => {
    return favoriteIds.includes(bookId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    setFavoriteIds([]);
    localStorage.removeItem("favorites");
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
