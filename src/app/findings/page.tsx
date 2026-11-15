import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { fetchFindings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Hallazgos y Evidencias",
  description: "Bitácora científica y evidencias consolidadas de auditoría científica.",
};

export default async function FindingsPage() {
  const findings = await fetchFindings();

  return (
    <main className="document-page findings-page">
      <div className="eyebrow">BITÁCORA CIENTÍFICA</div>
      <h1>Las preguntas de hoy.<br />Los hallazgos de mañana.</h1>
      <p className="document-intro">
        Un espacio para reunir evidencias, documentar interpretaciones y conservar la trazabilidad de cada conclusión.
      </p>

      {findings && findings.length > 0 && (
        <section className="panel" style={{ marginTop: "32px", padding: "28px" }}>
          <div className="eyebrow">EVIDENCIA CONSOLIDADA · NASA SPACE APPS 2026</div>
          <h2 style={{ fontSize: "22px", marginTop: "8px", marginBottom: "16px" }}>
            Hallazgos Preliminares de Auditoría Científica (Backend)
          </h2>
          <div style={{ display: "grid", gap: "20px" }}>
            {findings.map(f => (
              <article key={f.id} style={{ borderLeft: "3px solid #8c6aae", paddingLeft: "16px" }}>
                <span className="subtle-tag">{f.earth_region_name} ➔ {f.target_name}</span>
                <h3 style={{ fontSize: "16px", marginTop: "6px" }}>{f.title}</h3>
                <p style={{ fontSize: "12px", color: "#a19ab1", marginTop: "6px", lineHeight: "1.7" }}>{f.summary}</p>
                <div style={{ fontSize: "11px", color: "#f0c375", marginTop: "8px" }}>
                  <strong>Limitaciones reconocidas:</strong> {f.limitations_summary}
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
        <span className="subtle-tag">INVESTIGACIÓN EN PREPARACIÓN</span>
        <h2>Aún no hay hallazgos publicados.</h2>
        <p>
          Los hallazgos aparecerán cuando existan observaciones y citas verificadas. Cada uno incluirá su evidencia, estado de verificación y limitaciones.
        </p>
        <Link className="primary-button" href="/explore">
          Explorar regiones de estudio
          <Icon name="arrow" size={16} />
        </Link>
      </section>

      <div className="findings-principles">
        {[
          ["layers", "Procedencia visible", "Cada resultado conservará sus fuentes y productos."],
          ["science", "Interpretación responsable", "Las hipótesis se distinguirán de los datos verificados."],
          ["info", "Límites explícitos", "La incertidumbre acompañará a las conclusiones."],
        ].map(([icon, title, text]) => (
          <article key={title}>
            <Icon name={icon as "layers" | "science" | "info"} size={22} />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
