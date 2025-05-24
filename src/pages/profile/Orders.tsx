import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Package } from "lucide-react";
import { Link } from "react-router";

// Mock order data for demonstration
const orders = [
  {
    id: "ORD-1234",
    date: "May 10, 2023",
    total: 78.97,
    status: "Delivered",
    items: [
      {
        id: "1",
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 24.99,
        quantity: 1,
        coverImage: "/placeholder.svg?height=80&width=60",
      },
      {
        id: "2",
        title: "Atomic Habits",
        author: "James Clear",
        price: 27.0,
        quantity: 2,
        coverImage: "/placeholder.svg?height=80&width=60",
      },
    ],
    shipping: {
      method: "Standard Shipping",
      cost: 4.99,
      address: "123 Book Lane, Literary City, Bookland, 12345",
    },
    payment: {
      method: "Visa •••• 4242",
      subtotal: 78.98,
      shipping: 4.99,
      tax: 5.99,
      total: 89.96,
    },
  },
  {
    id: "ORD-5678",
    date: "April 22, 2023",
    total: 42.5,
    status: "Delivered",
    items: [
      {
        id: "3",
        title: "Project Hail Mary",
        author: "Andy Weir",
        price: 28.99,
        quantity: 1,
        coverImage: "/placeholder.svg?height=80&width=60",
      },
      {
        id: "5",
        title: "Educated",
        author: "Tara Westover",
        price: 28.0,
        quantity: 1,
        coverImage: "/placeholder.svg?height=80&width=60",
      },
    ],
    shipping: {
      method: "Express Shipping",
      cost: 9.99,
      address: "123 Book Lane, Literary City, Bookland, 12345",
    },
    payment: {
      method: "Mastercard •••• 5555",
      subtotal: 56.99,
      shipping: 9.99,
      tax: 4.5,
      total: 71.48,
    },
  },
  {
    id: "ORD-9012",
    date: "March 15, 2023",
    total: 29.99,
    status: "Delivered",
    items: [
      {
        id: "8",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 26.99,
        quantity: 1,
        coverImage: "/placeholder.svg?height=80&width=60",
      },
    ],
    shipping: {
      method: "Standard Shipping",
      cost: 4.99,
      address: "123 Book Lane, Literary City, Bookland, 12345",
    },
    payment: {
      method: "Visa •••• 4242",
      subtotal: 26.99,
      shipping: 4.99,
      tax: 2.15,
      total: 34.13,
    },
  },
];

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" asChild className="mr-4">
          <Link to="/profile">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">My Orders</h1>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>Placed on {order.date}</CardDescription>
                </div>
                <div className="mt-2 md:mt-0 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                    {order.status}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/profile/orders/${order.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="h-20 w-16 bg-muted rounded overflow-hidden mr-4">
                      <img
                        src={item.coverImage || "/placeholder.svg"}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        by {item.author}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                        <p className="font-medium">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {order.shipping.method}
                    </span>
                  </div>
                  <p className="font-bold">
                    Total: ${order.payment.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
