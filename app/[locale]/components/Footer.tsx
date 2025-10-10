"use client";

import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="bg-transparent text-black py-12">
      <div className="container mx-auto px-6 text-center flex flex-col items-center space-y-6">
        {/* Íconos de Redes Sociales */}
        <div className="flex space-x-6 text-2xl">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/colombiawellnessweek/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="text-gray-700 hover:text-orange-500 transition-colors"
          >
            <FontAwesomeIcon icon={faInstagram} className="h-7" />
          </a>
          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@colombiawellnessweek2025"
            target="_blank"
            rel="noopener noreferrer"
            title="TikTok"
            className="text-gray-700 hover:text-orange-500 transition-colors"
          >
            <FontAwesomeIcon icon={faTiktok} className="h-7" />
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/colombia-wellness-week/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="text-gray-700 hover:text-orange-500 transition-colors"
          >
            <FontAwesomeIcon icon={faLinkedin} className="h-7" />
          </a>
          {/* Correo */}
          <a
            href="mailto:contacto@colombiawellnessweek.co"
            title="Enviar correo"
            className="text-gray-700 hover:text-orange-500 transition-colors"
          >
            <FontAwesomeIcon icon={faEnvelope} className="h-7" />
          </a>
        </div>

        {/* Información de contacto */}
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            <a
              href="mailto:contacto@colombiawellnessweek.co"
              className="hover:text-black"
            >
              contacto@colombiawellnessweek.co
            </a>
          </p>
        </div>

        {/* Derechos Reservados */}
        <p className="text-xs text-gray-500">{t("footerText")} © 2025</p>
      </div>
    </footer>
  );
}
