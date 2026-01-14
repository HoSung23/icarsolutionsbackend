import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import vehicleRoutes from "./routes/vehicles.js";
import quoteRoutes from "./routes/quotes.js";
import iaaiRoutes from "./routes/iaai.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import logger from "./config/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(limiter);

// Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/cotizaciones", quoteRoutes);
app.use("/api/importaciones", iaaiRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
