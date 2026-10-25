import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "./ui/lamp";
import { PERSONAL_INFO } from "../data/portfolioData";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0.5, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center text-center space-y-4"
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#22d3ee] font-semibold">
          ASPIRING &bull; CLASS OF 2027
        </span>
        <h1 className="bg-linear-to-br from-[#cbd5e1] to-[#64748b] py-2 bg-clip-text text-center text-5xl font-black tracking-tight text-transparent sm:text-7xl md:text-8xl font-display uppercase">
          {PERSONAL_INFO.name}
        </h1>
        <p className="text-slate-300 font-mono text-sm sm:text-base font-medium max-w-xl">
          {PERSONAL_INFO.tagline}
        </p>
      </motion.div>
    </LampContainer>
  );
}
