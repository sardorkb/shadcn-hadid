import { z } from "zod";

export const invoiceSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  amount: z.number().min(0),
  paidAmount: z.number().min(0),
  issuedAt: z.string(),
  dueAt: z.string(),
  status: z.enum(["draft", "sent", "partial", "paid", "overdue", "cancelled"]),
  notes: z.string().optional(),
});

export const paymentSchema = z.object({
  id: z.string(),
  invoiceId: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  amount: z.number().min(0),
  method: z.enum(["bank-transfer", "cash", "card"]),
  paidAt: z.string(),
  reference: z.string().optional(),
});

export type Invoice = z.infer<typeof invoiceSchema>;
export type Payment = z.infer<typeof paymentSchema>;
