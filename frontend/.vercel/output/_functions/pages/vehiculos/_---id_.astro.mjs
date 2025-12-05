/* empty css                                    */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_Qfaif4Qm.mjs';
import { V as VehicleDetail } from '../../chunks/VehicleDetail_CunqlN2j.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Detalle del Veh\xEDculo - iCarSolutions` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 py-12"> <a href="/" class="text-blue-600 hover:underline mb-6 inline-block font-semibold">
← Volver al catálogo
</a> ${id && renderTemplate`${renderComponent($$result2, "VehicleDetail", VehicleDetail, { "vehicleId": id, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/VehicleDetail", "client:component-export": "default" })}`} </div> ` })}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/vehiculos/[...id].astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/vehiculos/[...id].astro";
const $$url = "/vehiculos/[...id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
