"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="AnalogX, volver al inicio">
        <svg
          className="brand-mark"
          width="44"
          height="32"
          viewBox="0 0 44 32"
          fill="none"
          aria-hidden="true"
        >
          <path d="m2 27 11-15 7 8L30 5l12 22" stroke="#b09aff" strokeWidth="2" />
          <path d="m9 27 11-7 6 4 9-6" stroke="#8271df" strokeWidth="2" />
          <circle cx="32" cy="10" r="9" stroke="#6650af" strokeDasharray="21 40" />
        </svg>
        <span className="brand-name">
          Analog<span>X</span>
        </span>
        <span className="brand-description">
          Planetary Analog
          <br />
          Discovery Engine
        </span>
      </Link>

      {!isHome && (
        <div className="header-nav-center">
          <Link href="/" className="header-back-link">
            <span className="back-arrow">←</span>
            <span>Volver al Inicio</span>
          </Link>
          {pathname === "/earth" && (
            <span className="header-body-badge earth-header-badge">
              🌍 VISTA DE LA TIERRA 360°
            </span>
          )}
        </div>
      )}

      <div className="project-tag">
        <span className="orbit-symbol">✦</span>
        <span>
          NASA SPACE APPS
          <span className="project-year">PROYECTO · 2026</span>
        </span>
      </div>
    </header>
  );
}
