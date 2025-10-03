import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validar datos básicos
    if (!data.fullName || !data.email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // TODO: Aquí irá la integración con Google Sheets
    console.log('Datos de registro recibidos:', data);

    // Por ahora, solo retornamos éxito
    return NextResponse.json(
      { message: 'Registro exitoso. Nos pondremos en contacto pronto.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en API register:', error);
    return NextResponse.json(
      { error: 'Error al procesar el registro' },
      { status: 500 }
    );
  }
}
