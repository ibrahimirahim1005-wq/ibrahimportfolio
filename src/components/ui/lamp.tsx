import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-[#020617] w-full z-0",
        className
      )}
    >
      {/* Background Lamp Lighting System */}
      <div className="absolute top-0 left-0 right-0 h-[480px] sm:h-[540px] flex w-full items-center justify-center isolate pointer-events-none overflow-hidden z-0">
        {/* Left Conic Lamp Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "14rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position, from 70deg at center top), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 top-0 h-56 w-[30rem] bg-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 bg-[#020617] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-[#020617] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Conic Lamp Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "14rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position, from 290deg at center top), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 top-0 h-56 w-[30rem] bg-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-full right-0 bg-[#020617] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-[#020617] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Ambient Glows */}
        <div className="absolute top-28 h-48 w-full scale-x-150 bg-[#020617] blur-2xl" />
        <div className="absolute top-24 z-20 h-36 w-[28rem] rounded-full bg-cyan-500 opacity-40 blur-3xl" />
        
        {/* Glowing Horizon Line and Pulse (steady, always visible) */}
        <div className="absolute top-24 z-30 h-28 w-72 rounded-full bg-cyan-400 opacity-60 blur-2xl" />
        <div className="absolute top-28 z-40 h-[2px] w-[32rem] bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};
