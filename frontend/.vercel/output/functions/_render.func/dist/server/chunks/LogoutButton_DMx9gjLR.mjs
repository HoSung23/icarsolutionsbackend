import { jsx } from 'react/jsx-runtime';
import React__default from 'react';
import { u as useAuth } from './Layout_Qfaif4Qm.mjs';

function LogoutButton() {
  const { logout } = useAuth();
  const [loading, setLoading] = React__default.useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleLogout,
      disabled: loading,
      className: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition disabled:opacity-50",
      children: loading ? "Cerrando..." : "Cerrar Sesión"
    }
  );
}

export { LogoutButton as L };
