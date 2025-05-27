import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Supplier } from "@/lib/types";
import { insertSupplier } from "@/services/supplierService";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

function NewSupplierPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Supplier>();

  const navigate = useNavigate();
  const onSubmit = async (data: Supplier) => {
    console.log("New Supplier Data:", data);
    // Here you would typically call a service to insert the supplier

    await insertSupplier(data);

    reset();
    navigate("/admin/suppliers");
    // Optionally, you can show a success message or redirect
  };
  return (
    <div className="py-4">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Add New Supplier</h2>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to add a new supplier.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4">
              <Label htmlFor="name">Supplier Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Supplier name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button variant={"outline"} className="mr-2" asChild>
                <Link to="/admin/suppliers">
                  <span>Cancel</span>
                </Link>
              </Button>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Supplier"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewSupplierPage;
