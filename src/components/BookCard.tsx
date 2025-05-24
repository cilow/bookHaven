import type { BookType } from "@/lib/types";
import { Card, CardContent, CardFooter } from "./ui/card";

import { Link } from "react-router";
import { Button } from "./ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/use-favorites";
type BookCardProps = {
  book: BookType;
};
function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    addToCart(book);
    toast("Added to cart", {
      description: `${book.title} has been added to your cart.`,
    });
  };
  // const handleAddToFavorites = () => {
  //   addToFavorites(book);
  // };
  const toggleFavorite = () => {
    if (isFavorite(book.id)) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };
  // const handleRemoveToFavorites = () => {
  // };
  return (
    <Card className="pt-0 overflow-hidden h-full w-full transition-all duration-300 flex flex-col">
      <Link to={`/books/${book.id}`}>
        <div className="relative bg-muted pt-[100%]">
          <img
            src={book.coverImage}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 scale-100`}
          />
        </div>
      </Link>
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start">
          <Link to={`/books/${book.id}`} className="hover:underline">
            <h3 className="font-black line-clamp-1">{book.title}</h3>
          </Link>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="size-8 cursor-pointer -mt-1 -mr-2"
            onClick={toggleFavorite}
            aria-label={
              isFavorite(book.id) ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite(book.id) ? "fill-primary text-primary" : ""
              }`}
            />
          </Button>
        </div>
        <p className="text-muted-foreground text-sm mb-2">{book.author}</p>
        <p className="font-medium">${book.sellingPrice.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="pt-0 ">
        <Button className="w-full cursor-pointer" onClick={handleAddToCart}>
          <ShoppingCart size={20} className="mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default BookCard;
