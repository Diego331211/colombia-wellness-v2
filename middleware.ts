import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "es", "pt"],
  defaultLocale: "es",
});

export const config = {
  // Excluye /api, /_next, /_vercel y archivos estáticos (con punto en el nombre)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
