"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";

const links = [
  { href: "/explore", label: "Explorar", icon: "explore" },
  { href: "/compare", label: "Comparar", icon: "compare" },
  { href: "/methodology", label: "Metodología", icon: "science" },
  { href: "/findings", label: "Hallazgos", icon: "book" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  return <header className="site-header">
    <Link className="brand" href="/explore" aria-label="AnalogX, inicio">
      <svg className="brand-mark" width="44" height="32" viewBox="0 0 44 32" fill="none" aria-hidden="true"><path d="m2 27 11-15 7 8L30 5l12 22" stroke="#b09aff" strokeWidth="2" /><path d="m9 27 11-7 6 4 9-6" stroke="#8271df" strokeWidth="2" /><circle cx="32" cy="10" r="9" stroke="#6650af" strokeDasharray="21 40" /></svg>
      <span className="brand-name">Analog<span>X</span></span>
      <span className="brand-description">Planetary Analog<br />Discovery Engine</span>
    </Link>
    <nav className="main-nav" aria-label="Navegación principal">{links.map(link => <Link key={link.href} href={link.href} className={pathname === link.href ? "nav-link active" : "nav-link"} aria-current={pathname === link.href ? "page" : undefined}><Icon name={link.icon} size={17} /><span>{link.label}</span></Link>)}</nav>
    <div className="project-tag"><span className="orbit-symbol">✦</span><span>SPACE APPS<span className="project-year">PROYECTO · 2026</span></span></div>
  </header>;
}
