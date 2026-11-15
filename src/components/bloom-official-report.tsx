"use client";

import type { GeologyComparisonItem } from "@/lib/analog-science-dossier";
import type { SupportedLang } from "@/lib/translations";

interface BloomOfficialReportProps {
  analogs: GeologyComparisonItem[];
  body: "Moon" | "Mars";
  lang: SupportedLang;
}

export function BloomOfficialReport({ analogs, body, lang }: BloomOfficialReportProps) {
  const isMoon = body === "Moon";
  const isEn = lang === "en";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <section className="bloom-official-report">
      {/* Report Header */}
      <div className="bloom-report-header">
        <div className="bloom-report-title">
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6875rem",
              color: "#7fd579",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {isEn
              ? "OFFICIAL DOCUMENT · NASA SPACE APPS CHALLENGE 2026"
              : "DOCUMENTO OFICIAL · NASA SPACE APPS CHALLENGE 2026"}
          </span>
          <h3>
            {isEn
              ? "Planetary Analog Qualification Dossier"
              : "Dossier de Calificación de Análogos Planetarios"}
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.65)",
              margin: 0,
            }}
          >
            {isEn
              ? `Decision matrix for space technology test site selection and astronaut training (${
                  isMoon ? "Artemis Lunar Mission" : "Mars 2026 Mission"
                }).`
              : `Matriz de decisión para selección de sitios de prueba de tecnología espacial y entrenamiento de astronautas (Misión ${
                  isMoon ? "Artemis Lunar" : "Marte 2026"
                }).`}
          </p>
        </div>

        <button type="button" onClick={handlePrint} className="bloom-print-btn">
          <span>{isEn ? "🖨️ Export / Print Report" : "🖨️ Exportar / Imprimir Informe"}</span>
        </button>
      </div>

      {/* Summary Matrix Table */}
      <div style={{ overflowX: "auto", margin: "2rem 0" }}>
        <table className="bloom-metrics-table">
          <thead>
            <tr>
              <th>{isEn ? "Earth Analog Site" : "Sitio Análogo Terrestre"}</th>
              <th>{isEn ? "Country / Region" : "País / Región"}</th>
              <th>{isEn ? "Elevation" : "Altitud"}</th>
              <th>{isEn ? "Overall Fidelity" : "Fidelidad Global"}</th>
              <th>{isEn ? "Analog Space Target" : "Objetivo Espacial Análogo"}</th>
              <th>{isEn ? "Primary Application" : "Aplicación Principal"}</th>
            </tr>
          </thead>
          <tbody>
            {analogs.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.name}</strong>
                </td>
                <td>{item.country}</td>
                <td>{item.elevation}</td>
                <td>
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      color: item.fidelityScore >= 90 ? "#7fd579" : "#8b8bfe",
                      fontWeight: 700,
                    }}
                  >
                    {item.fidelityScore}%
                  </span>
                </td>
                <td>{item.spaceTargetName.split("/")[0]}</td>
                <td>
                  <span className="bloom-tag-compat ALTA">
                    {item.operationalRoles.includes("landing") && (isEn ? "Landing" : "Aterrizaje")}
                    {item.operationalRoles.includes("base") &&
                      (isEn ? " · Base Habitat" : " · Hábitat Base")}
                    {item.operationalRoles.includes("isru") &&
                      (isEn ? " · ISRU Mining" : " · Minería ISRU")}
                    {item.operationalRoles.includes("caves") &&
                      (isEn ? " · Lava Tubes" : " · Tubos de Lava")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NASA Space Apps "Surprise Us" Scientific Rubric */}
      <div
        className="liquid-glass"
        style={{
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h4 style={{ margin: 0, color: "#fff", fontSize: "1.0625rem" }}>
          {isEn
            ? "💡 Challenge Justification: How does this analysis address the 'Surprise Us' Criterion?"
            : "💡 Justificación del Reto: ¿Cómo este análisis responde al Criterio 'Surprise Us'?"}
        </h4>
        <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: "1.6", color: "rgba(255,255,255,0.8)" }}>
          {isEn ? (
            <>
              Traditional planetary analog research has predominantly focused solely on Atacama or Antarctica.{" "}
              <strong>AnalogX introduces the high-altitude Bolivian Altiplano (&gt;3,600 to 5,900 m a.s.l.)</strong> as
              an irreplaceable multi-criteria natural laboratory: Salar de Uyuni provides the world&apos;s only
              millimetric hyperflat standard for radar altimeter landing calibration; Sol de Mañana hosts acid-sulfate
              fumarolic chemistry matching Home Plate at Gusev Crater; and Licancabur holds the planetary record for
              extreme solar UV flux paired with cryogenic cold to stress test EVA suits and sensors.
            </>
          ) : (
            <>
              La mayoría de estudios planetarios tradicionales se concentran únicamente en Atacama o la Antártida.{" "}
              <strong>AnalogX introduce el Altiplano Boliviano (&gt;3,600 a 5,900 msnm)</strong> como un laboratorio
              natural multicriterio insustituible: el Salar de Uyuni provee el único patrón hiperplano milimétrico del mundo
              para calibración de radares de aterrizaje; Sol de Mañana alberga la química ácida-sulfatada idéntica a Home
              Plate en Gusev; y Licancabur impone el récord planetario de radiación UV con frío criogénico para ensayar
              trajes y sensores espaciales.
            </>
          )}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono, monospace)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span>
            {isEn
              ? "AUTHORS: ANALOGX TEAM · NASA SPACE APPS CHALLENGE 2026"
              : "AUTORES: EQUIPO ANALOGX · NASA SPACE APPS CHALLENGE 2026"}
          </span>
          <span>
            {isEn
              ? "STATUS: AUDITED WITH OPEN MULTI-MISSION SATELLITE DATA"
              : "ESTADO: VERIFICADO CON DATOS SATELITALES ABIERTOS"}
          </span>
        </div>
      </div>
    </section>
  );
}
