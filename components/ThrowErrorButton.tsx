// components/ThrowErrorButton.tsx
import React from "react";

export function ThrowErrorButton() {
  return (
    <button
      onClick={() => {
        throw new Error("Error de prueba capturado por Sentry y PostHog");
      }}
      style={{
        padding: 12,
        background: "#f87171",
        color: "white",
        border: "none",
        borderRadius: 4,
      }}
    >
      Lanzar error de prueba
    </button>
  );
}
