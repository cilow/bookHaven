import type { OrderType } from "@/lib/types";
import { fetchOrders } from "@/services/orderService";
import { useEffect, useState } from "react";

export function useOrders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      const loadOrders = async () => {
        try {
          const data = await fetchOrders();
          setOrders(data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadOrders();
    }, 300); // Smooth loading feedback

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return { orders, isLoading };
}
