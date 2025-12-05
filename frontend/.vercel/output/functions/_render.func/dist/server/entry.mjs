import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CAo79ZZh.mjs';
import { manifest } from './manifest_CHmWw33y.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/auth/callback.astro.mjs');
const _page3 = () => import('./pages/dashboard/billing.astro.mjs');
const _page4 = () => import('./pages/dashboard/ordenes.astro.mjs');
const _page5 = () => import('./pages/dashboard/profile.astro.mjs');
const _page6 = () => import('./pages/dashboard/quotes.astro.mjs');
const _page7 = () => import('./pages/dashboard.astro.mjs');
const _page8 = () => import('./pages/profile.astro.mjs');
const _page9 = () => import('./pages/quotations.astro.mjs');
const _page10 = () => import('./pages/settings.astro.mjs');
const _page11 = () => import('./pages/statistics.astro.mjs');
const _page12 = () => import('./pages/users.astro.mjs');
const _page13 = () => import('./pages/vehicles.astro.mjs');
const _page14 = () => import('./pages/vehiculos/_id_.astro.mjs');
const _page15 = () => import('./pages/vehiculos/_---id_.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/index.astro", _page1],
    ["src/pages/auth/callback.astro", _page2],
    ["src/pages/dashboard/billing.astro", _page3],
    ["src/pages/dashboard/ordenes.astro", _page4],
    ["src/pages/dashboard/profile.astro", _page5],
    ["src/pages/dashboard/quotes.astro", _page6],
    ["src/pages/dashboard.astro", _page7],
    ["src/pages/profile.astro", _page8],
    ["src/pages/quotations.astro", _page9],
    ["src/pages/settings.astro", _page10],
    ["src/pages/statistics.astro", _page11],
    ["src/pages/users.astro", _page12],
    ["src/pages/vehicles.astro", _page13],
    ["src/pages/vehiculos/[id].astro", _page14],
    ["src/pages/vehiculos/[...id].astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "1efe04a4-f538-4158-9dbb-d9b46b1cbbd9",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
