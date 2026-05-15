import { mockOrders } from "@/lib/mock-data/orders";
import type { Order, OrderForm, OrderStatus } from "@/lib/schemas/order";

export async function getOrders(): Promise<Order[]> {
  return mockOrders;
}

export async function getOrder(id: string): Promise<Order | undefined> {
  return mockOrders.find((o) => o.id === id);
}

export async function createOrder(data: OrderForm): Promise<Order> {
  const newOrder: Order = {
    ...data,
    id: `ORD-2026-${String(mockOrders.length + 1).padStart(3, "0")}`,
    customerName: data.customerId,
    createdAt: new Date().toISOString(),
  };
  mockOrders.push(newOrder);
  return newOrder;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  const idx = mockOrders.findIndex((o) => o.id === id);
  if (idx === -1) throw new Error(`Order ${id} not found`);
  mockOrders[idx] = { ...mockOrders[idx], status };
  return mockOrders[idx];
}
