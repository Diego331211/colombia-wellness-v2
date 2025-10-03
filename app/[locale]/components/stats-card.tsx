import React from "react";

interface StatsCardProps {
  number: string;
  text: string;
  source?: string;
}

export default function StatsCard({ number, text, source }: StatsCardProps) {
  return (
    <div className="bg-transparent p-4 rounded shadow-none text-center">
      <h4 className="text-3xl font-bold text-orange-500">{number}</h4>
      <p className="text-black dark:text-black mt-2">{text}</p>
      {source && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1">
          {source}
        </p>
      )}
    </div>
  );
}
