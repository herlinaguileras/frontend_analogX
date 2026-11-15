import Link from "next/link";
import { AsciiGlobe } from "@/components/ascii-globe";
import { Icon } from "@/components/icon";
import { MissionPortalCards } from "@/components/mission-portal-cards";

export default function HomePage() {
  return (
    <main className="landing-page">
      {/* =========================================================================
          HERO ESTILO VANA CON GLOBO 3D ASCII ROTATORIO
          ========================================================================= */}
      <section className="vana-hero-section">
        <div className="vana-hero-container">
          <div className="vana-hero-content">
            <div className="vana-beacon-tag">
              <span className="vana-beacon-dot" />
              <span>NASA SPACE APPS CHALLENGE 2026 · RETO OFICIAL</span>
            </div>

            <h1 className="vana-hero-title">
              Otros mundos empiezan en la Tierra.
            </h1>

            <p className="vana-hero-lead">
              Motor analítico y de datos abiertos para identificar, caracterizar y comparar de forma verificable regiones terrestres que comparten procesos geológicos, físicos y térmicos con la <strong>Base Lunar Permanente Artemis</strong> y paleocuencas de <strong>Marte</strong>.
            </p>

            <div className="vana-hero-actions">
              <Link href="/earth" className="vana-btn-primary earth-launch-btn">
                <span>🌍 VISTA DE LA TIERRA · EXPLORADOR SATELITAL 360°</span>
                <span className="btn-arrow">→</span>
              </Link>
              <a href="#misiones" className="vana-btn-ghost">
                <span>OBJETIVOS LUNA &amp; MARTE ↓</span>
              </a>
            </div>

            <div className="vana-telemetry-row">
              <div className="telemetry-item">
                <strong>09</strong>
                <span>Análogos Terrestres</span>
              </div>
              <div className="telemetry-sep">/</div>
              <div className="telemetry-item">
                <strong>06</strong>
                <span>Objetivos Espaciales</span>
              </div>
              <div className="telemetry-sep">/</div>
              <div className="telemetry-item">
                <strong>08</strong>
                <span>Datasets Satelitales</span>
              </div>
              <div className="telemetry-sep">/</div>
              <div className="telemetry-item">
                <strong>7D</strong>
                <span>Scorecard NASA</span>
              </div>
            </div>
          </div>

          <div className="vana-hero-globe">
            <AsciiGlobe size={520} />
            <div className="globe-caption">
              <span>• GLOBO DE DATOS TOPOGRÁFICOS · PUNTO VERDE: CAL/VAL BOLIVIA &amp; ANÁLOGOS GLOBALES</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN: LOS 2 PORTALES DE MISIÓN (LUNA VS MARTE)
          ========================================================================= */}
      <section id="misiones" className="mission-selection-section">
        <div className="section-header-block">
          <span className="section-eyebrow">• OBJETIVOS EXTRATERRESTRES DE ESTUDIO</span>
          <h2>Selecciona un cuerpo celeste para iniciar la misión</h2>
          <p>
            El reto exige contrastar regiones de la Tierra con sitios candidatos para asentamientos humanos sostenibles en la Luna y misiones robóticas o tripuladas a Marte.
          </p>
        </div>

        <MissionPortalCards />
      </section>

      {/* =========================================================================
          SECCIÓN: LAS 8 DIMENSIONES DEL DESAFÍO OFICIAL DE LA NASA
          ========================================================================= */}
      <section className="dimensions-section">
        <div className="section-header-block">
          <span className="section-eyebrow">• RÚBRICA CIENTÍFICA NASA SPACE APPS</span>
          <h2>Las 8 Dimensiones de Analogía Planetaria</h2>
          <p>
            La NASA exige evaluar sitios más allá de la apariencia visual superficial, midiendo procesos geológicos, físicos y operacionales concretos.
          </p>
        </div>

        <div className="dimensions-grid">
          <div className="dimension-card">
            <div className="dim-num">01</div>
            <h4>Geología y Superficie</h4>
            <p>Composición mineralógica: halita, sulfatos hidratados, arcillas y regolito anortosítico contrastados con firmas orbitales.</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">02</div>
            <h4>Terreno y Pendientes</h4>
            <p>Hiperplanicies de calibración altimétrica, pendientes basales y topografía digital (NASADEM vs MOLA vs LOLA).</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">03</div>
            <h4>Clima y Extremos</h4>
            <p>Gradientes térmicos día/noche, radiación UV biocida a gran altitud y presiones atmosféricas reducidas.</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">04</div>
            <h4>Agua, Hielo e ISRU</h4>
            <p>Permafrost relicto masivo, salmueras eutécticas y deshidratación térmica de yeso para obtener hasta 209 kg H₂O/tonelada.</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">05</div>
            <h4>Viento y Atmósfera</h4>
            <p>Deflación eólica, dunas de regolito, erosión abrasiva y dispersión de aerosoles minerales.</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">06</div>
            <h4>Biología y Biofirmas</h4>
            <p>Límites de extremófilos en salmueras saturadas y preservación de moléculas orgánicas en sales evaporíticas.</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">07</div>
            <h4>Tubos de Lava y Cuevas</h4>
            <p>Estructuras volcánicas subterráneas con &gt;95% de blindaje contra radiación cósmica (GCR/SPE) para bases Artemis.</p>
          </div>
          <div className="dimension-card">
            <div className="dim-num">08</div>
            <h4>Terradinámica de Rovers</h4>
            <p>Capacidad portante del sustrato (kPa), riesgo de derrape y fatiga mecánica en ruedas grousers metálicas (VIPER/MSR).</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN: "SURPRISE US" — NOVEDAD DE BOLIVIA + ANÁLOGOS GLOBALES
          ========================================================================= */}
      <section className="novelty-section">
        <div className="novelty-grid">
          <div className="novelty-content">
            <span className="section-eyebrow">• CRITERIO "SURPRISE US" DE LA NASA</span>
            <h2>Superando los análogos obvios: El potencial no explotado del Altiplano</h2>
            <p>
              Mientras que Atacama, Hawái y la Antártida son ampliamente estudiados, <strong>AnalogX</strong> introduce a <strong>Bolivia</strong> como un laboratorio natural extremo de altitud (&gt;3,600 a 5,900 msnm):
            </p>
            <ul className="novelty-list">
              <li>
                <strong>Salar de Uyuni (3,653 msnm):</strong> El hiperplano patrón mundial de calibración altimétrica satelital (ICESat / LOLA) y ensayos de tracción de ruedas metálicas.
              </li>
              <li>
                <strong>Sol de Mañana (4,850 msnm):</strong> Campo hidrotermal activo con barros ácidos hirvientes y sílice opalina, análogo del Marte temprano (Home Plate / Cráter Gusev).
              </li>
              <li>
                <strong>Tubos de Lava y Cuevas de Lípez:</strong> Cavidades volcánicas de gran altitud para ensayar hábitats presurizados y blindaje radiativo para Artemis.
              </li>
              <li>
                <strong>Cumbre Criogénica Licancabur (5,916 msnm):</strong> Laguna de cráter con radiación UV esterilizante y frío nocturno de -25 °C para pruebas térmicas de trajes espaciales.
              </li>
            </ul>
          </div>
          <div className="novelty-stats-card">
            <div className="stats-header">METADATOS CIENTÍFICOS VERIFICADOS</div>
            <div className="stat-row">
              <span>Sitio de Calibración Altimétrica</span>
              <strong>Salar de Uyuni</strong>
            </div>
            <div className="stat-row">
              <span>Altitud Máxima de Ensayo</span>
              <strong>5,916 msnm</strong>
            </div>
            <div className="stat-row">
              <span>Atenuación de Radiación en Cuevas</span>
              <strong>&gt; 95% (GCR/SPE)</strong>
            </div>
            <div className="stat-row">
              <span>Rendimiento Hídrico ISRU</span>
              <strong>209 kg H₂O / ton</strong>
            </div>
            <div className="stat-row">
              <span>Bases de Datos Auditadas</span>
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
          <span className="section-eyebrow">• CLÁUSULA DE RIGOR EPISTEMOLÓGICO</span>
          <h2>Dónde falla la analogía: Límites físicos de la Tierra</h2>
          <p>
            Ningún lugar en la Tierra es idéntico a la Luna o Marte. Declaramos con transparencia científica qué se puede validar en campo y qué exige cámaras espaciales TVAC.
          </p>
        </div>

        <div className="limits-table-wrapper">
          <table className="limits-table">
            <thead>
              <tr>
                <th>Parámetro Físico</th>
                <th>Condición en la Tierra</th>
                <th>Condición en la Luna / Marte</th>
                <th>Impacto Operacional &amp; Protocolo de Mitigación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Gravedad Superficial</strong></td>
                <td>1.0 g (9.81 m/s²)</td>
                <td>0.16 g (Luna) / 0.38 g (Marte)</td>
                <td>Altera la dinámica de eyección de regolito y tracción de rovers. Requiere compensadores cinemáticos o vuelos parabólicos.</td>
              </tr>
              <tr>
                <td><strong>Presión Atmosférica</strong></td>
                <td>~600 a 1013 hPa</td>
                <td>Vacío absoluto (Luna) / 6 hPa (Marte)</td>
                <td>El agua líquida no es estable en superficie extraterrestre. Los ensayos de sublimación de hielo exigen cámaras criogénicas TVAC.</td>
              </tr>
              <tr>
                <td><strong>Radiación Cósmica</strong></td>
                <td>Atenuada por magnetosfera y atmósfera</td>
                <td>GCR libre y Tormentas Solares (SPE)</td>
                <td>La dosis biológica es inviable en superficie lunar; justifica el uso de tubos de lava basálticos como refugios subterráneos.</td>
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
            <span>Reto: Permanent Moon Base Locations &amp; Mars</span>
            <span className="footer-sep">·</span>
            <span>Datos Abiertos: NASA PDS · ESA CDSE · USGS EROS</span>
          </div>
          <div className="footer-scroll-top">
            <a href="#top" className="scroll-top-btn">
              <span>↑ Arriba</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
