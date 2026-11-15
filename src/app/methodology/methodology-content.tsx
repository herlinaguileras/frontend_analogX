"use client";

import Link from "next/link";
import { CartographySources } from "@/components/cartography-sources";
import { Icon } from "@/components/icon";
import { verificationLabels } from "@/lib/study-catalog";
import { useLanguage } from "@/context/language-context";

export function MethodologyContent() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const steps = isEn
    ? [
        ["01", "Define the Context", "Distinguish calibration baselines, research candidates, and extraterrestrial targets. Document celestial body, geometry, and datum."],
        ["02", "Trace Provenance", "Identify each primary source, official data product, mission, instrument, processing version, acquisition date, and license."],
        ["03", "Assess Compatibility", "Evaluate physical units, spatial resolution, and processing methods. Document any coordinate conversion or resample before contrasting."],
        ["04", "Interpret with Limits", "Separate concrete evidence from working hypotheses. Acknowledge disparities in gravity, atmosphere, and ancient vs modern processes."],
      ]
    : [
        ["01", "Definir el contexto", "Distinguir referencias de calibración, candidatos de investigación y objetivos planetarios. Documentar su cuerpo, geometría y datum."],
        ["02", "Seguir la procedencia", "Identificar cada fuente, producto oficial, misión, instrumento, versión, fecha de adquisición y licencia."],
        ["03", "Evaluar la compatibilidad", "Revisar las unidades, la resolución espacial y los métodos de procesamiento. Documentar cualquier conversión o remuestreo antes de comparar."],
        ["04", "Interpretar con límites", "Separar la evidencia de las hipótesis. Reconocer diferencias de gravedad, atmósfera y procesos antiguos frente a actuales."],
      ];

  const verificationDescriptions: Record<string, { es: string; en: string }> = {
    verificado_con_fuente: {
      es: "Referencia trazable y verificación documentada.",
      en: "Traceable reference and documented sensor verification.",
    },
    inferencia_razonable: {
      es: "Interpretación sustentada que requiere contexto.",
      en: "Supported scientific interpretation requiring context.",
    },
    hipotesis: {
      es: "Propuesta científica que debe contrastarse.",
      en: "Scientific working proposal subject to verification.",
    },
    pendiente: {
      es: "Información que aún no ha sido validada.",
      en: "Information currently pending validation.",
    },
  };

  return (
    <main className="document-page">
      <div className="eyebrow">{isEn ? "THE ANALOGX METHOD" : "EL MÉTODO ANALOGX"}</div>
      <h1>
        {isEn ? (
          <>Scientific evidence<br />before visual likeness.</>
        ) : (
          <>La evidencia antes<br />que la semejanza.</>
        )}
      </h1>
      <p className="document-intro">
        {isEn
          ? "A similar landscape is only a starting point. A rigorous scientific analogy demands traceable datasets, compatible physical variables, and explicit planetary limits."
          : "Un paisaje parecido es un punto de partida. Una analogía científica necesita fuentes trazables, variables compatibles y límites explícitos."}
      </p>

      <div className="method-steps">
        {steps.map(([number, title, text]) => (
          <article className="panel method-step" key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <section className="panel verification-guide">
        <div>
          <div className="eyebrow">{isEn ? "READING EVIDENCE" : "LECTURA DE LA EVIDENCIA"}</div>
          <h2>{isEn ? "Understand the status of each observation." : "Conoce el estado de cada observación."}</h2>
          <p>
            {isEn
              ? "Unknown values remain pending. An absent metric is never defaulted to zero or an automated estimate."
              : "Los datos desconocidos permanecen pendientes. Un valor ausente nunca se convierte en cero ni en una estimación automática."}
          </p>
        </div>
        <div>
          {Object.entries(verificationLabels).map(([status, label]) => (
            <div className="verification-row" key={status}>
              <span className={`verification-badge ${status}`}>
                <span />
                {label}
              </span>
              <p>
                {verificationDescriptions[status]?.[isEn ? "en" : "es"] ??
                  verificationDescriptions[status]?.es}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CartographySources />

      <div className="method-notice">
        <Icon name="info" size={22} />
        <div>
          <h2>{isEn ? "Planets have their own unique conditions." : "Los planetas tienen sus propias condiciones."}</h2>
          <p>
            {isEn
              ? "Absolute elevations between Earth and Mars will not be compared on the same vertical axis without datum warnings. Analogy does not imply habitability or human base readiness."
              : "No se compararán elevaciones absolutas de la Tierra y Marte en un mismo eje sin advertir sus datums. La analogía no implica habitabilidad ni idoneidad para una base humana."}
          </p>
        </div>
      </div>

      <div className="document-actions">
        <Link href="/explore" className="primary-button">
          {isEn ? "Return to explore" : "Volver a explorar"}
          <Icon name="arrow" size={16} />
        </Link>
        <span>
          {isEn
            ? <>Interface methodology · version 1.0<br />Benchmarked against NASA Space Apps criteria.</>
            : <>Metodología de interfaz · propuesta v0<br />Validación científica auditada con el backend.</>}
        </span>
      </div>
    </main>
  );
}
