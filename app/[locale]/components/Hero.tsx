"use client";

import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import logo from "@/public/images/Logo-16.png";
import bienestarIcons from "@/data/bienestarIcons";

export default function Hero() {
  const t = useTranslations("common");
  const [isMobile, setIsMobile] = useState(false);
  const [containerSize, setContainerSize] = useState(600);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [animateOnMount, setAnimateOnMount] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { locale } = useParams();

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Medir tamaño del contenedor y generar posiciones una vez montado
  useEffect(() => {
    const updatePositions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const size = Math.min(rect.width, rect.height);
        setContainerSize(size);

        const newPositions = isMobile
          ? generateCirclePositions(size / 2.3, bienestarIcons.length)
          : generateRightSemiCirclePositions(size / 2.5, bienestarIcons.length);
        setPositions(newPositions);
      }
    };

    updatePositions();
    setAnimateOnMount(true);

    const timer = setTimeout(() => setAnimateOnMount(false), 1500);

    window.addEventListener("resize", updatePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePositions);
    };
  }, [isMobile]);

  const handleSubmit = () => {
    router.push(`/${locale}/register`);
  };

  // Posiciones para desktop
  const generateRightSemiCirclePositions = (radius: number, count: number) => {
    const angleStep = (Math.PI * 1.1) / (count - 0.0001);
    return Array.from({ length: count }, (_, i) => {
      const angle = angleStep * i;
      return {
        x: radius * 1.7 * Math.sin(angle) - 220,
        y: radius * Math.cos(angle) - radius / 40,
      };
    });
  };

  // Posiciones para mobile
  const generateCirclePositions = (radius: number, count: number) => {
    const angleStep = (2 * Math.PI) / count;
    return Array.from({ length: count }, (_, i) => {
      const angle = angleStep * i;
      return {
        x: radius * Math.cos(angle) + 20,
        y: radius * Math.sin(angle),
      };
    });
  };

  return (
    <section
      id="hero"
      className="min-h-screen overflow-x-hidden flex flex-col items-center justify-center px-4"
    >
      <div className="flex flex-col md:flex-row items-center justify-start gap-16 w-full max-w-7xl">
        {/* Lado izquierdo: Logo + íconos */}
        <div
          ref={containerRef}
          className={`relative ${
            isMobile ? "w-[320px] h-[320px]" : "w-[605px] h-[600px]"
          }`}
        >
          <div
            className={`absolute left-1/2 top-1/2 md:left-1/4 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] md:w-[350px] md:h-[350px] `}
          >
            <Image
              src={logo}
              alt="Colombia Wellness Week logo"
              fill
              className="object-contain"
            />
          </div>

          {positions.map(({ x, y }, index) => {
            const { icon, labelKey } = bienestarIcons[index] || {};
            return (
              <div
                key={index}
                className="absolute flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-white text-xs font-thin shadow-md whitespace-normal lg:whitespace-nowrap max-w-[110px] lg:max-w-none fade-loop"
                style={{
                  left: `calc(50% + ${x}px - 70px)`,
                  top: `calc(50% + ${y}px - 20px)`,
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <span className="text-xs font-thin md:text-4xl">{icon}</span>
                <span className="font-semibold">
                  {t(`bienestar.${labelKey}`)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Lado derecho: Registro */}
        <div
          className={`flex flex-col items-center md:items-start text-center md:text-left gap-4 px-2 transition-opacity duration-700 ${
            animateOnMount ? "fade-in-start" : ""
          }`}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-green-900">
            {t("heroTitle")}
          </h1>
          <p className="text-md sm:text-lg text-black font-semibold">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button
              onClick={handleSubmit}
              className="bg-orange-400 hover:bg-orange-500 transition shadow-lg shadow-gray-500 text-white px-6 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base"
            >
              {t("Register")}
            </button>
          </div>
        </div>
      </div>

      {/* Animaciones CSS en línea */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes pulseMessage {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          80% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.9);
          }
        }
        @keyframes fadeInStart {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .float-animation {
          animation: float 1s ease-in-out infinite;
        }
        .fade-loop {
          animation: pulseMessage 12s ease-in-out infinite;
        }
        .fade-in-start {
          animation: fadeInStart 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
