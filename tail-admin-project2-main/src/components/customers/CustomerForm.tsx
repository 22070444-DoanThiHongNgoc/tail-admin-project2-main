"use client";

import React, { useState, useEffect } from "react";
import { createCustomer, updateCustomer } from "@/lib/api/customersApi";
import { Button } from "@/components/ui/Button";

interface CustomerFormProps {
  selectedCustomer?: any;
  onSave?: () => void;
  clearSelection?: () => void;
}

export default function CustomerForm({
  selectedCustomer,
  onSave,
  clearSelection,
}: CustomerFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // ✅ Khi chọn khách hàng, tự fill dữ liệu vào form
  useEffect(() => {
    if (selectedCustomer) {
      setForm({
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        phone: selectedCustomer.phone,
        address: selectedCustomer.address || "",
      });
    } else {
      setForm({ name: "", email: "", phone: "", address: "" });
    }
  }, [selectedCustomer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCustomer) {
      await updateCustomer(selectedCustomer.id, form);
      alert("Cập nhật khách hàng thành công!");
    } else {
      await createCustomer(form);
      alert("Thêm khách hàng thành công!");
    }

    onSave?.();
    clearSelection?.();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {selectedCustomer ? "Chỉnh sửa khách hàng" : "Thêm khách hàng"}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên khách hàng"
          className="border p-2 rounded"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Số điện thoại"
          className="border p-2 rounded"
          required
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Địa chỉ"
          className="border p-2 rounded"
        />
      </div>
      <div className="flex gap-3 mt-4">
        <Button type="submit" className="bg-blue-500 text-white">
          {selectedCustomer ? "Cập nhật" : "Thêm khách hàng"}
        </Button>
        {selectedCustomer && (
          <Button
            type="button"
            className="bg-gray-400 text-white"
            onClick={() => clearSelection?.()}
          >
            Hủy
          </Button>
        )}
      </div>
    </form>
  );
}
