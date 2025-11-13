"use client";

import React, { useEffect, useState } from "react";
import { deleteOrder, getOrders, updateOrderStatus } from "@/lib/api/ordersApi";
import { Button } from "@/components/ui/Button";

interface Order {
  id: number;
  customer: { id: number; name: string; email: string };
  items: {
    product: { id: number; name: string; price: number };
    quantity: number;
    line_total: number;
  }[];
  total_price: number;
  status: string;
  created_at: string;
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Xóa đơn hàng này?")) {
      await deleteOrder(id);
      loadOrders();
    }
  };

  const handleChangeStatus = async (order: Order) => {
    const newStatus = prompt(
      "Nhập trạng thái mới (pending/shipped/completed/canceled):",
      order.status,
    );
    if (!newStatus) return;
    await updateOrderStatus(order.id, newStatus);
    loadOrders();
  };

  if (loading) return <p>Đang tải đơn hàng...</p>;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Khách hàng</th>
            <th className="p-2">Số sản phẩm</th>
            <th className="p-2">Tổng tiền ($)</th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{o.customer?.name}</td>
              <td className="p-2">{o.items.length}</td>
              <td className="p-2">{o.total_price}</td>
              <td className="p-2">{o.status}</td>
              <td className="p-2 flex gap-2 justify-center">
                <Button
                  className="bg-blue-500 text-white"
                  onClick={() => setViewOrder(o)}
                >
                  Xem
                </Button>
                <Button
                  className="bg-yellow-500 text-white"
                  onClick={() => handleChangeStatus(o)}
                >
                  Sửa
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  onClick={() => handleDelete(o.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewOrder && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">
              Chi tiết đơn hàng #{viewOrder.id} – {viewOrder.customer.name}
            </h3>
            <button
              className="text-sm text-blue-500"
              onClick={() => setViewOrder(null)}
            >
              Đóng
            </button>
          </div>
          <p>Email: {viewOrder.customer.email}</p>
          <p>Trạng thái: {viewOrder.status}</p>
          <p>Ngày tạo: {new Date(viewOrder.created_at).toLocaleString()}</p>

          <h4 className="mt-3 font-medium">Sản phẩm:</h4>
          <ul className="list-disc ml-5">
            {viewOrder.items.map((it, idx) => (
              <li key={idx}>
                {it.product.name} – SL: {it.quantity} – Thành tiền:{" "}
                {it.line_total}$
              </li>
            ))}
          </ul>

          <p className="mt-2 font-semibold">
            Tổng tiền: {viewOrder.total_price} $
          </p>
        </div>
      )}
    </div>
  );
}
