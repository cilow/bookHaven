import type { Supplier } from "@/lib/types";
import { fetchSuppliers } from "@/services/supplierService";
import { useEffect, useState } from "react";

function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSuppliers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error("Failed to fetch Suppliers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);
  return { suppliers, isLoading, refetch: loadSuppliers };
}

export default useSuppliers;
