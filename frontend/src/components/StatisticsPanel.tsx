import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

interface Stats {
  totalVehicles: number;
  availableVehicles: number;
  soldVehicles: number;
  totalQuotations: number;
  totalRevenue: number;
}

const StatisticsPanel: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalVehicles: 0,
    availableVehicles: 0,
    soldVehicles: 0,
    totalQuotations: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No autenticado");

      // Obtener estadísticas de vehículos
      const { data: vehicles, error: vehiclesError } = await supabase
        .from("vehicles")
        .select("id, estado");

      if (vehiclesError) throw vehiclesError;

      // Obtener cotizaciones del usuario
      const { data: quotations, error: quotationsError } = await supabase
        .from("cotizaciones")
        .select("total")
        .eq("created_by", user.id);

      if (quotationsError) throw quotationsError;

      const totalVehicles = vehicles?.length || 0;
      const availableVehicles = vehicles?.filter(v => v.estado === "disponible").length || 0;
      const soldVehicles = vehicles?.filter(v => v.estado === "vendido").length || 0;
      const totalQuotations = quotations?.length || 0;
      const totalRevenue = quotations?.reduce((sum, q) => sum + q.total, 0) || 0;

      setStats({
        totalVehicles,
        availableVehicles,
        soldVehicles,
        totalQuotations,
        totalRevenue,
      });
    } catch (err) {
      console.error("Error al obtener estadísticas:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500">Cargando estadísticas...</p>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total de Vehículos",
      value: stats.totalVehicles,
      color: "blue",
      icon: "🚗",
    },
    {
      label: "Disponibles",
      value: stats.availableVehicles,
      color: "green",
      icon: "✅",
    },
    {
      label: "Vendidos",
      value: stats.soldVehicles,
      color: "red",
      icon: "✔️",
    },
    {
      label: "Cotizaciones",
      value: stats.totalQuotations,
      color: "purple",
      icon: "📄",
    },
    {
      label: "Ingresos Totales",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      color: "yellow",
      icon: "💰",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Estadísticas</h2>
        <button
          onClick={() => fetchStats()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Actualizar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, index) => {
          const colorClasses = {
            blue: "bg-blue-50 border-blue-200 text-blue-900",
            green: "bg-green-50 border-green-200 text-green-900",
            red: "bg-red-50 border-red-200 text-red-900",
            purple: "bg-purple-50 border-purple-200 text-purple-900",
            yellow: "bg-yellow-50 border-yellow-200 text-yellow-900",
          };

          return (
            <div
              key={index}
              className={`border-2 rounded-lg p-4 ${colorClasses[card.color as keyof typeof colorClasses]}`}
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <p className="text-sm font-medium opacity-75">{card.label}</p>
              <p className="text-2xl font-bold mt-1">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen del Rendimiento</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tasa de Venta</span>
            <span className="font-semibold">
              {stats.totalVehicles > 0 
                ? ((stats.soldVehicles / stats.totalVehicles) * 100).toFixed(1)
                : 0}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Inventario Disponible</span>
            <span className="font-semibold">{stats.availableVehicles}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Promedio por Cotización</span>
            <span className="font-semibold">
              $
              {stats.totalQuotations > 0
                ? (stats.totalRevenue / stats.totalQuotations).toLocaleString()
                : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
