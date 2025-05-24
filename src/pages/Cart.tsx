import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import type { BookType } from "@/lib/types";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const promoCodes = ["ayman", "zaki", "hosh"];

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce(
    (total, item) => total + item.book.sellingPrice * item.quantity,
    0
  );

  const shippingCost = subtotal > 35 ? 0 : 4.99;
  const tax = subtotal * 0.05;
  const total = subtotal + shippingCost + tax - discount;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    setIsApplyingPromo(true);

    setTimeout(() => {
      if (promoCodes.includes(promoCode.trim().toLowerCase())) {
        const discountAmount = subtotal * 0.1;
        setDiscount(discountAmount);
        toast.success("Promo applied! 10% discount added.");
      } else {
        toast.error("Invalid promo code.");
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" asChild className="mr-4">
          <Link to="/books">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like you haven't added any books to your cart yet.
          </p>
          <Button asChild>
            <Link to="/books">Browse Books</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Cart Items ({items.length})</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-muted-foreground"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.book.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shippingCost === 0
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    onClick={handleApplyPromo}
                    disabled={isApplyingPromo || !promoCode.trim()}
                  >
                    {isApplyingPromo ? "Applying..." : "Apply"}
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  {shippingCost > 0 ? (
                    <p>
                      Add ${(35 - subtotal).toFixed(2)} more to qualify for free
                      shipping
                    </p>
                  ) : (
                    <p>Your order qualifies for free shipping!</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

interface CartItemProps {
  item: {
    book: BookType;
    quantity: number;
  };
  updateQuantity: (book: BookType, quantity: number) => void;
  removeFromCart: (book: BookType) => void;
}

function CartItem({ item, updateQuantity, removeFromCart }: CartItemProps) {
  const handleIncrement = () => {
    updateQuantity(item.book, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.book, item.quantity - 1);
    }
  };

  const price =
    typeof item.book.sellingPrice === "number" ? item.book.sellingPrice : 0;

  return (
    <div className="flex border rounded-lg p-4">
      <Link to={`/books/${item.book.id}`} className="shrink-0">
        <div className="w-24 h-32 bg-muted rounded overflow-hidden">
          <img
            src={item.book.coverImage}
            alt={item.book.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <div>
            <Link to={`/books/${item.book.id}`} className="hover:underline">
              <h3 className="font-medium">{item.book.title}</h3>
            </Link>
            <p className="text-sm text-muted-foreground">
              by {item.book.author}
            </p>
            <p className="text-sm mt-1">${price.toFixed(2)}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(item.book)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>

        <div className="flex justify-between items-end mt-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <div className="h-8 px-3 flex items-center justify-center border-y">
              {item.quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <p className="font-medium">${(price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
