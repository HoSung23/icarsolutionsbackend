import * as React from "react";
const { useState, useEffect } = React;

interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Los Mejores Vehículos",
    description: "Encuentra tu carro perfecto con los mejores precios",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: 2,
    title: "Financiamiento Disponible",
    description: "Opciones de pago flexibles para todos",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "from-pink-600 to-red-600"
  },
  {
    id: 3,
    title: "¡Contáctanos!",
    description: "Haz tu cita hoy",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    color: "from-blue-600 to-cyan-600"
  },
  {
    id: 4,
    title: "Servicio a Domicilio",
    description: "Traemos los repuestos a tu puerta",
    image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    color: "from-green-600 to-teal-600"
  },
  {
    id: 5,
    title: "Atención 24/7",
    description: "Siempre disponibles para ti",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    color: "from-orange-600 to-yellow-600"
  }
];

export const BannerCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000); // Cambiar cada 5 segundos

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000); // Reanudar auto-play después de 10s
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlay(false);
  };

  const banner = banners[current];

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      {/* Carrusel de banners */}
      <div
        className="relative w-full h-full transition-all duration-500"
        style={{ background: banner.image }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Contenido del banner */}
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold mb-4">{banner.title}</h2>
            <p className="text-xl mb-8 opacity-90">{banner.description}</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded font-bold hover:bg-gray-100 transition">
              Ver más
            </button>
          </div>
        </div>

        {/* Botón anterior */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition z-10"
          aria-label="Banner anterior"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Botón siguiente */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition z-10"
          aria-label="Banner siguiente"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Indicadores (puntos) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Ir al banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
