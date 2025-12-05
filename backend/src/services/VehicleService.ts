import { supabaseClient } from "../config/supabase.js";
import logger from "../config/logger.js";
import { z } from "zod";

export const vehicleSchema = z.object({
  marca: z.string().min(1),
  modelo_año: z.string().min(1),
  cilindraje: z.string(),
  linea: z.string(),
  origen: z.string(),
  motor: z.string(),
  combustible: z.string(),
  transmision: z.string(),
  marchas: z.string(),
  recorrido: z.number().int(),
  accesorios: z.array(z.string()).optional(),
  precio: z.number().positive(),
  imagenes: z.array(z.string()).optional(),
  estado: z.enum(["disponible", "vendido", "reservado"]).optional(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;

export class VehicleService {
  async getAllVehicles(
    filters?: {
      marca?: string;
      minPrice?: number;
      maxPrice?: number;
      año?: string;
      combustible?: string;
      transmision?: string;
      estado?: string;
    },
    page = 1,
    pageSize = 10
  ) {
    try {
      let query = supabaseClient.from("vehicles").select("*");

      if (filters?.marca) {
        query = query.ilike("marca", `%${filters.marca}%`);
      }
      if (filters?.minPrice) {
        query = query.gte("precio", filters.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte("precio", filters.maxPrice);
      }
      if (filters?.año) {
        query = query.ilike("modelo_año", `%${filters.año}%`);
      }
      if (filters?.combustible) {
        query = query.eq("combustible", filters.combustible);
      }
      if (filters?.transmision) {
        query = query.eq("transmision", filters.transmision);
      }
      if (filters?.estado) {
        query = query.eq("estado", filters.estado);
      }

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await query.range(from, to);

      if (error) throw error;

      return {
        data,
        total: count || 0,
        page,
        pageSize,
      };
    } catch (err) {
      logger.error("Error getting vehicles:", err);
      throw err;
    }
  }

  async getVehicleById(id: string) {
    try {
      const { data, error } = await supabaseClient
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error getting vehicle:", err);
      throw err;
    }
  }

  async createVehicle(vehicleData: Vehicle) {
    try {
      const { data, error } = await supabaseClient
        .from("vehicles")
        .insert([
          {
            ...vehicleData,
            estado: vehicleData.estado || "disponible",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error creating vehicle:", err);
      throw err;
    }
  }

  async updateVehicle(id: string, vehicleData: Partial<Vehicle>) {
    try {
      const { data, error } = await supabaseClient
        .from("vehicles")
        .update(vehicleData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error updating vehicle:", err);
      throw err;
    }
  }

  async deleteVehicle(id: string) {
    try {
      const { error } = await supabaseClient
        .from("vehicles")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (err) {
      logger.error("Error deleting vehicle:", err);
      throw err;
    }
  }

  async updateVehicleStatus(id: string, status: string) {
    try {
      const { data, error } = await supabaseClient
        .from("vehicles")
        .update({ estado: status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error updating vehicle status:", err);
      throw err;
    }
  }
}
