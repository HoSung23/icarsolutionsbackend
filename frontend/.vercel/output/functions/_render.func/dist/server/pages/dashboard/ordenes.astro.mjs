/* empty css                                    */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_Qfaif4Qm.mjs';
export { renderers } from '../../renderers.mjs';

const $$Ordenes = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mis \xD3rdenes - iCarSolutions" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-8"> <div class="max-w-7xl mx-auto px-4"> <div class="mb-6"> <a href="/" class="text-blue-600 hover:underline">← Volver al inicio</a> </div> <div class="bg-white rounded-lg shadow-lg p-8"> <h1 class="text-3xl font-bold mb-6">Mis Órdenes</h1> <div class="space-y-4" id="ordenes-container"> <p class="text-gray-500">Cargando órdenes...</p> </div> </div> </div> </div> ${renderScript($$result2, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard/ordenes.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard/ordenes.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard/ordenes.astro";
const $$url = "/dashboard/ordenes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ordenes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
