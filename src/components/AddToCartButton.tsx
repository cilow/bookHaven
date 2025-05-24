import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { BookType } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  book: BookType;
  className?: string;
}

export function AddToCartButton({ book, className }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(book);
    toast("Added to cart", {
      description: `${book.title} has been added to your cart.`,
    });
  };

  return (
    <Button className={`${className} cursor-pointer`} onClick={handleAddToCart}>
      <ShoppingCart className="w-4 h-4 mr-2" />
      Add to Cart
    </Button>
  );
}
