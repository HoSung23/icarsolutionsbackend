/* empty css                                    */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_Qfaif4Qm.mjs';
import { U as UserProfile } from '../../chunks/UserProfile_DAcCS2YK.mjs';
export { renderers } from '../../renderers.mjs';

const $$Profile = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mi Perfil - iCarSolutions" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-8"> <div class="max-w-4xl mx-auto px-4"> <div class="mb-6"> <a href="/" class="text-blue-600 hover:underline">← Volver al inicio</a> </div> ${renderComponent($$result2, "UserProfile", UserProfile, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/UserProfile", "client:component-export": "default" })} </div> </div> ` })}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard/profile.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard/profile.astro";
const $$url = "/dashboard/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
