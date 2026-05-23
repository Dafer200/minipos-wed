import { useState } from "react";
import {
  useCreateDepartment,
  useDepartment,
  useDeleteDepartment,
  useUpdateDepartment,
} from "../api/department.queries";

export default function DepartmentPage() {
  // Desestructuración limpia y estándar de TanStack Query para el listado.
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useDepartment();

  //Inicialización de las tres mutaciones requeridas.
  const createMut = useCreateDepartment();
  const deleteMut = useDeleteDepartment();
  const updateMut = useUpdateDepartment();

  //Estado local controlado únicamente para capturar los datos del input.
  const [name, setName] = useState(""); // Se mantiene con "N" Mayúscula como querías

  //Estado para controlar si creamos o editamos.
  const [editingId, setEditingId] = useState<number | null>(null);

  //Función asíncrona unificada conectada al evento onSubmit del formulario.
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editingId !== null) {
      //Si estamos editando, ejecuta el update enviando el objeto { id, dto }
      await updateMut.mutateAsync({ id: editingId, dto: { name } });
      setEditingId(null); // Regresa el formulario a modo creación
    } else {
      //Si es null, ejecuta la mutación unconventional de creación (POST)
      await createMut.mutateAsync({ name });
    }

    setName(""); // Limpia el campo de texto siempre al finalizar de forma exitosa
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">MiniPOS — departments</h1>
          {/*Botón con la acción manual de refrescar caché */}
          <button
            className="rounded-lg border px-3 py-2 text-sm"
            onClick={() => refetch()}
          >
            Reintentar/Refrescar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-4">
        
        {/*Formulario unificado conectado al evento onSubmit */}
        <form
          onSubmit={onSubmit}
          className="rounded-xl border bg-white p-4 space-y-3"
        >
          <p className="text-sm text-slate-600">
            <b>Mutation</b>: {editingId !== null ? "edita department y luego invalida cache." : "crea department y luego invalida cache para refrescar listado."}
          </p>
          
          <div className="grid gap-3 md:grid-cols-1">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nombre del Departamento
              </label>
              <input
                className="w-full rounded-lg border px-3 py-2"
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ej. Sistemas y Computación"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {/*Botón de acción principal deshabilitado si hay mutaciones pendientes */}
            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
              disabled={createMut.isPending || updateMut.isPending}
            >
              {/* Texto dinámico según el modo del componente */}
              {editingId !== null ? "Guardar Cambios" : "Crear"}
            </button>

            {/*Botón secundario para salir del modo edición */}
            {editingId !== null && (
              <button
                type="button"
                className="rounded-lg border px-4 py-2 text-slate-700"
                onClick={() => {
                  setEditingId(null);
                  setName(""); // Se limpia el estado correcto
                }}
              >
                Cancelar
              </button>
            )}
          </div>

          {/*Mensaje condicional de error si la creación o la edición fallan */}
          {(createMut.isError || updateMut.isError) && (
            <p className="text-sm text-red-600">
              Error guardando: {String(createMut.error || updateMut.error)}
            </p>
          )}
        </form>

        {/* Tabla de Resultados */}
        <div className="rounded-xl border bg-white">
          <div className="p-4 border-b">
            {/*Bloques condicionales basados en el estado de la Query */}
            {isLoading && <p className="text-sm text-slate-600">Cargando…</p>}
            {isError && <p className="text-sm text-red-600">Error: {String(error)}</p>}
            {!isLoading && !isError && (
              <p className="text-sm text-slate-600">
                {data.length} registro(s)
              </p>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3">Nombre del Departamento</th>
                  {/*Se añade explícitamente la columna de acciones con ancho fijo */}
                  <th className="p-3 w-44">Acción</th>
                </tr>
              </thead>
              <tbody>
                {/*Mapeo sobre el arreglo devuelto por TanStack Query */}
                {data.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="p-3 font-medium text-slate-900">{d.name}</td>
                    
                    {/*Botonera de interacción dentro de la celda */}
                    <td className="p-3 flex gap-2">
                      {/* Botón Editar */}
                      <button
                        className="rounded-md border px-2 py-1 hover:bg-slate-50"
                        onClick={() => {
                          setEditingId(d.id);
                          setName(d.name);
                        }}
                      >
                        Editar
                      </button>

                      {/* Botón Borrar */}
                      <button
                        className="rounded-md border px-2 py-1 hover:bg-slate-50 disabled:opacity-50"
                        disabled={deleteMut.isPending}
                        onClick={() => {
                          if (!confirm("¿Seguro que deseas borrar este departamento?")) return;
                          deleteMut.mutate(d.id);
                        }}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}

                {/*Control de tabla vacía adaptado al colSpan exacto */}
                {!isLoading && !isError && data.length === 0 && (
                  <tr>
                    <td className="p-6 text-center text-slate-500" colSpan={2}>
                      No hay registros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}