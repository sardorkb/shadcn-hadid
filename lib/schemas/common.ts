import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  region: z.string().min(1),
  postalCode: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  role: z.string().optional(),
});

export type Address = z.infer<typeof addressSchema>;
export type Contact = z.infer<typeof contactSchema>;
