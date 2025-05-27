import type { fullCategorySchema } from "@/lib/schemas/schemas";
import { fetchCategories } from "@/services/categoryService";
import { useEffect, useState } from "react";
import type { z } from "zod";

type CategoryType = z.infer<typeof fullCategorySchema>;

export default function useCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return { categories, isLoading, refetch: loadCategories };
}
