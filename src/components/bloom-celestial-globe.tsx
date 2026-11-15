"use client";

interface BloomCelestialGlobeProps {
  body: "Moon" | "Mars";
}

export function BloomCelestialGlobe({ body }: BloomCelestialGlobeProps) {
  const isMoon = body === "Moon";
  const texture = isMoon ? "/textures/moon_1024.jpg" : "/textures/mars_1024.jpg";

  return (
    <div className="bloom-celestial-bg" aria-hidden="true">
      <div className="bloom-globe-wrapper">
        {/* Orbital trajectory dashed ring */}
        <div className="bloom-orbit-rings" />

        {/* Corona atmospheric glow */}
        <div
          className={`bloom-globe-corona ${
            isMoon ? "moon-corona" : "mars-corona"
          }`}
        />

        {/* 3D Celestial Body Sphere */}
        <div className="bloom-globe-sphere">
          {/* Rotating NASA Texture */}
          <div
            className="bloom-globe-texture"
            style={{
              backgroundImage: `url(${texture})`,
            }}
          />

          {/* Spherical lighting & day/night terminator */}
          <div className="bloom-globe-shadow" />

          {/* Atmospheric limb Fresnel rim */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              boxShadow: isMoon
                ? "inset 0 0 45px rgba(139, 139, 254, 0.45)"
                : "inset 0 0 50px rgba(251, 146, 60, 0.5)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Technical telemetry overlay badge */}
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            right: "12%",
            padding: "0.4rem 0.85rem",
            background: "rgba(10, 12, 18, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "6px",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.6875rem",
            color: isMoon ? "#8b8bfe" : "#fca5a5",
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: isMoon ? "#8b8bfe" : "#f87171",
              boxShadow: isMoon ? "0 0 8px #8b8bfe" : "0 0 8px #f87171",
            }}
          />
          {isMoon
            ? "NASA LRO LOLA // ÓRBITA LUNAR ACTIVA"
            : "NASA MRO HiRISE // TELEMETRÍA MARCIANA"}
        </div>
      </div>
    </div>
  );
}

