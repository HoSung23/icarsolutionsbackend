import { Response } from "express";
import { VehicleService, vehicleSchema } from "../services/VehicleService.js";
import { AuthRequest } from "../middlewares/auth.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import logger from "../config/logger.js";

const vehicleService = new VehicleService();

export const getAllVehicles = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { marca, minPrice, maxPrice, año, combustible, transmision, estado, page = 1, pageSize = 10 } = req.query;

    const filters = {
      marca: marca as string | undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      año: año as string | undefined,
      combustible: combustible as string | undefined,
      transmision: transmision as string | undefined,
      estado: estado as string | undefined,
    };

    const result = await vehicleService.getAllVehicles(
      filters,
      Number(page),
      Number(pageSize)
    );

    res.json(result);
  }
);

export const getVehicleById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const vehicle = await vehicleService.getVehicleById(id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json(vehicle);
  }
);

export const createVehicle = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const validatedData = vehicleSchema.parse(req.body);
    const vehicle = await vehicleService.createVehicle(validatedData);

    res.status(201).json(vehicle);
  }
);

export const updateVehicle = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const partialData = vehicleSchema.partial().parse(req.body);
    const vehicle = await vehicleService.updateVehicle(id, partialData);

    res.json(vehicle);
  }
);

export const deleteVehicle = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    await vehicleService.deleteVehicle(id);

    res.json({ success: true });
  }
);

export const updateVehicleStatus = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (!["disponible", "vendido", "reservado"].includes(estado)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const vehicle = await vehicleService.updateVehicleStatus(id, estado);
    res.json(vehicle);
  }
);
