import React from "react";
import { FilterProvider } from "../contexts/FilterContext";
import { FilterPanel } from "./FilterPanel";
import VehicleCatalog from "./VehicleCatalog";

export const CatalogSection: React.FC = () => {
  return (
    <FilterProvider>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar con filtros */}
        <div className="lg:col-span-1">
          <FilterPanel />
        </div>

        {/* Grid de vehículos */}
        <div className="lg:col-span-3">
          <VehicleCatalog />
        </div>
      </div>
    </FilterProvider>
  );
};
