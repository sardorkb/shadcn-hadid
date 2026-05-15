import type { Invoice, Payment } from "@/lib/schemas/finance";

export const mockInvoices: Invoice[] = [
  { id: "INV-2026-001", orderId: "ORD-2026-006", customerId: "cust-007", customerName: "Chirchiq Maxsus Qurilish", amount: 19_200_000, paidAmount: 19_200_000, issuedAt: "2026-05-14", dueAt: "2026-05-29", status: "paid" },
  { id: "INV-2026-002", orderId: "ORD-2026-005", customerId: "cust-004", customerName: "Angren Sanoat Shahri", amount: 39_000_000, paidAmount: 0, issuedAt: "2026-05-15", dueAt: "2026-05-30", status: "sent" },
  { id: "INV-2026-003", orderId: "ORD-2026-003", customerId: "cust-002", customerName: "Samarqand Beton Servis", amount: 14_400_000, paidAmount: 7_200_000, issuedAt: "2026-05-15", dueAt: "2026-05-30", status: "partial" },
  { id: "INV-2026-004", orderId: "ORD-2026-001", customerId: "cust-001", customerName: "Toshkent Qurilish Korporatsiyasi", amount: 34_800_000, paidAmount: 0, issuedAt: "2026-05-15", dueAt: "2026-05-30", status: "draft" },
  { id: "INV-2025-089", orderId: "ORD-2025-089", customerId: "cust-006", customerName: "Yunusobod Turar-joy Massivi", amount: 150_000_000, paidAmount: 50_000_000, issuedAt: "2025-12-01", dueAt: "2025-12-31", status: "overdue" },
  { id: "INV-2026-005", orderId: "ORD-2026-007", customerId: "cust-005", customerName: "Navoiy Kimyo Zavodi", amount: 8_400_000, paidAmount: 0, issuedAt: "2026-05-17", dueAt: "2026-06-01", status: "sent" },
];

export const mockPayments: Payment[] = [
  { id: "PAY-001", invoiceId: "INV-2026-001", customerId: "cust-007", customerName: "Chirchiq Maxsus Qurilish", amount: 19_200_000, method: "bank-transfer", paidAt: "2026-05-14", reference: "AGROPROM-2026-0514" },
  { id: "PAY-002", invoiceId: "INV-2026-003", customerId: "cust-002", customerName: "Samarqand Beton Servis", amount: 7_200_000, method: "bank-transfer", paidAt: "2026-05-15", reference: "SBS-PAY-052026" },
  { id: "PAY-003", invoiceId: "INV-2025-089", customerId: "cust-006", customerName: "Yunusobod Turar-joy Massivi", amount: 50_000_000, method: "bank-transfer", paidAt: "2025-12-05", reference: "YTM-DEC-2025" },
];

export const mockRevenueData = [
  { month: "Jun 2025", revenue: 680_000_000, volume: 520 },
  { month: "Jul 2025", revenue: 720_000_000, volume: 560 },
  { month: "Aug 2025", revenue: 890_000_000, volume: 680 },
  { month: "Sep 2025", revenue: 950_000_000, volume: 720 },
  { month: "Oct 2025", revenue: 820_000_000, volume: 630 },
  { month: "Nov 2025", revenue: 600_000_000, volume: 460 },
  { month: "Dec 2025", revenue: 540_000_000, volume: 410 },
  { month: "Jan 2026", revenue: 480_000_000, volume: 370 },
  { month: "Feb 2026", revenue: 520_000_000, volume: 400 },
  { month: "Mar 2026", revenue: 780_000_000, volume: 600 },
  { month: "Apr 2026", revenue: 920_000_000, volume: 705 },
  { month: "May 2026", revenue: 430_000_000, volume: 330 },
];
