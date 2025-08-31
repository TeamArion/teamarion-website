import React from "react";

const logos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/1024px-Tesla_logo.png",
    alt: "Tesla",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Lexus_division_emblem.svg/2560px-Lexus_division_emblem.svg.png",
    alt: "Lexus",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/20/McLaren_Racing_logo.png",
    alt: "McLaren Automotive",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Autoliv_logo.svg/1200px-Autoliv_logo.svg.png",
    alt: "Autoliv",
  },
  {
    src: "https://freepnglogos.com/uploads/mercedes-logo-png/mercedes-logo-png-transparent-white-star-0.png",
    alt: "Mercedes-Benz",
  },
  {
    src: "https://media-publications.bcg.com/BCG_MONOGRAM.png",
    alt: "BCG",
  },
  {
    src: "https://pngimg.com/uploads/red_bull/red_bull_PNG26.png",
    alt: "Red Bull Racing",
  },
];

const Clients = () => (
  <section className="py-14 bg-black">
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-white text-3xl font-semibold sm:text-4xl">
          Where you’ll find our Alumni Today
        </h3>
        <p className="text-white/70 mt-3">
          Our alumni are shaping the future of mobility, consulting, and
          motorsport at some of the world’s most visionary brands.
        </p>
      </div>
      <div className="mt-12 flex justify-center">
        <ul className="inline-grid grid-cols-2 gap-x-10 gap-y-6 md:gap-x-16 md:grid-cols-3 lg:grid-cols-4">
          {logos.map((logo, idx) => (
            <li key={idx} className="flex justify-center items-center">
              <img
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={60}
                className="object-contain filter grayscale hover:filter-none transition"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Clients;
