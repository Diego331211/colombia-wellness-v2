import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validar datos básicos
    if (!data.companyName || !data.contactEmail) {
      return NextResponse.json(
        { error: "Nombre de empresa y email son requeridos" },
        { status: 400 }
      );
    }

    // Configurar Google Sheets API
    const credentials = JSON.parse(
      process.env.GOOGLE_SHEETS_CREDENTIALS || "{}"
    );
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID_SPONSORS;

    // Preparar la fila de datos
    const timestamp = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      dateStyle: "short",
      timeStyle: "medium",
    });

    const row = [
      timestamp,
      data.companyName || "",
      data.representativeName || "",
      data.representativeRole || "",
      data.contactEmail || "",
      data.contactPhone || "",
      data.sponsorshipType || "",
    ];

    // Agregar fila al Sheet (usando pestaña de sponsors)
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sponsors Colombia Wellness Week!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    console.log("Sponsor agregado a Google Sheets:", data.companyName);

    return NextResponse.json(
      {
        message: "Solicitud de patrocinio recibida. Nos contactaremos pronto.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error en API sponsors:", error);
    console.error("Error details:", error.message, error.code);
    return NextResponse.json(
      { 
        error: "Error al procesar la solicitud",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}
