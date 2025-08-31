"use client";

import BackgroundStars from "@/assets/stars.png";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ActionButton } from "./action-button";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Car photo fills background */}
      <motion.div
        className="absolute inset-0 bg-no-repeat bg-center"
        style={{
          backgroundImage: "url('/ar25.JPG')", // your car photo in public/
          backgroundSize: "cover", // <-- change to "cover" if you want it to fill
          backgroundPositionY,
        }}
      />

      {/* Star overlay (optional, remove if you don’t want) */}
      <motion.div
        animate={{ backgroundPositionX: BackgroundStars.width }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${BackgroundStars.src})`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Team Arion is Recruiting
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow">
          Join India’s most passionate Formula Student team and help us build
          the next generation of racing machines.
        </p>
        <div className="mt-6">
          <ActionButton label="Apply Now" />
        </div>
      </div>
    </motion.section>
  );
}
