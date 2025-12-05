import * as React from "react";
import icarSolutionsImg from "../assets/ICARSOLUTIONS.jpeg";
import spaImg from "../assets/SPA.jpeg";
import fdrImg from "../assets/TRD.jpeg";
import ventasImg from "../assets/PRIME-AUTO.jpeg";

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  color: string;
  phone?: string;
}

const services: Service[] = [
  {
    id: 1,
    name: "iCarSolutions",
    category: "Plataforma Principal",
    description: "Tu plataforma de confianza para venta y servicios automotrices",
    image: icarSolutionsImg.src,
    color: "from-purple-500 to-purple-600",
    phone: "50236826547"
  },
  {
    id: 2,
    name: "FDR",
    category: "Importaciones",
    description: "Importamos vehículos de primera línea desde el exterior",
    image: fdrImg.src,
    color: "from-orange-500 to-orange-600",
    phone: "50236826547"
  },
  {
    id: 3,
    name: "PRIME AUTO",
    category: "Venta de Vehículos",
    description: "Compra y venta de vehículos con las mejores opciones",
    image: ventasImg.src,
    color: "from-green-500 to-green-600",
    phone: "50255396291"
  },
  {
    id: 4,
    name: "SPA",
    category: "Taller Mecánico & Pintura",
    description: "Servicio completo de mantenimiento, reparación y pintura profesional",
    image: spaImg.src,
    color: "from-blue-500 to-blue-600",
    phone: "50236826547"
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Servicios Aliados
          </h2>
          <p className="text-lg text-gray-600">
            Contamos con los mejores socios para ofrecerte servicios completos
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="flex justify-center gap-6 flex-wrap">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex-1 min-w-64 max-w-80"
            >
              {/* Imagen/Fondo del servicio */}
              <div
                className={`bg-gradient-to-br ${service.color} h-40 w-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300 bg-cover bg-center aspect-square`}
                style={{
                  backgroundImage: service.image && !service.image.includes("💰") ? `url(${service.image})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                {!service.image || service.image.includes("💰") ? service.image : null}
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">
                  {service.category}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>

                {/* Botón */}
                <a
                  href={`https://wa.me/${service.phone}?text=Hola,%20me%20interesa%20el%20servicio%20de%20${encodeURIComponent(service.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded font-semibold hover:from-blue-700 hover:to-blue-800 transition text-center"
                >
                  Contactar
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
