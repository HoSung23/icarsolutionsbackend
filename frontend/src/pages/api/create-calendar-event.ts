import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para generar archivo .ics
function generateICS(appointment: any) {
  const startDate = new Date(appointment.fecha_hora);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hora

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const servicioLabels: Record<string, string> = {
    revision_mecanica: 'Revisión Mecánica',
    servicio_menor: 'Servicio Menor',
    servicio_mayor: 'Servicio Mayor',
    enderezado_pintura: 'Enderezado y Pintura',
    otro: 'Otro Servicio'
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//iCarSolutions//Appointment//ES
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${appointment.id}@icarsolutions.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${servicioLabels[appointment.tipo_servicio]} - iCarSolutions
DESCRIPTION:Cita de servicio automotriz\\n\\nCliente: ${appointment.cliente_nombre}\\nVehículo: ${appointment.vehiculo_marca} ${appointment.vehiculo_modelo} ${appointment.vehiculo_año}\\n${appointment.descripcion ? `Descripción: ${appointment.descripcion}` : ''}
LOCATION:iCarSolutions - Taller Automotriz
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Recordatorio: Cita de servicio mañana
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return icsContent;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { appointmentId, cliente_email, cliente_nombre, tipo_servicio } = data;

    // Obtener la cita de la base de datos
    const { data: appointment, error: fetchError } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", appointmentId)
      .single();

    if (fetchError || !appointment) {
      return new Response(
        JSON.stringify({ error: "Cita no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generar archivo .ics
    const icsContent = generateICS(appointment);

    // Aquí puedes agregar lógica para enviar email con el .ics adjunto
    // Por ahora retornamos el contenido para que el cliente lo descargue

    return new Response(
      JSON.stringify({
        success: true,
        icsContent: icsContent,
        message: "Evento de calendario generado exitosamente"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error: any) {
    console.error("Error en create-calendar-event:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
