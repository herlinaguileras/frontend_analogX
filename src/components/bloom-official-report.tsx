"use client";

import {
  getSpaceProfile,
  type GeologyComparisonItem,
} from "@/lib/analog-science-dossier";
import { analogTranslationsEn, type SupportedLang } from "@/lib/translations";

interface BloomOfficialReportProps {
  analogs: GeologyComparisonItem[];
  activeAnalog: GeologyComparisonItem | null;
  onSelectAnalog: (id: string) => void;
  body: "Moon" | "Mars";
  roleFilter: string;
  lang: SupportedLang;
}

const MISSION_OBJECTIVE_TITLES: Record<string, { es: string; en: string }> = {
  all: {
    es: "Exploración Integral y Caracterización de Misión",
    en: "Comprehensive Exploration & Mission Characterization",
  },
  landing: {
    es: "Sitios de Aterrizaje Seguro y Calibración Altimétrica (TRN / Altimetría Láser)",
    en: "Safe Landing Sites & Altimeter Calibration (TRN / Laser Altimetry)",
  },
  base: {
    es: "Base Lunar Permanente y Blindaje contra Radiación Cósmica",
    en: "Permanent Lunar Base Siting & Cosmic Radiation Shielding",
  },
  isru: {
    es: "Trampas de Hielo Criogénico y Minería de Volátiles (ISRU Polar)",
    en: "Cryogenic Ice Traps & Volatiles Mining (Polar ISRU)",
  },
  caves: {
    es: "Exploración Subterránea y Claraboyas Volcánicas (Tubos de Lava)",
    en: "Subterranean Exploration & Volcanic Skylights (Lava Tubes)",
  },
  mobility: {
    es: "Terradinámica de Ruedas y Movilidad de Rovers",
    en: "Wheel Terradynamics & Rover Mobility",
  },
  astrobiology: {
    es: "Astrobiología y Sílice Hidrotermal (Biofirmas en Cuencas Antiguas)",
    en: "Astrobiology & Hydrothermal Silica (Biosignatures in Ancient Basins)",
  },
};

