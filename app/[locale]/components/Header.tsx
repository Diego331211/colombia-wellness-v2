"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const t = useTranslations("common");

  return (
    <header className="bg-transparent text-black py-4 fixed top-0 left-0 w-full z-50 backdrop-blur-md">
      <div className="container mx-auto flex items-center gap-4 px-10">
        {/* Ícono de Instagram con enlace */}
        <a
          href="https://www.instagram.com/colombiawellnessweek?igsh=MWo0ZWtlcDlxZ2NvMQ%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className="h-8 hover:text-orange-500 transition-colors"
          />
        </a>

        {/* Ícono de TikTok con enlace */}
        <a
          href="https://www.tiktok.com/@colombiawellnessweek2025?_t=ZS-907YDiSMJWq&_r=1"
          target="_blank"
          rel="noopener noreferrer"
          title="TikTok"
        >
          <FontAwesomeIcon
            icon={faTiktok}
            className="h-8 hover:text-orange-500 transition-colors"
          />
        </a>

        {/* Ícono de LinkedIn con enlace */}
        <a
          href="https://www.linkedin.com/company/colombia-wellness-week/?viewAsMember=true"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className="h-8 hover:text-orange-500 transition-colors"
          />
        </a>

        {/* Ícono de correo con enlace */}
        <a
          href="mailto:Colombiawellnesseeek2025@gmail.com"
          title="Enviar correo"
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className="h-7 hover:text-orange-500 transition-colors"
          />
        </a>

        {/* Espaciador flexible */}
        <div className="flex-1"></div>

        {/* Selector de idioma */}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
