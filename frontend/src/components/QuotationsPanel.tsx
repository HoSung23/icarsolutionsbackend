import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

interface Quotation {
  id: string;
  cliente_nombre: string;
  cliente_email: string;
  total: number;
  created_at: string;
  items: any;
}

const QuotationsPanel: React.FC = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cliente_nombre: "",
    cliente_email: "",
    total: "",
  });

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No autenticado");

      const { data, error: fetchError } = await supabase
        .from("cotizaciones")
        .select("*")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setQuotations(data || []);
    } catch (err: any) {
      setError(err.message || "Error al cargar cotizaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No autenticado");

      const { error: insertError } = await supabase
        .from("cotizaciones")
        .insert({
          cliente_nombre: formData.cliente_nombre,
          cliente_email: formData.cliente_email,
          cliente_telefono: "",
          total: parseFloat(formData.total),
          items: { description: "Cotización de vehículos" },
          created_by: user.id,
        });

      if (insertError) throw insertError;

      setFormData({ cliente_nombre: "", cliente_email: "", total: "" });
      setShowModal(false);
      fetchQuotations();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const downloadPDF = (quotation: Quotation) => {
    // Básico: crear un documento simple para descargar
    const doc = `
COTIZACIÓN - iCarSolutions
========================

Cliente: ${quotation.cliente_nombre}
Email: ${quotation.cliente_email}
Fecha: ${new Date(quotation.created_at).toLocaleDateString()}

Total: $${quotation.total.toLocaleString()}

---
Documento generado automáticamente
    `;

    const blob = new Blob([doc], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cotizacion-${quotation.id}.txt`;
    a.click();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500">Cargando cotizaciones...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Cotizaciones</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          + Nueva Cotización
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Nueva Cotización</h3>
            <form onSubmit={handleAddQuotation} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del Cliente"
                value={formData.cliente_nombre}
                onChange={(e) => setFormData({ ...formData, cliente_nombre: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="email"
                placeholder="Email del Cliente"
                value={formData.cliente_email}
                onChange={(e) => setFormData({ ...formData, cliente_email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Total"
                value={formData.total}
                onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                  Crear
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((quotation) => (
              <tr key={quotation.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{quotation.cliente_nombre}</td>
                <td className="px-4 py-2">{quotation.cliente_email}</td>
                <td className="px-4 py-2">${quotation.total.toLocaleString()}</td>
                <td className="px-4 py-2">{new Date(quotation.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => downloadPDF(quotation)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Descargar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {quotations.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-4">No hay cotizaciones</p>
      )}
    </div>
  );
};

export default QuotationsPanel;
