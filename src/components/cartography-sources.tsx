"use client";

import { useLanguage } from "@/context/language-context";

export function CartographySources() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <section className="panel cartography-section" id="cartography">
      <div className="eyebrow">{isEn ? "CARTOGRAPHY & PRECISION" : "CARTOGRAFÍA Y PRECISIÓN"}</div>
      <h2>{isEn ? "A real map with explicit context." : "Un mapa real, con contexto explícito."}</h2>
      <p>
        {isEn
          ? "MapLibre GL JS renders terrestrial cartography in Web Mercator (EPSG:3857). Locators use latitude and longitude for navigation; they do not represent exact territorial boundaries or proof of planetary similitude. The basemap does not replace calibrated scientific products with documented acquisition dates and spatial resolution."
          : "MapLibre GL JS presenta cartografía terrestre en Web Mercator (EPSG:3857). Los localizadores usan longitud y latitud para navegar; no representan mediciones, límites de regiones ni evidencia de similitud planetaria. El mapa base no sustituye un producto instrumental con fecha y resolución documentadas."}
      </p>
      <div className="cartography-sources">
        <article>
          <h3>{isEn ? "Satellite · Esri World Imagery" : "Satélite · Esri World Imagery"}</h3>
          <p>
            {isEn
              ? "Context mosaic from Esri, Maxar, Earthstar Geographics, and the GIS community. Date and spatial resolution vary by region. Terrestrial thumbnails use the same service."
              : "Mosaico de contexto de Esri, Vantor, Earthstar Geographics y la comunidad GIS. La fecha y resolución varían por zona. Las miniaturas terrestres utilizan el mismo servicio; no representan el producto de una campaña científica."}
          </p>
          <a href="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank" rel="noopener noreferrer">
            {isEn ? "View service & attribution ↗" : "Consultar servicio y atribución ↗"}
          </a>
        </article>
        <article>
          <h3>{isEn ? "Cartography · OpenStreetMap" : "Cartografía · OpenStreetMap"}</h3>
          <p>
            {isEn
              ? "Streets and geographic names layer from OpenStreetMap with visible attribution. The application queries only tiles for the active view without bulk harvesting."
              : "Capa de calles y topónimos de OpenStreetMap, con atribución visible. La aplicación solicita únicamente teselas de la vista actual, sin descarga masiva ni modo sin conexión."}
          </p>
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">
            {isEn ? "OpenStreetMap data & license ↗" : "Datos y licencia de OpenStreetMap ↗"}
          </a>
        </article>
        <article>
          <h3>{isEn ? "Uyuni · USGS EROS Cal/Val" : "Uyuni · localizador USGS"}</h3>
          <p>
            {isEn
              ? "The EROS Cal/Val catalog publishes 20.38° S, 66.95° W for its reference calibration site. WGS84 assumed for navigation."
              : "El catálogo EROS Cal/Val publica 20,38° S, 66,95° O para su sitio de referencia. No es el centro de todo el salar. Para navegación se asume WGS84; el datum de origen requiere confirmación antes de cualquier análisis científico."}
          </p>
          <a href="https://calval.cr.usgs.gov/apps/uyuni-salt-flats" target="_blank" rel="noopener noreferrer">
            {isEn ? "USGS EROS catalog ↗" : "Consultar catálogo USGS ↗"}
          </a>
        </article>
        <article>
          <h3>{isEn ? "Sol de Mañana · ENDE reference" : "Sol de Mañana · referencia ENDE"}</h3>
          <p>
            {isEn
              ? "ENDE publishes reference point for Laguna Colorada geothermal field: UTM WGS84 zone 19K, converted via Proj4 to geographic WGS84."
              : "ENDE publica un punto referencial del proyecto Laguna Colorada: UTM WGS84, zona 19K, X 629577,24 e Y 7518040,45 m (p. 5). Proj4 lo convierte desde UTM 19S a WGS84 geográfico. La referencia no delimita el campo geotérmico."}
          </p>
          <a href="https://www.ende.bo/public/licitaciones/09-06-2021-expresion-de-interes-ende-ei-01-2021-tercera.pdf" target="_blank" rel="noopener noreferrer">
            {isEn ? "ENDE document ↗" : "Consultar documento ENDE ↗"}
          </a>
        </article>
        <article>
          <h3>{isEn ? "Atacama (Yungay) · NASA Astrobiology" : "Atacama (Yungay) · NASA Astrobiology"}</h3>
          <p>
            {isEn
              ? "Hyperarid sector of Yungay (24.08° S, 69.87° W). Soil chemometrics with perchlorates analog to Martian Viking and Phoenix findings (Navarro-González et al., Science 2003)."
              : "Sector hiperárido de Yungay (24.08° S, 69.87° O). Quimiometría de suelos con percloratos análogos a Marte descubiertos por Phoenix y Viking (Navarro-González et al., Science 2003)."}
          </p>
          <a href="https://doi.org/10.1126/science.1089143" target="_blank" rel="noopener noreferrer">
            {isEn ? "Read Science publication ↗" : "Consultar publicación Science ↗"}
          </a>
        </article>
        <article>
          <h3>{isEn ? "McMurdo (Beacon Valley) · USGS / NASA LRO" : "McMurdo (Beacon Valley) · USGS / NASA LRO"}</h3>
          <p>
            {isEn
              ? "Antarctic Dry Valleys (77.85° S, 160.75° E). Snow-free hyperarid cold permafrost with polygonal fossil ice wedges analog to Moon and Mars poles."
              : "Valles Secos de la Antártida (77.85° S, 160.75° E). Permafrost frío hiperárido libre de nieve con cuñas poligonales de hielo fósil análogas a los polos de la Luna y Marte."}
          </p>
          <a href="https://doi.org/10.1130/0016-7606(2002)114" target="_blank" rel="noopener noreferrer">
            {isEn ? "Read GSA paper ↗" : "Consultar estudio GSA ↗"}
          </a>
        </article>
        <article>
          <h3>{isEn ? "Haughton Crater · NASA HMP" : "Cráter Haughton · NASA HMP"}</h3>
          <p>
            {isEn
              ? "23-km impact structure on Devon Island, Nunavut (75.38° N, 89.67° W). NASA testbed for crewed rovers and EVA suits (Lee & Osinski, 2005)."
              : "Estructura de impacto de 23 km en la Isla Devon, Nunavut (75.38° N, 89.67° O). Campo de pruebas de la NASA para rovers tripulados LTV y trajes EVA (Lee & Osinski, 2005)."}
          </p>
          <a href="https://doi.org/10.1111/j.1945-5100.2005.tb00145.x" target="_blank" rel="noopener noreferrer">
            {isEn ? "Haughton-Mars Project ↗" : "Consultar Haughton-Mars Project ↗"}
          </a>
        </article>
        <article>
          <h3>{isEn ? "Lanzarote · ESA PANGAEA" : "Lanzarote · ESA PANGAEA"}</h3>
          <p>
            {isEn
              ? "La Corona basaltic lava tube system (29.15° N, 13.48° W). ESA astronaut training ground and pit analog for Marius Hills on the Moon."
              : "Sistema de tubos volcánicos basálticos de La Corona (29.15° N, 13.48° O). Campo de entrenamiento de astronautas de la ESA y análogo de fosa para Marius Hills en la Luna."}
          </p>
          <a href="https://doi.org/10.1016/j.earscirev.2020.103288" target="_blank" rel="noopener noreferrer">
            {isEn ? "ESA PANGAEA study ↗" : "Consultar estudio ESA PANGAEA ↗"}
          </a>
        </article>
      </div>
    </section>
  );
}
