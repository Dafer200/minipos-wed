import { http } from "./http"; 
 
export type Student = { 
    id: number; 
    fullName: string; 
    email: string; 
    createdAt?: string; 
}; 
 
export type CreateStudentDto = { 
    id: number;
    fullName: string; 
    email: string; 
}; 
 
export type UpdateStudentDto = Partial<CreateStudentDto>; 
 
export const studentsApi = { 
    list: () => http<Student[]>("/students"), 
    create: (dto: CreateStudentDto) => 
        http<Student>("/students", { method: "POST", body: JSON.stringify(dto) }), 
    update: (id: number, dto: UpdateStudentDto) => 
        // CORREGIDO: Ahora usa comillas invertidas ``
        http<Student>(`/students/${id}`, { method: "PATCH", body: JSON.stringify(dto) }), 
    remove: (id: number) => 
        // CORREGIDO: Ahora usa comillas invertidas ``
        http<void>(`/students/${id}`, { method: "DELETE" }),
};