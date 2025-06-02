import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/hooks/use-cart";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Landmark,
} from "lucide-react";
import * as z from "zod";
import { toast } from "sonner";
import { Link } from "react-router"; // Correct router import
import type { OrderItemType, OrderType, Payment, UserType } from "@/lib/types";
import { fetchUserById } from "@/services/userService";
import { insertOrder } from "@/services/orderService";
import { createOrderItem } from "@/services/orderItemService";
import { createPayment } from "@/services/paymentService";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().min(5),
  paymentMethod: z.enum(["credit", "bank"]),
  cardNumber: z.string().optional(),
  expiry: z.string().optional(),
  cvc: z.string().optional(),
  accountNumber: z.string().optional(),
  routingNumber: z.string().optional(),
});

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  console.log(user);
  const subtotal = items.reduce(
    (total, item) => total + item.book.sellingPrice * item.quantity,
    0
  );
  const shippingCost = subtotal > 35 ? 0 : 4.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shippingCost + tax;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      paymentMethod: "credit",
      cardNumber: "",
      expiry: "",
      cvc: "",
      accountNumber: "",
      routingNumber: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  useEffect(() => {
    const loadUser = async () => {
      const data = await fetchUserById(1); // Replace with actual logged-in user ID
      setUser(data);
    };
    loadUser();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast.error("User not found");
      return;
    }

    if (items.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }

    try {
      setIsSubmitting(true);

      const newOrder: OrderType = {
        orderDate: new Date().toISOString(),
        total: total.toFixed(2),
        status: "PROCESSING",
        items: items.length,
        user_id: user.id,
      };
      console.log(newOrder);

      const createdOrder = await insertOrder(newOrder);

      const orderItems: OrderItemType[] = items.map((item) => ({
        quantity: item.quantity,
        unitPrice: item.book.sellingPrice.toString(),
        order_id: createdOrder.id,
        book_id: item.book.id,
      }));
      orderItems.forEach(async (orderItem) => {
        await createOrderItem(orderItem);
      });

      const payment: Payment = {
        amount: total.toFixed(2),
        paymentDate: new Date().toISOString(),
        method: values.paymentMethod,
        status: "PENDING",
        order_id: createdOrder.id,
        user_id: user.id,
      };

      // await createPayment(payment);

      toast.success("Order placed successfully");
      setTimeout(() => {
        clearCart();
        setIsSubmitting(false);
        setIsComplete(true);
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong while placing the order");
      console.error(error);
      setIsSubmitting(false);
    }
  }

  if (isComplete) {
    return (
      <div className="container mx-auto max-w-md px-4 py-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. A confirmation has been sent to your
          email.
        </p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" asChild size="sm">
          <Link to="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
              <CardDescription>
                Complete your order by providing your shipping and payment
                information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Shipping Address</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Method</h3>

                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="credit" id="credit" />
                                <FormLabel
                                  htmlFor="credit"
                                  className="flex items-center"
                                >
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Credit Card
                                </FormLabel>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bank" id="bank" />
                                <FormLabel
                                  htmlFor="bank"
                                  className="flex items-center"
                                >
                                  <Landmark className="h-4 w-4 mr-2" />
                                  Bank Transfer
                                </FormLabel>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {paymentMethod === "credit" && (
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="1234 5678 9012 3456"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cvc"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "bank" && (
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="accountNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Account Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="routingNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Routing Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        Complete Order <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.book.id}
                  className="flex justify-between text-sm"
                >
                  <div className="flex items-center">
                    <span className="font-medium">{item.book.title}</span>
                    <span className="text-muted-foreground ml-1">
                      × {item.quantity}
                    </span>
                  </div>
                  <span>
                    ${(item.book.sellingPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
