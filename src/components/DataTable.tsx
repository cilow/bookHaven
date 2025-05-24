import type { DataTableProps } from "@/lib/types";
import { useState } from "react";

export function DataTable<T>({
  columns,
  data,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const start = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="overflow-x-auto w-full rounded-lg border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr className="border-b">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="text-left py-3 px-4 font-semibold text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              {columns.map((col, colIndex) => {
                const value =
                  col.key !== "actions" ? item[col.key as keyof T] : null;
                return (
                  <td key={colIndex} className="py-3 px-4">
                    {col.render ? col.render(value, item) : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4 px-4 py-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
