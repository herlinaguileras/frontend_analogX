import type { Metadata } from "next";
import type { ReactNode } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import "./map-interface.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "AnalogX — Planetary Analog Discovery Engine",
  description: "Arquitectura de datos científicos para el estudio de análogos planetarios.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body><a className="skip-link" href="#main-content">Saltar al contenido</a><SiteHeader /><div id="main-content">{children}</div></body>
    </html>
  );
}
