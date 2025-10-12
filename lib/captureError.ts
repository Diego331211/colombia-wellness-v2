// lib/captureError.ts
// Utilidad para capturar errores en cliente y enviarlos a Sentry y PostHog
import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

interface ErrorContext {
  component?: string;
  user?: string;
  props?: Record<string, any>;
  [key: string]: any;
}

export function captureClientError(error: unknown, context: ErrorContext = {}) {
  if (process.env.NODE_ENV !== "production") return;
  Sentry.captureException(error, { extra: context });
  posthog.capture("frontend_exception", {
    ...context,
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    sessionId: posthog.get_session_id?.(),
  });
}
