import { mockDeliveryTickets, mockTrucks } from "@/lib/mock-data/fleet";
import type { DeliveryTicket, Truck } from "@/lib/schemas/fleet";

export async function getTrucks(): Promise<Truck[]> {
  return mockTrucks;
}

export async function getDeliveryTickets(): Promise<DeliveryTicket[]> {
  return mockDeliveryTickets;
}
