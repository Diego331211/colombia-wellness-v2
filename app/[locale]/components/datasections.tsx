"use client";

import React from "react";
import { useTranslations } from "next-intl";
import StatsCard from "./stats-card";

export default function DataSections() {
  const t = useTranslations("epicenter");

  return (
    <div className="bg-transparent transition-colors duration-300">
      {/* Epicenter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Título principal */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 text-center md:text-left">
            {t("title")}
            <span className="text-orange-500">{t("titleHighlight")}</span>
          </h2>

          {/* Separador */}
          <div className="w-20 h-1 bg-orange-400 mx-auto md:mx-0 mb-8"></div>

          {/* Grid de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatsCard
              number={t("stats1Number")}
              text={t("stats1Text")}
              source={t("stats1Source")}
            />
            <StatsCard
              number={t("stats2Number")}
              text={t("stats2Text")}
            />
            <StatsCard
              number={t("stats3Number")}
              text={t("stats3Text")}
            />
          </div>

          {/* Subtítulo: Inversión en Bienestar por País */}
          <h3 className="text-2xl font-bold mb-6 text-center text-slate-800 mt-12">
            {t("statsTitle")}
          </h3>

          {/* Barras comparativas */}
          <div className="flex flex-wrap justify-center gap-8 py-12">
            {/* Colombia */}
            <div className="flex flex-col items-center">
              <div className="h-40 w-6 bg-orange-500 rounded-t-lg relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-slate-900">
                  {t("colombiaStat")}
                </div>
              </div>
              <div className="mt-2 text-sm text-slate-600">Colombia</div>
            </div>

            {/* México */}
            <div className="flex flex-col items-center">
              <div className="h-32 w-6 bg-orange-400 rounded-t-lg relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-slate-900">
                  {t("mexicoStat")}
                </div>
              </div>
              <div className="mt-2 text-sm text-slate-600">México</div>
            </div>

            {/* Costa Rica */}
            <div className="flex flex-col items-center">
              <div className="h-24 w-6 bg-orange-300 rounded-t-lg relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-slate-900">
                  {t("costaRicaStat")}
                </div>
              </div>
              <div className="mt-2 text-sm text-slate-600">Costa Rica</div>
            </div>

            {/* Brasil */}
            <div className="flex flex-col items-center">
              <div className="h-20 w-6 bg-amber-300 rounded-t-lg relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-slate-900">
                  {t("brasilStat")}
                </div>
              </div>
              <div className="mt-2 text-sm text-slate-600">Brasil</div>
            </div>

            {/* Perú */}
            <div className="flex flex-col items-center">
              <div className="h-12 w-6 bg-amber-200 rounded-t-lg relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-slate-900">
                  {t("peruStat")}
                </div>
              </div>
              <div className="mt-2 text-sm text-slate-600">Perú</div>
            </div>
          </div>

          {/* Pie de página con texto adicional */}
          <p className="text-center mt-8 text-slate-700">
            {t("foreignInvestment")}
          </p>
        </div>
      </section>
    </div>
  );
}
