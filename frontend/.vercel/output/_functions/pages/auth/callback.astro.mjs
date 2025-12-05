/* empty css                                    */
import { e as createComponent, n as renderHead, l as renderScript, r as renderTemplate } from '../../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Callback = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es" data-astro-cid-qbporkgn> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Autenticando...</title>${renderHead()}</head> <body data-astro-cid-qbporkgn> <div class="loader" data-astro-cid-qbporkgn> <div class="spinner" data-astro-cid-qbporkgn></div> <p data-astro-cid-qbporkgn>Completando autenticación...</p> </div> ${renderScript($$result, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/auth/callback.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/auth/callback.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/auth/callback.astro";
const $$url = "/auth/callback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Callback,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
