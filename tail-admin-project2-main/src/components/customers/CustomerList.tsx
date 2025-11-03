"use client";

import React, { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "@/lib/api/customersApi";
import { Button } from "@/components/ui/Button";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

interface CustomerListProps {
  onEdit: (customer: Customer) => void; // ✅ callback truyền lên form
}

export default function CustomerList({ onEdit }: CustomerListProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    const data = await getCustomers();
    setCustomers(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa khách hàng này?")) {
      await deleteCustomer(id);
      loadCustomers();
    }
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Danh sách khách hàng</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Tên</th>
            <th className="p-2">Email</th>
            <th className="p-2">SĐT</th>
            <th className="p-2">Địa chỉ</th>
            <th className="p-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{c.id}</td>
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">{c.phone}</td>
              <td className="p-2">{c.address}</td>
              <td className="p-2 flex justify-center gap-2">
                <Button
                  onClick={() => onEdit(c)} // ✅ gửi customer lên form
                  className="bg-yellow-500 text-white"
                >
                  Sửa
                </Button>
                <Button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 text-white"
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
