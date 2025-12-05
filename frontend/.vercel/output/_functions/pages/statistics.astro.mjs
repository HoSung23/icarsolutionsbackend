/* empty css                                 */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { s as supabase, $ as $$Layout } from '../chunks/Layout_Qfaif4Qm.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { L as LogoutButton } from '../chunks/LogoutButton_DMx9gjLR.mjs';
export { renderers } from '../renderers.mjs';

const StatisticsPanel = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    soldVehicles: 0,
    totalQuotations: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchStats();
  }, []);
  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");
      const { data: vehicles, error: vehiclesError } = await supabase.from("vehicles").select("id, estado");
      if (vehiclesError) throw vehiclesError;
      const { data: quotations, error: quotationsError } = await supabase.from("cotizaciones").select("total").eq("created_by", user.id);
      if (quotationsError) throw quotationsError;
      const totalVehicles = vehicles?.length || 0;
      const availableVehicles = vehicles?.filter((v) => v.estado === "disponible").length || 0;
      const soldVehicles = vehicles?.filter((v) => v.estado === "vendido").length || 0;
      const totalQuotations = quotations?.length || 0;
      const totalRevenue = quotations?.reduce((sum, q) => sum + q.total, 0) || 0;
      setStats({
        totalVehicles,
        availableVehicles,
        soldVehicles,
        totalQuotations,
        totalRevenue
      });
    } catch (err) {
      console.error("Error al obtener estadísticas:", err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "Cargando estadísticas..." }) });
  }
  const statCards = [
    {
      label: "Total de Vehículos",
      value: stats.totalVehicles,
      color: "blue",
      icon: "🚗"
    },
    {
      label: "Disponibles",
      value: stats.availableVehicles,
      color: "green",
      icon: "✅"
    },
    {
      label: "Vendidos",
      value: stats.soldVehicles,
      color: "red",
      icon: "✔️"
    },
    {
      label: "Cotizaciones",
      value: stats.totalQuotations,
      color: "purple",
      icon: "📄"
    },
    {
      label: "Ingresos Totales",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      color: "yellow",
      icon: "💰"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Estadísticas" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => fetchStats(),
          className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition",
          children: "Actualizar"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4", children: statCards.map((card, index) => {
      const colorClasses = {
        blue: "bg-blue-50 border-blue-200 text-blue-900",
        green: "bg-green-50 border-green-200 text-green-900",
        red: "bg-red-50 border-red-200 text-red-900",
        purple: "bg-purple-50 border-purple-200 text-purple-900",
        yellow: "bg-yellow-50 border-yellow-200 text-yellow-900"
      };
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: `border-2 rounded-lg p-4 ${colorClasses[card.color]}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl mb-2", children: card.icon }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium opacity-75", children: card.label }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold mt-1", children: card.value })
          ]
        },
        index
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-6 border-t", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Resumen del Rendimiento" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Tasa de Venta" }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            stats.totalVehicles > 0 ? (stats.soldVehicles / stats.totalVehicles * 100).toFixed(1) : 0,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Inventario Disponible" }),
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: stats.availableVehicles })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Promedio por Cotización" }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            "$",
            stats.totalQuotations > 0 ? (stats.totalRevenue / stats.totalQuotations).toLocaleString() : 0
          ] })
        ] })
      ] })
    ] })
  ] });
};

const $$Statistics = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Estad\xEDsticas - iCarSolutions" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-12 px-4"> <div class="max-w-7xl mx-auto"> <div class="flex justify-between items-center mb-6"> <a href="/dashboard" class="text-blue-600 hover:text-blue-800 font-semibold">
← Volver al Dashboard
</a> ${renderComponent($$result2, "LogoutButton", LogoutButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/LogoutButton", "client:component-export": "default" })} </div> ${renderComponent($$result2, "StatisticsPanel", StatisticsPanel, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/StatisticsPanel", "client:component-export": "default" })} </div> </div> ` })} ${renderScript($$result, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/statistics.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/statistics.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/statistics.astro";
const $$url = "/statistics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Statistics,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
