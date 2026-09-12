import React from "react";

const stats = [
  {
    number: "20+ Years",
    label: "Helping Home Cooks Since 2003",
  },
  {
    number: "3,600+",
    label: "Trusted Recipes",
  },
  {
    number: "100+",
    label: "Expert Contributors & Recipe Developers",
  },
  {
    number: "8M+",
    label: "Monthly Readers",
  },
];

export default function StatsSection() {
  return (
    <section className="w-full bg-white py-14 sm:py-16 border-t border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10 tracking-tight">
          Trusted Recipes for Real Life
        </h2>

        {/* 4 Stats Grid / Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y-2 md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center px-4 py-4 md:py-2 group"
            >
              {/* Stat Number */}
              <span className="font-serif text-2xl sm:text-[28px] font-bold text-[#0c5354] mb-1.5 transition-transform duration-200 group-hover:scale-105">
                {stat.number}
              </span>
              
              {/* Stat Label */}
              <span className="text-[12px] sm:text-[13px] font-medium text-gray-800 leading-tight max-w-[200px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
