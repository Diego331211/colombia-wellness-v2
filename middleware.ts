import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "es", "pt"],
  defaultLocale: "es",
});

export default function middleware(request: NextRequest) {
  // Redirigir HTTP a HTTPS en producción
  if (
    process.env.NODE_ENV === "production" &&
    request.headers.get("x-forwarded-proto") !== "https"
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get("host")}${request.nextUrl.pathname}`,
      301
    );
  }

  return intlMiddleware(request);
}

export const config = {
  // Excluye /api, /_next, /_vercel y archivos estáticos (con punto en el nombre)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
