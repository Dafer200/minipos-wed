import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  departmentApi,
  type CreateDepartmentDto,
  type UpdateDepartmentDto,
} from "./departments";

const keys = {
  all: ["department"] as const,
};

export function useDepartment() {
  return useQuery({
    queryKey: keys.all,
    queryFn: departmentApi.list,
  });
}
export function useCreateDepartment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateDepartmentDto) =>
      departmentApi.create(dto),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: keys.all }),
  });
}
export function useUpdateDepartment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: number;
      dto: UpdateDepartmentDto;
    }) => departmentApi.update(id, dto),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: keys.all }),
  });
}
export function useDeleteDepartment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => departmentApi.remove(id),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: keys.all }),
  });
}
