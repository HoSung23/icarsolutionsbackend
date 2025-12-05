import * as React from "react";
import icarLogo from "../assets/icar-solutions-mejorado.png";

interface HeroProps {
  phoneNumber?: string;
}

export const Hero: React.FC<HeroProps> = ({ phoneNumber = "50236826547" }) => {
  return (
    <div className="relative h-96 bg-gradient-to-r from-[#000034] via-[#001a5c] to-[#000034] overflow-hidden">
      {/* Overlay oscuro para intensificar el azul */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000034]/80 via-[#001a5c]/70 to-[#000034]/80"></div>
      
      {/* Background decoration con triangles */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 400">
          <polygon points="0,0 300,400 0,400" fill="white" />
          <polygon points="900,0 1200,0 1200,400" fill="white" />
        </svg>
      </div>

      {/* Contenido */}
      <div className="relative h-full flex items-center justify-center text-center text-white px-4">
        <div className="max-w-2xl">
          <div className="flex items-center justify-center mb-4">
            <img src={icarLogo.src} alt="iCarSolutions" className="h-40 rounded object-cover" />
          </div>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Encuentra tu vehículo perfecto
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#catalogo"
              className="bg-white text-blue-600 px-8 py-3 rounded font-bold hover:bg-gray-100 transition"
            >
              Ver catálogo
            </a>
            <a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded font-bold hover:bg-green-600 transition"
            >
              Contactanos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
