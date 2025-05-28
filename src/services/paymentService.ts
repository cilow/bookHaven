import type { Payment } from "@/lib/types";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/payment-methods";

export const fetchPayments = async (): Promise<Payment[]> => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const createPayment = async (
  payment: Omit<Payment, "id">
): Promise<Payment> => {
  const response = await axios.post(API_BASE, payment);
  return response.data;
};

export const deletePayment = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/${id}`);
};
