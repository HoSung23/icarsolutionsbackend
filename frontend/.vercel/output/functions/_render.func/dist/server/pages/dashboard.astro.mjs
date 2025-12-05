/* empty css                                 */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Qfaif4Qm.mjs';
export { renderers } from '../renderers.mjs';

const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard - iCarSolutions" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="dashboard-content" class="min-h-screen bg-gray-50 py-12 px-4"> <div class="max-w-7xl mx-auto">  <div class="flex justify-between items-center mb-8"> <div> <h1 class="text-4xl font-bold text-gray-900">Dashboard</h1> <p class="text-gray-600 mt-2">Bienvenido, <span id="user-name">Usuario</span></p> <p class="text-sm text-gray-500">Rol: <span id="user-role" class="font-semibold"></span></p> </div> <button id="logout-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition">
Cerrar Sesión
</button> </div>  <div id="content-area">  <div id="default-view" class="space-y-6"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> <a href="/vehicles" class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"> <div class="text-4xl mb-4">🚗</div> <h3 class="text-xl font-bold text-gray-900 mb-2">Mis Vehículos</h3> <p class="text-gray-600 mb-4">Administra tu inventario de vehículos</p> <button class="text-blue-600 hover:underline font-semibold">Ver Inventario →</button> </a> <a href="/quotations" class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"> <div class="text-4xl mb-4">📄</div> <h3 class="text-xl font-bold text-gray-900 mb-2">Cotizaciones</h3> <p class="text-gray-600 mb-4">Genera y descarga PDFs de cotizaciones</p> <button class="text-blue-600 hover:underline font-semibold">Ver Cotizaciones →</button> </a> <a href="/statistics" class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"> <div class="text-4xl mb-4">📊</div> <h3 class="text-xl font-bold text-gray-900 mb-2">Estadísticas</h3> <p class="text-gray-600 mb-4">Visualiza tus ventas y desempeño</p> <button class="text-blue-600 hover:underline font-semibold">Ver Gráficos →</button> </a> <a href="/profile" class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"> <div class="text-4xl mb-4">👤</div> <h3 class="text-xl font-bold text-gray-900 mb-2">Mi Perfil</h3> <p class="text-gray-600 mb-4">Actualiza tu información personal</p> <button class="text-blue-600 hover:underline font-semibold">Editar Perfil →</button> </a> <a href="/users" class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"> <div class="text-4xl mb-4">👥</div> <h3 class="text-xl font-bold text-gray-900 mb-2">Usuarios</h3> <p class="text-gray-600 mb-4">Gestiona usuarios del sistema</p> <button class="text-blue-600 hover:underline font-semibold">Ver Usuarios →</button> </a> <a href="/settings" class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"> <div class="text-4xl mb-4">⚙️</div> <h3 class="text-xl font-bold text-gray-900 mb-2">Configuración</h3> <p class="text-gray-600 mb-4">Ajusta configuración de la cuenta</p> <button class="text-blue-600 hover:underline font-semibold">Configurar →</button> </a> </div> </div> </div> </div> </div> ` })} ${renderScript($$result, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
