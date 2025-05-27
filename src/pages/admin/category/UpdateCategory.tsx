import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categorySchema } from "@/lib/schemas/schemas";
import {
  fetchCategoryById,
  updateCategory as updateCategoryService,
} from "@/services/categoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type { z } from "zod";

type CategoryFormType = z.infer<typeof categorySchema>;

function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CategoryFormType) => {
    try {
      await updateCategoryService(Number(id), data);
      toast.success("Category updated successfully!");
      navigate("/admin/categories");
    } catch (error) {
      console.error("Failed to update category", error);
      toast.error("Failed to update category.");
    }
  };

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const data = await fetchCategoryById(Number(id));
        reset(data); // Populate form with fetched data
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error("Failed to fetch category data.");
      }
    };

    if (id) {
      loadCategory();
    }
  }, [id, reset]);

  return (
    <Card className="my-6 p-6">
      <h1 className="text-3xl font-bold">Update Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="mb-4">
          <Label htmlFor="categoryName" className="block mb-2">
            Category Name
          </Label>
          <Input
            id="categoryName"
            className="w-full mb-4 py-6"
            {...register("name")}
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
            className="w-1/2 cursor-pointer my-4 py-6"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Category"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default UpdateCategory;
