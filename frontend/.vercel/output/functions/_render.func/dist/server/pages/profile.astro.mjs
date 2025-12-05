/* empty css                                 */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Qfaif4Qm.mjs';
import { U as UserProfile } from '../chunks/UserProfile_DAcCS2YK.mjs';
import { L as LogoutButton } from '../chunks/LogoutButton_DMx9gjLR.mjs';
export { renderers } from '../renderers.mjs';

const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mi Perfil - iCarSolutions" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-12 px-4"> <div class="max-w-7xl mx-auto"> <div class="flex justify-between items-center mb-6"> <a href="/dashboard" class="text-blue-600 hover:text-blue-800 font-semibold">
← Volver al Dashboard
</a> ${renderComponent($$result2, "LogoutButton", LogoutButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/LogoutButton", "client:component-export": "default" })} </div> ${renderComponent($$result2, "UserProfile", UserProfile, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/UserProfile", "client:component-export": "default" })} </div> </div> ` })} ${renderScript($$result, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/profile.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/profile.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/profile.astro";
const $$url = "/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
