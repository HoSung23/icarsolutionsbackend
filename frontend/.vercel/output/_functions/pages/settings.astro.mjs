/* empty css                                 */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Qfaif4Qm.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { L as LogoutButton } from '../chunks/LogoutButton_DMx9gjLR.mjs';
export { renderers } from '../renderers.mjs';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    quotationAlerts: true,
    salesAlerts: true
  });
  const [theme, setTheme] = useState("light");
  const [success, setSuccess] = useState("");
  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const handleSaveSettings = () => {
    localStorage.setItem("appSettings", JSON.stringify({ notifications, theme }));
    setSuccess("Configuración guardada correctamente");
    setTimeout(() => setSuccess(""), 3e3);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Configuración" }),
    success && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded", children: success }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 pb-8 border-b", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Notificaciones" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: notifications.email,
              onChange: () => handleNotificationChange("email"),
              className: "h-4 w-4 text-blue-600"
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "ml-3 text-gray-700", children: [
            "Notificaciones por Email",
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Recibe alertas sobre cotizaciones y ventas" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: notifications.sms,
              onChange: () => handleNotificationChange("sms"),
              className: "h-4 w-4 text-blue-600"
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "ml-3 text-gray-700", children: [
            "Notificaciones SMS",
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Recibe SMS para eventos importantes" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: notifications.quotationAlerts,
              onChange: () => handleNotificationChange("quotationAlerts"),
              className: "h-4 w-4 text-blue-600"
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "ml-3 text-gray-700", children: [
            "Alertas de Cotizaciones",
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Notificar cuando se creen nuevas cotizaciones" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: notifications.salesAlerts,
              onChange: () => handleNotificationChange("salesAlerts"),
              className: "h-4 w-4 text-blue-600"
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "ml-3 text-gray-700", children: [
            "Alertas de Ventas",
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Notificar cuando se registren nuevas ventas" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 pb-8 border-b", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Apariencia" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              name: "theme",
              value: "light",
              checked: theme === "light",
              onChange: (e) => setTheme(e.target.value),
              className: "h-4 w-4 text-blue-600"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-3 text-gray-700", children: "Modo Claro" })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              name: "theme",
              value: "dark",
              checked: theme === "dark",
              onChange: (e) => setTheme(e.target.value),
              className: "h-4 w-4 text-blue-600"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-3 text-gray-700", children: "Modo Oscuro" })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              name: "theme",
              value: "auto",
              checked: theme === "auto",
              onChange: (e) => setTheme(e.target.value),
              className: "h-4 w-4 text-blue-600"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-3 text-gray-700", children: "Automático" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Privacidad y Seguridad" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("button", { className: "w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Actividad de la Cuenta" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "→" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Dispositivos Conectados" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "→" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "w-full text-left px-4 py-3 border border-red-300 rounded-lg hover:bg-red-50 transition flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-red-700 font-semibold", children: "Eliminar Cuenta" }),
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "⚠️" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleSaveSettings,
        className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition",
        children: "Guardar Configuración"
      }
    ) })
  ] });
};

const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Configuraci\xF3n - iCarSolutions" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-12 px-4"> <div class="max-w-7xl mx-auto"> <div class="flex justify-between items-center mb-6"> <a href="/dashboard" class="text-blue-600 hover:text-blue-800 font-semibold">
← Volver al Dashboard
</a> ${renderComponent($$result2, "LogoutButton", LogoutButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/LogoutButton", "client:component-export": "default" })} </div> ${renderComponent($$result2, "Settings", Settings, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/Settings", "client:component-export": "default" })} </div> </div> ` })} ${renderScript($$result, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/settings.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/settings.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/settings.astro";
const $$url = "/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
