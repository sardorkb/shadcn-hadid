import { z } from "zod";

export const truckStatusSchema = z.enum([
  "idle",
  "loading",
  "en-route",
  "returning",
  "maintenance",
]);

export const truckSchema = z.object({
  id: z.string(),
  plate: z.string(),
  type: z.enum(["mixer", "pump"]),
  capacityM3: z.number(),
  driverName: z.string(),
  driverPhone: z.string(),
  status: truckStatusSchema,
  plantId: z.enum(["tashkent", "angren"]),
  yearMade: z.number(),
  notes: z.string().optional(),
});

export const deliveryTicketSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  truckId: z.string(),
  truckPlate: z.string(),
  driverName: z.string(),
  batchId: z.string().optional(),
  volumeM3: z.number(),
  loadedAt: z.string().optional(),
  departedAt: z.string().optional(),
  arrivedAt: z.string().optional(),
  unloadedAt: z.string().optional(),
  returnedAt: z.string().optional(),
  status: z.enum(["pending", "loading", "en-route", "delivered", "returned"]),
});

export type TruckStatus = z.infer<typeof truckStatusSchema>;
export type Truck = z.infer<typeof truckSchema>;
export type DeliveryTicket = z.infer<typeof deliveryTicketSchema>;
