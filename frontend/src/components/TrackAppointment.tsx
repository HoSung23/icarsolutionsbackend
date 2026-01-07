import React, { useState } from "react";
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
  descripcion: string | null;
  estado: string;
  created_at: string;
}

export default function TrackAppointment() {
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const servicioLabels: Record<string, string> = {
    revision_mecanica: "Revisión Mecánica",
    servicio_menor: "Servicio Menor",
    servicio_mayor: "Servicio Mayor",
    enderezado_pintura: "Enderezado y Pintura",
    otro: "Otro Servicio",
  };

  const estadoLabels: Record<string, string> = {
    pendiente: "Pendiente de Confirmación",
    confirmada: "Confirmada",
    en_proceso: "En Proceso",
    completada: "Completada",
    cancelada: "Cancelada",
  };

  const estadoColors: Record<string, string> = {
    pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
    confirmada: "bg-blue-100 text-blue-800 border-blue-300",
    en_proceso: "bg-purple-100 text-purple-800 border-purple-300",
    completada: "bg-green-100 text-green-800 border-green-300",
    cancelada: "bg-red-100 text-red-800 border-red-300",
  };

  const estadoIcons: Record<string, string> = {
    pendiente: "⏳",
    confirmada: "✅",
    en_proceso: "🔧",
    completada: "✔️",
    cancelada: "❌",
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAppointment(null);

    try {
      if (!searchId.trim()) {
        throw new Error("Ingresa el código de tu cita");
      }

      // Normalizar el código de búsqueda
      const searchCode = searchId.trim().toLowerCase();

      // Obtener todas las citas y filtrar del lado del cliente
      // porque ilike no funciona bien con UUIDs en Supabase
      const { data: allAppointments, error: searchError } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000); // Limitar a las últimas 1000 citas

      if (searchError) {
        throw new Error("Error al buscar la cita");
      }

      if (!allAppointments || allAppointments.length === 0) {
        throw new Error("No se encontró ninguna cita con ese código");
      }

      // Buscar la cita que coincida con los primeros 8 caracteres
      const foundAppointment = allAppointments.find((apt) =>
        apt.id.toLowerCase().startsWith(searchCode)
      );

      if (!foundAppointment) {
        throw new Error("No se encontró ninguna cita con ese código");
      }

      setAppointment(foundAppointment);
    } catch (err: any) {
      setError(err.message || "Error al buscar la cita");
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Formulario de búsqueda */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Rastrear mi Cita</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Ingresa el código de tu cita para ver el estado actual
        </p>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value.toUpperCase())}
            placeholder="Ej: ABC12345"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-base sm:text-lg"
            maxLength={8}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Resultado */}
      {appointment && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header con estado */}
          <div className={`p-4 sm:p-6 border-b-4 ${estadoColors[appointment.estado]}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1">
                  Estado de la Cita
                </div>
                <div className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3">
                  <span>{estadoIcons[appointment.estado]}</span>
                  <span>{estadoLabels[appointment.estado]}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Código</div>
                <div className="text-xl font-mono font-bold">
                  {appointment.id.substring(0, 8).toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Detalles */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Fecha y Hora */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                📅 Fecha y Hora
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(appointment.fecha_hora)}
              </p>
            </div>

            {/* Servicio */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                🔧 Tipo de Servicio
              </h3>
              <p className="text-lg text-gray-900">
                {servicioLabels[appointment.tipo_servicio]}
              </p>
            </div>

            {/* Cliente */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                👤 Información del Cliente
              </h3>
              <div className="space-y-1 text-gray-900">
                <p className="font-semibold">{appointment.cliente_nombre}</p>
                <p>{appointment.cliente_email}</p>
                <p>{appointment.cliente_telefono}</p>
              </div>
            </div>

            {/* Vehículo */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                🚗 Vehículo
              </h3>
              <p className="text-lg text-gray-900">
                {appointment.vehiculo_marca} {appointment.vehiculo_modelo} {appointment.vehiculo_año}
              </p>
              {appointment.vehiculo_placa && (
                <p className="text-gray-600">Placa: {appointment.vehiculo_placa}</p>
              )}
            </div>

            {/* Descripción */}
            {appointment.descripcion && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  📝 Descripción
                </h3>
                <p className="text-gray-900 whitespace-pre-wrap">
                  {appointment.descripcion}
                </p>
              </div>
            )}

            {/* Progreso visual */}
            <div className="border-t pt-4 sm:pt-6">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase mb-4">
                📊 Progreso
              </h3>
              <div className="flex items-center justify-between relative px-2">
                {/* Línea de progreso */}
                <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200">
                  <div
                    className={`h-full transition-all duration-500 ${
                      appointment.estado === "pendiente"
                        ? "bg-yellow-500 w-0"
                        : appointment.estado === "confirmada"
                        ? "bg-blue-500 w-1/3"
                        : appointment.estado === "en_proceso"
                        ? "bg-purple-500 w-2/3"
                        : appointment.estado === "completada"
                        ? "bg-green-500 w-full"
                        : "bg-red-500 w-full"
                    }`}
                  />
                </div>

                {/* Pasos */}
                <div className="relative z-10 text-center">
                  <div
                    className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      ["pendiente", "confirmada", "en_proceso", "completada"].includes(
                        appointment.estado
                      )
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    ⏳
                  </div>
                  <div className="text-xs font-semibold text-gray-700">Pendiente</div>
                </div>

                <div className="relative z-10 text-center">
                  <div
                    className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      ["confirmada", "en_proceso", "completada"].includes(appointment.estado)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    ✅
                  </div>
                  <div className="text-xs font-semibold text-gray-700">Confirmada</div>
                </div>

                <div className="relative z-10 text-center">
                  <div
                    className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      ["en_proceso", "completada"].includes(appointment.estado)
                        ? "bg-purple-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    🔧
                  </div>
                  <div className="text-xs font-semibold text-gray-700">En Proceso</div>
                </div>

                <div className="relative z-10 text-center">
                  <div
                    className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      appointment.estado === "completada"
                        ? "bg-green-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    ✔️
                  </div>
                  <div className="text-xs font-semibold text-gray-700">Completada</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-6 border-t">
            <p className="text-sm text-gray-600 text-center">
              ¿Necesitas ayuda? Contáctanos por WhatsApp:{" "}
              <a
                href="https://wa.me/50236826547"
                target="_blank"
                className="text-blue-600 hover:underline font-semibold"
              >
                +502 3682-6547
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Instrucciones */}
      {!appointment && !error && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">💡 ¿Cómo funciona?</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Al agendar tu cita, recibes un código único de 8 caracteres</li>
            <li>• Ingresa ese código aquí para ver el estado actual de tu cita</li>
            <li>• Puedes revisar tu cita en cualquier momento sin necesidad de registro</li>
          </ul>
        </div>
      )}
    </div>
  );
}
