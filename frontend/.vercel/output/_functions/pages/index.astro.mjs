/* empty css                                 */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { i as icarLogo, s as supabase, $ as $$Layout } from '../chunks/Layout_Qfaif4Qm.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { createContext, useState as useState$2, useContext, useEffect as useEffect$2 } from 'react';
export { renderers } from '../renderers.mjs';

const Hero = ({ phoneNumber = "50236826547" }) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative h-96 bg-gradient-to-r from-[#000034] via-[#001a5c] to-[#000034] overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#000034]/80 via-[#001a5c]/70 to-[#000034]/80" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsxs("svg", { className: "w-full h-full", viewBox: "0 0 1200 400", children: [
      /* @__PURE__ */ jsx("polygon", { points: "0,0 300,400 0,400", fill: "white" }),
      /* @__PURE__ */ jsx("polygon", { points: "900,0 1200,0 1200,400", fill: "white" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "relative h-full flex items-center justify-center text-center text-white px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx("img", { src: icarLogo.src, alt: "iCarSolutions", className: "h-40 rounded object-cover" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl mb-8 opacity-90", children: "Encuentra tu vehículo perfecto" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#catalogo",
            className: "bg-white text-blue-600 px-8 py-3 rounded font-bold hover:bg-gray-100 transition",
            children: "Ver catálogo"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `https://wa.me/${phoneNumber}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "bg-green-500 text-white px-8 py-3 rounded font-bold hover:bg-green-600 transition",
            children: "Contactanos"
          }
        )
      ] })
    ] }) })
  ] });
};

const { useState: useState$1, useEffect: useEffect$1 } = React;
const banners = [
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
const BannerCarousel = () => {
  const [current, setCurrent] = useState$1(0);
  const [isAutoPlay, setIsAutoPlay] = useState$1(true);
  useEffect$1(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5e3);
    return () => clearInterval(timer);
  }, [isAutoPlay]);
  const goToSlide = (index) => {
    setCurrent(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 1e4);
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
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full h-96 overflow-hidden rounded-lg shadow-lg", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative w-full h-full transition-all duration-500",
        style: { background: banner.image },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40" }),
          /* @__PURE__ */ jsx("div", { className: "relative h-full flex items-center justify-center text-center text-white px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-5xl font-bold mb-4", children: banner.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 opacity-90", children: banner.description }),
            /* @__PURE__ */ jsx("button", { className: "bg-white text-blue-600 px-8 py-3 rounded font-bold hover:bg-gray-100 transition", children: "Ver más" })
          ] }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: prevSlide,
              className: "absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition z-10",
              "aria-label": "Banner anterior",
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-6 h-6",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M15 19l-7-7 7-7"
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: nextSlide,
              className: "absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition z-10",
              "aria-label": "Banner siguiente",
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-6 h-6",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M9 5l7 7-7 7"
                    }
                  )
                }
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10", children: banners.map((_, index) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => goToSlide(index),
        className: `w-3 h-3 rounded-full transition ${index === current ? "bg-white" : "bg-white/50"}`,
        "aria-label": `Ir al banner ${index + 1}`
      },
      index
    )) })
  ] });
};

const icarSolutionsImg = new Proxy({"src":"/_astro/ICARSOLUTIONS.i7bn8rNa.jpeg","width":500,"height":500,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/assets/ICARSOLUTIONS.jpeg";
							}
							
							return target[name];
						}
					});

const spaImg = new Proxy({"src":"/_astro/SPA.BJtylUMG.jpeg","width":720,"height":1600,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/assets/SPA.jpeg";
							}
							
							return target[name];
						}
					});

const fdrImg = new Proxy({"src":"/_astro/TRD.Bp8XSYxk.jpeg","width":501,"height":501,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/assets/TRD.jpeg";
							}
							
							return target[name];
						}
					});

const ventasImg = new Proxy({"src":"/_astro/PRIME-AUTO.Dmzy28jn.jpeg","width":1170,"height":869,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/assets/PRIME-AUTO.jpeg";
							}
							
							return target[name];
						}
					});

const services = [
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
const ServicesSection = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-gray-50 py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Servicios Aliados" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: "Contamos con los mejores socios para ofrecerte servicios completos" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-6 flex-wrap", children: services.map((service) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex-1 min-w-64 max-w-80",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `bg-gradient-to-br ${service.color} h-40 w-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300 bg-cover bg-center aspect-square`,
              style: {
                backgroundImage: service.image && !service.image.includes("💰") ? `url(${service.image})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center"
              },
              children: !service.image || service.image.includes("💰") ? service.image : null
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-2", children: service.name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-600 font-semibold mb-3", children: service.category }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4", children: service.description }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `https://wa.me/${service.phone}?text=Hola,%20me%20interesa%20el%20servicio%20de%20${encodeURIComponent(service.name)}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded font-semibold hover:from-blue-700 hover:to-blue-800 transition text-center",
                children: "Contactar"
              }
            )
          ] })
        ]
      },
      service.id
    )) })
  ] }) });
};

