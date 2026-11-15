"use client";

import Link from "next/link";
import { AsciiGlobe } from "@/components/ascii-globe";
import { MissionPortalCards } from "@/components/mission-portal-cards";
import { useLanguage } from "@/context/language-context";

export default function HomePage() {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  return (
    <main className="landing-page" id="top">
      {/* =========================================================================
          HERO ESTILO VANA CON GLOBO 3D ASCII ROTATORIO
          ========================================================================= */}
      <section className="vana-hero-section">
        <div className="vana-hero-container">
          <div className="vana-hero-content">
            <div className="vana-beacon-tag">
              <span className="vana-beacon-dot" />
              <span>{t("home.badge", "NASA SPACE APPS CHALLENGE 2026 · RETO OFICIAL")}</span>
            </div>

            <h1 className="vana-hero-title">
              {t("home.title", "Otros mundos empiezan en la Tierra.")}
            </h1>

            <p className="vana-hero-lead">
              {isEn ? (
                <>
                  Open-data analytical engine to verifiably identify, characterize, and compare Earth regions that share geological, physical, and thermal processes with the <strong>Artemis Permanent Lunar Base</strong> and paleobasins of <strong>Mars</strong>.
                </>
              ) : (
                <>
                  Motor analítico y de datos abiertos para identificar, caracterizar y comparar de forma verificable regiones terrestres que comparten procesos geológicos, físicos y térmicos con la <strong>Base Lunar Permanente Artemis</strong> y paleocuencas de <strong>Marte</strong>.
                </>
              )}
            </p>

            <div className="vana-hero-actions">
              <Link href="/earth" className="vana-btn-primary earth-launch-btn">
                <span>{t("home.btn_earth", "🌍 VISTA DE LA TIERRA · EXPLORADOR SATELITAL 360°")}</span>
                <span className="btn-arrow">→</span>
              </Link>
              <a href="#misiones" className="vana-btn-ghost">
                <span>{t("home.btn_missions", "OBJETIVOS LUNA & MARTE ↓")}</span>
              </a>
            </div>

            <div className="vana-telemetry-row">
              <div className="telemetry-item">
                <strong>15</strong>
                <span>{t("home.stat_analogs", "Análogos Terrestres")}</span>
              </div>
              <div className="telemetry-sep">/</div>
              <div className="telemetry-item">
                <strong>06</strong>
                <span>{t("home.stat_targets", "Objetivos Espaciales")}</span>
              </div>
              <div className="telemetry-sep">/</div>
              <div className="telemetry-item">
                <strong>08</strong>
                <span>{t("home.stat_datasets", "Datasets Satelitales")}</span>
              </div>
              <div className="telemetry-sep">/</div>
              <div className="telemetry-item">
                <strong>7D</strong>
                <span>{t("home.stat_scorecard", "Scorecard NASA")}</span>
              </div>
            </div>
          </div>

          <div className="vana-hero-globe">
            <AsciiGlobe size={520} />
            <div className="globe-caption">
              <span>{t("home.globe_caption", "• GLOBO DE DATOS TOPOGRÁFICOS · PUNTO VERDE: CAL/VAL BOLIVIA & ANÁLOGOS GLOBALES")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN: LOS 2 PORTALES DE MISIÓN (LUNA VS MARTE)
          ========================================================================= */}
      <section id="misiones" className="mission-selection-section">
        <div className="section-header-block">
          <span className="section-eyebrow">{t("portals.eyebrow", "• OBJETIVOS EXTRATERRESTRES DE ESTUDIO")}</span>
          <h2>{t("portals.title", "Selecciona un cuerpo celeste para iniciar la misión")}</h2>
          <p>
            {t("portals.desc", "El reto exige contrastar regiones de la Tierra con sitios candidatos para asentamientos humanos sostenibles en la Luna y misiones robóticas o tripuladas a Marte.")}
          </p>
        </div>

        <MissionPortalCards />
      </section>

      {/* =========================================================================
          SECCIÓN: LAS 8 DIMENSIONES DEL DESAFÍO OFICIAL DE LA NASA
          ========================================================================= */}
      <section className="dimensions-section">
        <div className="section-header-block">
          <span className="section-eyebrow">{t("dims.eyebrow", "• RÚBRICA CIENTÍFICA NASA SPACE APPS")}</span>
          <h2>{t("dims.title", "Las 8 Dimensiones de Analogía Planetaria")}</h2>
          <p>
            {t("dims.desc", "La NASA exige evaluar sitios más allá de la apariencia visual superficial, midiendo procesos geológicos, físicos y operacionales concretos.")}
          </p>
        </div>

        <div className="dimensions-grid">
          <div className="dimension-card">
            <div className="dim-num">01</div>
            <h4>{t("dims.01_title", "Geología y Superficie")}</h4>
            <p>{t("dims.01_desc", "Composición mineralógica: halita, sulfatos hidratados, arcillas y regolito anortosítico contrastados con firmas orbitales.")}</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">02</div>
            <h4>{t("dims.02_title", "Terreno y Pendientes")}</h4>
            <p>{t("dims.02_desc", "Rango de elevaciones, inclinación y rugosidad RMS para evaluar la seguridad de sitios de aterrizaje y tráfico de rovers.")}</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">03</div>
            <h4>{t("dims.03_title", "Clima y Extremos")}</h4>
            <p>{t("dims.03_desc", "Gradientes térmicos día/noche, radiación UV biocida a gran altitud y presiones atmosféricas reducidas.")}</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">04</div>
            <h4>{t("dims.04_title", "Agua, Hielo e ISRU")}</h4>
            <p>{t("dims.04_desc", "Permafrost relicto masivo, salmueras eutécticas y deshidratación térmica de yeso para obtener hasta 209 kg H₂O/tonelada.")}</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">05</div>
            <h4>{t("dims.05_title", "Viento y Atmósfera")}</h4>
            <p>{t("dims.05_desc", "Deflación eólica, dunas de regolito, erosión abrasiva y dispersión de aerosoles minerales.")}</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">06</div>
            <h4>{t("dims.06_title", "Biología y Biofirmas")}</h4>
            <p>{t("dims.06_desc", "Límites de extremófilos en salmueras saturadas y preservación de moléculas orgánicas en sales evaporíticas.")}</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">07</div>
            <h4>{t("dims.07_title", "Tubos de Lava y Cuevas")}</h4>
            <p>{t("dims.07_desc", "Estructuras volcánicas subterráneas con >95% de blindaje contra radiación cósmica (GCR/SPE) para bases Artemis.")}</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">08</div>
            <h4>{t("dims.08_title", "Terradinámica de Rovers")}</h4>
            <p>{t("dims.08_desc", "Capacidad portante del sustrato (kPa), riesgo de derrape y fatiga mecánica en ruedas grousers metálicas (VIPER/MSR).")}</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN: "SURPRISE US" — NOVEDAD DE BOLIVIA + ANÁLOGOS GLOBALES
          ========================================================================= */}
      <section className="novelty-section">
        <div className="novelty-grid">
          <div className="novelty-content">
            <span className="section-eyebrow">{t("novelty.eyebrow", "• CRITERIO \"SURPRISE US\" DE LA NASA")}</span>
            <h2>{t("novelty.title", "Superando los análogos obvios: El potencial no explotado del Altiplano")}</h2>
            <p>
              {isEn ? (
                <>
                  While Atacama, Hawaii, and Antarctica are widely studied, <strong>AnalogX</strong> introduces <strong>Bolivia</strong> as an extreme high-altitude natural laboratory (&gt;3,600 to 5,900 m a.s.l.):
                </>
              ) : (
                <>
                  Mientras que Atacama, Hawái y la Antártida son ampliamente estudiados, <strong>AnalogX</strong> introduce a <strong>Bolivia</strong> como un laboratorio natural extremo de altitud (&gt;3,600 a 5,900 msnm):
                </>
              )}
            </p>
            <ul className="novelty-list">
              <li>
                <strong>{isEn ? "Salar de Uyuni (3,653 m a.s.l.):" : "Salar de Uyuni (3,653 msnm):"}</strong>{" "}
                {isEn
                  ? "Global natural hyperflat standard for satellite altimeter calibration (ICESat / LOLA) and metallic wheel traction tests."
                  : "El hiperplano patrón mundial de calibración altimétrica satelital (ICESat / LOLA) y ensayos de tracción de ruedas metálicas."}
              </li>
              <li>
                <strong>{isEn ? "Sol de Mañana (4,850 m a.s.l.):" : "Sol de Mañana (4,850 msnm):"}</strong>{" "}
                {isEn
                  ? "Active geothermal field with boiling acidic mudpots and opaline silica sinter, analog to early Mars (Home Plate / Gusev Crater)."
                  : "Campo hidrotermal activo con barros ácidos hirvientes y sílice opalina, análogo del Marte temprano (Home Plate / Cráter Gusev)."}
              </li>
              <li>
                <strong>{isEn ? "Lípez Lava Tubes & Caves:" : "Tubos de Lava y Cuevas de Lípez:"}</strong>{" "}
                {isEn
                  ? "High-altitude volcanic cavities to test pressurized habitats and cosmic radiation shielding for Artemis."
                  : "Cavidades volcánicas de gran altitud para ensayar hábitats presurizados y blindaje radiativo para Artemis."}
              </li>
              <li>
                <strong>{isEn ? "Cryogenic Summit Licancabur (5,916 m a.s.l.):" : "Cumbre Criogénica Licancabur (5,916 msnm):"}</strong>{" "}
                {isEn
                  ? "Crater lake with sterilizing UV radiation (UV 24) and -25 °C night cold for thermal space suit testing."
                  : "Laguna de cráter con radiación UV esterilizante y frío nocturno de -25 °C para pruebas térmicas de trajes espaciales."}
              </li>
            </ul>
          </div>
          <div className="novelty-stats-card">
            <div className="stats-header">{t("novelty.stats_title", "METADATOS CIENTÍFICOS VERIFICADOS")}</div>
            <div className="stat-row">
              <span>{isEn ? "Altimetric Calibration Site" : "Sitio de Calibración Altimétrica"}</span>
              <strong>Salar de Uyuni</strong>
            </div>
            <div className="stat-row">
              <span>{isEn ? "Maximum Test Altitude" : "Altitud Máxima de Ensayo"}</span>
              <strong>5,916 m a.s.l.</strong>
            </div>
            <div className="stat-row">
              <span>{isEn ? "Cave Radiation Attenuation" : "Atenuación de Radiación en Cuevas"}</span>
              <strong>&gt; 95% (GCR/SPE)</strong>
            </div>
            <div className="stat-row">
              <span>{isEn ? "ISRU Water Yield" : "Rendimiento Hídrico ISRU"}</span>
              <strong>209 kg H₂O / ton</strong>
            </div>
            <div className="stat-row">
              <span>{isEn ? "Audited Databases" : "Bases de Datos Auditadas"}</span>
              <strong>NASA · ESA · USGS</strong>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN: CLÁUSULA DE RIGOR ("DÓNDE FALLA LA ANALOGÍA")
          ========================================================================= */}
      <section className="limits-section">
        <div className="section-header-block">
          <span className="section-eyebrow">
            {isEn ? "• EPISTEMOLOGICAL RIGOR CLAUSE" : "• CLÁUSULA DE RIGOR EPISTEMOLÓGICO"}
          </span>
          <h2>
            {isEn ? "Where the Analogy Fails: Physical Limits on Earth" : "Dónde falla la analogía: Límites físicos de la Tierra"}
          </h2>
          <p>
            {isEn
              ? "No place on Earth is identical to the Moon or Mars. We declare with scientific transparency what can be field-validated and what requires thermal vacuum (TVAC) chambers."
              : "Ningún lugar en la Tierra es idéntico a la Luna o Marte. Declaramos con transparencia científica qué se puede validar en campo y qué exige cámaras espaciales TVAC."}
          </p>
        </div>

        <div className="limits-table-wrapper">
          <table className="limits-table">
            <thead>
              <tr>
                <th>{isEn ? "Physical Parameter" : "Parámetro Físico"}</th>
                <th>{isEn ? "Condition on Earth" : "Condición en la Tierra"}</th>
                <th>{isEn ? "Condition on Moon / Mars" : "Condición en la Luna / Marte"}</th>
                <th>{isEn ? "Operational Impact & Mitigation Protocol" : "Impacto Operacional & Protocolo de Mitigación"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{isEn ? "Surface Gravity" : "Gravedad Superficial"}</strong></td>
                <td>1.0 g (9.81 m/s²)</td>
                <td>0.16 g (Moon) / 0.38 g (Mars)</td>
                <td>
                  {isEn
                    ? "Alters regolith ejection dynamics and rover traction. Requires kinematic counterweights or parabolic flights."
                    : "Altera la dinámica de eyección de regolito y tracción de rovers. Requiere compensadores cinemáticos o vuelos parabólicos."}
                </td>
              </tr>
              <tr>
                <td><strong>{isEn ? "Atmospheric Pressure" : "Presión Atmosférica"}</strong></td>
                <td>~600 to 1013 hPa</td>
                <td>{isEn ? "Hard vacuum (<10⁻¹⁰ hPa, Moon) / 6 hPa (Mars)" : "Vacío absoluto (Luna) / 6 hPa (Marte)"}</td>
                <td>
                  {isEn
                    ? "Liquid water is unstable on extraterrestrial surfaces. Ice sublimation and vacuum seal tests require cryogenic TVAC chambers."
                    : "El agua líquida no es estable en superficie extraterrestre. Los ensayos de sublimación de hielo exigen cámaras criogénicas TVAC."}
                </td>
              </tr>
              <tr>
                <td><strong>{isEn ? "Cosmic Radiation" : "Radiación Cósmica"}</strong></td>
                <td>{isEn ? "Attenuated by magnetosphere and atmosphere" : "Atenuada por magnetosfera y atmósfera"}</td>
                <td>{isEn ? "Unshielded GCR & Solar Particle Events (SPE)" : "GCR libre y Tormentas Solares (SPE)"}</td>
                <td>
                  {isEn
                    ? "Biological dose is lethal on the lunar surface; justifies the operational use of subterranean basaltic lava tubes as permanent habitat shelters."
                    : "La dosis biológica es inviable en superficie lunar; justifica el uso de tubos de lava basálticos como refugios subterráneos."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          PIE DE PÁGINA CIENTÍFICO MINIMALISTA
          ========================================================================= */}
      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div className="footer-brand">
            <span className="footer-dot" />
            <strong>AnalogX</strong>
            <span className="footer-sep">/</span>
            <span>NASA Space Apps Challenge 2026</span>
          </div>
          <div className="footer-info">
            <span>{isEn ? "Challenge: Permanent Moon Base Locations & Mars" : "Reto: Permanent Moon Base Locations & Mars"}</span>
            <span className="footer-sep">·</span>
            <span>{isEn ? "Open Data: NASA PDS · ESA CDSE · USGS EROS" : "Datos Abiertos: NASA PDS · ESA CDSE · USGS EROS"}</span>
          </div>
          <div className="footer-scroll-top">
            <a href="#top" className="scroll-top-btn">
              <span>↑ {isEn ? "Top" : "Arriba"}</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
