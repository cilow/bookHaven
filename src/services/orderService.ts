import type { OrderType } from "@/lib/types";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/orders";

export const fetchOrders = async (): Promise<OrderType[]> => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const fetchOrderById = async (id: number): Promise<OrderType> => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const insertOrder = async (
  order: Omit<OrderType, "id" | "createdAt" | "updatedAt">
): Promise<OrderType> => {
  console.log(order);
  const response = await axios.post(API_BASE, order);
  return response.data;
};

export const updateOrder = async (
  id: number,
  order: Partial<OrderType>
): Promise<OrderType> => {
  const response = await axios.put(`${API_BASE}/${id}`, order);
  return response.data;
};
