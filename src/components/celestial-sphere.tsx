"use client";

import { useState, useRef } from "react";

interface CelestialSphereProps {
  body: "moon" | "mars";
  size?: number;
  isHovered?: boolean;
}

export function CelestialSphere({ body, size = 220, isHovered = false }: CelestialSphereProps) {
  const [internalHover, setInternalHover] = useState(false);
  const activeHover = isHovered || internalHover;

  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (x / (rect.width / 2)) * 8,
      y: -(y / (rect.height / 2)) * 8,
    });
  }

  function handleMouseLeave() {
    setInternalHover(false);
    setTilt({ x: 0, y: 0 });
  }

  const textureUrl = body === "moon" ? "/textures/moon_1024.jpg" : "/textures/mars_1024.jpg";

  return (
    <div
      ref={containerRef}
      className={`celestial-sphere-stage ${body}-sphere ${activeHover ? "hovered" : ""}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `perspective(700px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
      }}
      onMouseEnter={() => setInternalHover(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`Esfera 3D interactiva de ${body === "moon" ? "La Luna" : "Marte"}`}
    >
      {/* Resplandor orbital / Corona lumínica cuando se pasa el cursor */}
      <div className={`celestial-corona ${body}-corona`} />

      {/* Esfera planetaria con recorte circular */}
      <div className="celestial-globe-body">
        {/* Capa de textura fotográfica de la NASA con rotación 3D */}
        <div
          className="celestial-texture-layer"
          style={{
            backgroundImage: `url(${textureUrl})`,
            animationPlayState: activeHover ? "running" : "paused",
          }}
        />

        {/* Relieve de iluminación 3D: Gradiente de luz solar y sombra terminadora */}
        <div className="celestial-lighting-overlay" />

        {/* Bisel interno de atmósfera y dispersión de luz (Fresnel rim) */}
        <div className={`celestial-fresnel-rim ${body}-rim`} />
      </div>

      {/* Indicador de estado */}
      <div className="celestial-status-indicator">
        <span className="status-dot" />
        <span className="status-text">{activeHover ? "Rotación 3D Activa" : "Pasa el cursor para girar"}</span>
      </div>
    </div>
  );
}

