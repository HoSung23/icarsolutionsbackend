import { e as createComponent, f as createAstro, n as renderHead, h as addAttribute, k as renderComponent, o as renderSlot, r as renderTemplate } from './astro/server_B4bjZISI.mjs';
import 'piccolore';
/* empty css                         */
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const icarLogo = new Proxy({"src":"/_astro/icar-solutions-mejorado.DWdwYSo-.png","width":500,"height":173,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/assets/icar-solutions-mejorado.png";
							}
							
							return target[name];
						}
					});

const supabaseUrl = "https://bxwxsotrqnnhypbbbyft.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4d3hzb3RycW5uaHlwYmJieWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NDg1MDcsImV4cCI6MjA4MDQyNDUwN30.h0zYf6KLOzCu0xa_628SonqZJCHVw6426cRRmfHMQhY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedSession = localStorage.getItem("auth_session");
        if (savedSession) {
          const session = JSON.parse(savedSession);
          const { data: { user: authUser } } = await supabase.auth.getUser();
          if (authUser) {
            setUser(session);
          } else {
            localStorage.removeItem("auth_session");
          }
        }
      } catch (err) {
        console.error("Error restaurando sesión:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);
  const login = async (email, password) => {
    try {
      setError(null);
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (authError) throw authError;
      if (!data.user) {
        throw new Error("No se pudo iniciar sesión");
      }
      const { data: userData, error: userError } = await supabase.from("users").select("*").eq("id", data.user.id).single();
      if (userError) throw userError;
      const userWithEmail = {
        id: data.user.id,
        email: data.user.email || "",
        rol: userData.rol,
        nombre: userData.nombre
      };
      localStorage.setItem("auth_session", JSON.stringify(userWithEmail));
      setUser(userWithEmail);
      return userWithEmail;
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
      throw err;
    }
  };
  const signInWithGoogle = async () => {
    try {
      setError(null);
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (authError) throw authError;
      return data;
    } catch (err) {
      setError(err.message || "Error al iniciar sesión con Google");
      throw err;
    }
  };
  const signInWithFacebook = async () => {
    try {
      setError(null);
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (authError) throw authError;
      return data;
    } catch (err) {
      setError(err.message || "Error al iniciar sesión con Facebook");
      throw err;
    }
  };
  const logout = async () => {
    try {
      setError(null);
      const { error: signoutError } = await supabase.auth.signOut();
      if (signoutError) throw signoutError;
      localStorage.removeItem("auth_session");
      localStorage.removeItem("remember_email");
      localStorage.removeItem("remember_password");
      localStorage.removeItem("remember_me");
      setUser(null);
    } catch (err) {
      setError(err.message || "Error al cerrar sesión");
      throw err;
    }
  };
  return {
    user,
    loading,
    error,
    login,
    signInWithGoogle,
    signInWithFacebook,
    logout,
    isAuthenticated: !!user
  };
};

function UserMenu() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "animate-pulse bg-gray-200 rounded-lg w-32 h-10" });
  }
  if (!isAuthenticated || !user) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href: "/admin",
        className: "bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition",
        children: "Iniciar Sesión"
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: menuRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setShowMenu(!showMenu),
        className: "flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold", children: user.nombre?.charAt(0).toUpperCase() || "U" }),
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: user.nombre }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-4 h-4 transition-transform ${showMenu ? "rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    showMenu && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 border-b border-gray-200", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900", children: user.nombre }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: user.email })
      ] }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/dashboard/profile",
          className: "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              }
            ) }),
            "Mi Perfil"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/dashboard/ordenes",
          className: "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              }
            ) }),
            "Mis Órdenes"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/dashboard/billing",
          className: "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              }
            ) }),
            "Facturación"
          ]
        }
      ),
      user.rol === "superadmin" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 my-2" }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/dashboard",
            className: "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition",
            children: [
              /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5 mr-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  }
                )
              ] }),
              "Administración"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 my-2" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleLogout,
          className: "flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              }
            ) }),
            "Cerrar Sesión"
          ]
        }
      )
    ] })
  ] });
}

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "iCarSolutions - Venta de Veh\xEDculos" } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="iCarSolutions - Tu plataforma de confianza para compra y venta de vehículos. Encuentra el auto perfecto con las mejores opciones de financiamiento."><link rel="icon" type="image/png" href="/favicon.png"><title>${title}</title>${renderHead()}</head> <body> <nav class="bg-gray-900 text-white px-4 py-3"> <div class="max-w-7xl mx-auto flex justify-between items-center"> <a href="/" class="flex items-center gap-3 hover:opacity-80 transition"> <img${addAttribute(icarLogo.src, "src")} alt="iCarSolutions" class="h-10 rounded object-cover"> </a> <div class="flex gap-4 items-center"> <a href="/" class="hover:text-orange-500 transition">Inicio</a> <a href="/#catalogo" class="hover:text-orange-500 transition">Catálogo</a> ${renderComponent($$result, "UserMenu", UserMenu, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/UserMenu", "client:component-export": "default" })} </div> </div> </nav> <main> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-gray-900 text-white py-8 mt-16"> <div class="max-w-7xl mx-auto px-4"> <div class="flex flex-col md:flex-row justify-between items-center"> <p class="mb-4 md:mb-0">&copy; 2024 iCarSolutions. Todos los derechos reservados.</p> <div class="flex gap-6 items-center"> <a href="https://www.facebook.com/profile.php?id=61582647644629" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400 transition" aria-label="Facebook"> <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"> <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path> </svg> </a> <a href="https://wa.me/50212345678" target="_blank" rel="noopener noreferrer" class="hover:text-green-400 transition" aria-label="WhatsApp"> <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path> </svg> </a> <a href="mailto:info@icarsolutions.com" class="hover:text-orange-400 transition" aria-label="Email"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> </a> </div> </div> </div> </footer> </body></html>`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $, icarLogo as i, supabase as s, useAuth as u };