const FilterContext = createContext(void 0);
const FilterProvider = ({
  children
}) => {
  const [filters, setFilters] = useState$2({
    marca: "",
    minPrice: "",
    maxPrice: "",
    combustible: "",
    transmision: "",
    estado: "disponible",
    tipo: ""
  });
  return /* @__PURE__ */ jsx(FilterContext.Provider, { value: { filters, setFilters }, children });
};
const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};

const { useState, useEffect } = React;
const FilterPanel = () => {
  const { filters, setFilters } = useFilters();
  const [localFilters, setLocalFilters] = useState(filters);
  const [marcas, setMarcas] = useState([]);
  useEffect(() => {
    fetchMarcas();
  }, []);
  const fetchMarcas = async () => {
    try {
      const { data, error } = await supabase.from("vehicles").select("marca");
      if (error) throw error;
      const uniqueMarcas = Array.from(
        new Set(data?.map((v) => v.marca).filter((m) => m && m.trim() !== ""))
      ).sort();
      setMarcas(uniqueMarcas);
    } catch (error) {
      console.error("Error cargando marcas:", error);
    }
  };
  const handleChange = (field, value) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
  };
  const handleApplyFilters = () => {
    setFilters(localFilters);
  };
  const handleClearFilters = () => {
    const clearedFilters = {
      marca: "",
      minPrice: "",
      maxPrice: "",
      combustible: "",
      transmision: "",
      estado: "disponible",
      tipo: ""
    };
    setLocalFilters(clearedFilters);
    setFilters(clearedFilters);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md h-fit sticky top-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: "Filtros" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Marca" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: localFilters.marca,
          onChange: (e) => handleChange("marca", e.target.value),
          className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Todas las marcas" }),
            marcas.map((marca) => /* @__PURE__ */ jsx("option", { value: marca, children: marca }, marca))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Rango de precio (QTZ)" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              placeholder: "Precio mínimo",
              value: localFilters.minPrice,
              onChange: (e) => handleChange("minPrice", e.target.value),
              min: "0",
              step: "1000",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 mt-1", children: "Mín" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              placeholder: "Precio máximo",
              value: localFilters.maxPrice,
              onChange: (e) => handleChange("maxPrice", e.target.value),
              min: "0",
              step: "1000",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 mt-1", children: "Máx" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Combustible" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: localFilters.combustible,
          onChange: (e) => handleChange("combustible", e.target.value),
          className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Todos" }),
            /* @__PURE__ */ jsx("option", { value: "Gasolina", children: "Gasolina" }),
            /* @__PURE__ */ jsx("option", { value: "Diésel", children: "Diésel" }),
            /* @__PURE__ */ jsx("option", { value: "Híbrido", children: "Híbrido" }),
            /* @__PURE__ */ jsx("option", { value: "Eléctrico", children: "Eléctrico" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Transmisión" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: localFilters.transmision,
          onChange: (e) => handleChange("transmision", e.target.value),
          className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Todos" }),
            /* @__PURE__ */ jsx("option", { value: "Manual", children: "Manual" }),
            /* @__PURE__ */ jsx("option", { value: "Automática", children: "Automática" }),
            /* @__PURE__ */ jsx("option", { value: "CVT", children: "CVT" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Tipo de Vehículo" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: localFilters.tipo,
          onChange: (e) => handleChange("tipo", e.target.value),
          className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Todos los tipos" }),
            /* @__PURE__ */ jsx("option", { value: "Sedán", children: "Sedán" }),
            /* @__PURE__ */ jsx("option", { value: "SUV", children: "SUV" }),
            /* @__PURE__ */ jsx("option", { value: "Pickup", children: "Pickup" }),
            /* @__PURE__ */ jsx("option", { value: "Hatchback", children: "Hatchback" }),
            /* @__PURE__ */ jsx("option", { value: "Coupé", children: "Coupé" }),
            /* @__PURE__ */ jsx("option", { value: "Convertible", children: "Convertible" }),
            /* @__PURE__ */ jsx("option", { value: "Van", children: "Van" }),
            /* @__PURE__ */ jsx("option", { value: "Camión", children: "Camión" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleApplyFilters,
          className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition",
          children: "Aplicar Filtros"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleClearFilters,
          className: "w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded transition",
          children: "Limpiar Filtros"
        }
      )
    ] })
  ] });
};

