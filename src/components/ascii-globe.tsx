"use client";

import { useEffect, useRef, useState } from "react";

interface AsciiGlobeProps {
  size?: number;
}

export function AsciiGlobe({ size = 520 }: AsciiGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const dragRef = useRef<{ isDragging: boolean; startX: number; lastRotation: number; velocity: number }>({
    isDragging: false,
    startX: 0,
    lastRotation: 0,
    velocity: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    // Rotación inicial orientada hacia Sudamérica y Bolivia (-68° lon)
    let rotation = -0.55; 
    const tilt = 0.28; // Inclinación axial natural de ~16°

    const rasterW = 1440;
    const rasterH = 720;
    let landRaster: Uint8ClampedArray | null = null;

    // Rasterizador offscreen de GeoJSON con soporte total de Polígonos y MultiPolígonos
    async function loadGeography() {
      try {
        const [countriesRes, landRes] = await Promise.all([
          fetch("/world-countries-110m.json"),
          fetch("/world-land-110m.json"),
        ]);

        if (!countriesRes.ok || !landRes.ok) return;

        const countriesData = await countriesRes.json();
        const landData = await landRes.json();

        const offCanvas = document.createElement("canvas");
        offCanvas.width = rasterW;
        offCanvas.height = rasterH;
        const offCtx = offCanvas.getContext("2d");
        if (!offCtx) return;

        offCtx.fillStyle = "#000000";
        offCtx.fillRect(0, 0, rasterW, rasterH);

        // Helper para dibujar todos los polígonos de una FeatureCollection sin omitir anillos
        const renderFeatures = (features: any[], mode: "fill" | "stroke") => {
          for (const feat of features) {
            const geom = feat.geometry;
            if (!geom) continue;
            const polys =
              geom.type === "Polygon"
                ? [geom.coordinates]
                : geom.type === "MultiPolygon"
                ? geom.coordinates
                : [];

            for (const poly of polys) {
              if (!Array.isArray(poly) || poly.length === 0) continue;
              offCtx.beginPath();
              for (const ring of poly) {
                if (!Array.isArray(ring) || ring.length < 3) continue;
                for (let i = 0; i < ring.length; i++) {
                  const pt = ring[i];
                  if (!pt) continue;
                  const x = ((pt[0] + 180) / 360) * rasterW;
                  const y = ((90 - pt[1]) / 180) * rasterH;
                  if (i === 0) offCtx.moveTo(x, y);
                  else offCtx.lineTo(x, y);
                }
                offCtx.closePath();
              }
              if (mode === "fill") {
                offCtx.fill("evenodd");
              } else {
                offCtx.stroke();
              }
            }
          }
        };

        // 1. Rellenar masa continental en Canal Rojo (255)
        offCtx.fillStyle = "rgb(255, 0, 0)";
        renderFeatures(landData.features, "fill");

        // 2. Trazar fronteras de países en Canal Verde (255)
        offCtx.strokeStyle = "rgb(0, 255, 0)";
        offCtx.lineWidth = 1.4;
        renderFeatures(countriesData.features, "stroke");

        // 3. Trazar costas en Canal Azul (255)
        offCtx.strokeStyle = "rgb(0, 0, 255)";
        offCtx.lineWidth = 2.0;
        renderFeatures(landData.features, "stroke");

        landRaster = offCtx.getImageData(0, 0, rasterW, rasterH).data;
        setIsReady(true);
      } catch (err) {
        console.warn("No se pudo cargar el mapa geográfico vectorial:", err);
      }
    }

    loadGeography();

    // Caracteres ASCII de alta fidelidad Vana / NASA
    const landChars = ["@", "#", "8", "%", "&", "X", "0", "W"];
    const borderChars = ["+", "|", ":", "·", "*", "/"];

    let pulseTime = 0;

    const render = () => {
      pulseTime += 0.04;

      // Inercia de arrastre o rotación automática hacia el Este
      if (!dragRef.current.isDragging) {
        if (Math.abs(dragRef.current.velocity) > 0.0001) {
          rotation += dragRef.current.velocity;
          dragRef.current.velocity *= 0.94; // Amortiguación
        } else {
          rotation += 0.004; // Rotación lenta y cinematográfica
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = (Math.min(cx, cy) - 24) * 0.94;

      // 1. Resplandor atmosférico del limbo terrestre (Atmospheric Halo)
      const haloGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.15);
      haloGrad.addColorStop(0, "rgba(65, 65, 252, 0.0)");
      haloGrad.addColorStop(0.75, "rgba(65, 65, 252, 0.12)");
      haloGrad.addColorStop(0.95, "rgba(139, 139, 254, 0.25)");
      haloGrad.addColorStop(1, "rgba(65, 65, 252, 0.0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // Círculo base del horizonte cósmico
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(65, 65, 252, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Configuración de la cuadrícula de caracteres
      const charW = 5.2;
      const charH = 8.5;

      ctx.font = '700 8.5px "JetBrains Mono", ui-monospace, Menlo, monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      for (let py = -radius; py <= radius; py += charH) {
        const rowRadius = Math.sqrt(radius * radius - py * py);
        if (isNaN(rowRadius)) continue;

        for (let px = -rowRadius; px <= rowRadius; px += charW) {
          const zSq = radius * radius - px * px - py * py;
          if (zSq <= 0) continue;
          const pz = Math.sqrt(zSq);

          // Coordenadas de pantalla: px hacia la derecha (+X), py hacia abajo (Canvas)
          // En espacio 3D terrestre: +Y es Norte (arriba, py negativo), +X es Este, +Z es frontal
          const X_screen = px;
          const Y_screen = -py; // Invertir py: parte superior de pantalla es Norte
          const Z_screen = pz;

          // Inclinación axial terrestre
          const Y_tilted = Y_screen * cosTilt - Z_screen * sinTilt;
          const Z_tilted = Y_screen * sinTilt + Z_screen * cosTilt;
          const X_tilted = X_screen;

          if (Z_tilted <= 0) continue; // Descartar hemisferio oculto posterior

          // Conversión a coordenadas geográficas (Lat/Lon)
          // lat positiva = Norte, lat negativa = Sur
          const lat = (Math.asin(Math.max(-1, Math.min(1, Y_tilted / radius))) * 180) / Math.PI;
          let lon = (Math.atan2(X_tilted, Z_tilted) * 180) / Math.PI - (rotation * 180) / Math.PI;
          while (lon < -180) lon += 360;
          while (lon > 180) lon -= 360;

          const screenX = cx + px;
          const screenY = cy + py;

          // Factor de profundidad (1 en el centro hacia el observador, 0 en el borde)
          const depth = Math.max(0, Math.min(1, Z_tilted / radius));

          let isLand = false;
          let isBorder = false;
          let isCoast = false;

          if (landRaster) {
            const u = Math.min(rasterW - 1, Math.max(0, Math.floor(((lon + 180) / 360) * rasterW)));
            const v = Math.min(rasterH - 1, Math.max(0, Math.floor(((90 - lat) / 180) * rasterH)));
            const idx = (v * rasterW + u) * 4;

            isLand = (landRaster[idx] ?? 0) > 40;       // Canal Rojo: Tierra
            isBorder = (landRaster[idx + 1] ?? 0) > 40; // Canal Verde: Fronteras de países
            isCoast = (landRaster[idx + 2] ?? 0) > 40;  // Canal Azul: Costas
          } else {
            // Fallback rápido mientras carga el GeoJSON
            isLand = Math.abs(lat) < 55 && Math.sin(lat * 0.1) * Math.cos(lon * 0.1) > 0.2;
          }

          if (isCoast || isBorder) {
            // =========================================================
            // COSTAS Y FRONTERAS: MÁXIMO CONTRASTE Y BRILLO (Periwinkle / Blanco Suave)
            // =========================================================
            const charIdx = Math.floor(Math.abs(Math.sin(lat * 3 + lon * 2)) * borderChars.length);
            const char = borderChars[charIdx % borderChars.length] ?? "+";
            const alpha = 0.55 + depth * 0.45;
            ctx.fillStyle = `rgba(180, 205, 255, ${alpha.toFixed(2)})`;
            ctx.fillText(char, screenX, screenY);
          } else if (isLand) {
            // =========================================================
            // MASA CONTINENTAL INTERNA: AZUL COBALTO PROFUNDO (Vana Cobalt Pulse)
            // =========================================================
            const charIdx = Math.floor(Math.abs(Math.sin(lat * 5 + lon * 7)) * landChars.length);
            const char = landChars[charIdx % landChars.length] ?? "#";
            const alpha = 0.35 + depth * 0.65;
            ctx.fillStyle = `rgba(65, 65, 252, ${alpha.toFixed(2)})`;
            ctx.fillText(char, screenX, screenY);
          } else {
            // =========================================================
            // OCÉANOS Y RETÍCULA ORBITAL DE DATOS
            // =========================================================
            const isEquator = Math.abs(lat) < 1.2;
            const isTropic = Math.abs(Math.abs(lat) - 23.5) < 1.2;

            if (isEquator || isTropic) {
              const alpha = 0.16 + depth * 0.14;
              ctx.fillStyle = `rgba(139, 139, 254, ${alpha.toFixed(2)})`;
              ctx.fillText("·", screenX, screenY);
            } else if ((Math.floor(px / charW) + Math.floor(py / charH)) % 2 === 0) {
              const alpha = 0.04 + depth * 0.08;
              ctx.fillStyle = `rgba(65, 65, 252, ${alpha.toFixed(2)})`;
              ctx.fillText("·", screenX, screenY);
            }
          }
        }
      }

      // =========================================================
      // MARCADOR HUD: BASE ANALOGX (UYUNI / LÍPEZ / CAL-VAL BOLIVIA)
      // Coordenadas reales: Lat -20.35° S, Lon -68.55° O
      // =========================================================
      const baseLat = -20.35;
      const baseLon = -68.55;

      const angleRad = ((baseLon + (rotation * 180) / Math.PI) * Math.PI) / 180;
      const latRad = (baseLat * Math.PI) / 180;

      const X_tilted = radius * Math.cos(latRad) * Math.sin(angleRad);
      const Y_tilted = radius * Math.sin(latRad);
      const Z_tilted = radius * Math.cos(latRad) * Math.cos(angleRad);

      const Y_screen = Y_tilted * cosTilt + Z_tilted * sinTilt;
      const Z_screen = -Y_tilted * sinTilt + Z_tilted * cosTilt;
      const X_screen = X_tilted;

      const bScreenX = cx + X_screen;
      const bScreenY = cy - Y_screen;
      const bDepth = Z_screen;

      // Mostrar el puntero cuando Bolivia esté en el hemisferio visible
      if (bDepth > 6) {
        const markerAlpha = Math.min(1, bDepth / 35);

        // 1. Pulso radial expansivo (Ping)
        const pulseR = 5 + (Math.sin(pulseTime * 3) + 1) * 4;
        ctx.beginPath();
        ctx.arc(bScreenX, bScreenY, pulseR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(127, 213, 121, ${(0.6 * markerAlpha).toFixed(2)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // 2. Punto central verde lima (Lime Beacon)
        ctx.beginPath();
        ctx.arc(bScreenX, bScreenY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(127, 213, 121, ${markerAlpha.toFixed(2)})`;
        ctx.shadowColor = "#7fd579";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // 3. Puntero técnico diagonal hacia la tarjeta HUD
        const calloutX = bScreenX > cx ? bScreenX + 32 : bScreenX - 32;
        const calloutY = bScreenY - 26;

        ctx.beginPath();
        ctx.moveTo(bScreenX, bScreenY);
        ctx.lineTo(calloutX, calloutY);
        ctx.lineTo(calloutX + (bScreenX > cx ? 65 : -65), calloutY);
        ctx.strokeStyle = `rgba(127, 213, 121, ${(0.7 * markerAlpha).toFixed(2)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // 4. Etiqueta técnica de coordenadas
        ctx.fillStyle = `rgba(127, 213, 121, ${markerAlpha.toFixed(2)})`;
        ctx.font = '700 9px "JetBrains Mono", monospace';
        ctx.textAlign = bScreenX > cx ? "left" : "right";
        ctx.fillText("✦ BASE ANALOGX (UYUNI)", calloutX + (bScreenX > cx ? 4 : -4), calloutY - 6);

        ctx.fillStyle = `rgba(200, 200, 200, ${(0.8 * markerAlpha).toFixed(2)})`;
        ctx.font = '500 7.5px "JetBrains Mono", monospace';
        ctx.fillText("20.35° S · 68.55° O · CAL/VAL", calloutX + (bScreenX > cx ? 4 : -4), calloutY + 8);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // =========================================================
    // INTERACCIÓN: ARRASTRAR CON RATÓN PARA ROTAR EL PLANETA
    // =========================================================
    const handleMouseDown = (e: MouseEvent) => {
      dragRef.current.isDragging = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.lastRotation = rotation;
      dragRef.current.velocity = 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDragging) return;
      const deltaX = e.clientX - dragRef.current.startX;
      const newRotation = dragRef.current.lastRotation - (deltaX * 0.005);
      dragRef.current.velocity = (newRotation - rotation) * 0.5;
      rotation = newRotation;
    };

    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
    };

    const canvasEl = canvasRef.current;
    if (canvasEl) {
      canvasEl.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (canvasEl) {
        canvasEl.removeEventListener("mousedown", handleMouseDown);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="ascii-globe-wrapper" style={{ position: "relative", width: size, height: size, cursor: "grab" }}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-label="Globo 3D interactivo de la Tierra con datos continentales y fronteras de países"
      />
      {!isReady && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 9.5,
            fontFamily: "monospace",
            color: "rgba(139, 139, 254, 0.6)",
            letterSpacing: 1,
          }}
        >
          CALIBRANDO CARTOGRAFÍA VECTORIAL…
        </div>
      )}
    </div>
  );
}
