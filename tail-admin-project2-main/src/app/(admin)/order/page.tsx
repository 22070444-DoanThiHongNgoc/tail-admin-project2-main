"use client";

import React, { useState } from "react";
import OrderForm from "@/components/orders/OrderForm";
import OrderList from "@/components/orders/OrderList";

export default function OrderPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">
      <OrderForm onCreated={() => setRefreshKey((k) => k + 1)} />
      {/* đổi key để OrderList load lại dữ liệu */}
      <OrderList key={refreshKey} />
    </div>
  );
}
