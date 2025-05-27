import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CategoryType } from "@/lib/types";
import { insertCategory } from "@/services/categoryService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function NewCategoryPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryType>();
  const navigate = useNavigate();
  const onSubmit = async (data: CategoryType) => {
    console.log("New Category Data:", data);
    await insertCategory(data);

    reset();
    navigate("/admin/categories");
    // Optionally, you can show a success message or redirect
    toast.success("Category added successfully!");
  };
  return (
    <Card className="my-6  p-6">
      <h1 className="text-3xl font-bold">Add New Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="mb-4 ">
          <Label htmlFor="categoryName" className="block mb-2">
            Category Name
          </Label>
          <Input
            id="categoryName"
            className="w-full mb-4 py-6"
            {...register("name", {
              required: "Category name is required",
              minLength: {
                value: 3,
                message: "Category name must be at least 3 characters long",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <Button
            type="button"
            variant="outline"
            className="w-1/2 cursor-pointer py-6"
            onClick={() => navigate("/admin/categories")}
          >
            Cancel
          </Button>
          <Button
            className="w-1/2 cursor-pointer py-6 my-4"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Category"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default NewCategoryPage;
