"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function ProductForm({ product, onSubmit }: any) {
const [form, setForm] = useState({
  name: "",
  description: "",
  price: 0,
  quantity: 0,
  image: "",
  isActive: true,
  category: "", 
});


  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  // Load dữ liệu khi edit hoặc khi mở form
useEffect(() => {
  if (product) {
    setForm(product);
    setImagePreview(
      product.image ? `http://localhost:3000${product.image}` : null
    );
  }
}, [product]);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    });
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
  name: "",
  description: "",
  price: 0,
  quantity: 0,
  image: "",
  isActive: true,
  category: "", 
});
    setImagePreview(null);
  };

  return (
    <Card className="shadow-md rounded-2xl border border-gray-200 mb-6">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-xl font-semibold text-gray-800">
          {product ? "Edit Product" : "Create New Product"}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                className="border border-gray-300 rounded-lg p-2 w-full pl-7 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              placeholder="0"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 h-28 w-28 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Category */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Category
  </label>
  <input
    name="category"
    value={form.category || ""}
    onChange={handleChange}
    placeholder="Enter category (e.g. Road Bike)"
    className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
  />
</div>


          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="isActive"
              value={form.isActive ? "true" : "false"}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.value === "true" })
              }
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2 transition-all"
            >
              {product ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
