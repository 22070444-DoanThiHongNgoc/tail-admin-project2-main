const BASE_URL = "http://localhost:3000/customers";

export async function getCustomers() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createCustomer(data: any) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateCustomer(id: number, data: any) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteCustomer(id: number) {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}
