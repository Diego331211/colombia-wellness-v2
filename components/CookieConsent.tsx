"use client";
import * as React from "react";

interface CookieConsentProps {
  variant?: "default" | string;
  onAcceptCallback?: () => void;
  onDeclineCallback?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  variant = "default",
  onAcceptCallback,
  onDeclineCallback,
}) => {
  const [visible, setVisible] = React.useState(true);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    // Animación de entrada
    setTimeout(() => setIsAnimating(true), 100);
  }, []);

  const handleAccept = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setVisible(false);
      onAcceptCallback?.();
    }, 300);
  };

  const handleDecline = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setVisible(false);
      onDeclineCallback?.();
    }, 300);
  };

  if (!visible) return null;

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 transition-all duration-300 ${
          isAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Texto */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🍪</span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Cookie Consent
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300">
                    We use cookies to improve your experience. Accept or decline?
                  </p>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleAccept}
                    className="
                      px-6 py-3
                      bg-gradient-to-r from-yellow-400 to-orange-400
                      hover:from-yellow-500 hover:to-orange-500
                      text-white font-semibold
                      rounded-full
                      shadow-lg hover:shadow-xl
                      transform hover:scale-105
                      transition-all duration-200
                      whitespace-nowrap
                    "
                  >
                    Accept
                  </button>
                  <button
                    onClick={handleDecline}
                    className="
                      px-6 py-3
                      bg-slate-700
                      hover:bg-slate-600
                      text-white font-semibold
                      rounded-full
                      shadow-lg hover:shadow-xl
                      transform hover:scale-105
                      transition-all duration-200
                      whitespace-nowrap
                    "
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>

            {/* Barra decorativa con gradiente */}
            <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500" />
          </div>
        </div>
      </div>

      {/* Backdrop opcional para dar más énfasis */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleDecline}
      />
    </>
  );
};
