"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export default function ProductList({ products, onEdit, onDelete }: any) {
  if (!products.length)
    return (
      <div className="text-center text-gray-500 mt-4">No products found.</div>
    );

  return (
    <div className="grid gap-4">
      {products.map((p: any) => (
        <div
          key={p.id}
          className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            {p.image ? (
              <img
                src={
                  p.image.startsWith("data:image")
                    ? p.image // hiển thị base64 trực tiếp
                    : `http://192.168.88.135:3000${p.image}` // nếu là file path
                }
                alt={p.name}
                className="w-16 h-16 object-cover rounded-lg border"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                No Img
              </div>
            )}

            <div>
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-gray-600 text-sm">{p.description}</p>
              <p className="text-sm mt-1">
                💵 ${p.price.toLocaleString()} | 📦 {p.quantity} |{" "}
                {p.isActive ? (
                  <span className="text-green-600 font-medium">Active</span>
                ) : (
                  <span className="text-red-500 font-medium">Inactive</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onEdit(p)}
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => onDelete(p.id)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
