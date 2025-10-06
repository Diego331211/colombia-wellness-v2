"use client";

import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="bg-transparent text-black py-12">
      <div className="container mx-auto px-6 text-center flex flex-col items-center space-y-6">
        {/* Íconos de Redes Sociales */}
        <div className="flex space-x-6 text-2xl">
          <a
            href="https://www.instagram.com/colombiawellnessweek/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.tiktok.com/@colombiawellnessweek"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            <FontAwesomeIcon icon={faTiktok} />
          </a>
          <a
            href="https://twitter.com/ColombiaWellnes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
        </div>

        {/* Información de contacto */}
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            <a
              href="mailto:info@colombiawellnessweek.co"
              className="hover:text-black"
            >
              info@colombiawellnessweek.co
            </a>
          </p>
        </div>

        {/* Derechos Reservados */}
        <p className="text-xs text-gray-500">{t("footerText")} © 2025</p>
      </div>
    </footer>
  );
}
