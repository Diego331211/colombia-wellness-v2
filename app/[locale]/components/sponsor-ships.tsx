"use client";

import { motion } from "framer-motion";
import MyButton from "./MyButton";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function SponsorshipTiers() {
  const { locale } = useParams();
  const t = useTranslations("tiers");
  const tCommon = useTranslations("common");

  const features = t.raw("features") as string[];
  const packages = t.raw("packages") as Record<
    string,
    { name: string; price: string; values: string[] }
  >;
  const packageKeys = ["diamond", "gold", "silver", "bronze", "community"];

  const renderCell = (value: string) => {
    if (value === "✓") {
      return (
        <div className="flex justify-center">
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      );
    }
    if (value === "-") {
      return (
        <div className="flex justify-center">
          <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
            <svg
              className="w-2.5 h-2.5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      );
    }
    return <span className="text-sm font-medium text-gray-800">{value}</span>;
  };

  const getCardStyle = (key: string) => {
    const styles = {
      diamond: "bg-blue-50 border border-blue-200",
      gold: "bg-yellow-50 border border-yellow-200",
      silver: "bg-gray-50 border border-gray-200",
      bronze: "bg-orange-50 border-2 border-orange-400",
      community: "bg-orange-50 border-2 border-orange-400",
    };
    return (
      styles[key as keyof typeof styles] || "bg-white border border-gray-200"
    );
  };

  const getHeaderStyle = (key: string) => {
    const styles = {
      diamond: "bg-blue-100",
      gold: "bg-yellow-100",
      silver: "bg-gray-100",
      bronze: "bg-orange-100",
      community: "bg-orange-100",
    };
    return styles[key as keyof typeof styles] || "bg-gray-100";
  };

  const getButtonStyle = (key: string) => {
    const styles = {
      diamond: "bg-slate-700 hover:bg-slate-800 text-white",
      gold: "bg-slate-700 hover:bg-slate-800 text-white",
      silver: "bg-slate-700 hover:bg-slate-800 text-white",
      bronze: "bg-orange-500 hover:bg-orange-600 text-white",
      community: "bg-orange-500 hover:bg-orange-600 text-white",
    };
    return (
      styles[key as keyof typeof styles] ||
      "bg-slate-700 hover:bg-slate-800 text-white"
    );
  };

  return (
    <div className="py-12 lg:py-20 bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-slate-900 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("title")}
        </motion.h2>
        <div className="w-16 lg:w-20 h-1 bg-orange-400 mx-auto my-6 lg:my-8"></div>

        {/* Mobile Cards View */}
        <div className="block lg:hidden">
          <motion.div
            className="overflow-x-auto -mx-4 px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-4 pb-4" style={{ width: "max-content" }}>
              {packageKeys.map((key, packageIndex) => (
                <motion.div
                  key={key}
                  className={`rounded-lg shadow-sm min-w-[280px] max-w-[280px] flex flex-col ${getCardStyle(
                    key
                  )}`}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: packageIndex * 0.1 }}
                >
                  {/* Card Header */}
                  <div
                    className={`${getHeaderStyle(
                      key
                    )} p-4 text-center rounded-t-lg flex-shrink-0`}
                  >
                    <h3 className="text-lg font-bold text-gray-800">
                      {packages[key].name}
                    </h3>
                    <p className="text-xl font-bold text-gray-800 mt-1">
                      {packages[key].price} USD
                    </p>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-grow">
                    <div className="space-y-3">
                      {features.map((feature, featureIndex) => {
                        const value = packages[key].values[featureIndex];
                        if (value === "-") return null;

                        if (value === "✓") {
                          return (
                            <div
                              key={featureIndex}
                              className="flex items-start gap-3 py-1.5"
                            >
                              {renderCell(value)}
                              <span className="text-sm text-gray-700 flex-1 leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={featureIndex}
                            className="flex items-start gap-3 py-1.5"
                          >
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs text-white font-bold">
                                •
                              </span>
                            </div>
                            <span className="text-sm text-gray-700 flex-1 leading-relaxed">
                              <span className="font-medium">{feature}:</span>{" "}
                              {value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 flex-shrink-0 border-t border-gray-200">
                    <MyButton
                      href={`/${locale}/sponsors`}
                      className={`w-full py-2.5 text-sm rounded-lg font-medium transition-colors ${getButtonStyle(
                        key
                      )}`}
                    >
                      {tCommon("moreInformation")}
                    </MyButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Desktop Table View */}
        <motion.div
          className="hidden lg:block overflow-x-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="min-w-[800px]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-4 text-left font-bold text-gray-800 bg-gray-100 text-sm min-w-[280px]"></th>
                  {packageKeys.map((key) => (
                    <th
                      key={key}
                      className="border border-gray-400 p-4 text-center font-bold bg-gray-100 text-sm min-w-[140px]"
                    >
                      <div className="text-base font-bold text-gray-800">
                        {packages[key].name} ({packages[key].price})
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, featureIndex) => (
                  <motion.tr
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: featureIndex * 0.05 }}
                    className="hover:bg-white/30 transition-colors"
                  >
                    <td className="border border-gray-400 p-4 font-medium text-gray-800 bg-white/50 text-sm">
                      {feature}
                    </td>
                    {packageKeys.map((key) => (
                      <td
                        key={key}
                        className="border border-gray-400 p-4 text-center bg-white/30"
                      >
                        {renderCell(packages[key].values[featureIndex])}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 lg:mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-xs lg:text-sm text-gray-700 mb-4 lg:mb-6 flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span>{t("note")}</span>
          </div>
          <div className="hidden lg:block">
            <MyButton
              href={`/${locale}/sponsors`}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-base rounded-lg font-medium transition-colors"
            >
              {tCommon("BecomeSponsor")}
            </MyButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
