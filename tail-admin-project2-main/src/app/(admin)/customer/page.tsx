"use client";

import React, { useState } from "react";
import CustomerForm from "@/components/customers/CustomerForm";
import CustomerList from "@/components/customers/CustomerList";

export default function CustomerPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <CustomerForm
        selectedCustomer={selectedCustomer}
        onSave={handleSave}
        clearSelection={() => setSelectedCustomer(null)}
      />
      <CustomerList
        key={refreshKey}
        onEdit={(customer) => setSelectedCustomer(customer)}
      />
    </div>
  );
}
