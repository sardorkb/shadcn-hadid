import type { Employee } from "@/lib/schemas/hr";

export const mockEmployees: Employee[] = [
  { id: "emp-001", firstName: "Sherzod", lastName: "Mirzaev", role: "manager", plantId: "tashkent", phone: "+998 71 200 10 10", email: "s.mirzaev@hadid.uz", hiredAt: "2020-03-01", salary: 8_000_000, status: "active" },
  { id: "emp-002", firstName: "Kamol", lastName: "Toshev", role: "operator", plantId: "tashkent", phone: "+998 90 111 00 11", hiredAt: "2021-06-15", salary: 4_500_000, status: "active" },
  { id: "emp-003", firstName: "Hamza", lastName: "Yusupov", role: "driver", plantId: "tashkent", phone: "+998 90 111 22 33", hiredAt: "2022-01-10", salary: 5_000_000, status: "active" },
  { id: "emp-004", firstName: "Sherzod", lastName: "Toshev", role: "driver", plantId: "tashkent", phone: "+998 90 222 33 44", hiredAt: "2022-03-20", salary: 5_000_000, status: "active" },
  { id: "emp-005", firstName: "Oybek", lastName: "Nazarov", role: "driver", plantId: "tashkent", phone: "+998 90 333 44 55", hiredAt: "2021-09-05", salary: 5_000_000, status: "active" },
  { id: "emp-006", firstName: "Sanjar", lastName: "Mirzaev", role: "driver", plantId: "tashkent", phone: "+998 91 666 77 88", hiredAt: "2023-02-01", salary: 5_200_000, status: "active" },
  { id: "emp-007", firstName: "Lola", lastName: "Ergasheva", role: "lab-tech", plantId: "tashkent", phone: "+998 93 200 30 40", email: "l.ergasheva@hadid.uz", hiredAt: "2022-08-01", salary: 5_500_000, status: "active" },
  { id: "emp-008", firstName: "Aziz", lastName: "Qodirov", role: "dispatcher", plantId: "tashkent", phone: "+998 91 300 40 50", email: "a.qodirov@hadid.uz", hiredAt: "2023-01-15", salary: 4_800_000, status: "active" },
  { id: "emp-009", firstName: "Maftuna", lastName: "Xoliqova", role: "accountant", plantId: "tashkent", phone: "+998 93 400 50 60", email: "m.xoliqova@hadid.uz", hiredAt: "2021-04-10", salary: 6_000_000, status: "active" },
  { id: "emp-010", firstName: "Javlon", lastName: "Xoliqov", role: "driver", plantId: "angren", phone: "+998 90 777 88 99", hiredAt: "2022-11-01", salary: 5_000_000, status: "active" },
  { id: "emp-011", firstName: "Bahodir", lastName: "Qodirov", role: "driver", plantId: "angren", phone: "+998 93 888 99 00", hiredAt: "2023-05-10", salary: 5_000_000, status: "active" },
  { id: "emp-012", firstName: "Sardor", lastName: "Tillayev", role: "driver", plantId: "angren", phone: "+998 94 000 11 22", hiredAt: "2024-01-08", salary: 5_000_000, status: "active" },
  { id: "emp-013", firstName: "Nodir", lastName: "Tursunov", role: "operator", plantId: "angren", phone: "+998 90 555 66 77", hiredAt: "2022-07-20", salary: 4_500_000, status: "on-leave" },
  { id: "emp-014", firstName: "Rahim", lastName: "Umarov", role: "driver", plantId: "tashkent", phone: "+998 94 555 66 77", hiredAt: "2020-08-15", salary: 5_000_000, status: "active" },
];
