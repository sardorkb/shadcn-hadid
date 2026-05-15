import { mockCustomers } from "@/lib/mock-data/customers";
import type { Customer, CustomerForm } from "@/lib/schemas/customer";

export async function getCustomers(): Promise<Customer[]> {
  return mockCustomers;
}

export async function getCustomer(id: string): Promise<Customer | undefined> {
  return mockCustomers.find((c) => c.id === id);
}

export async function createCustomer(data: CustomerForm): Promise<Customer> {
  const newCustomer: Customer = {
    ...data,
    id: `cust-${Date.now()}`,
    balance: 0,
    createdAt: new Date().toISOString().split("T")[0],
  };
  mockCustomers.push(newCustomer);
  return newCustomer;
}

export async function updateCustomer(id: string, data: Partial<CustomerForm>): Promise<Customer> {
  const idx = mockCustomers.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error(`Customer ${id} not found`);
  mockCustomers[idx] = { ...mockCustomers[idx], ...data };
  return mockCustomers[idx];
}
