"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Rewind, FastForward } from "lucide-react";

export interface CarouselItem {
  id: string | number; // allow string ids (we generate string ids below)
  title: string;
}

// Triplicate to simulate infinite track
const createInfiniteItems = (originalItems: CarouselItem[]) => {
  const items: Array<CarouselItem & { originalIndex: number }> = [];
  for (let i = 0; i < 3; i++) {
    originalItems.forEach((item, index) => {
      items.push({
        ...item,
        id: `${i}-${item.id}`,
        originalIndex: index,
      });
    });
  }
  return items;
};

const RulerLines = ({
  top = true,
  totalLines = 100,
}: {
  top?: boolean;
  totalLines?: number;
}) => {
  const lines = [];
  const lineSpacing = 100 / (totalLines - 1);

  for (let i = 0; i < totalLines; i++) {
    const isFifth = i % 5 === 0;
    const isCenter = i === Math.floor(totalLines / 2);

    let height = "h-3";
    let color = "bg-gray-500/60 dark:bg-gray-400/60";

    if (isCenter) {
      height = "h-8";
      color = "bg-primary dark:bg-white";
    } else if (isFifth) {
      height = "h-4";
      color = "bg-primary/80 dark:bg-white/80";
    }

    lines.push(
      <div
        key={i}
        className={`absolute w-0.5 ${height} ${color} ${top ? "" : "bottom-0"}`}
        style={{ left: `${i * lineSpacing}%` }}
      />
    );
  }

  return <div className="relative w-full h-8 px-4">{lines}</div>;
};

export function RulerCarousel({
  originalItems,
}: {
  originalItems: CarouselItem[];
}) {
  const infiniteItems = createInfiniteItems(originalItems);
  const itemsPerSet = originalItems.length;

  // Start in the middle copy, index 0 by default (center logic will handle visual centering)
  const [activeIndex, setActiveIndex] = useState(itemsPerSet); // middle copy, item 0
  const [isResetting, setIsResetting] = useState(false);

  // measurement refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const [targetX, setTargetX] = useState(0);

  // spacing between items (matches gap-[100px])
  const ITEM_GAP = 100;

  // ----- infinite loop normalization -----
  useEffect(() => {
    if (isResetting) return;

    // If we fell into the first copy, jump ahead one set
    if (activeIndex < itemsPerSet) {
      setIsResetting(true);
      setTimeout(() => {
        setActiveIndex(activeIndex + itemsPerSet);
        setIsResetting(false);
      }, 0);
      return;
    }

    // If we fell into the last copy, jump back one set
    if (activeIndex >= itemsPerSet * 2) {
      setIsResetting(true);
      setTimeout(() => {
        setActiveIndex(activeIndex - itemsPerSet);
        setIsResetting(false);
      }, 0);
    }
  }, [activeIndex, itemsPerSet, isResetting]);

  // ----- keyboard navigation -----
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isResetting) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((p) => p - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((p) => p + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isResetting]);

  // ----- dynamic centering calculation -----
  const recalcTarget = () => {
    const container = containerRef.current;
    const activeEl = itemRefs.current[activeIndex];
    if (!container || !activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    // centers
    const containerCenterX = containerRect.left + containerRect.width / 2;
    const activeCenterX = activeRect.left + activeRect.width / 2;

    // current offset (motion div translateX) should move by the delta
    const delta = containerCenterX - activeCenterX;

    // We need the current x of the track to compute new absolute x.
    // Since we only set absolute x, we can just add delta to current targetX.
    setTargetX((prev) => prev + delta);
  };

  // Recalc when index changes and on initial mount
  useLayoutEffect(() => {
    // wait one frame so DOM has updated positions
    const id = requestAnimationFrame(recalcTarget);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, originalItems]);

  // Recalc on resize
  useEffect(() => {
    const onResize = () => recalcTarget();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemClick = (newIndex: number) => {
    if (isResetting) return;

    // Map to the visually closest copy of that item (same original index across 3 copies)
    const original = newIndex % itemsPerSet;
    const candidates = [original, original + itemsPerSet, original + itemsPerSet * 2];
    let closest = candidates[0];
    let best = Math.abs(candidates[0] - activeIndex);
    for (const c of candidates) {
      const d = Math.abs(c - activeIndex);
      if (d < best) {
        best = d;
        closest = c;
      }
    }
    setActiveIndex(closest);
  };

  const handlePrevious = () => {
    if (!isResetting) setActiveIndex((p) => p - 1);
  };
  const handleNext = () => {
    if (!isResetting) setActiveIndex((p) => p + 1);
  };

  const currentPage = (activeIndex % itemsPerSet) + 1;
  const totalPages = itemsPerSet;

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-background dark:bg-black">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-primary dark:text-white mb-10">
        Recruitment Process
      </h2>

      <div className="w-full max-w-6xl h-[200px] flex flex-col justify-center relative">
        <div className="flex items-center justify-center">
          <RulerLines top />
        </div>

        <div
          ref={containerRef}
          className="flex items-center justify-center w-full h-full relative overflow-hidden"
        >
          <motion.div
            className="flex items-center"
            style={{
              gap: ITEM_GAP,
              // Prevent layout jitter by forcing GPU comp
              willChange: "transform",
            }}
            animate={{ x: targetX }}
            transition={
              isResetting
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 24, mass: 1 }
            }
          >
            {infiniteItems.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.button
                  key={item.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  onClick={() => handleItemClick(index)}
                  className={`text-4xl md:text-6xl font-bold whitespace-nowrap cursor-pointer flex items-center justify-center ${
                    isActive
                      ? "text-primary dark:text-white"
                      : "text-muted-foreground dark:text-gray-500 hover:text-foreground dark:hover:text-gray-300"
                  }`}
                  animate={{
                    scale: isActive ? 1 : 0.78,
                    opacity: isActive ? 1 : 0.45,
                  }}
                  transition={
                    isResetting ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 26 }
                  }
                  // width is auto; spacing handled by flex gap
                >
                  {item.title}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <div className="flex items-center justify-center">
          <RulerLines top={false} />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          onClick={handlePrevious}
          disabled={isResetting}
          className="flex items-center justify-center cursor-pointer"
          aria-label="Previous item"
        >
          <Rewind className="w-5 h-5 text-primary/80" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground dark:text-gray-400">
            {currentPage}
          </span>
          <span className="text-sm text-muted-foreground dark:text-gray-500">/</span>
          <span className="text-sm font-medium text-muted-foreground dark:text-gray-400">
            {totalPages}
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={isResetting}
          className="flex items-center justify-center cursor-pointer"
          aria-label="Next item"
        >
          <FastForward className="w-5 h-5 text-primary/80" />
        </button>
      </div>
    </div>
  );
}
