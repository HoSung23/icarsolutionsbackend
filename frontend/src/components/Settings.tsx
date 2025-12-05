import React, { useState } from "react";

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    quotationAlerts: true,
    salesAlerts: true,
  });

  const [theme, setTheme] = useState("light");
  const [success, setSuccess] = useState("");

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof notifications]
    }));
  };

  const handleSaveSettings = () => {
    // Guardar en localStorage o enviar a backend
    localStorage.setItem("appSettings", JSON.stringify({ notifications, theme }));
    setSuccess("Configuración guardada correctamente");
    
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuración</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Notificaciones */}
      <div className="mb-8 pb-8 border-b">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Notificaciones</h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationChange("email")}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-3 text-gray-700">
              Notificaciones por Email
              <p className="text-sm text-gray-500">Recibe alertas sobre cotizaciones y ventas</p>
            </span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleNotificationChange("sms")}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-3 text-gray-700">
              Notificaciones SMS
              <p className="text-sm text-gray-500">Recibe SMS para eventos importantes</p>
            </span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.quotationAlerts}
              onChange={() => handleNotificationChange("quotationAlerts")}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-3 text-gray-700">
              Alertas de Cotizaciones
              <p className="text-sm text-gray-500">Notificar cuando se creen nuevas cotizaciones</p>
            </span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.salesAlerts}
              onChange={() => handleNotificationChange("salesAlerts")}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-3 text-gray-700">
              Alertas de Ventas
              <p className="text-sm text-gray-500">Notificar cuando se registren nuevas ventas</p>
            </span>
          </label>
        </div>
      </div>

      {/* Tema */}
      <div className="mb-8 pb-8 border-b">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Apariencia</h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === "light"}
              onChange={(e) => setTheme(e.target.value)}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-3 text-gray-700">Modo Claro</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === "dark"}
              onChange={(e) => setTheme(e.target.value)}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-3 text-gray-700">Modo Oscuro</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="theme"
              value="auto"
              checked={theme === "auto"}
              onChange={(e) => setTheme(e.target.value)}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-3 text-gray-700">Automático</span>
          </label>
        </div>
      </div>

      {/* Privacidad y Seguridad */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Privacidad y Seguridad</h3>
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex justify-between items-center">
            <span className="text-gray-700">Actividad de la Cuenta</span>
            <span className="text-gray-500">→</span>
          </button>

          <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex justify-between items-center">
            <span className="text-gray-700">Dispositivos Conectados</span>
            <span className="text-gray-500">→</span>
          </button>

          <button className="w-full text-left px-4 py-3 border border-red-300 rounded-lg hover:bg-red-50 transition flex justify-between items-center">
            <span className="text-red-700 font-semibold">Eliminar Cuenta</span>
            <span className="text-red-500">⚠️</span>
          </button>
        </div>
      </div>

      {/* Botón Guardar */}
      <div className="flex gap-2">
        <button
          onClick={handleSaveSettings}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Guardar Configuración
        </button>
      </div>
    </div>
  );
};

export default Settings;
