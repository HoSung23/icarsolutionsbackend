import { Response } from "express";
import { QuoteService } from "../services/QuoteService.js";
import { AuthRequest } from "../middlewares/auth.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { VehicleService } from "../services/VehicleService.js";
import logger from "../config/logger.js";
import { z } from "zod";

const quoteService = new QuoteService();
const vehicleService = new VehicleService();

const quoteSchema = z.object({
  vehicle_id: z.string().uuid(),
  cliente_nombre: z.string().min(1),
  cliente_email: z.string().email(),
  cliente_telefono: z.string().min(1),
  items: z.array(
    z.object({
      concepto: z.string(),
      monto: z.number().positive(),
    })
  ),
  total: z.number().positive(),
});

export const createQuote = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const validatedData = quoteSchema.parse(req.body);

    const quote = await quoteService.createQuote({
      ...validatedData,
      created_by: req.user!.id,
    });

    res.status(201).json(quote);
  }
);

export const getQuotes = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { startDate, endDate, page = 1, pageSize = 10 } = req.query;

    const filters = {
      created_by: req.user?.id,
      startDate: startDate as string | undefined,
      endDate: endDate as string | undefined,
    };

    const result = await quoteService.getQuotes(
      filters,
      Number(page),
      Number(pageSize)
    );

    res.json(result);
  }
);

export const getQuotePDF = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const quote = await quoteService.getQuoteById(id);
    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    const vehicle = await vehicleService.getVehicleById(quote.vehicle_id);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const pdfBuffer = await quoteService.generatePDF(quote, vehicle);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="cotizacion-${id}.pdf"`
    );
    res.send(Buffer.from(pdfBuffer));
  }
);
