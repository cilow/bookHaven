import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useSuppliers from "@/hooks/useSuppliers";
import type { PurchaseType } from "@/lib/types";
import { insertPurchase } from "@/services/purchaseService";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";

function NewPurchasePage() {
  const { suppliers } = useSuppliers();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseType>();

  const onSubmit = async (data: PurchaseType) => {
    try {
      await insertPurchase(data);
      toast.success("Purchase created!");
    } catch (error) {
      toast.error("Error creating purchase");
      console.error(error);
    }

    // Here you would typically send the data to your backend API
    // For now, we just log it to the console
  };
  return (
    <div className="py-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Add New Purchase
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Fill in the details below to add a new purchase.
          </CardDescription>
          <form className="space-y-6 p-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <Label htmlFor="name">Supplier Name</Label>
                <Controller
                  control={control}
                  name="supplier_id"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString() ?? ""}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select supplier " />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((sup) => (
                          <SelectItem key={sup.id} value={sup.id.toString()}>
                            {sup.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4">
                <Label htmlFor="purchaseDate">Purchase Date</Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  {...register("purchaseDate", {
                    required: "Purchase date is required",
                  })}
                />
                {errors.purchaseDate && (
                  <p className="text-red-500 text-sm">
                    {errors.purchaseDate.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="total">Total ($)</Label>
                <Input
                  id="total"
                  type="number"
                  step="0.01"
                  {...register("total", { required: "Total is required" })}
                />
                {errors.total && (
                  <p className="text-red-500 text-sm">{errors.total.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-4 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" rows={3} {...register("notes")} />
                {errors.notes && (
                  <p className="text-red-500 text-sm">{errors.notes.message}</p>
                )}
              </div>
              <div className="flex justify-end md:col-span-2">
                <Button variant={"outline"} className="mr-2" asChild>
                  <Link to="/admin/purchases">
                    <span>Cancel</span>
                  </Link>
                </Button>
                <Button type="submit" className="cursor-pointer">
                  Add Purchase
                </Button>
              </div>
            </div>
          </form>
        </CardHeader>
      </Card>
    </div>
  );
}

export default NewPurchasePage;
