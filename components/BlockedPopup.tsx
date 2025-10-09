import React from "react";

interface BlockedPopupProps {
  visible?: boolean;
}

const BlockedPopup: React.FC<BlockedPopupProps> = ({ visible = true }) => {
  if (!visible) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#411E8A]/60 via-[#050044]/60 to-[#010009]/60"
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="max-w-lg w-full rounded-3xl shadow-2xl p-10 text-center border-4"
        style={{
          background: "linear-gradient(135deg, #411E8A 70%, #050044 100%)",
          color: "#FAECD4",
          borderColor: "#FAECD4",
          fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
          boxShadow: "0 8px 32px 0 rgba(65,30,138,0.25)",
        }}
      >
        <div className="flex justify-center mb-6">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="28" cy="28" r="28" fill="#FAECD4" />
            <path
              d="M28 16V32"
              stroke="#411E8A"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="28" cy="40" r="2.5" fill="#411E8A" />
          </svg>
        </div>
        <h2
          className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight"
          style={{ color: "#FAECD4", letterSpacing: "-1px" }}
        >
          Ups, parece que ha ocurrido un error
        </h2>
        <p
          className="text-lg md:text-xl mb-8 font-medium"
          style={{ color: "#FAECD4", textShadow: "0 1px 8px #05004455" }}
        >
          El acceso a esta página ha sido restringido temporalmente.
          <br />
          Por favor comunícate con tu proveedor para continuar disfrutando del
          servicio.
        </p>
        <div
          className="mt-2 text-base font-semibold tracking-wide"
          style={{ color: "#FAECD4", opacity: 0.85 }}
        >
          Botopia Technology SAS
        </div>
      </div>
    </div>
  );
};

export default BlockedPopup;
