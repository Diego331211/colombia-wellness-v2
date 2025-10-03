import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validar datos básicos
    if (!data.companyName || !data.contactEmail) {
      return NextResponse.json(
        { error: 'Nombre de empresa y email son requeridos' },
        { status: 400 }
      );
    }

    // TODO: Aquí irá la integración con Google Sheets
    console.log('Datos de sponsor recibidos:', data);

    // Por ahora, solo retornamos éxito
    return NextResponse.json(
      { message: 'Solicitud de patrocinio recibida. Nos contactaremos pronto.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en API sponsors:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
