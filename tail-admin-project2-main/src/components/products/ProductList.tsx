"use client";
import React from "react";

export default function ProductList({ products, onEdit, onDelete }: any) {
  if(!products.length) return <div>No products</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {products.map((p: any) => (
        <div key={p.id} style={{ border: "1px solid #ddd", padding: 10, display: "flex", gap: 10 }}>
          {p.image && <img src={p.image} style={{ width: 60, height: 60, objectFit: "cover" }} />}
          <div style={{ flex: 1 }}>
            <b>{p.name}</b>
            <div>{p.description}</div>
            <div>Price: {p.price} | Quantity: {p.quantity} | Active: {p.isActive ? "Yes" : "No"}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <button onClick={() => onEdit(p)}>Edit</button>
            <button onClick={() => onDelete(p.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
