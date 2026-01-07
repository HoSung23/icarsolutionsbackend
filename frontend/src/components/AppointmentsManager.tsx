import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

interface Appointment {
  id: string;
  tipo_servicio: string;
  fecha_hora: string;
  cliente_nombre: string;
  cliente_email: string;
  cliente_telefono: string;
  vehiculo_marca: string;
  vehiculo_modelo: string;
  vehiculo_año: number;
  vehiculo_placa: string | null;
  kilometraje: number | null;
  descripcion: string | null;
  notas_internas: string | null;
  estado: string;
  created_at: string;
}

export default function AppointmentsManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todas");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [notasInternas, setNotasInternas] = useState("");

  const servicioLabels: Record<string, string> = {
    revision_mecanica: "Revisión Mecánica",
    servicio_menor: "Servicio Menor",
    servicio_mayor: "Servicio Mayor",
    enderezado_pintura: "Enderezado y Pintura",
    otro: "Otro Servicio",
  };

  const estadoLabels: Record<string, string> = {
    pendiente: "Pendiente",
    confirmada: "Confirmada",
    en_proceso: "En Proceso",
    completada: "Completada",
    cancelada: "Cancelada",
  };

  const estadoColors: Record<string, string> = {
    pendiente: "bg-yellow-100 text-yellow-800",
    confirmada: "bg-blue-100 text-blue-800",
    en_proceso: "bg-purple-100 text-purple-800",
    completada: "bg-green-100 text-green-800",
    cancelada: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("appointments")
        .select("*")
        .order("fecha_hora", { ascending: true });

      if (filter !== "todas") {
        query = query.eq("estado", filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAppointments(data || []);
    } catch (error: any) {
      console.error("Error al cargar citas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ estado: newStatus })
        .eq("id", id);

      if (error) throw error;
      fetchAppointments();
    } catch (error: any) {
      alert("Error al actualizar estado: " + error.message);
    }
  };

  const handleConfirmAppointment = (appointment: Appointment) => {
    // Restar 6 horas para mostrar la hora correcta
    const fecha = new Date(appointment.fecha_hora);
    fecha.setHours(fecha.getHours() - 6);
    
    const fechaFormateada = fecha.toLocaleDateString("es-GT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const horaFormateada = fecha.toLocaleTimeString("es-GT", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const mensaje = `Hola ${appointment.cliente_nombre}! 👋

Tu cita ha sido *CONFIRMADA* ✅

📋 *Detalles de tu cita:*
🔧 Servicio: ${servicioLabels[appointment.tipo_servicio]}
📅 Fecha: ${fechaFormateada}
⏰ Hora: ${horaFormateada}
🚗 Vehículo: ${appointment.vehiculo_marca} ${appointment.vehiculo_modelo} ${appointment.vehiculo_año}

📍 *iCarSolutions - Taller Automotriz*

Por favor llega 10 minutos antes de tu cita.

¿Alguna pregunta? Estamos para servirte! 😊`;

    // Limpiar número y agregar +502 si no lo tiene
    let telefono = appointment.cliente_telefono.replace(/\D/g, "");
    if (!telefono.startsWith("502")) {
      telefono = "502" + telefono;
    }
    
    const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    // Cambiar estado a confirmada
    handleUpdateStatus(appointment.id, "confirmada");

    // Abrir WhatsApp
    window.open(urlWhatsApp, "_blank");
  };

  const handleSaveNotes = async () => {
    if (!selectedAppointment) return;

    try {
      const { error } = await supabase
        .from("appointments")
        .update({ notas_internas: notasInternas })
        .eq("id", selectedAppointment.id);

      if (error) throw error;
      setShowModal(false);
      fetchAppointments();
      alert("Notas guardadas exitosamente");
    } catch (error: any) {
      alert("Error al guardar notas: " + error.message);
    }
  };

  const openNotesModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNotasInternas(appointment.notas_internas || "");
    setShowModal(true);
  };

  const formatDate = (dateString: string) => {
    // Restar 6 horas para mostrar la hora correcta de Guatemala
    const date = new Date(dateString);
    date.setHours(date.getHours() - 6);
    
    return date.toLocaleDateString("es-GT", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const todayAppointments = appointments.filter(
    (apt) =>
      new Date(apt.fecha_hora).toDateString() === new Date().toDateString() &&
      apt.estado !== "cancelada"
  );

  const upcomingAppointments = appointments.filter(
    (apt) =>
      new Date(apt.fecha_hora) > new Date() &&
      new Date(apt.fecha_hora).toDateString() !== new Date().toDateString() &&
      apt.estado !== "cancelada" &&
      apt.estado !== "completada"
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Citas</h1>
        <a
          href="/appointments"
          target="_blank"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 rounded-lg font-semibold text-sm sm:text-base"
        >
          + Nueva Cita
        </a>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <div className="text-xs sm:text-sm text-gray-600 mb-1">Hoy</div>
          <div className="text-xl sm:text-2xl font-bold text-blue-600">{todayAppointments.length}</div>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <div className="text-xs sm:text-sm text-gray-600 mb-1">Próximas</div>
          <div className="text-xl sm:text-2xl font-bold text-purple-600">{upcomingAppointments.length}</div>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <div className="text-xs sm:text-sm text-gray-600 mb-1">Pendientes</div>
          <div className="text-xl sm:text-2xl font-bold text-yellow-600">
            {appointments.filter((a) => a.estado === "pendiente").length}
          </div>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <div className="text-xs sm:text-sm text-gray-600 mb-1">Total</div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{appointments.length}</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap">
          <button
            onClick={() => setFilter("todas")}
            className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ${
              filter === "todas"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todas
          </button>
          {Object.entries(estadoLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ${
                filter === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de Citas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {(() => {
                        const date = new Date(appointment.fecha_hora);
                        date.setHours(date.getHours() - 6);
                        return date.toLocaleDateString("es-GT");
                      })()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {(() => {
                        const date = new Date(appointment.fecha_hora);
                        date.setHours(date.getHours() - 6);
                        return date.toLocaleTimeString("es-GT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      })()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.cliente_nombre}
                    </div>
                    <div className="text-sm text-gray-500">{appointment.cliente_email}</div>
                    <div className="text-sm text-gray-500">{appointment.cliente_telefono}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment.vehiculo_marca} {appointment.vehiculo_modelo}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.vehiculo_año}
                      {appointment.vehiculo_placa && ` • ${appointment.vehiculo_placa}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {servicioLabels[appointment.tipo_servicio]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={appointment.estado}
                      onChange={(e) => handleUpdateStatus(appointment.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        estadoColors[appointment.estado]
                      }`}
                    >
                      {Object.entries(estadoLabels).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-xs font-semibold text-gray-600">
                      {appointment.id.substring(0, 8).toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {appointment.estado === "pendiente" && (
                        <button
                          onClick={() => handleConfirmAppointment(appointment)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1"
                          title="Confirmar cita y enviar WhatsApp"
                        >
                          ✅ Confirmar
                        </button>
                      )}
                      <button
                        onClick={() => openNotesModal(appointment)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Ver detalles y notas"
                      >
                        📋
                      </button>
                      <a
                        href={`https://wa.me/${appointment.cliente_telefono.replace(/\D/g, "").startsWith("502") ? appointment.cliente_telefono.replace(/\D/g, "") : "502" + appointment.cliente_telefono.replace(/\D/g, "")}`}
                        target="_blank"
                        className="text-green-600 hover:text-green-900"
                        title="Contactar por WhatsApp"
                      >
                        💬
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No hay citas {filter !== "todas" && `con estado "${estadoLabels[filter]}"`}
          </div>
        )}
      </div>

      {/* Modal de Detalles */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">Detalles de la Cita</h3>

            <div className="space-y-4">
              <div>
                <label className="font-semibold text-gray-700">Fecha y Hora:</label>
                <p className="text-gray-900">{formatDate(selectedAppointment.fecha_hora)}</p>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Servicio:</label>
                <p className="text-gray-900">
                  {servicioLabels[selectedAppointment.tipo_servicio]}
                </p>
              </div>

              {selectedAppointment.descripcion && (
                <div>
                  <label className="font-semibold text-gray-700">Descripción del Cliente:</label>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedAppointment.descripcion}
                  </p>
                </div>
              )}

              {selectedAppointment.kilometraje && (
                <div>
                  <label className="font-semibold text-gray-700">Kilometraje:</label>
                  <p className="text-gray-900">
                    {selectedAppointment.kilometraje.toLocaleString()} km
                  </p>
                </div>
              )}

              <div className="border-t pt-4">
                <label className="font-semibold text-gray-700 block mb-2">
                  Notas Internas (Solo visible para staff):
                </label>
                <textarea
                  value={notasInternas}
                  onChange={(e) => setNotasInternas(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Agregar notas internas sobre esta cita..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cerrar
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Guardar Notas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
