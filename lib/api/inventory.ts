import { mockInventory, mockMovements } from "@/lib/mock-data/inventory";
import type { InventoryItem, StockMovement } from "@/lib/schemas/inventory";

export async function getInventory(): Promise<InventoryItem[]> {
  return mockInventory;
}

export async function getMovements(): Promise<StockMovement[]> {
  return mockMovements;
}
