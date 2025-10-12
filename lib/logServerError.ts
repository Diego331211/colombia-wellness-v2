// lib/logServerError.ts
// Utilidad para capturar errores en el backend y enviarlos a Sentry y PostHog
import * as Sentry from "@sentry/nextjs";
import ph from "./posthogServer";

interface ErrorContext {
  [key: string]: any;
}

export function logServerError(error: unknown, context: ErrorContext = {}) {
  if (process.env.NODE_ENV !== "production") return;
  Sentry.captureException(error, { extra: context });
  ph.capture({
    distinctId: context.user || "anonymous",
    event: "server_exception",
    properties: {
      ...context,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    },
  });
}
