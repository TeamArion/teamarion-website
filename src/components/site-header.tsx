"use client";

import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-6 z-50">
      <div className="mx-auto w-full max-w-5xl px-4">
        {/* Glassy capsule */}
        <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-white/10">
          {/* 3-column grid keeps the center truly centered */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3 py-2">
            {/* Left: logo */}
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20"
            >
              {/* Replace with your logo component/image */}
              <span className="text-white/90">✦</span>
            </Link>

            {/* Center: nav — stays centered regardless of left/right widths */}
            <nav className="justify-self-center">
              <ul className="flex items-center gap-8 text-sm font-medium">
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Cars
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Sponsors
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right: CTA */}
            <div className="justify-self-end">
              <Link href="/recruitment">
                <button
                  className="h-9 rounded-full bg-white/15 px-4 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 backdrop-blur-sm hover:bg-white/25 transition-colors"
                >
                  Join Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