function VehicleCatalog() {
  const [vehicles, setVehicles] = useState$2([]);
  const [filteredVehicles, setFilteredVehicles] = useState$2([]);
  const [loading, setLoading] = useState$2(true);
  const { filters } = useFilters();
  useEffect$2(() => {
    fetchVehicles();
  }, []);
  useEffect$2(() => {
    applyFilters();
  }, [vehicles, filters]);
  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase.from("vehicles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error("Error cargando vehículos:", error);
    } finally {
      setLoading(false);
    }
  };
  const applyFilters = () => {
    let filtered = vehicles;
    if (filters.marca) {
      filtered = filtered.filter(
        (v) => v.marca.toLowerCase().includes(filters.marca.toLowerCase())
      );
    }
    if (filters.minPrice) {
      filtered = filtered.filter((v) => v.precio >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((v) => v.precio <= Number(filters.maxPrice));
    }
    if (filters.combustible) {
      filtered = filtered.filter(
        (v) => v.combustible && v.combustible.toLowerCase() === filters.combustible.toLowerCase()
      );
    }
    if (filters.transmision) {
      filtered = filtered.filter(
        (v) => v.transmision && v.transmision.toLowerCase() === filters.transmision.toLowerCase()
      );
    }
    if (filters.estado) {
      filtered = filtered.filter((v) => v.estado === filters.estado);
    }
    if (filters.tipo) {
      filtered = filtered.filter((v) => v.tipo === filters.tipo);
    }
    setFilteredVehicles(filtered);
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Cargando vehículos..." }) });
  }
  if (filteredVehicles.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: vehicles.length === 0 ? "No hay vehículos disponibles" : "No hay vehículos que coincidan con los filtros" }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: filteredVehicles.map((vehicle) => /* @__PURE__ */ jsx("a", { href: `/vehiculos/${vehicle.id}`, className: "group", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition", children: [
    /* @__PURE__ */ jsx("div", { className: "relative h-48 overflow-hidden bg-gray-200", children: vehicle.imagenes && vehicle.imagenes.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: vehicle.imagenes[0],
          alt: `${vehicle.marca} ${vehicle.modelo_año}`,
          className: "w-full h-full object-cover group-hover:scale-105 transition"
        }
      ),
      vehicle.imagenes.length > 1 && /* @__PURE__ */ jsxs("div", { className: "absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold", children: [
        "+",
        vehicle.imagenes.length - 1,
        " fotos"
      ] })
    ] }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-gray-300", children: /* @__PURE__ */ jsx("span", { className: "text-white text-6xl", children: "🚗" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxs("h3", { className: "font-bold text-lg text-gray-900 group-hover:text-blue-600 transition", children: [
        vehicle.marca,
        " ",
        vehicle.modelo_año
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-blue-600 font-bold text-xl mt-2", children: [
        "QTZ ",
        vehicle.precio.toLocaleString()
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-600 mt-3 space-y-1", children: [
        vehicle.combustible && /* @__PURE__ */ jsxs("p", { children: [
          "⛽ ",
          vehicle.combustible
        ] }),
        vehicle.transmision && /* @__PURE__ */ jsxs("p", { children: [
          "⚙️ ",
          vehicle.transmision
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 pt-3 border-t border-gray-200", children: /* @__PURE__ */ jsx("span", { className: `inline-block px-3 py-1 rounded-full text-xs font-semibold ${vehicle.estado === "disponible" ? "bg-green-100 text-green-800" : vehicle.estado === "vendido" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`, children: vehicle.estado === "disponible" ? "Disponible" : vehicle.estado === "vendido" ? "Vendido" : "Reservado" }) })
    ] })
  ] }) }, vehicle.id)) });
}

const CatalogSection = () => {
  return /* @__PURE__ */ jsx(FilterProvider, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx(FilterPanel, {}) }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsx(VehicleCatalog, {}) })
  ] }) });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "iCarSolutions - Inicio" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", Hero, { "client:load": true, "phoneNumber": "502XXXXXXXX", "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/Hero", "client:component-export": "Hero" })} ${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 py-8"> ${renderComponent($$result2, "BannerCarousel", BannerCarousel, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/BannerCarousel", "client:component-export": "BannerCarousel" })} </div> ${renderComponent($$result2, "ServicesSection", ServicesSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/ServicesSection", "client:component-export": "ServicesSection" })} <div class="max-w-7xl mx-auto px-4 py-12"> <h2 class="text-3xl font-bold mb-8">Nuestro Catálogo</h2> ${renderComponent($$result2, "CatalogSection", CatalogSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/CatalogSection", "client:component-export": "CatalogSection" })} </div> ` })} `;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/index.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
