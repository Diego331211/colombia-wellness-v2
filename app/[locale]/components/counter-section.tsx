"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function CounterSection() {
  const [counts, setCounts] = useState({
    attendees: 0,
    allies: 0,
    startups: 0,
  });

  const t = useTranslations("counter");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const interval = 20; // Update every 20ms
      const steps = duration / interval;

      const targetCounts = {
        attendees: 2000,
        allies: 30,
        startups: 30,
      };

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep += 1;
        const progress = currentStep / steps;

        if (currentStep >= steps) {
          setCounts(targetCounts);
          clearInterval(timer);
        } else {
          setCounts({
            attendees: Math.round(targetCounts.attendees * progress),
            allies: Math.round(targetCounts.allies * progress),
            startups: Math.round(targetCounts.startups * progress),
          });
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-20 bg-dark-background text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-orange-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-slate-800/50 p-8 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-5xl font-bold text-orange-400 mb-2">
              {counts.attendees.toLocaleString()}
            </div>
            <div className="text-xl uppercase">{t("assistants")}</div>
            <p className="mt-4 text-slate-300">{t("assistantsText")}</p>
          </motion.div>

          <motion.div
            className="bg-slate-800/50 p-8 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-5xl font-bold text-orange-400 mb-2">
              {counts.allies}
            </div>
            <div className="text-xl uppercase">{t("allies")}</div>
            <p className="mt-4 text-slate-300">{t("alliesText")}</p>
          </motion.div>

          <motion.div
            className="bg-slate-800/50 p-8 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-5xl font-bold text-orange-400 mb-2">
              +{counts.startups}
            </div>
            <div className="text-xl uppercase">{t("startups")}</div>
            <p className="mt-4 text-slate-300">{t("startupsText")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
