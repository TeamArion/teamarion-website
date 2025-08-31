"use client";

import { StickyScroll, type StickyScrollItem } from "@/components/ui/sticky-scroll-reveal";

export function Features() {
  const aboutContent: StickyScrollItem[] = [
    {
      title: "Our Vision",
      description:
        "To innovate in engineering, embrace teamwork, and represent our institution with pride on the Formula Student stage.",
      image: "/opengraph-image.png",
    },
    {
      title: "Our Team",
      description:
        "A cross-disciplinary group of students specializing in design, manufacturing, electronics, and business — all united by racing.",
      image: "/ar25.JPG",
    },
    {
      title: "Our Cars",
      description:
        "From combustion to electric, every year we design, build, and race high-performance Formula Student cars from the ground up.",
      image: "/opengraph-image.png",
    },
    {
      title: "Our Culture",
      description:
        "A fast-paced environment where learning, resilience, and leadership are forged through the challenges of motorsport.",
      image: "/ar25.JPG",
    },
  ];

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
          About Us.
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5">
          From building our first prototypes to racing at international events,
          Team Arion has grown into one of India&apos;s most passionate Formula
          Student teams. We bring together engineers, innovators, and dreamers
          with one mission: to push the boundaries of student motorsport and
          create the next generation of racing machines.
        </p>

        <div className="mt-20">
          <StickyScroll content={aboutContent} />
        </div>
      </div>
    </section>
  );
}
