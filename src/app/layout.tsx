import type { Metadata } from "next";
import type { ReactNode } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import "./map-interface.css";
import { SiteHeader } from "@/components/site-header";
import { LanguageProvider } from "@/context/language-context";

export const metadata: Metadata = {
  title: {
    default: "AnalogX — Planetary Analog Discovery Engine",
    template: "AnalogX · %s",
  },
  description: "Arquitectura de datos científicos para el estudio de análogos planetarios.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <a className="skip-link" href="#main-content">Saltar al contenido</a>
          <SiteHeader />
          <div id="main-content">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
