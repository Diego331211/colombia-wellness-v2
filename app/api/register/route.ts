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

    // Verificar que las variables de entorno existan
    if (!process.env.GOOGLE_SHEETS_CREDENTIALS) {
      console.error("❌ GOOGLE_SHEETS_CREDENTIALS no está definida");
      return NextResponse.json(
        { error: "Configuración del servidor incompleta (credenciales)" },
        { status: 500 }
      );
    }

    if (!process.env.GOOGLE_SHEET_ID_REGISTER) {
      console.error("❌ GOOGLE_SHEET_ID_REGISTER no está definida");
      return NextResponse.json(
        { error: "Configuración del servidor incompleta (sheet ID)" },
        { status: 500 }
      );
    }

    // Configurar Google Sheets API
    let credentials;
    try {
      credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);

      // FIX: Corregir el formato de private_key si tiene \n literal en lugar de escapado
      if (credentials.private_key) {
        // Reemplazar \n literal (como string) por saltos de línea reales
        credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
        console.log("🔧 private_key corregida automáticamente");
      }
    } catch (parseError) {
      console.error("❌ Error al parsear GOOGLE_SHEETS_CREDENTIALS:", parseError);
      return NextResponse.json(
        { error: "Error en la configuración de credenciales" },
        { status: 500 }
      );
    }

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
    console.log("📝 Intentando agregar registro a Google Sheets...");
    console.log("   - Email:", data.email);
    console.log("   - Sheet ID:", spreadsheetId);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Registros Colombia Wellness Week!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    console.log("✅ Registro agregado a Google Sheets exitosamente:", data.email);

    return NextResponse.json(
      { message: "Registro exitoso. Nos pondremos en contacto pronto." },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error en API register:", error);

    // Mostrar más detalles del error
    if (error instanceof Error) {
      console.error("   - Mensaje:", error.message);
      console.error("   - Stack:", error.stack);
    }

    return NextResponse.json(
      {
        error: "Error al procesar el registro",
        details: error instanceof Error ? error.message : "Error desconocido"
      },
      { status: 500 }
    );
  }
}
