import type { PurchaseType } from "@/lib/types";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/purchases";

export const fetchPurchases = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error("Failed to fetch purchases");
  }
  return response.json();
};

// Fetch a purchase by ID
export const fetchPurchaseById = async (id: string | number) => {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch purchase by ID");
  }
  return response.json();
};

// Insert a new purchase
export const insertPurchase = async (purchase: PurchaseType) => {
  console.log(purchase);
  const newPurchase = {
    ...purchase,
    supplier: {
      id: purchase.supplier_id,
    },
  };

  const response = await axios.post(API_BASE, newPurchase);
  console.log(response);
};

// Delete a purchase by ID
export const deletePurchase = async (id: number) => {
  const response = await axios.delete(`${API_BASE}/${id}`);
  // Axios throws on error, so no need to check response.ok
  return response.data;
};
