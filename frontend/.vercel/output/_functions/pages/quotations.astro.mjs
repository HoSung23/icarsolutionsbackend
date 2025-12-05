/* empty css                                 */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { s as supabase, $ as $$Layout } from '../chunks/Layout_Qfaif4Qm.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { L as LogoutButton } from '../chunks/LogoutButton_DMx9gjLR.mjs';
export { renderers } from '../renderers.mjs';

const QuotationsPanel = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cliente_nombre: "",
    cliente_email: "",
    total: ""
  });
  useEffect(() => {
    fetchQuotations();
  }, []);
  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");
      const { data, error: fetchError } = await supabase.from("cotizaciones").select("*").eq("created_by", user.id).order("created_at", { ascending: false });
      if (fetchError) throw fetchError;
      setQuotations(data || []);
    } catch (err) {
      setError(err.message || "Error al cargar cotizaciones");
    } finally {
      setLoading(false);
    }
  };
  const handleAddQuotation = async (e) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");
      const { error: insertError } = await supabase.from("cotizaciones").insert({
        cliente_nombre: formData.cliente_nombre,
        cliente_email: formData.cliente_email,
        cliente_telefono: "",
        total: parseFloat(formData.total),
        items: { description: "Cotización de vehículos" },
        created_by: user.id
      });
      if (insertError) throw insertError;
      setFormData({ cliente_nombre: "", cliente_email: "", total: "" });
      setShowModal(false);
      fetchQuotations();
    } catch (err) {
      setError(err.message);
    }
  };
  const downloadPDF = (quotation) => {
    const doc = `
COTIZACIÓN - iCarSolutions
========================

Cliente: ${quotation.cliente_nombre}
Email: ${quotation.cliente_email}
Fecha: ${new Date(quotation.created_at).toLocaleDateString()}

Total: $${quotation.total.toLocaleString()}

---
Documento generado automáticamente
    `;
    const blob = new Blob([doc], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cotizacion-${quotation.id}.txt`;
    a.click();
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "Cargando cotizaciones..." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Cotizaciones" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowModal(true),
          className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition",
          children: "+ Nueva Cotización"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded", children: error }),
    showModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-8 max-w-md w-full", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Nueva Cotización" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleAddQuotation, className: "space-y-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Nombre del Cliente",
            value: formData.cliente_nombre,
            onChange: (e) => setFormData({ ...formData, cliente_nombre: e.target.value }),
            className: "w-full px-3 py-2 border rounded-lg",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            placeholder: "Email del Cliente",
            value: formData.cliente_email,
            onChange: (e) => setFormData({ ...formData, cliente_email: e.target.value }),
            className: "w-full px-3 py-2 border rounded-lg",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            placeholder: "Total",
            value: formData.total,
            onChange: (e) => setFormData({ ...formData, total: e.target.value }),
            className: "w-full px-3 py-2 border rounded-lg",
            required: true
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold",
              children: "Crear"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowModal(false),
              className: "flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-semibold",
              children: "Cancelar"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Cliente" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Total" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Fecha" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: quotations.map((quotation) => /* @__PURE__ */ jsxs("tr", { className: "border-b hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: quotation.cliente_nombre }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: quotation.cliente_email }),
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-2", children: [
          "$",
          quotation.total.toLocaleString()
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: new Date(quotation.created_at).toLocaleDateString() }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => downloadPDF(quotation),
            className: "text-blue-600 hover:text-blue-800 font-semibold",
            children: "Descargar"
          }
        ) })
      ] }, quotation.id)) })
    ] }) }),
    quotations.length === 0 && !loading && /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 mt-4", children: "No hay cotizaciones" })
  ] });
};

const $$Quotations = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Cotizaciones - iCarSolutions" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-12 px-4"> <div class="max-w-7xl mx-auto"> <div class="flex justify-between items-center mb-6"> <a href="/dashboard" class="text-blue-600 hover:text-blue-800 font-semibold">
← Volver al Dashboard
</a> ${renderComponent($$result2, "LogoutButton", LogoutButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/LogoutButton", "client:component-export": "default" })} </div> ${renderComponent($$result2, "QuotationsPanel", QuotationsPanel, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/QuotationsPanel", "client:component-export": "default" })} </div> </div> ` })} ${renderScript($$result, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/quotations.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/quotations.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/quotations.astro";
const $$url = "/quotations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Quotations,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
