import { mockInvoices, mockPayments, mockRevenueData } from "@/lib/mock-data/finance";
import type { Invoice, Payment } from "@/lib/schemas/finance";

export async function getInvoices(): Promise<Invoice[]> {
  return mockInvoices;
}

export async function getPayments(): Promise<Payment[]> {
  return mockPayments;
}

export async function getRevenueData() {
  return mockRevenueData;
}
