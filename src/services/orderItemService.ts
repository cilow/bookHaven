import type { OrderItemType } from "@/lib/types";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/order-items";

export const fetchOrderItems = async (): Promise<OrderItemType[]> => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const fetchOrderItemById = async (
  id: number
): Promise<OrderItemType> => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const fetchItemsByOrderId = async (
  orderId: string
): Promise<OrderItemType[]> => {
  const response = await axios.get(`${API_BASE}/order/${orderId}`);
  return response.data;
};

export const createOrderItem = async (
  item: Omit<OrderItemType, "id">
): Promise<OrderItemType> => {
  const response = await axios.post(API_BASE, item);
  return response.data;
};

export const deleteOrderItem = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/${id}`);
};
