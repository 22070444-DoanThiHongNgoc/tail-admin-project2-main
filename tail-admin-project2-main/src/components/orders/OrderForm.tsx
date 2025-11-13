"use client";

import React, { useEffect, useState } from "react";
import { createOrder } from "@/lib/api/ordersApi";
import { getCustomers } from "@/lib/api/customersApi";
import { getProducts } from "@/lib/api/productsApi";
import { Button } from "@/components/ui/Button";

interface OrderFormProps {
  onCreated?: () => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function OrderForm({ onCreated }: OrderFormProps) {
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customerId, setCustomerId] = useState<string>("");
  const [items, setItems] = useState<{ productId: number; quantity: number }[]>(
    [],
  );
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadData() {
      const [cust, prod] = await Promise.all([getCustomers(), getProducts()]);
      setCustomers(cust);
      setProducts(prod);
    }
    loadData();
  }, []);

  // tính tổng tiền
  useEffect(() => {
    let t = 0;
    for (const it of items) {
      const p = products.find((x) => x.id === it.productId);
      if (p) t += Number(p.price) * it.quantity;
    }
    setTotal(t);
  }, [items, products]);

  const toggleProduct = (productId: number, checked: boolean) => {
    if (checked) {
      setItems((prev) =>
        prev.some((i) => i.productId === productId)
          ? prev
          : [...prev, { productId, quantity: 1 }],
      );
    } else {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    }
  };

  const changeQuantity = (productId: number, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity } : i,
      ),
    );
  };

  const getQuantity = (productId: number) =>
    items.find((i) => i.productId === productId)?.quantity || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || items.length === 0) {
      alert("Chọn khách hàng và ít nhất 1 sản phẩm");
      return;
    }

    await createOrder({
      customerId: Number(customerId),
      items,
    });

    alert("Tạo đơn hàng thành công!");
    setCustomerId("");
    setItems([]);
    setTotal(0);
    onCreated?.();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tạo đơn hàng mới</h2>

      <div className="grid grid-cols-2 gap-4">
        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">-- Chọn khách hàng --</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="border p-2 rounded max-h-60 overflow-y-auto">
          <p className="font-medium mb-1">Chọn sản phẩm:</p>
          {products.map((p) => {
            const checked = items.some((i) => i.productId === p.id);
            return (
              <div key={p.id} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => toggleProduct(p.id, e.target.checked)}
                />
                <span className="flex-1">
                  {p.name} ({p.price}$)
                </span>
                {checked && (
                  <input
                    type="number"
                    min={1}
                    value={getQuantity(p.id)}
                    onChange={(e) =>
                      changeQuantity(p.id, Number(e.target.value) || 1)
                    }
                    className="w-16 border rounded p-1 text-right"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 font-medium">
        Tổng tiền: <span className="text-blue-600">{total.toFixed(2)} $</span>
      </div>

      <Button type="submit" className="mt-4 bg-blue-500 text-white">
        Tạo đơn hàng
      </Button>
    </form>
  );
}
