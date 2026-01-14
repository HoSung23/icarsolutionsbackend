import express from "express";
import { getIaaiVehicles, proxyImage } from "../controllers/iaaiController.js";

const router = express.Router();

// GET /api/importaciones - Obtener vehículos de IAAI disponibles para importar
router.get("/", getIaaiVehicles);

// GET /api/importaciones/proxy-image - Proxy para imágenes (evita CORS)
router.get("/proxy-image", proxyImage);

export default router;
