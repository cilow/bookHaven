import type { Sale } from "@/lib/types";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/sales";

export const fetchSales = async (): Promise<Sale[]> => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const fetchSaleById = async (id: number): Promise<Sale> => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const insertSale = async (
  sale: Omit<Sale, "id" | "createdAt" | "updatedAt">
): Promise<Sale> => {
  const response = await axios.post(API_BASE, sale);
  return response.data;
};

export const updateSale = async (
  id: number,
  sale: Partial<Sale>
): Promise<Sale> => {
  const response = await axios.put(`${API_BASE}/${id}`, sale);
  return response.data;
};
