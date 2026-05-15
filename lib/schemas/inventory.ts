import { z } from "zod";

export const materialCategorySchema = z.enum([
  "cement",
  "sand",
  "gravel",
  "admixture",
  "water",
  "other",
]);

export const inventoryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: materialCategorySchema,
  unit: z.string(),
  currentStock: z.number().min(0),
  minStock: z.number().min(0),
  pricePerUnit: z.number().min(0),
  supplierId: z.string().optional(),
  plantId: z.enum(["tashkent", "angren"]),
  lastUpdated: z.string(),
});

export const stockMovementSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  itemName: z.string(),
  type: z.enum(["in", "out", "adjustment"]),
  quantity: z.number(),
  reason: z.string(),
  reference: z.string().optional(),
  createdAt: z.string(),
  createdBy: z.string(),
});

export type MaterialCategory = z.infer<typeof materialCategorySchema>;
export type InventoryItem = z.infer<typeof inventoryItemSchema>;
export type StockMovement = z.infer<typeof stockMovementSchema>;
