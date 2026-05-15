import type { InventoryItem, StockMovement } from "@/lib/schemas/inventory";

export const mockInventory: InventoryItem[] = [
  { id: "inv-001", name: "Portland Cement PC 400", category: "cement", unit: "ton", currentStock: 480, minStock: 200, pricePerUnit: 850_000, supplierId: "sup-001", plantId: "tashkent", lastUpdated: "2026-05-15" },
  { id: "inv-002", name: "Portland Cement PC 500", category: "cement", unit: "ton", currentStock: 180, minStock: 100, pricePerUnit: 950_000, supplierId: "sup-001", plantId: "tashkent", lastUpdated: "2026-05-15" },
  { id: "inv-003", name: "Qum (mayda, 0-5mm)", category: "sand", unit: "m³", currentStock: 1_200, minStock: 500, pricePerUnit: 120_000, supplierId: "sup-002", plantId: "tashkent", lastUpdated: "2026-05-14" },
  { id: "inv-004", name: "Shag'al (5-20mm)", category: "gravel", unit: "m³", currentStock: 980, minStock: 400, pricePerUnit: 180_000, supplierId: "sup-002", plantId: "tashkent", lastUpdated: "2026-05-14" },
  { id: "inv-005", name: "Shag'al (20-40mm)", category: "gravel", unit: "m³", currentStock: 350, minStock: 200, pricePerUnit: 170_000, supplierId: "sup-002", plantId: "tashkent", lastUpdated: "2026-05-14" },
  { id: "inv-006", name: "Plasticizer SP-3", category: "admixture", unit: "kg", currentStock: 2_200, minStock: 500, pricePerUnit: 8_500, supplierId: "sup-003", plantId: "tashkent", lastUpdated: "2026-05-15" },
  { id: "inv-007", name: "Retarder RT-10", category: "admixture", unit: "kg", currentStock: 90, minStock: 150, pricePerUnit: 12_000, supplierId: "sup-003", plantId: "tashkent", lastUpdated: "2026-05-13" },
  { id: "inv-008", name: "Portland Cement PC 400", category: "cement", unit: "ton", currentStock: 220, minStock: 150, pricePerUnit: 850_000, supplierId: "sup-001", plantId: "angren", lastUpdated: "2026-05-15" },
  { id: "inv-009", name: "Qum (mayda, 0-5mm)", category: "sand", unit: "m³", currentStock: 600, minStock: 300, pricePerUnit: 110_000, supplierId: "sup-002", plantId: "angren", lastUpdated: "2026-05-14" },
  { id: "inv-010", name: "Shag'al (5-20mm)", category: "gravel", unit: "m³", currentStock: 420, minStock: 300, pricePerUnit: 175_000, supplierId: "sup-002", plantId: "angren", lastUpdated: "2026-05-14" },
];

export const mockMovements: StockMovement[] = [
  { id: "mov-001", itemId: "inv-001", itemName: "Portland Cement PC 400", type: "out", quantity: 12.4, reason: "Production batch BATCH-001", reference: "BATCH-001", createdAt: "2026-05-15T08:00:00", createdBy: "Operator: Kamol Toshev" },
  { id: "mov-002", itemId: "inv-001", itemName: "Portland Cement PC 400", type: "in", quantity: 50, reason: "PO receipt PO-2026-012", reference: "PO-2026-012", createdAt: "2026-05-14T14:00:00", createdBy: "Warehouse: Alisher Nazarov" },
  { id: "mov-003", itemId: "inv-007", itemName: "Retarder RT-10", type: "out", quantity: 8, reason: "Production batch BATCH-002", reference: "BATCH-002", createdAt: "2026-05-15T10:00:00", createdBy: "Operator: Kamol Toshev" },
  { id: "mov-004", itemId: "inv-003", itemName: "Qum (mayda, 0-5mm)", type: "adjustment", quantity: -5, reason: "Moisture correction recount", createdAt: "2026-05-13T16:00:00", createdBy: "Manager: Sherzod Mirzaev" },
  { id: "mov-005", itemId: "inv-004", itemName: "Shag'al (5-20mm)", type: "out", quantity: 22, reason: "Production batch BATCH-003", reference: "BATCH-003", createdAt: "2026-05-15T09:30:00", createdBy: "Operator: Kamol Toshev" },
];
