import * as React from "react";
import { formatPrice, getWhatsAppLink } from "../utils/helpers";

interface Vehicle {
  id: string;
  marca: string;
  modelo_año: string;
  cilindraje: string;
  precio: number;
  combustible: string;
  transmision: string;
  imagenes: string[];
  estado: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
}) => {
  const statusColors = {
    disponible: "bg-green-100 text-green-800",
    vendido: "bg-red-100 text-red-800",
    reservado: "bg-yellow-100 text-yellow-800",
  };

  const whatsappLink = getWhatsAppLink(
    "50236826547",
    vehicle.marca,
    vehicle.modelo_año,
    new Date().getFullYear().toString(),
    vehicle.precio
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagen con clip-path triangular */}
      <div className="h-48 bg-gradient-to-br from-blue-600 to-orange-500 relative overflow-hidden">
        {vehicle.imagenes && vehicle.imagenes.length > 0 ? (
          <img
            src={vehicle.imagenes[0]}
            alt={`${vehicle.marca} ${vehicle.modelo_año}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-sm">
            Sin imagen
          </div>
        )}
        {/* Badge de estado */}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${
            statusColors[vehicle.estado as keyof typeof statusColors] ||
            statusColors.disponible
          }`}
        >
          {vehicle.estado}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">
          {vehicle.marca} {vehicle.modelo_año}
        </h3>

        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p>Cilindraje: {vehicle.cilindraje}</p>
          <p>Combustible: {vehicle.combustible}</p>
          <p>Transmisión: {vehicle.transmision}</p>
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-2xl font-bold text-blue-600">
            {formatPrice(vehicle.precio)}
          </p>
        </div>

        {/* Botones */}
        <div className="mt-4 flex gap-2">
          <a
            href={`/vehiculos/${vehicle.id}`}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-center"
          >
            Ver detalles
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition text-center"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
