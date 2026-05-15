import { z } from "zod";
import { addressSchema, contactSchema } from "./common";

export const customerSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name is required"),
  taxId: z.string().min(9, "Tax ID must be 9 digits").max(9),
  type: z.enum(["company", "individual"]),
  segment: z.enum(["construction", "government", "developer", "retail"]),
  status: z.enum(["active", "inactive", "blocked"]),
  creditLimit: z.number().min(0),
  balance: z.number(),
  address: addressSchema,
  contacts: z.array(contactSchema),
  notes: z.string().optional(),
  createdAt: z.string(),
});

export const customerFormSchema = customerSchema.omit({ id: true, createdAt: true, balance: true });

export type Customer = z.infer<typeof customerSchema>;
export type CustomerForm = z.infer<typeof customerFormSchema>;
