"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/context/language-context";
import type { FindingItem } from "@/lib/scientific-types";

interface FindingsContentProps {
  findings: FindingItem[] | null;
}

export function FindingsContent({ findings }: FindingsContentProps) {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <main className="document-page findings-page">
      <div className="eyebrow">{isEn ? "SCIENTIFIC LOGBOOK" : "BITÁCORA CIENTÍFICA"}</div>
      <h1>
        {isEn ? (
          <>Today&apos;s questions.<br />Tomorrow&apos;s discoveries.</>
        ) : (
          <>Las preguntas de hoy.<br />Los hallazgos de mañana.</>
        )}
      </h1>
      <p className="document-intro">
        {isEn
          ? "A collaborative space to assemble multi-source evidence, document physical interpretations, and preserve the epistemological traceability of each conclusion."
          : "Un espacio para reunir evidencias, documentar interpretaciones y conservar la trazabilidad de cada conclusión."}
      </p>

      {findings && findings.length > 0 && (
        <section className="panel" style={{ marginTop: "32px", padding: "28px" }}>
          <div className="eyebrow">
            {isEn ? "CONSOLIDATED EVIDENCE · NASA SPACE APPS 2026" : "EVIDENCIA CONSOLIDADA · NASA SPACE APPS 2026"}
          </div>
          <h2 style={{ fontSize: "22px", marginTop: "8px", marginBottom: "16px" }}>
            {isEn
              ? "Preliminary Scientific Audit Findings"
              : "Hallazgos Preliminares de Auditoría Científica"}
          </h2>
          <div style={{ display: "grid", gap: "20px" }}>
            {findings.map((f) => (
              <article key={f.id} style={{ borderLeft: "3px solid #8c6aae", paddingLeft: "16px" }}>
                <span className="subtle-tag">{f.earth_region_name} ➔ {f.target_name}</span>
                <h3 style={{ fontSize: "16px", marginTop: "6px" }}>{f.title}</h3>
                <p style={{ fontSize: "12px", color: "#a19ab1", marginTop: "6px", lineHeight: "1.7" }}>{f.summary}</p>
                <div style={{ fontSize: "11px", color: "#f0c375", marginTop: "8px" }}>
                  <strong>{isEn ? "Recognized limitations:" : "Limitaciones reconocidas:"}</strong> {f.limitations_summary}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="panel findings-empty">
        <div className="empty-orbit">
          <Icon name="book" size={34} />
          <span />
          <span />
        </div>
        <span className="subtle-tag">
          {isEn ? "RESEARCH UNDER CONSOLIDATION" : "INVESTIGACIÓN EN PREPARACIÓN"}
        </span>
        <h2>{isEn ? "Field findings awaiting peer review." : "Aún no hay hallazgos publicados."}</h2>
        <p>
          {isEn
            ? "New entries will appear as orbital datasets, ground-truth samples, and peer-reviewed citations are processed. Each entry documents sensor provenance, verification level, and environmental limits."
            : "Los hallazgos aparecerán cuando existan observaciones y citas verificadas. Cada uno incluirá su evidencia, estado de verificación y limitaciones."}
        </p>
        <Link className="primary-button" href="/explore">
          {isEn ? "Explore study regions" : "Explorar regiones de estudio"}
          <Icon name="arrow" size={16} />
        </Link>
      </section>

      <div className="findings-principles">
        <article className="panel principle-item">
          <span>01</span>
          <h3>{isEn ? "Traceable Sources" : "Fuentes trazables"}</h3>
          <p>
            {isEn
              ? "Every claim is indexed with its origin sensor, coordinate system, and acquisition date."
              : "Cada afirmación se vincula a un producto cartográfico o estudio con identificador verificable."}
          </p>
        </article>
        <article className="panel principle-item">
          <span>02</span>
          <h3>{isEn ? "Explicit Limits" : "Límites explícitos"}</h3>
          <p>
            {isEn
              ? "We explicitly document where atmospheric, gravitational, or biological differences break the analogy."
              : "Señalar dónde la gravedad, la radiación o la atmósfera impiden extrapolar el análogo a escala real."}
          </p>
        </article>
        <article className="panel principle-item">
          <span>03</span>
          <h3>{isEn ? "Operational Value" : "Utilidad operacional"}</h3>
          <p>
            {isEn
              ? "Analogs must support concrete engineering decisions for landing, ISRU, or habitat construction."
              : "La similitud visual debe traducirse en pruebas instrumentales o ensayos operacionales concretos."}
          </p>
        </article>
      </div>
    </main>
  );
}
