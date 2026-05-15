import { mockEmployees } from "@/lib/mock-data/hr";
import type { Employee } from "@/lib/schemas/hr";

export async function getEmployees(): Promise<Employee[]> {
  return mockEmployees;
}
