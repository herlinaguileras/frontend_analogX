"use client";

import type { ProbeEvaluateResponse } from "@/lib/api";
import { useLanguage } from "@/context/language-context";

interface CustomProbeDossierProps {
  probeResult: ProbeEvaluateResponse;
  loading?: boolean;
  onClose: () => void;
  onOpenComparator?: (targetId: string) => void;
}

export function CustomProbeDossier({
  probeResult,
  loading = false,
  onClose,
  onOpenComparator,
}: CustomProbeDossierProps) {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const {
    coordinates,
    surface_type,
    geographic_zone,
    biome_classification,
    fidelity_index,
    confidence_level,
    matched_target,
    subsystems,
    gravity_comparison,
    atmospheric_comparison,
    scientific_limitations,
    epistemological_audit,
    recommended_rehearsal,
  } = probeResult;

  const isOcean = surface_type === "ocean";
  const scoreColor = isOcean
    ? "#ef4444"
    : fidelity_index >= 80
    ? "#38bdf8"
    : fidelity_index >= 45
    ? "#eab308"
    : "#ef4444";

  return (
    <div className="custom-probe-dossier-card liquid-glass animate-in fade-in zoom-in-95 duration-200">
      {/* Header Bar */}
      <div className="probe-dossier-header">
        <div className="probe-header-title-group">
          <div className="probe-badge-row">
            <span className="probe-live-badge">
              <span className="probe-live-dot" />
              {isEn ? "ORBITAL PROBE TELEMETRY" : "TELEMETRÍA DE SONDA ORBITAL"}
            </span>
            <span
              className="probe-surface-badge"
              style={{
                borderColor: isOcean ? "rgba(239,68,68,0.5)" : "rgba(56,189,248,0.5)",
                color: isOcean ? "#fca5a5" : "#7dd3fc",
                background: isOcean ? "rgba(239,68,68,0.15)" : "rgba(56,189,248,0.12)",
              }}
            >
              {isOcean
                ? isEn
                  ? "🌊 LIQUID HYDROSPHERE / OCEAN"
                  : "🌊 HIDROSFERA LÍQUIDA / OCÉANO"
                : isEn
                ? "🏔️ CONTINENTAL LITOSPHERE"
                : "🏔️ LITOSFERA CONTINENTAL"}
            </span>
          </div>

          <h3 className="probe-coords-title">{coordinates.formatted}</h3>
          <p className="probe-zone-subtitle">
            {geographic_zone} · <span className="probe-biome-tag">{biome_classification}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="probe-close-btn"
          aria-label={isEn ? "Close Probe" : "Cerrar Sonda"}
          title={isEn ? "Close" : "Cerrar"}
        >
          ✕
        </button>
      </div>

      {loading ? (
        <div className="probe-loading-state">
          <div className="probe-spinner" />
          <p>{isEn ? "Querying NASA Planetary Datasets & LOLA/MOLA Altimetry..." : "Consultando Datasets de la NASA y Altimetría LOLA/MOLA..."}</p>
        </div>
      ) : (
        <div className="probe-dossier-body">
          {/* Main Score & Matched Target Split */}
          <div className="probe-main-metrics-row">
            {/* Circular Fidelity Score Gauge */}
            <div className="probe-score-container" style={{ borderColor: scoreColor }}>
              <div className="probe-score-circle">
                <span className="probe-score-number" style={{ color: scoreColor }}>
                  {fidelity_index.toFixed(1)}%
                </span>
                <span className="probe-score-label">
                  {isEn ? "TWIN FIDELITY" : "FIDELIDAD GEMELA"}
                </span>
              </div>
              <span className="probe-confidence-pill">
                {isEn ? "CONFIDENCE:" : "CONFIANZA:"} {confidence_level.toUpperCase()}
              </span>
            </div>

            {/* Matched Extraterrestrial Target */}
            <div className="probe-matched-target-card">
              <span className="target-card-eyebrow">
                {isEn ? "BEST MATCHING NASA EXTRATERRESTRIAL TARGET" : "MEJOR OBJETIVO EXTRATERRESTRE (NASA)"}
              </span>
              <div className="target-card-content">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={matched_target.target_image}
                  alt={matched_target.name}
                  className="target-thumb-img"
                />
                <div className="target-text-info">
                  <h4>{matched_target.name}</h4>
                  <p className="target-instrument-tag">
                    {matched_target.instrument} · {matched_target.target_coordinates}
                  </p>
                  <span className="target-feature-badge">{matched_target.feature_tag}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subsystems Breakdown (4 Bars) */}
          <div className="probe-subsystems-section">
            <h5 className="subsystem-section-heading">
              {isEn ? "Mission Engineering Subsystem Compatibility" : "Compatibilidad de Subsistemas de Ingeniería Espacial"}
            </h5>
            <div className="probe-subsystems-grid">
              <div className="subsystem-meter-item">
                <div className="meter-label-row">
                  <span>{isEn ? "Rover Mobility (Traction / Shear)" : "Movilidad y Tracción de Rovers"}</span>
                  <strong>{subsystems.rover_mobility.toFixed(0)}%</strong>
                </div>
                <div className="meter-track">
                  <div
                    className="meter-fill"
                    style={{
                      width: `${subsystems.rover_mobility}%`,
                      backgroundColor: isOcean ? "#ef4444" : "#38bdf8",
                    }}
                  />
                </div>
              </div>

              <div className="subsystem-meter-item">
                <div className="meter-label-row">
                  <span>{isEn ? "ISRU Extraction (Water / Regolith)" : "Extracción ISRU (Agua y Volátiles)"}</span>
                  <strong>{subsystems.isru_feasibility.toFixed(0)}%</strong>
                </div>
                <div className="meter-track">
                  <div
                    className="meter-fill"
                    style={{
                      width: `${subsystems.isru_feasibility}%`,
                      backgroundColor: isOcean ? "#ef4444" : "#34d399",
                    }}
                  />
                </div>
              </div>

              <div className="subsystem-meter-item">
                <div className="meter-label-row">
                  <span>{isEn ? "Habitat Radiation Shielding" : "Blindaje de Hábitat Subterráneo"}</span>
                  <strong>{subsystems.habitat_shielding.toFixed(0)}%</strong>
                </div>
                <div className="meter-track">
                  <div
                    className="meter-fill"
                    style={{
                      width: `${subsystems.habitat_shielding}%`,
                      backgroundColor: isOcean ? "#ef4444" : "#c084fc",
                    }}
                  />
                </div>
              </div>

              <div className="subsystem-meter-item">
                <div className="meter-label-row">
                  <span>{isEn ? "Environmental Rigor (Vacuum / Thermal)" : "Rigor Ambiental (Frío y Presión)"}</span>
                  <strong>{subsystems.environmental_rigor.toFixed(0)}%</strong>
                </div>
                <div className="meter-track">
                  <div
                    className="meter-fill"
                    style={{
                      width: `${subsystems.environmental_rigor}%`,
                      backgroundColor: isOcean ? "#ef4444" : "#f59e0b",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Physics Divergence: Gravity & Pressure */}
          <div className="probe-physics-grid">
            <div className="physics-card gravity">
              <h6>{isEn ? "Gravitational Divergence" : "Divergencia Gravitatoria"}</h6>
              <div className="physics-stat-row">
                <span className="stat-earth">
                  {isEn ? "Earth:" : "Tierra:"} <strong>1.00 g</strong> (9,810 N)
                </span>
                <span className="stat-arrow">➔</span>
                <span className="stat-target">
                  {matched_target.body}:{" "}
                  <strong>
                    {gravity_comparison.target_g > 0 ? `${gravity_comparison.target_g.toFixed(2)} g` : "N/A"}
                  </strong>{" "}
                  ({gravity_comparison.rover_mass_1000kg_weight_n.toFixed(0)} N)
                </span>
              </div>
              <p className="physics-notice-text">{gravity_comparison.divergence_notice}</p>
            </div>

            <div className="physics-card pressure">
              <h6>{isEn ? "Atmospheric Pressure Divergence" : "Divergencia de Presión Atmosférica"}</h6>
              <div className="physics-stat-row">
                <span className="stat-earth">
                  {isEn ? "Earth:" : "Tierra:"} <strong>{atmospheric_comparison.earth_pressure_hpa.toFixed(0)} hPa</strong>
                </span>
                <span className="stat-arrow">➔</span>
                <span className="stat-target">
                  {matched_target.body}:{" "}
                  <strong>
                    {atmospheric_comparison.target_pressure_hpa > 0
                      ? `${atmospheric_comparison.target_pressure_hpa} hPa`
                      : isEn
                      ? "0.0 hPa (Hard Vacuum)"
                      : "0.0 hPa (Vacío Duro)"}
                  </strong>
                </span>
              </div>
              <p className="physics-notice-text">{atmospheric_comparison.divergence_notice}</p>
            </div>
          </div>

          {/* Scientific Limitations & Epistemological Audit */}
          <div className="probe-limitations-box">
            <h6>
              {isEn
                ? "NASA Challenge Epistemological Clause & Boundary Limitations"
                : "Cláusula de Auditoría Epistemológica y Limitaciones Físicas (Reto NASA)"}
            </h6>
            <ul className="probe-limitations-list">
              {scientific_limitations.map((lim, idx) => (
                <li key={idx}>
                  <span className="limitation-bullet-icon">⚠️</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
            <div className="epistemological-quote">
              <em>{epistemological_audit}</em>
            </div>
            <div className="rehearsal-recommendation">
              <strong>{isEn ? "Recommended Engineering Testbed Protocol:" : "Protocolo de Prueba Recomendado:"}</strong>{" "}
              {recommended_rehearsal}
            </div>
          </div>

          {/* Action Footer */}
          <div className="probe-action-footer">
            <button
              type="button"
              onClick={onClose}
              className="probe-btn probe-btn-secondary"
            >
              {isEn ? "Dismiss Sonda" : "Descartar Sonda"}
            </button>

            {!isOcean && onOpenComparator && (
              <button
                type="button"
                onClick={() => onOpenComparator(matched_target.id)}
                className="probe-btn probe-btn-primary"
              >
                {isEn ? "Compare in 1:1 Dual-World Viewer →" : "Comparar en Visor Dual 1:1 →"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
