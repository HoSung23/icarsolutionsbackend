/* empty css                                    */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_Qfaif4Qm.mjs';
export { renderers } from '../../renderers.mjs';

const $$Billing = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Facturaci\xF3n - iCarSolutions" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-8"> <div class="max-w-7xl mx-auto px-4"> <div class="mb-6"> <a href="/" class="text-blue-600 hover:underline">← Volver al inicio</a> </div> <div class="bg-white rounded-lg shadow-lg p-8"> <h1 class="text-3xl font-bold mb-6">Facturación</h1> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> <div class="bg-blue-50 border border-blue-200 rounded-lg p-6"> <div class="flex items-center justify-between"> <div> <p class="text-blue-600 text-sm font-semibold">Órdenes en Ruta</p> <p class="text-3xl font-bold text-blue-900" id="ordenes-en-ruta">0</p> </div> <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path> </svg> </div> </div> <div class="bg-green-50 border border-green-200 rounded-lg p-6"> <div class="flex items-center justify-between"> <div> <p class="text-green-600 text-sm font-semibold">Órdenes Entregadas</p> <p class="text-3xl font-bold text-green-900" id="ordenes-entregadas">0</p> </div> <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> </div> </div> <div class="mb-6"> <h2 class="text-xl font-bold mb-4">Historial de Facturas</h2> </div> <div class="overflow-x-auto"> <table class="w-full"> <thead class="bg-gray-50 border-b"> <tr> <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Factura #</th> <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fecha</th> <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Descripción</th> <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Monto</th> <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th> <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Acción</th> </tr> </thead> <tbody id="facturas-tbody"> <tr> <td colspan="6" class="px-4 py-8 text-center text-gray-500">
Cargando facturas...
</td> </tr> </tbody> </table> </div> </div> </div> </div> ${renderScript($$result2, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard/billing.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard/billing.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard/billing.astro";
const $$url = "/dashboard/billing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Billing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
