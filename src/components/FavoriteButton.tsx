import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { BookType } from "@/lib/types";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/use-favorites";

interface FavoriteButtonProps {
  book: BookType;
}

export function FavoriteButton({ book }: FavoriteButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const handleClick = () => {
    setIsAnimating(true);
    if (!isFavorite(book.id)) {
      addToFavorites(book);
    } else {
      removeFromFavorites(book.id);
    }
    toast(
      isFavorite(book.id) ? "Removed from favorites" : "Added to favorites",
      {
        description: isFavorite(book.id)
          ? `${book.title} has been removed from your favorites.`
          : `${book.title} has been added to your favorites.`,
      }
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <Button
      variant={"outline"}
      size="icon"
      className={` ${isAnimating ? "animate-pulse" : ""}`}
      onClick={handleClick}
      aria-label={
        isFavorite(book.id) ? "Remove from favorites" : "Add to favorites"
      }
    >
      <Heart
        className={`h-5 w-5 ${
          isFavorite(book.id) ? "fill-primary text-primary" : ""
        }`}
      />
    </Button>
  );
}
