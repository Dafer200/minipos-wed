import { useState } from "react";
import {
  useCreateCustomer,
  useCustomers,
  useDeleteCustomer,
  useUpdateCustomer, //Se importó el hook de actualización según el patrón de la guía
} from "../api/customers.queries";

export default function CustomersPage() {
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useCustomers();

  const createMut = useCreateCustomer();
  const deleteMut = useDeleteCustomer();
  const updateMut = useUpdateCustomer(); // Se inicializó la mutación de actualizar

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Guarda el ID numérico si editamos, o 'null' si estamos creando
  const [editingId, setEditingId] = useState<number | null>(null);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    
    // Condicional que evalúa si el formulario está en modo edición
    if (editingId !== null) {
      // Si hay un ID guardado, se ejecuta la mutación de actualización con la estructura de la guía {id, dto}
      await updateMut.mutateAsync({ id: editingId, dto: { fullName, email, phone } });
      setEditingId(null); // Se limpia el estado de edición para regresar al modo "Crear"
    } else {
      // Si el ID es null, se ejecuta la mutación normal de creación (POST) de la guía
      await createMut.mutateAsync({ fullName, email, phone });
    }
    
    setFullName("");
    setEmail("");
    setPhone("");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Customers</h1>
          <button className="rounded-lg border px-3 py-2" onClick={() => refetch()}>
            Reintentar/Refrescar
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 space-y-4">
        
        <form onSubmit={onCreate} className="rounded-xl border bg-white p-4 space-y-3">
          <p className="text-sm text-slate-600">
            {/* Texto informativo dinámico según el estado actual del formulario */}
            <b>Mutation</b>: {editingId !== null ? "edita customer y luego invalida cache." : "crea customer y luego invalida cache para refrescar listado."}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input className="w-full rounded-lg border px-3 py-2" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input className="w-full rounded-lg border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input className="w-full rounded-lg border px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50" disabled={createMut.isPending || updateMut.isPending}>
              {/* Texto dinámico en el botón ("Guardar Cambios" o "Crear") */}
              {editingId !== null ? "Guardar Cambios" : "Crear"}
            </button>
            
            {/* Solo aparece si estamos editando para poder salir de ese modo y limpiar campos */}
            {editingId !== null && (
              <button type="button" className="rounded-lg border px-4 py-2 text-slate-700" onClick={() => { setEditingId(null); setFullName(""); setEmail(""); setPhone(""); }}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="rounded-xl border bg-white">
          <div className="p-4 border-b">
            {isLoading && <p className="text-sm text-slate-600">Cargando…</p>}
            {isError && <p className="text-sm text-red-600">Error: {String(error)}</p>}
            {!isLoading && !isError && <p className="text-sm text-slate-600">{data.length} registro(s)</p>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  {/* Se amplió el ancho de la columna de acción para dar espacio a dos botones en lugar de uno */}
                  <th className="p-3 w-44">Acción</th>
                </tr>
              </thead>
              <tbody>
                {data.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="p-3">{c.fullName}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.phone}</td>
                    <td className="p-3 flex gap-2">
                      
                      {/* //NUEVO (Editar). Al pulsarlo, carga las propiedades de este registro específico en los inputs del formulario y activa el ID en 'editingId'  */}
                      <button className="rounded-md border px-2 py-1 hover:bg-slate-50" onClick={() => { setEditingId(c.id); setFullName(c.fullName); setEmail(c.email); setPhone(c.phone || ""); }}>
                        Editar
                      </button>

                      <button className="rounded-md border px-2 py-1 hover:bg-slate-50 disabled:opacity-50" disabled={deleteMut.isPending} onClick={() => { if (!confirm("¿Seguro que deseas borrar este customer?")) return; deleteMut.mutate(c.id); }}>
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
                {!isLoading && !isError && data.length === 0 && (
                  <tr>
                    <td className="p-6 text-center text-slate-500" colSpan={4}>No hay registros.</td>
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