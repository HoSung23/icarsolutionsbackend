/* empty css                                    */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { s as supabase, $ as $$Layout } from '../../chunks/Layout_Qfaif4Qm.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

function QuotesManagement() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pendiente");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  useEffect(() => {
    fetchQuotes();
  }, [filter]);
  const fetchQuotes = async () => {
    setLoading(true);
    try {
      let query = supabase.from("cotizaciones").select(`
          *,
          vehicles:vehicle_id (
            marca,
            modelo_año,
            precio
          )
        `).order("created_at", { ascending: false });
      if (filter !== "todas") {
        query = query.eq("estado", filter);
      }
      const { data, error } = await query;
      if (error) throw error;
      setQuotes(data || []);
    } catch (err) {
      console.error("Error cargando cotizaciones:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateStatus = async (quoteId, newStatus) => {
    try {
      const { error } = await supabase.from("cotizaciones").update({ estado: newStatus }).eq("id", quoteId);
      if (error) throw error;
      fetchQuotes();
    } catch (err) {
      console.error("Error actualizando estado:", err);
    }
  };
  const handleOpenEmailModal = (quote) => {
    setSelectedQuote(quote);
    setEmailSubject(`Cotización - ${quote.vehicles?.marca} ${quote.vehicles?.modelo_año}`);
    setEmailBody(
      `Estimado/a ${quote.nombre_cliente},

Gracias por su interés en nuestro vehículo:

${quote.vehicles?.marca} ${quote.vehicles?.modelo_año}
Precio: QTZ ${quote.vehicles?.precio.toLocaleString()}

[Agrega aquí los detalles de la cotización]

Quedamos atentos a cualquier consulta.

Saludos cordiales,
iCarSolutions`
    );
    setShowEmailModal(true);
  };
  const handleSendEmail = async () => {
    if (!selectedQuote) return;
    setSendingEmail(true);
    try {
      const mailtoLink = `mailto:${selectedQuote.email_cliente}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink, "_blank");
      await handleUpdateStatus(selectedQuote.id, "enviada");
      setShowEmailModal(false);
      setSelectedQuote(null);
    } catch (err) {
      console.error("Error enviando email:", err);
    } finally {
      setSendingEmail(false);
    }
  };
  const handleDeleteQuote = async (quoteId) => {
    if (!confirm("¿Estás seguro de eliminar esta cotización?")) return;
    try {
      const { error } = await supabase.from("cotizaciones").delete().eq("id", quoteId);
      if (error) throw error;
      fetchQuotes();
    } catch (err) {
      console.error("Error eliminando cotización:", err);
    }
  };
  const getStatusBadge = (estado) => {
    const badges = {
      pendiente: "bg-yellow-100 text-yellow-800",
      enviada: "bg-green-100 text-green-800",
      rechazada: "bg-red-100 text-red-800"
    };
    return badges[estado] || "bg-gray-100 text-gray-800";
  };
  const getStatusText = (estado) => {
    const texts = {
      pendiente: "Pendiente",
      enviada: "Enviada",
      rechazada: "Rechazada"
    };
    return texts[estado] || estado;
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Cargando cotizaciones..." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Gestión de Cotizaciones" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-4", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setFilter("todas"),
            className: `px-4 py-2 rounded-lg font-medium transition ${filter === "todas" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
            children: [
              "Todas (",
              quotes.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFilter("pendiente"),
            className: `px-4 py-2 rounded-lg font-medium transition ${filter === "pendiente" ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
            children: "Pendientes"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFilter("enviada"),
            className: `px-4 py-2 rounded-lg font-medium transition ${filter === "enviada" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
            children: "Enviadas"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFilter("rechazada"),
            className: `px-4 py-2 rounded-lg font-medium transition ${filter === "rechazada" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
            children: "Rechazadas"
          }
        )
      ] })
    ] }),
    quotes.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-12 bg-gray-50 rounded-lg", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-500", children: [
      "No hay cotizaciones ",
      filter !== "todas" ? `en estado "${filter}"` : ""
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Fecha" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Vehículo" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Cliente" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Contacto" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Estado" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: quotes.map((quote) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [
          new Date(quote.created_at).toLocaleDateString(),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: new Date(quote.created_at).toLocaleTimeString() })
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium text-gray-900", children: [
            quote.vehicles?.marca,
            " ",
            quote.vehicles?.modelo_año
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
            "QTZ ",
            quote.vehicles?.precio.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: quote.nombre_cliente }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900", children: quote.telefono_cliente }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: quote.email_cliente })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx(
          "span",
          {
            className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
              quote.estado
            )}`,
            children: getStatusText(quote.estado)
          }
        ) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2", children: [
          quote.estado === "pendiente" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleOpenEmailModal(quote),
                className: "text-blue-600 hover:text-blue-900",
                title: "Enviar cotización",
                children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 inline", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleUpdateStatus(quote.id, "rechazada"),
                className: "text-red-600 hover:text-red-900",
                title: "Rechazar",
                children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 inline", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
              }
            )
          ] }),
          quote.estado === "rechazada" && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleUpdateStatus(quote.id, "pendiente"),
              className: "text-yellow-600 hover:text-yellow-900",
              title: "Volver a pendiente",
              children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 inline", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDeleteQuote(quote.id),
              className: "text-gray-600 hover:text-gray-900",
              title: "Eliminar",
              children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 inline", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
            }
          )
        ] })
      ] }, quote.id)) })
    ] }) }) }),
    showEmailModal && selectedQuote && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900", children: "Enviar Cotización" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowEmailModal(false),
            className: "text-gray-500 hover:text-gray-700",
            children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 bg-gray-50 p-4 rounded-lg", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
          "Para: ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: selectedQuote.email_cliente })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
          "Cliente: ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: selectedQuote.nombre_cliente })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
          "Teléfono: ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: selectedQuote.telefono_cliente })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Asunto" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: emailSubject,
              onChange: (e) => setEmailSubject(e.target.value),
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Mensaje" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: emailBody,
              onChange: (e) => setEmailBody(e.target.value),
              rows: 12,
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-6", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowEmailModal(false),
            className: "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSendEmail,
            disabled: sendingEmail,
            className: "flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition disabled:opacity-50",
            children: sendingEmail ? "Enviando..." : "Abrir en Email"
          }
        )
      ] })
    ] }) })
  ] });
}

const $$Astro = createAstro();
const prerender = false;
const $$Quotes = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Quotes;
  const authSession = Astro2.cookies.get("auth_session");
  if (!authSession) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Gesti\xF3n de Cotizaciones - iCarSolutions" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-100"> <div class="max-w-7xl mx-auto"> ${renderComponent($$result2, "QuotesManagement", QuotesManagement, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/QuotesManagement", "client:component-export": "default" })} </div> </div> ` })}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard/quotes.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard/quotes.astro";
const $$url = "/dashboard/quotes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Quotes,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
