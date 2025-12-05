import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

interface Quote {
  id: string;
  vehicle_id: string;
  nombre_cliente: string;
  telefono_cliente: string;
  email_cliente: string;
  estado: string;
  created_at: string;
  vehicles?: {
    marca: string;
    modelo_año: string;
    precio: number;
  };
}

export default function QuotesManagement() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("pendiente");
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, [filter]);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("cotizaciones")
        .select(`
          *,
          vehicles:vehicle_id (
            marca,
            modelo_año,
            precio
          )
        `)
        .order("created_at", { ascending: false });

      if (filter !== "todas") {
        query = query.eq("estado", filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setQuotes(data || []);
    } catch (err: any) {
      console.error("Error cargando cotizaciones:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (quoteId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("cotizaciones")
        .update({ estado: newStatus })
        .eq("id", quoteId);

      if (error) throw error;
      fetchQuotes();
    } catch (err: any) {
      console.error("Error actualizando estado:", err);
    }
  };

  const handleOpenEmailModal = (quote: Quote) => {
    setSelectedQuote(quote);
    setEmailSubject(`Cotización - ${quote.vehicles?.marca} ${quote.vehicles?.modelo_año}`);
    setEmailBody(
      `Estimado/a ${quote.nombre_cliente},\n\n` +
      `Gracias por su interés en nuestro vehículo:\n\n` +
      `${quote.vehicles?.marca} ${quote.vehicles?.modelo_año}\n` +
      `Precio: QTZ ${quote.vehicles?.precio.toLocaleString()}\n\n` +
      `[Agrega aquí los detalles de la cotización]\n\n` +
      `Quedamos atentos a cualquier consulta.\n\n` +
      `Saludos cordiales,\n` +
      `iCarSolutions`
    );
    setShowEmailModal(true);
  };

  const handleSendEmail = async () => {
    if (!selectedQuote) return;
    
    setSendingEmail(true);
    try {
      // Aquí integrarías con un servicio de email (SendGrid, Resend, etc)
      // Por ahora solo marcamos como enviada y abrimos el cliente de email
      const mailtoLink = `mailto:${selectedQuote.email_cliente}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink, '_blank');

      // Actualizar estado a enviada
      await handleUpdateStatus(selectedQuote.id, "enviada");
      
      setShowEmailModal(false);
      setSelectedQuote(null);
    } catch (err: any) {
      console.error("Error enviando email:", err);
    } finally {
      setSendingEmail(false);
    }
  };

  const handleDeleteQuote = async (quoteId: string) => {
    if (!confirm("¿Estás seguro de eliminar esta cotización?")) return;

    try {
      const { error } = await supabase
        .from("cotizaciones")
        .delete()
        .eq("id", quoteId);

      if (error) throw error;
      fetchQuotes();
    } catch (err: any) {
      console.error("Error eliminando cotización:", err);
    }
  };

  const getStatusBadge = (estado: string) => {
    const badges = {
      pendiente: "bg-yellow-100 text-yellow-800",
      enviada: "bg-green-100 text-green-800",
      rechazada: "bg-red-100 text-red-800",
    };
    return badges[estado as keyof typeof badges] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (estado: string) => {
    const texts = {
      pendiente: "Pendiente",
      enviada: "Enviada",
      rechazada: "Rechazada",
    };
    return texts[estado as keyof typeof texts] || estado;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Cargando cotizaciones...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Cotizaciones</h2>
        
        {/* Filtros */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter("todas")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "todas"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todas ({quotes.length})
          </button>
          <button
            onClick={() => setFilter("pendiente")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "pendiente"
                ? "bg-yellow-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter("enviada")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "enviada"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Enviadas
          </button>
          <button
            onClick={() => setFilter("rechazada")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "rechazada"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Rechazadas
          </button>
        </div>
      </div>

      {/* Lista de cotizaciones */}
      {quotes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No hay cotizaciones {filter !== "todas" ? `en estado "${filter}"` : ""}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehículo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(quote.created_at).toLocaleDateString()}
                      <br />
                      <span className="text-xs text-gray-500">
                        {new Date(quote.created_at).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {quote.vehicles?.marca} {quote.vehicles?.modelo_año}
                      </div>
                      <div className="text-sm text-gray-500">
                        QTZ {quote.vehicles?.precio.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {quote.nombre_cliente}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{quote.telefono_cliente}</div>
                      <div className="text-sm text-gray-500">{quote.email_cliente}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                          quote.estado
                        )}`}
                      >
                        {getStatusText(quote.estado)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {quote.estado === "pendiente" && (
                        <>
                          <button
                            onClick={() => handleOpenEmailModal(quote)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Enviar cotización"
                          >
                            <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(quote.id, "rechazada")}
                            className="text-red-600 hover:text-red-900"
                            title="Rechazar"
                          >
                            <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      )}
                      {quote.estado === "rechazada" && (
                        <button
                          onClick={() => handleUpdateStatus(quote.id, "pendiente")}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Volver a pendiente"
                        >
                          <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteQuote(quote.id)}
                        className="text-gray-600 hover:text-gray-900"
                        title="Eliminar"
                      >
                        <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de Email */}
      {showEmailModal && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Enviar Cotización</h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Para: <span className="font-semibold">{selectedQuote.email_cliente}</span></p>
              <p className="text-sm text-gray-600">Cliente: <span className="font-semibold">{selectedQuote.nombre_cliente}</span></p>
              <p className="text-sm text-gray-600">Teléfono: <span className="font-semibold">{selectedQuote.telefono_cliente}</span></p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEmailModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendEmail}
                disabled={sendingEmail}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition disabled:opacity-50"
              >
                {sendingEmail ? "Enviando..." : "Abrir en Email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
