"use client";

import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export type StickyScrollItem = {
  title: string;
  description: string;
  image?: string;
};

export const StickyScroll = ({ content }: { content: StickyScrollItem[] }) => {
  const [activeCard, setActiveCard] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            setActiveCard(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      itemRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="relative flex flex-col lg:flex-row gap-10">
      {/* Left text content */}
      <div className="flex-1">
        {content.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => {
                itemRefs.current[index] = el
              }}
            data-index={index}
            className="my-32"
          >
            <motion.h2
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              className="text-3xl font-bold text-white"
            >
              {item.title}
            </motion.h2>
            <motion.p
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              className="mt-4 max-w-xl text-white/70"
            >
              {item.description}
            </motion.p>
          </div>
        ))}
      </div>

      {/* Right sticky image */}
      <div className="flex-1 relative hidden lg:block">
        <div className="sticky top-32">
          {content[activeCard].image && (
            <motion.img
              key={content[activeCard].image}
              src={content[activeCard].image}
              alt={content[activeCard].title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full rounded-lg shadow-lg object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};
