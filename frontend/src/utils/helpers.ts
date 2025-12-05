// Funciones de utilidad para WhatsApp
export function generateWhatsAppMessage(
  marca: string,
  modelo: string,
  año: string,
  precio: number
): string {
  return `Hola, estoy interesado en el ${marca} ${modelo} ${año} con precio de $${precio.toLocaleString()}. ¿Está disponible?`;
}

export function getWhatsAppLink(
  phoneNumber: string,
  marca: string,
  modelo: string,
  año: string,
  precio: number
): string {
  const message = generateWhatsAppMessage(marca, modelo, año, precio);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}

// Formateo de números
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// Transformación de datos
export function formatVehicleTitle(vehicle: any): string {
  return `${vehicle.marca} ${vehicle.modelo_año}`;
}
