/* empty css                                 */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { s as supabase, $ as $$Layout } from '../chunks/Layout_Qfaif4Qm.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { L as LogoutButton } from '../chunks/LogoutButton_DMx9gjLR.mjs';
export { renderers } from '../renderers.mjs';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    checkRoleAndFetchUsers();
  }, []);
  const checkRoleAndFetchUsers = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");
      const { data: currentUser } = await supabase.from("users").select("rol").eq("id", user.id).single();
      setUserRole(currentUser?.rol || "");
      if (currentUser?.rol === "superadmin" || currentUser?.rol === "admin") {
        const { data, error: fetchError } = await supabase.from("users").select("*").order("created_at", { ascending: false });
        if (fetchError) throw fetchError;
        setUsers(data || []);
      } else {
        throw new Error("No tienes permiso para acceder a esta sección");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteUser = async (userId) => {
    if (!confirm("¿Eliminar este usuario? Esta acción es irreversible.")) return;
    try {
      const { error: deleteError } = await supabase.from("users").delete().eq("id", userId);
      if (deleteError) throw deleteError;
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };
  const handleChangeRole = async (userId, newRole) => {
    try {
      const { error: updateError } = await supabase.from("users").update({ rol: newRole }).eq("id", userId);
      if (updateError) throw updateError;
      setUsers(users.map(
        (u) => u.id === userId ? { ...u, rol: newRole } : u
      ));
    } catch (err) {
      setError(err.message);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "Cargando usuarios..." }) });
  }
  if (error && error.includes("No tienes permiso")) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsx("p", { className: "text-center text-red-600 font-semibold", children: error }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Gestión de Usuarios" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-sm mt-1", children: [
        "Total de usuarios: ",
        users.length
      ] })
    ] }),
    error && error && !error.includes("No tienes permiso") && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded", children: error }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Nombre" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Rol" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Fecha Registro" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: users.map((user) => /* @__PURE__ */ jsxs("tr", { className: "border-b hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: user.nombre }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: user.email }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: userRole === "superadmin" ? /* @__PURE__ */ jsxs(
          "select",
          {
            value: user.rol,
            onChange: (e) => handleChangeRole(user.id, e.target.value),
            className: "px-2 py-1 border border-gray-300 rounded bg-white text-sm capitalize",
            children: [
              /* @__PURE__ */ jsx("option", { value: "vendedor", children: "Vendedor" }),
              /* @__PURE__ */ jsx("option", { value: "gerente", children: "Gerente" }),
              /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" }),
              /* @__PURE__ */ jsx("option", { value: "superadmin", children: "SuperAdmin" })
            ]
          }
        ) : /* @__PURE__ */ jsx("span", { className: "capitalize font-semibold", children: user.rol }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-sm", children: new Date(user.created_at).toLocaleDateString() }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: userRole === "superadmin" && user.rol !== "superadmin" && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDeleteUser(user.id),
            className: "text-red-600 hover:text-red-800 font-semibold text-sm",
            children: "Eliminar"
          }
        ) })
      ] }, user.id)) })
    ] }) }),
    users.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 mt-4", children: "No hay usuarios registrados" })
  ] });
};

const $$Users = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Gesti\xF3n de Usuarios - iCarSolutions" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-12 px-4"> <div class="max-w-7xl mx-auto"> <div class="flex justify-between items-center mb-6"> <a href="/dashboard" class="text-blue-600 hover:text-blue-800 font-semibold">
← Volver al Dashboard
</a> ${renderComponent($$result2, "LogoutButton", LogoutButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/LogoutButton", "client:component-export": "default" })} </div> ${renderComponent($$result2, "UsersManagement", UsersManagement, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/UsersManagement", "client:component-export": "default" })} </div> </div> ` })} ${renderScript($$result, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/users.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/users.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/users.astro";
const $$url = "/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Users,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
