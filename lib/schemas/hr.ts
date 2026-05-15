import { z } from "zod";

export const employeeRoleSchema = z.enum([
  "operator",
  "driver",
  "lab-tech",
  "dispatcher",
  "accountant",
  "manager",
  "admin",
]);

export const employeeSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: employeeRoleSchema,
  plantId: z.enum(["tashkent", "angren"]),
  phone: z.string(),
  email: z.string().email().optional().or(z.literal("")),
  hiredAt: z.string(),
  salary: z.number().min(0),
  status: z.enum(["active", "on-leave", "terminated"]),
});

export type EmployeeRole = z.infer<typeof employeeRoleSchema>;
export type Employee = z.infer<typeof employeeSchema>;
