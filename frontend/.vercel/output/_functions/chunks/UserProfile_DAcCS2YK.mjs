import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from './Layout_Qfaif4Qm.mjs';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    email: ""
  });
  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");
      const { data, error: fetchError } = await supabase.from("users").select("*").eq("id", user.id).single();
      if (fetchError) throw fetchError;
      setProfile(data);
      setFormData({
        nombre: data.nombre,
        email: data.email
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (!profile) throw new Error("Perfil no cargado");
      const { error: updateError } = await supabase.from("users").update({
        nombre: formData.nombre
      }).eq("id", profile.id);
      if (updateError) throw updateError;
      setSuccess("Perfil actualizado correctamente");
      setEditing(false);
      fetchProfile();
    } catch (err) {
      setError(err.message);
    }
  };
  const handleChangePassword = async () => {
    const newPassword = prompt("Ingresa tu nueva contraseña:");
    if (!newPassword || newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (updateError) throw updateError;
      setSuccess("Contraseña actualizada correctamente");
    } catch (err) {
      setError(err.message);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "Cargando perfil..." }) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsx("p", { className: "text-center text-red-500", children: "Error al cargar el perfil" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Mi Perfil" }),
      !editing && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setEditing(true),
          className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition",
          children: "Editar"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded", children: error }),
    success && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded", children: success }),
    editing ? /* @__PURE__ */ jsxs("form", { onSubmit: handleUpdate, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre Completo" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: formData.nombre,
            onChange: (e) => setFormData({ ...formData, nombre: e.target.value }),
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email (No editable)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: formData.email,
            disabled: true,
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition",
            children: "Guardar Cambios"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setEditing(false),
            className: "flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-semibold transition",
            children: "Cancelar"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-600", children: "Nombre" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-900 mt-1", children: profile.nombre })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-600", children: "Email" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-900 mt-1", children: profile.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-600", children: "Rol" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-900 mt-1 capitalize", children: profile.rol })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Seguridad" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleChangePassword,
            className: "bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition",
            children: "Cambiar Contraseña"
          }
        )
      ] })
    ] })
  ] });
};

export { UserProfile as U };
