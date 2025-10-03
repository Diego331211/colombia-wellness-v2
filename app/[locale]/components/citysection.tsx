"use client";

import React from "react";
import { useTranslations } from "next-intl";
import CityCard from "./city-card";

export default function CitySection() {
  const t = useTranslations("cities");

  return (
    <div>
      {/* Cities Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 text-center">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-orange-400 mx-auto"></div>

          <div className="mt-12">
            <CityCard name={t("bogota")} image="/images/bogota.jpeg" />
          </div>
        </div>
      </section>
    </div>
  );
}
