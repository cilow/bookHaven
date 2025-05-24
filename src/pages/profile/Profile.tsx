import type React from "react";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  CreditCard,
  Edit,
  MapPin,
  Package,
  Save,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";

// Mock user data for demonstration
const userData = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=128&width=128",
  phone: "+1 (555) 123-4567",
  address: {
    street: "123 Book Lane",
    city: "Literary City",
    state: "Bookland",
    zip: "12345",
    country: "United States",
  },
  orders: [
    {
      id: "ORD-1234",
      date: "May 10, 2023",
      total: 78.97,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-5678",
      date: "April 22, 2023",
      total: 42.5,
      status: "Delivered",
      items: 2,
    },
    {
      id: "ORD-9012",
      date: "March 15, 2023",
      total: 29.99,
      status: "Delivered",
      items: 1,
    },
  ],
  paymentMethods: [
    {
      id: "pm-1",
      type: "Visa",
      last4: "4242",
      expiry: "04/25",
    },
    {
      id: "pm-2",
      type: "Mastercard",
      last4: "5555",
      expiry: "08/24",
    },
  ],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    street: userData.address.street,
    city: userData.address.city,
    state: userData.address.state,
    zip: userData.address.zip,
    country: userData.address.country,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the data to your backend here
    toast("Profile updated", {
      description: "Your profile information has been updated successfully.",
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-muted-foreground text-sm">{userData.email}</p>
              <Button variant="outline" size="sm" className="mt-4">
                <Edit className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            </CardContent>
          </Card>

          <div className="hidden md:block">
            <h3 className="text-lg font-medium mb-2">Navigation</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/profile">
                  <User className="h-4 w-4 mr-2" />
                  Personal Info
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/profile/orders">
                  <Package className="h-4 w-4 mr-2" />
                  Orders
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/favorites">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Favorites
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/profile/addresses">
                  <MapPin className="h-4 w-4 mr-2" />
                  Addresses
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/profile/payment">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Methods
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          <Tabs defaultValue="info">
            <TabsList className="mb-6">
              <TabsTrigger value="info">Personal Info</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          {isEditing ? (
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-muted/50">
                              {formData.name}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          {isEditing ? (
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-muted/50">
                              {formData.email}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-muted/50">
                            {formData.phone}
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Address</h3>
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="street">Street Address</Label>
                            {isEditing ? (
                              <Input
                                id="street"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                              />
                            ) : (
                              <div className="p-2 border rounded-md bg-muted/50">
                                {formData.street}
                              </div>
                            )}
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              {isEditing ? (
                                <Input
                                  id="city"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleChange}
                                />
                              ) : (
                                <div className="p-2 border rounded-md bg-muted/50">
                                  {formData.city}
                                </div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State</Label>
                              {isEditing ? (
                                <Input
                                  id="state"
                                  name="state"
                                  value={formData.state}
                                  onChange={handleChange}
                                />
                              ) : (
                                <div className="p-2 border rounded-md bg-muted/50">
                                  {formData.state}
                                </div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="zip">ZIP Code</Label>
                              {isEditing ? (
                                <Input
                                  id="zip"
                                  name="zip"
                                  value={formData.zip}
                                  onChange={handleChange}
                                />
                              ) : (
                                <div className="p-2 border rounded-md bg-muted/50">
                                  {formData.zip}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            {isEditing ? (
                              <Input
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                              />
                            ) : (
                              <div className="p-2 border rounded-md bg-muted/50">
                                {formData.country}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex justify-end">
                          <Button type="submit">Save Changes</Button>
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    View and manage your previous orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.orders.length > 0 ? (
                    <div className="space-y-4">
                      {userData.orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">Order #{order.id}</h4>
                              <p className="text-sm text-muted-foreground">
                                {order.date}
                              </p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <p className="text-sm">
                              {order.items}{" "}
                              {order.items === 1 ? "item" : "items"}
                            </p>
                            <p className="font-medium">
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/profile/orders/${order.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        You haven't placed any orders yet.
                      </p>
                      <Button className="mt-4" asChild>
                        <Link to="/books">Browse Books</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>
                        Manage your payment options
                      </CardDescription>
                    </div>
                    <Button>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add New Card
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {userData.paymentMethods.length > 0 ? (
                    <div className="space-y-4">
                      {userData.paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="flex items-center justify-between border rounded-lg p-4"
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center mr-4">
                              <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {method.type} •••• {method.last4}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Expires {method.expiry}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        You haven't added any payment methods yet.
                      </p>
                      <Button className="mt-4">Add Payment Method</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Addresses</CardTitle>
                      <CardDescription>
                        Manage your shipping and billing addresses
                      </CardDescription>
                    </div>
                    <Button>
                      <MapPin className="h-4 w-4 mr-2" />
                      Add New Address
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">Default Address</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          Default
                        </span>
                      </div>
                      <p>{userData.name}</p>
                      <p>{userData.address.street}</p>
                      <p>
                        {userData.address.city}, {userData.address.state}{" "}
                        {userData.address.zip}
                      </p>
                      <p>{userData.address.country}</p>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
