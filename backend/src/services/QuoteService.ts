import { supabaseClient } from "../config/supabase.js";
import logger from "../config/logger.js";
import jsPDF from "jspdf";

export interface QuoteItem {
  concepto: string;
  monto: number;
}

export interface Quote {
  vehicle_id: string;
  cliente_nombre: string;
  cliente_email: string;
  cliente_telefono: string;
  items: QuoteItem[];
  total: number;
  created_by: string;
}

export class QuoteService {
  async createQuote(quoteData: Quote) {
    try {
      const { data, error } = await supabaseClient
        .from("cotizaciones")
        .insert([
          {
            ...quoteData,
            items: quoteData.items,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error creating quote:", err);
      throw err;
    }
  }

  async getQuotes(
    filters?: {
      created_by?: string;
      startDate?: string;
      endDate?: string;
    },
    page = 1,
    pageSize = 10
  ) {
    try {
      let query = supabaseClient.from("cotizaciones").select("*");

      if (filters?.created_by) {
        query = query.eq("created_by", filters.created_by);
      }
      if (filters?.startDate) {
        query = query.gte("created_at", filters.startDate);
      }
      if (filters?.endDate) {
        query = query.lte("created_at", filters.endDate);
      }

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        data,
        total: count || 0,
        page,
        pageSize,
      };
    } catch (err) {
      logger.error("Error getting quotes:", err);
      throw err;
    }
  }

  async getQuoteById(id: string) {
    try {
      const { data, error } = await supabaseClient
        .from("cotizaciones")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      logger.error("Error getting quote:", err);
      throw err;
    }
  }

  async generatePDF(quote: any, vehicle: any) {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Logo y título
      doc.setFontSize(24);
      doc.text("iCarSolutions", pageWidth / 2, 20, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Cotización de Vehículo", pageWidth / 2, 28, {
        align: "center",
      });

      // Datos del cliente
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text("Datos del Cliente", 20, 40);

      doc.setFontSize(10);
      doc.text(`Nombre: ${quote.cliente_nombre}`, 20, 48);
      doc.text(`Email: ${quote.cliente_email}`, 20, 55);
      doc.text(`Teléfono: ${quote.cliente_telefono}`, 20, 62);

      // Datos del vehículo
      doc.setFontSize(12);
      doc.text("Vehículo", 20, 75);

      doc.setFontSize(10);
      doc.text(`Marca: ${vehicle.marca}`, 20, 83);
      doc.text(`Modelo: ${vehicle.modelo_año}`, 20, 90);
      doc.text(`Precio: $${vehicle.precio.toLocaleString()}`, 20, 97);

      // Tabla de desglose
      let yPosition = 110;
      doc.setFontSize(11);
      doc.text("Desglose de Costos", 20, yPosition);

      yPosition += 8;
      doc.setFontSize(10);

      // Headers
      doc.setFillColor(200, 200, 200);
      doc.rect(20, yPosition - 5, 170, 7, "F");
      doc.text("Concepto", 25, yPosition);
      doc.text("Monto", 150, yPosition);

      yPosition += 8;

      // Items
      quote.items.forEach((item: any) => {
        doc.text(item.concepto, 25, yPosition);
        doc.text(`$${item.monto.toLocaleString()}`, 150, yPosition);
        yPosition += 7;
      });

      // Total
      yPosition += 3;
      doc.setFillColor(230, 230, 230);
      doc.rect(20, yPosition - 5, 170, 7, "F");
      doc.setFontSize(11);
      doc.text("Total", 25, yPosition);
      doc.text(`$${quote.total.toLocaleString()}`, 150, yPosition);

      // Footer
      yPosition = pageHeight - 30;
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(
        `Generado: ${new Date().toLocaleDateString()}`,
        pageWidth / 2,
        yPosition,
        { align: "center" }
      );

      return doc.output("arraybuffer");
    } catch (err) {
      logger.error("Error generating PDF:", err);
      throw err;
    }
  }
}
