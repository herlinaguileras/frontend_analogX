export function CartographySources() {
  return <section className="panel cartography-section" id="cartography">
    <div className="eyebrow">CARTOGRAFÍA Y PRECISIÓN</div>
    <h2>Un mapa real, con contexto explícito.</h2>
    <p>MapLibre GL JS presenta cartografía terrestre en Web Mercator (EPSG:3857). Los localizadores usan longitud y latitud para navegar; no representan mediciones, límites de regiones ni evidencia de similitud planetaria. El mapa base no sustituye un producto instrumental con fecha y resolución documentadas.</p>
    <div className="cartography-sources">
      <article><h3>Satélite · Esri World Imagery</h3><p>Mosaico de contexto de Esri, Vantor, Earthstar Geographics y la comunidad GIS. La fecha y resolución varían por zona. Las miniaturas terrestres utilizan el mismo servicio; no representan el producto de una campaña científica.</p><a href="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank" rel="noopener noreferrer">Consultar servicio y atribución ↗</a></article>
      <article><h3>Cartografía · OpenStreetMap</h3><p>Capa de calles y topónimos de OpenStreetMap, con atribución visible. La aplicación solicita únicamente teselas de la vista actual, sin descarga masiva ni modo sin conexión.</p><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">Datos y licencia de OpenStreetMap ↗</a></article>
      <article><h3>Uyuni · localizador USGS</h3><p>El catálogo EROS Cal/Val publica 20,38° S, 66,95° O para su sitio de referencia. No es el centro de todo el salar. Para navegación se asume WGS84; el datum de origen requiere confirmación antes de cualquier análisis científico.</p><a href="https://calval.cr.usgs.gov/apps/uyuni-salt-flats" target="_blank" rel="noopener noreferrer">Consultar catálogo USGS ↗</a></article>
      <article><h3>Sol de Mañana · referencia ENDE</h3><p>ENDE publica un punto referencial del proyecto Laguna Colorada: UTM WGS84, zona 19K, X 629577,24 e Y 7518040,45 m (p. 5). Proj4 lo convierte desde UTM 19S a WGS84 geográfico. La referencia no delimita el campo geotérmico. El Altiplano Sur permanece sin punto ni límites validados.</p><a href="https://www.ende.bo/public/licitaciones/09-06-2021-expresion-de-interes-ende-ei-01-2021-tercera.pdf" target="_blank" rel="noopener noreferrer">Consultar documento ENDE ↗</a></article>
    </div>
  </section>;
}
