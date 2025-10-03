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

    // Agregar fila al Sheet (usando Sheet2 para sponsors)
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet2!A:G", // Ajusta el nombre de la pestaña si es diferente
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
  } catch (error) {
    console.error("Error en API sponsors:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
