import { z } from "zod";

export const orderStatusSchema = z.enum([
  "draft",
  "confirmed",
  "in-production",
  "delivering",
  "delivered",
  "invoiced",
  "cancelled",
]);

export const orderSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  deliverySite: z.string(),
  mixGrade: z.enum(["M150", "M200", "M250", "M300", "M350", "M400", "B20", "B22.5", "B25", "B30"]),
  volumeM3: z.number().min(0.5),
  scheduledAt: z.string(),
  pricePerM3: z.number().min(0),
  pumpTruck: z.boolean(),
  status: orderStatusSchema,
  plantId: z.enum(["tashkent", "angren"]),
  notes: z.string().optional(),
  createdAt: z.string(),
});

export const orderFormSchema = orderSchema.omit({ id: true, createdAt: true, customerName: true });

export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type Order = z.infer<typeof orderSchema>;
export type OrderForm = z.infer<typeof orderFormSchema>;
