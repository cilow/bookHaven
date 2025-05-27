import type { Supplier } from "@/lib/types";
import axios from "axios";
const API_BASE = "http://localhost:8080/api/suppliers";

export const fetchSuppliers = async (): Promise<Supplier[]> => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const fetchSupplierById = async (id: number): Promise<Supplier> => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const insertSupplier = async (
  supplier: Omit<Supplier, "id" | "createdAt" | "updatedAt">
): Promise<Supplier> => {
  console.log(supplier);
  const response = await axios.post(API_BASE, supplier);
  return response.data;
};

export const updateSupplier = async (
  id: number,
  supplier: Partial<Supplier>
): Promise<Supplier> => {
  const response = await axios.put(`${API_BASE}/${id}`, supplier);
  return response.data;
};

export async function deleteSupplierById(id: number) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete book");
  }
}
