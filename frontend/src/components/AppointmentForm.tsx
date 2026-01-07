import React, { useState } from "react";
import { supabase } from "../utils/supabase";

interface AppointmentFormProps {
  onSuccess?: () => void;
}

export default function AppointmentForm({ onSuccess }: AppointmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [availableHours, setAvailableHours] = useState<number[]>([]);
  const [loadingHours, setLoadingHours] = useState(false);
  const [formData, setFormData] = useState({
    tipo_servicio: "",
    fecha: "",
    hora: "",
    cliente_nombre: "",
    cliente_email: "",
    cliente_telefono: "",
    vehiculo_marca: "",
    vehiculo_modelo: "",
    vehiculo_año: "",
    vehiculo_placa: "",
    kilometraje: "",
    descripcion: "",
    citaId: "",
  });

  const servicios = [
    { value: "revision_mecanica", label: "Revisión Mecánica", icon: "🔧" },
    { value: "servicio_menor", label: "Servicio Menor", icon: "⚙️" },
    { value: "servicio_mayor", label: "Servicio Mayor", icon: "🛠️" },
    { value: "enderezado_pintura", label: "Enderezado y Pintura", icon: "🎨" },
    { value: "otro", label: "Otro Servicio", icon: "📋" },
  ];

  // Cargar disponibilidad cuando cambia la fecha
  const checkAvailability = async (fecha: string) => {
    if (!fecha) {
      setAvailableHours([]);
      return;
    }

    setLoadingHours(true);
    try {
      // Obtener todas las citas del día seleccionado (ajustando +6 horas por el offset)
      const startOfDay = new Date(`${fecha}T00:00:00Z`);
      startOfDay.setUTCHours(6, 0, 0, 0); // Empezar desde 6 AM UTC (0 AM Guatemala)
      
      const endOfDay = new Date(`${fecha}T00:00:00Z`);
      endOfDay.setUTCHours(29, 59, 59, 999); // Hasta 11:59 PM del mismo día

      const { data: citas, error } = await supabase
        .from("appointments")
        .select("fecha_hora")
        .gte("fecha_hora", startOfDay.toISOString())
        .lte("fecha_hora", endOfDay.toISOString())
        .neq("estado", "cancelada");

      if (error) throw error;

      // Contar citas por hora (ajustando -6 horas al leer)
      const citasPorHora: Record<number, number> = {};
      citas?.forEach((cita) => {
        const fecha = new Date(cita.fecha_hora);
        const horaAjustada = fecha.getUTCHours() - 6; // Restar 6 horas
        if (horaAjustada >= 8 && horaAjustada <= 16) {
          citasPorHora[horaAjustada] = (citasPorHora[horaAjustada] || 0) + 1;
        }
      });

      // Filtrar horas disponibles (menos de 3 citas)
      const horasDisponibles = Array.from({ length: 9 }, (_, i) => i + 8).filter(
        (hora) => (citasPorHora[hora] || 0) < 3
      );

      setAvailableHours(horasDisponibles);
    } catch (error) {
      console.error("Error al verificar disponibilidad:", error);
      setAvailableHours(Array.from({ length: 9 }, (_, i) => i + 8));
    } finally {
      setLoadingHours(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validaciones
      if (!formData.tipo_servicio) {
        throw new Error("Selecciona el tipo de servicio");
      }
      if (!formData.fecha || !formData.hora) {
        throw new Error("Selecciona fecha y hora");
      }

      // Crear fecha ajustando +6 horas para compensar timezone
      // Si el usuario elige 8 AM, guardamos como 2 PM UTC para que se muestre correcto
      const [horaNum, minutoNum] = formData.hora.split(":").map(Number);
      const fechaHora = new Date(`${formData.fecha}T00:00:00Z`);
      fechaHora.setUTCHours(horaNum + 6, minutoNum, 0, 0); // Sumar 6 horas
      
      const ahora = new Date();

      if (fechaHora < ahora) {
        throw new Error("No puedes agendar una cita en el pasado");
      }

      // Verificar horario laboral (8 AM - 5 PM)
      const hora = parseInt(formData.hora.split(":")[0]);
      if (hora < 8 || hora >= 17) {
        throw new Error("Horario disponible: 8:00 AM - 5:00 PM");
      }

      // Verificar capacidad: máximo 3 citas por hora
      const horaInicio = new Date(fechaHora);
      horaInicio.setMinutes(0, 0, 0);
      
      const horaFin = new Date(horaInicio);
      horaFin.setHours(horaFin.getHours() + 1);

      const { data: citasExistentes, error: checkError } = await supabase
        .from("appointments")
        .select("id")
        .gte("fecha_hora", horaInicio.toISOString())
        .lt("fecha_hora", horaFin.toISOString())
        .neq("estado", "cancelada");

      if (checkError) throw checkError;

      if (citasExistentes && citasExistentes.length >= 3) {
        throw new Error(`Ya hay ${citasExistentes.length} citas agendadas entre ${hora}:00 y ${hora + 1}:00. Capacidad máxima: 3 citas por hora. Por favor elige otro horario.`);
      }

      // Crear la cita
      const { data: appointment, error: insertError } = await supabase
        .from("appointments")
        .insert({
          tipo_servicio: formData.tipo_servicio,
          fecha_hora: fechaHora.toISOString(),
          cliente_nombre: formData.cliente_nombre,
          cliente_email: formData.cliente_email,
          cliente_telefono: formData.cliente_telefono,
          vehiculo_marca: formData.vehiculo_marca,
          vehiculo_modelo: formData.vehiculo_modelo,
          vehiculo_año: parseInt(formData.vehiculo_año),
          vehiculo_placa: formData.vehiculo_placa || null,
          kilometraje: formData.kilometraje ? parseInt(formData.kilometraje) : null,
          descripcion: formData.descripcion || null,
          estado: "pendiente",
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Enviar evento de calendario
      try {
        const response = await fetch("/api/create-calendar-event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appointmentId: appointment.id,
            ...formData,
            fecha_hora: fechaHora.toISOString(),
          }),
        });

        if (!response.ok) {
          console.error("Error al crear evento de calendario");
        }
      } catch (calendarError) {
        console.error("Error de calendario:", calendarError);
        // No fallar si el calendario no funciona
      }

      setSuccess(true);
      setFormData({
        tipo_servicio: "",
        fecha: "",
        hora: "",
        cliente_nombre: "",
        cliente_email: "",
        cliente_telefono: "",
        vehiculo_marca: "",
        vehiculo_modelo: "",
        vehiculo_año: "",
        vehiculo_placa: "",
        kilometraje: "",
        descripcion: "",
        citaId: appointment.id.substring(0, 8).toUpperCase(),
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Error al agendar la cita");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Si cambia la fecha, verificar disponibilidad
    if (name === "fecha") {
      checkAvailability(value);
    }
  };

  // Obtener fecha mínima (mañana)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Fecha máxima (3 meses adelante)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">¡Cita Agendada!</h2>
          <p className="text-green-700 mb-4">
            Te hemos enviado un correo de confirmación con los detalles de tu cita.
          </p>
          <div className="bg-white border border-green-300 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 mb-2">Tu código de cita es:</p>
            <p className="text-2xl font-mono font-bold text-blue-600">{formData.citaId}</p>
            <p className="text-xs text-gray-500 mt-2">
              Guarda este código para rastrear tu cita
            </p>
          </div>
          <p className="text-sm text-green-600 mb-6">
            También recibirás un recordatorio 24 horas antes por WhatsApp.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={`/track-appointment?id=${formData.citaId}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Ver Estado de mi Cita
            </a>
            <button
              onClick={() => {
                setSuccess(false);
                setFormData({
                  tipo_servicio: "",
                  fecha: "",
                  hora: "",
                  cliente_nombre: "",
                  cliente_email: "",
                  cliente_telefono: "",
                  vehiculo_marca: "",
                  vehiculo_modelo: "",
                  vehiculo_año: "",
                  vehiculo_placa: "",
                  kilometraje: "",
                  descripcion: "",
                  citaId: "",
                });
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold"
            >
              Agendar Otra Cita
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Agendar Cita</h2>
        <p className="text-gray-600 mb-6">
          Completa el formulario para agendar tu cita de servicio
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Servicio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de Servicio *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {servicios.map((servicio) => (
                <button
                  key={servicio.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, tipo_servicio: servicio.value })
                  }
                  className={`p-4 border-2 rounded-lg transition ${
                    formData.tipo_servicio === servicio.value
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="text-3xl mb-2">{servicio.icon}</div>
                  <div className="text-sm font-semibold">{servicio.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha *
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                min={minDate}
                max={maxDateStr}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hora * (8:00 AM - 5:00 PM)
              </label>
              <select
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                required
                disabled={!formData.fecha || loadingHours}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {!formData.fecha 
                    ? "Primero selecciona una fecha" 
                    : loadingHours 
                    ? "Cargando disponibilidad..." 
                    : "Selecciona una hora"}
                </option>
                {formData.fecha && !loadingHours && availableHours.map((hour) => (
                  <option key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                    {hour === 12 ? "12:00 PM" : hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                  </option>
                ))}
              </select>
              {formData.fecha && !loadingHours && availableHours.length === 0 && (
                <p className="mt-2 text-sm text-red-600">
                  No hay horarios disponibles para esta fecha. Todas las horas están llenas.
                </p>
              )}
              {formData.fecha && !loadingHours && availableHours.length > 0 && availableHours.length < 9 && (
                <p className="mt-2 text-sm text-blue-600">
                  {9 - availableHours.length} hora(s) ya están llenas en esta fecha
                </p>
              )}
            </div>
          </div>

          {/* Información del Cliente */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="cliente_nombre"
                  value={formData.cliente_nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="cliente_email"
                  value={formData.cliente_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="cliente_telefono"
                  value={formData.cliente_telefono}
                  onChange={handleChange}
                  required
                  placeholder="50212345678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Información del Vehículo */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Información del Vehículo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Marca *
                </label>
                <input
                  type="text"
                  name="vehiculo_marca"
                  value={formData.vehiculo_marca}
                  onChange={handleChange}
                  required
                  placeholder="Toyota, Honda, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Modelo *
                </label>
                <input
                  type="text"
                  name="vehiculo_modelo"
                  value={formData.vehiculo_modelo}
                  onChange={handleChange}
                  required
                  placeholder="Corolla, Civic, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Año *
                </label>
                <input
                  type="number"
                  name="vehiculo_año"
                  value={formData.vehiculo_año}
                  onChange={handleChange}
                  required
                  min="1980"
                  max={new Date().getFullYear() + 1}
                  placeholder="2020"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Placa (Opcional)
                </label>
                <input
                  type="text"
                  name="vehiculo_placa"
                  value={formData.vehiculo_placa}
                  onChange={handleChange}
                  placeholder="P-123ABC"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kilometraje (Opcional)
                </label>
                <input
                  type="number"
                  name="kilometraje"
                  value={formData.kilometraje}
                  onChange={handleChange}
                  placeholder="50000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción del Problema (Opcional)
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="Describe cualquier problema o solicitud especial..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Botón Submit */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Agendando..." : "Agendar Cita"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