export function BloomOfficialReport({
  analogs,
  activeAnalog,
  onSelectAnalog,
  body,
  roleFilter,
  lang,
}: BloomOfficialReportProps) {
  const isMoon = body === "Moon";
  const isEn = lang === "en";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (!activeAnalog) {
    return null;
  }

  const spaceProfile = getSpaceProfile(activeAnalog, body);
  if (!spaceProfile) {
    return null;
  }

  const trans = isEn ? analogTranslationsEn[activeAnalog.id] : null;
  const useLegacySpaceTrans = Boolean(
    trans && (activeAnalog.missionTarget !== "Both" || spaceProfile.body === activeAnalog.spaceTargetBody)
  );

  const solidAnalogy = trans?.solidAnalogy ?? activeAnalog.solidAnalogy;
  const analogyLimits = trans?.analogyLimitations ?? activeAnalog.analogyLimitations;
  const operationalVal = trans?.operationalValue ?? activeAnalog.operationalValue;
  const metrics = trans?.metrics ?? activeAnalog.metrics;

  const earthGeologySummary = trans?.earthGeologySummary ?? activeAnalog.earthGeologySummary;
  const earthMineralogy = trans?.earthMineralogy ?? activeAnalog.earthMineralogy;
  const spaceGeologySummary = useLegacySpaceTrans
    ? (trans?.spaceGeologySummary ?? spaceProfile.geologySummary)
    : spaceProfile.geologySummary;
  const spaceMineralogy = useLegacySpaceTrans
    ? (trans?.spaceMineralogy ?? spaceProfile.mineralogy)
    : spaceProfile.mineralogy;

  const currentObjectiveName =
    MISSION_OBJECTIVE_TITLES[roleFilter]?.[lang] ??
    (isEn ? "Planetary Exploration Objective" : "Objetivo de Exploración Planetaria");

  return (
    <section id="ficha-tecnica-oficial" className="bloom-official-report">
      {/* Official Certificate Header */}
      <div className="bloom-report-header">
        <div className="bloom-report-title">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.3rem 0.75rem",
              borderRadius: "4px",
              background: "rgba(127, 213, 121, 0.12)",
              border: "1px solid rgba(127, 213, 121, 0.3)",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6875rem",
              color: "#7fd579",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            <span>●</span>
            <span>
              {isEn
                ? "OFFICIAL TECHNICAL DOSSIER · NASA SPACE APPS CHALLENGE 2026"
                : "FICHA TÉCNICA CIENTÍFICA OFICIAL · NASA SPACE APPS CHALLENGE 2026"}
            </span>
          </div>

          <h3 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0 0 0.5rem" }}>
            {isEn
              ? `Planetary Analog Qualification Sheet: ${activeAnalog.name}`
              : `Ficha Técnica de Calificación de Análogo: ${activeAnalog.name}`}
          </h3>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "rgba(255,255,255,0.72)",
              margin: 0,
              maxWidth: "880px",
              lineHeight: "1.5",
            }}
          >
            {isEn
              ? `Scientific audit and operational suitability report for the objective: "${currentObjectiveName}" in ${
                  isMoon ? "the Moon (Artemis Program)" : "Planet Mars (Mars 2026)"
                }. Verified via correlated orbital and terrestrial satellite datasets.`
              : `Auditoría científica y dictamen de idoneidad operacional para el objetivo: "${currentObjectiveName}" en ${
                  isMoon ? "la Luna (Programa Artemis)" : "el Planeta Marte (Marte 2026)"
                }. Certificado mediante correlación de datos satelitales orbitales y terrestres.`}
          </p>
        </div>

        <button type="button" onClick={handlePrint} className="bloom-print-btn">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          <span>{isEn ? "Export / Print Dossier (PDF)" : "Exportar / Imprimir Ficha Técnica (PDF)"}</span>
        </button>
      </div>

      {/* Switcher if multiple analogs match this single objective */}
      {analogs.length > 1 && (
        <div
          style={{
            margin: "1.75rem 0 1rem",
            padding: "1rem 1.25rem",
            borderRadius: "0.75rem",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {isEn
              ? `Select analog to view full technical sheet (${analogs.length} matches):`
              : `Selecciona el análogo para ver su ficha técnica completa (${analogs.length} resultados):`}
          </span>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {analogs.map((item) => {
              const isSelected = item.id === activeAnalog.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectAnalog(item.id)}
                  style={{
                    padding: "0.4rem 0.85rem",
                    borderRadius: "9999px",
                    border: isSelected
                      ? "1px solid rgba(139, 139, 254, 0.8)"
                      : "1px solid rgba(255, 255, 255, 0.12)",
                    background: isSelected ? "rgba(65, 65, 252, 0.3)" : "rgba(255, 255, 255, 0.05)",
                    color: isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.75)",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  <strong>{item.name}</strong>
                  <span style={{ color: "#7fd579", fontFamily: "var(--font-mono, monospace)" }}>
                    {item.fidelityScore}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Identifiers Comparison Grid: Earth Site vs Planetary Target */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
          margin: "2rem 0",
        }}
      >
        {/* Earth Site ID Card */}
        <div
          className="liquid-glass"
          style={{
            padding: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderLeft: "3px solid #7fd579",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.6875rem",
                color: "#7fd579",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {isEn ? "1. AUDITED EARTH ANALOG SITE" : "1. SITIO ANÁLOGO TERRESTRE AUDITADO"}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                background: "rgba(127, 213, 121, 0.12)",
                color: "#7fd579",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              {activeAnalog.country}
            </span>
          </div>

          <div>
            <h4 style={{ fontSize: "1.375rem", fontWeight: 700, margin: "0 0 0.35rem", color: "#fff" }}>
              {activeAnalog.name}
            </h4>
            <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)" }}>
              {activeAnalog.region} · {isEn ? "Elevation: " : "Elevación: "}
              <strong>{activeAnalog.elevation}</strong>
            </div>
          </div>

          <div
            style={{
              padding: "0.85rem",
              borderRadius: "0.5rem",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "0.8125rem",
              lineHeight: "1.5",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.6875rem", marginBottom: "0.25rem", textTransform: "uppercase" }}>
              {isEn ? "Terrestrial Lithology & Geology" : "Litología y Geología Terrestre"}
            </div>
            <div>{earthGeologySummary}</div>
            <div style={{ marginTop: "0.5rem", color: "#7fd579", fontSize: "0.75rem" }}>
              <strong>{isEn ? "Mineralogy: " : "Mineralogía: "}</strong>
              {earthMineralogy}
            </div>
          </div>
        </div>

        {/* Space Target ID Card */}
        <div
          className="liquid-glass"
          style={{
            padding: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderLeft: "3px solid #8b8bfe",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.6875rem",
                color: "#8b8bfe",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {isEn ? "2. EQUIVALENT SPACE TARGET" : "2. OBJETIVO ESPACIAL EQUIVALENTE"}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                background: "rgba(65, 65, 252, 0.2)",
                color: "#8b8bfe",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              {isMoon ? "MOON // ARTEMIS" : "MARS // 2026"}
            </span>
          </div>

          <div>
            <h4 style={{ fontSize: "1.375rem", fontWeight: 700, margin: "0 0 0.35rem", color: "#fff" }}>
              {spaceProfile.targetName}
            </h4>
            <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)" }}>
              {isEn ? "Coordinates: " : "Coordenadas: "}
              <strong>{spaceProfile.coordinates}</strong>
            </div>
          </div>

          <div
            style={{
              padding: "0.85rem",
              borderRadius: "0.5rem",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "0.8125rem",
              lineHeight: "1.5",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.6875rem", marginBottom: "0.25rem", textTransform: "uppercase" }}>
              {isEn ? "Planetary Terrain & Surface Regime" : "Régimen Geológico Superficial"}
            </div>
            <div>{spaceGeologySummary}</div>
            <div style={{ marginTop: "0.5rem", color: "#8b8bfe", fontSize: "0.75rem" }}>
              <strong>{isEn ? "Planetary Composition: " : "Composición Planetaria: "}</strong>
              {spaceMineralogy}
            </div>
          </div>
        </div>
      </div>

      {/* Global Fidelity Score Bar */}
      <div
        className="liquid-glass"
        style={{
          padding: "1.25rem 1.75rem",
          margin: "1.5rem 0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6875rem",
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {isEn ? "CERTIFIED ANALYTICAL FIDELITY" : "FIDELIDAD ANALÍTICA CERTIFICADA"}
          </span>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#7fd579", fontFamily: "var(--font-mono, monospace)" }}>
            {activeAnalog.fidelityScore}%{" "}
            <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>
              {isEn ? "(High scientific correlation)" : "(Alta correlación científica)"}
            </span>
          </div>
        </div>

        <div style={{ flex: "1 1 280px", maxWidth: "420px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.35rem", color: "rgba(255,255,255,0.6)" }}>
            <span>{isEn ? "Fidelity Match" : "Alineación de Correspondencia"}</span>
            <span>{activeAnalog.fidelityScore} / 100</span>
          </div>
          <div style={{ width: "100%", height: "8px", borderRadius: "9999px", background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
            <div
              style={{
                width: `${activeAnalog.fidelityScore}%`,
                height: "100%",
                borderRadius: "9999px",
                background: "linear-gradient(90deg, #4141fc 0%, #7fd579 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Explicit Physical Parameters Table (Only for this specific active analog) */}
      <div style={{ margin: "2.5rem 0" }}>
        <div style={{ marginBottom: "1rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6875rem",
              color: "#8b8bfe",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {isEn ? "EXPLICIT DATA AUDIT" : "AUDITORÍA EXPLÍCITA DE VARIABLES"}
          </span>
          <h4 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#fff", margin: "0.25rem 0 0" }}>
            {isEn
              ? `Comparative Physical Variables for ${activeAnalog.name}`
              : `Variables Físicas Comparativas Auditadas de ${activeAnalog.name}`}
          </h4>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="bloom-metrics-table">
            <thead>
              <tr>
                <th style={{ width: "26%" }}>{isEn ? "Physical Variable" : "Variable Física Auditada"}</th>
                <th style={{ width: "32%" }}>{isEn ? `Earth Value (${activeAnalog.name})` : `Valor en Tierra (${activeAnalog.name})`}</th>
                <th style={{ width: "32%" }}>{isEn ? `Space Value (${spaceProfile.targetName})` : `Valor en ${spaceProfile.targetName}`}</th>
                <th style={{ width: "10%" }}>{isEn ? "Compatibility" : "Compatibilidad"}</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, idx) => (
                <tr key={idx}>
                  <td>
                    <strong style={{ color: "#fff" }}>{m.variable}</strong>
                  </td>
                  <td style={{ color: "rgba(255,255,255,0.85)" }}>{m.earthValue}</td>
                  <td style={{ color: "rgba(255,255,255,0.85)" }}>{m.spaceValue}</td>
                  <td>
                    <span className={`bloom-tag-compat ${m.compatibility}`}>
                      {m.compatibility}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verified Satellite Sensors & Scientific Citations */}
      <div
        className="liquid-glass"
        style={{
          padding: "1.5rem 1.75rem",
          margin: "2rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.6875rem",
            color: "#7fd579",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {isEn
            ? "VERIFIED SATELLITE MISSIONS & CALIBRATION DATASETS"
            : "MISIONES ESPACIALES Y SENSORES SATELITALES VERIFICADOS"}
        </span>

        <div className="bloom-dataset-chips">
          {activeAnalog.auditedDatasets.map((ds, idx) => (
            <span key={idx} className="bloom-dataset-chip">
              ✓ {ds}
            </span>
          ))}
        </div>

        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", lineHeight: "1.5" }}>
          <strong>{isEn ? "Peer-Reviewed References & NASA Validation Studies: " : "Estudios de Validación y Referencias Científicas: "}</strong>
          {activeAnalog.officialCitations.join(" · ")}
        </div>
      </div>

      {/* Deep Scientific Analysis & Operational Mitigation */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          margin: "2.5rem 0 1rem",
        }}
      >
        {/* Solid Analogy Justification */}
        <div
          className="liquid-glass"
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            borderTop: "3px solid #7fd579",
          }}
        >
          <h5 style={{ margin: 0, fontSize: "0.875rem", color: "#7fd579", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            ✓ {isEn ? "Key Analog Equivalence" : "Correspondencia Analógica Sólida"}
          </h5>
          <ul className="bloom-point-list">
            {solidAnalogy.map((point, idx) => (
              <li key={idx} style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8125rem", lineHeight: "1.5" }}>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Known Limitations */}
        <div
          className="liquid-glass"
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            borderTop: "3px solid #fbbf24",
          }}
        >
          <h5 style={{ margin: 0, fontSize: "0.875rem", color: "#fbbf24", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            ⚠ {isEn ? "Recognized Limitations" : "Limitaciones Físicas del Análogo"}
          </h5>
          <ul className="bloom-point-list">
            {analogyLimits.map((point, idx) => (
              <li key={idx} style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8125rem", lineHeight: "1.5" }}>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Mission Operational Mitigation */}
        <div
          className="liquid-glass"
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            borderTop: "3px solid #8b8bfe",
          }}
        >
          <h5 style={{ margin: 0, fontSize: "0.875rem", color: "#8b8bfe", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            ★ {isEn ? "Flight Operational Protocol" : "Protocolo de Prueba Operacional"}
          </h5>
          <ul className="bloom-point-list">
            {operationalVal.map((point, idx) => (
              <li key={idx} style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8125rem", lineHeight: "1.5" }}>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
