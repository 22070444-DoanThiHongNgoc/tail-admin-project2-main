"use client";
import React from "react";
import { Button } from "@/components/ui/Button";

export default function ProductFilter({
  search,
  setSearch,
  filterActive,
  setFilterActive,
  onLoadTop,
}: any) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-2 flex-1"
      />
      <select
        value={filterActive ?? ""}
        onChange={(e) => setFilterActive(e.target.value || undefined)}
        className="border rounded-lg p-2"
      >
        <option value="">All</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      <Button
        onClick={onLoadTop}
        className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl px-4"
      >
        🔝 Top Price
      </Button>
    </div>
  );
}
