/* empty css                                 */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B4bjZISI.mjs';
import 'piccolore';
import { u as useAuth, s as supabase, $ as $$Layout } from '../chunks/Layout_Qfaif4Qm.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../renderers.mjs';

function LoginForm({ onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle} = useAuth();
  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email");
    const savedPassword = localStorage.getItem("remember_password");
    const wasRemembered = localStorage.getItem("remember_me") === "true";
    if (wasRemembered && savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!email || !password) {
        setError("Por favor completa todos los campos");
        return;
      }
      if (!email.includes("@")) {
        setError("Email inválido");
        return;
      }
      if (rememberMe) {
        localStorage.setItem("remember_email", email);
        localStorage.setItem("remember_password", password);
        localStorage.setItem("remember_me", "true");
      } else {
        localStorage.removeItem("remember_email");
        localStorage.removeItem("remember_password");
        localStorage.removeItem("remember_me");
      }
      await login(email, password);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error en login:", err);
      setError(err.message || "Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
    } catch (err) {
      console.error("Error con Google:", err);
      setError(err.message || "Error al iniciar sesión con Google");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6 text-center", children: "Iniciar Sesión" }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "tu@email.com",
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Contraseña" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: "Tu contraseña",
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "rememberMe",
              checked: rememberMe,
              onChange: (e) => setRememberMe(e.target.checked),
              className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "rememberMe", className: "ml-2 text-sm text-gray-700", children: "Recordar mis datos" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "data-switch-to": "register",
            className: "text-sm text-blue-600 hover:text-blue-700 font-medium",
            children: "Crear cuenta"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50",
          children: loading ? "Iniciando sesión..." : "Iniciar Sesión"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative my-6", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full border-t border-gray-300" }) }),
      /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-sm", children: /* @__PURE__ */ jsx("span", { className: "px-2 bg-white text-gray-500", children: "O continúa con" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: handleGoogleLogin,
        disabled: loading,
        className: "w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition disabled:opacity-50",
        children: [
          /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                fill: "#4285F4",
                d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fill: "#34A853",
                d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fill: "#FBBC05",
                d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fill: "#EA4335",
                d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              }
            )
          ] }),
          "Continuar con Google"
        ]
      }
    ) })
  ] }) });
}

function RegisterForm({ onSwitchToLogin }) {
  const { signInWithGoogle} = useAuth();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Por favor completa todos los campos obligatorios");
        return;
      }
      if (!formData.email.includes("@")) {
        setError("Email inválido");
        return;
      }
      if (formData.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });
      if (authError) throw authError;
      if (!authData.user) {
        throw new Error("No se pudo crear el usuario");
      }
      const userPayload = {
        id: authData.user.id,
        rol: "cliente",
        nombre: formData.nombre,
        email: formData.email
      };
      if (formData.telefono) {
        userPayload.telefono = formData.telefono;
      }
      const { error: userError } = await supabase.from("users").insert(userPayload);
      if (userError) throw userError;
      setSuccess("¡Cuenta creada exitosamente! Revisa tu email para confirmar.");
      setFormData({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
        telefono: ""
      });
      setTimeout(() => {
        const loginForm = document.getElementById("login-form");
        const registerForm = document.getElementById("register-form");
        registerForm?.classList.add("hidden");
        loginForm?.classList.remove("hidden");
      }, 2e3);
    } catch (err) {
      console.error("Error en registro:", err);
      setError(err.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignup = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
    } catch (err) {
      console.error("Error con Google:", err);
      setError(err.message || "Error al registrarse con Google");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6 text-center", children: "Crear Cuenta" }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded", children: error }),
    success && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded", children: success }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre Completo *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "nombre",
            value: formData.nombre,
            onChange: handleChange,
            placeholder: "Tu nombre",
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            name: "email",
            value: formData.email,
            onChange: handleChange,
            placeholder: "tu@email.com",
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Teléfono" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            name: "telefono",
            value: formData.telefono,
            onChange: handleChange,
            placeholder: "+502 1234 5678",
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Contraseña *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            name: "password",
            value: formData.password,
            onChange: handleChange,
            placeholder: "Mínimo 6 caracteres",
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Confirmar Contraseña *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            name: "confirmPassword",
            value: formData.confirmPassword,
            onChange: handleChange,
            placeholder: "Repite tu contraseña",
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            id: "terms",
            className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1",
            required: true
          }
        ),
        /* @__PURE__ */ jsx("label", { htmlFor: "terms", className: "ml-2 text-sm text-gray-600", children: "Acepto los términos y condiciones" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50",
          children: loading ? "Creando cuenta..." : "Crear Cuenta"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative my-6", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full border-t border-gray-300" }) }),
      /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-sm", children: /* @__PURE__ */ jsx("span", { className: "px-2 bg-white text-gray-500", children: "O regístrate con" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: handleGoogleSignup,
        disabled: loading,
        className: "w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition disabled:opacity-50",
        children: [
          /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                fill: "#4285F4",
                d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fill: "#34A853",
                d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fill: "#FBBC05",
                d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                fill: "#EA4335",
                d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              }
            )
          ] }),
          "Continuar con Google"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("p", { className: "mt-6 text-center text-gray-600", children: [
      "¿Ya tienes cuenta?",
      " ",
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "data-switch-to": "login",
          onClick: () => {
            const loginForm = document.getElementById("login-form");
            const registerForm = document.getElementById("register-form");
            registerForm?.classList.add("hidden");
            loginForm?.classList.remove("hidden");
          },
          className: "text-blue-600 hover:underline font-semibold",
          children: "Inicia sesión"
        }
      )
    ] })
  ] }) });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Iniciar Sesi\xF3n - iCarSolutions" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4"> <div class="max-w-md mx-auto">  <div id="auth-container" class="w-full">  <div id="login-form" class="block"> ${renderComponent($$result2, "LoginForm", LoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/LoginForm", "client:component-export": "default" })} </div>  <div id="register-form" class="hidden"> ${renderComponent($$result2, "RegisterForm", RegisterForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/components/RegisterForm", "client:component-export": "default" })} </div> </div> </div> </div> ` })} ${renderScript($$result, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/yoshi/Desktop/randy/icarsolutions/frontend/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
