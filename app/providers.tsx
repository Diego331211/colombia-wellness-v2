// app/providers.tsx
// Inicializa PostHog y Sentry en el cliente y provee contexto global
import React, { useEffect } from "react";

// Inicialización dinámica de Sentry (cliente) solo en producción
if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_SENTRY_DSN &&
  process.env.NODE_ENV === "production"
) {
  import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      integrations: [],
    });
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_POSTHOG_KEY &&
      process.env.NODE_ENV === "production" &&
      !(window as any).__posthogInitialized
    ) {
      import("posthog-js").then((posthog) => {
        posthog.default.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
          capture_pageview: true,
          session_recording: {},
        });
        (window as any).__posthogInitialized = true;
      });
    }
  }, []);
  return <>{children}</>;
}
