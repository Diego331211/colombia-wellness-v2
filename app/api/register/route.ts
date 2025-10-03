import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validar datos básicos
    if (!data.fullName || !data.email) {
      return NextResponse.json(
        { error: "Nombre y email son requeridos" },
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
    const spreadsheetId = process.env.GOOGLE_SHEET_ID_REGISTER;

    // Preparar la fila de datos
    const timestamp = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      dateStyle: "short",
      timeStyle: "medium",
    });

    const row = [
      timestamp,
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.city || "",
      data.interests || "",
    ];

    // Agregar fila al Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Registros Colombia Wellness Week!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    console.log("Registro agregado a Google Sheets:", data.email);

    return NextResponse.json(
      { message: "Registro exitoso. Nos pondremos en contacto pronto." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error en API register:", error);
    console.error("Error details:", error.message, error.code);
    return NextResponse.json(
      { 
        error: "Error al procesar el registro",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}
