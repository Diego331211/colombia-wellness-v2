// lib/posthogServer.ts
// Inicialización de PostHog en el backend (Node.js)
import posthog from "posthog-node";

const ph = new posthog.PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
  flushAt: 1,
  flushInterval: 0,
});

export default ph;
