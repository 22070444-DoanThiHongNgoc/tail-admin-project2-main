"use client";

import { useState, useEffect } from "react";
import ProductForm from "@/components/products/ProductForm";
import ProductList from "@/components/products/ProductList";
import ProductFilter from "@/components/products/ProductFilter";

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>();
  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState<string | undefined>();

  const loadProducts = async () => {
    const query = new URLSearchParams();
    if (search) query.append("search", search);
    if (filterActive) query.append("isActive", filterActive);
    const res = await fetch(`http://localhost:3000/products?${query.toString()}`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => { loadProducts(); }, [search, filterActive]);

  const handleCreateOrUpdate = async (product: any) => {
    if (product.id) {
      await fetch(`http://localhost:3000/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      });
    } else {
      await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      });
    }
    setEditing(undefined);
    loadProducts();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
    loadProducts();
  };

  const loadTopProducts = async () => {
    const res = await fetch("http://localhost:3000/products/top");
    const data = await res.json();
    setProducts(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>
      <ProductFilter
        search={search}
        setSearch={setSearch}
        filterActive={filterActive}
        setFilterActive={setFilterActive}
        onLoadTop={loadTopProducts}
      />
      <ProductForm product={editing} onSubmit={handleCreateOrUpdate} />
      <ProductList products={products} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}
