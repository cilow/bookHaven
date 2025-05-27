import type { CategoryType } from "@/lib/types";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/categories";
export const fetchCategories = async (): Promise<CategoryType[]> => {
  const response = await axios.get(API_BASE);
  return response.data;
};
export const fetchCategoryById = async (id: number): Promise<CategoryType> => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};
export const insertCategory = async (
  category: Omit<CategoryType, "id" | "createdAt" | "updatedAt">
): Promise<CategoryType> => {
  console.log(category);
  const response = await axios.post(API_BASE, category);
  return response.data;
};
export const updateCategory = async (
  id: number,
  category: Partial<CategoryType>
): Promise<CategoryType> => {
  const response = await axios.put(`${API_BASE}/${id}`, category);
  return response.data;
};
export const deleteCategory = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/${id}`);
};
