import { http } from "./http";

export type departments = {
  id: number;
  name: string; // 🌟 Corregido a minúscula para coincidir con el backend
};

export type CreateDepartmentDto = Omit<departments, "id">;

export type UpdateDepartmentDto = Partial<CreateDepartmentDto>;

export const departmentApi = {
  // 🌟 Corregido a "/departments" en plural para coincidir con el controlador NestJS
  list: () => http<departments[]>("/departments"),
  
  create: (dto: CreateDepartmentDto) =>
    http<departments>("/departments", { method: "POST", body: JSON.stringify(dto) }),
    
  update: (id: number, dto: UpdateDepartmentDto) =>
    http<departments>(`/departments/${id}`, { method: "PATCH", body: JSON.stringify(dto) }),
    
  remove: (id: number) => 
    http<void>(`/departments/${id}`, { method: "DELETE" }),
};