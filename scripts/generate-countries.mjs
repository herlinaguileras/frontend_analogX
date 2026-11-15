import fs from "fs";

const data = JSON.parse(fs.readFileSync("public/world-countries-110m.json", "utf8"));

const specialZooms = {
  Bolivia: 6.2,
  Chile: 6.5,
  España: 6.5,
  Canadá: 4.2,
  Antártida: 3.5,
  Rusia: 3.2,
  "Estados Unidos": 4.2,
  China: 4.2,
  Brasil: 4.5,
  Australia: 4.5,
  Argentina: 5.0,
  Perú: 5.8,
  México: 5.2,
  Islandia: 6.8,
};

const specialCenters = {
  Antártida: [160.7, -77.8],
  Bolivia: [-66.8, -19.5],
  Chile: [-69.8, -24.5],
  España: [-3.7, 40.0],
  Canadá: [-95.0, 60.0],
  "Estados Unidos": [-98.5, 39.8],
  Islandia: [-18.5, 64.9],
  Argentina: [-65.0, -34.0],
  Australia: [133.5, -25.0],
  Perú: [-75.0, -9.5],
};

const countries = data.features
  .map((f) => {
    const p = f.properties;
    const name = p.NAME_ES || p.NAME;
    const nameEn = p.NAME;
    let lng = Number(p.LABEL_X || 0);
    let lat = Number(p.LABEL_Y || 0);
    let zoom = 5.8;

    if (specialCenters[name]) {
      [lng, lat] = specialCenters[name];
    }
    if (specialZooms[name]) {
      zoom = specialZooms[name];
    } else if (
      p.POP_EST > 100000000 ||
      [
        "Rusia",
        "Canadá",
        "Estados Unidos",
        "China",
        "Brasil",
        "Australia",
        "India",
        "Argentina",
        "Kazajistán",
        "Argelia",
        "República Democrática del Congo",
        "Groenlandia",
      ].includes(name)
    ) {
      zoom = 4.2;
    }

    const iso =
      p.ISO_A2 !== "-99"
        ? p.ISO_A2
        : p.POSTAL || p.ADM0_A3 || nameEn.slice(0, 2).toUpperCase();

    return {
      code: iso,
      name,
      nameEn,
      center: [Number(lng.toFixed(4)), Number(lat.toFixed(4))],
      zoom,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name, "es"));

const content = `// Catálogo oficial de países del mundo para navegación orbital satelital 3D
export interface WorldCountry {
  code: string;
  name: string;
  nameEn: string;
  center: [number, number]; // [lng, lat]
  zoom: number;
}

export const WORLD_COUNTRIES: WorldCountry[] = ${JSON.stringify(countries, null, 2)};

export const GLOBAL_VIEW: { center: [number, number]; zoom: number } = {
  center: [-65.0, -18.0],
  zoom: 1.8,
};

export function getCountryView(countryName: string): { center: [number, number]; zoom: number } {
  if (countryName === "all" || countryName === "Global") {
    return GLOBAL_VIEW;
  }
  const match = WORLD_COUNTRIES.find(
    (c) =>
      c.name.toLowerCase() === countryName.toLowerCase() ||
      c.nameEn.toLowerCase() === countryName.toLowerCase()
  );
  if (match) {
    return { center: match.center, zoom: match.zoom };
  }
  return GLOBAL_VIEW;
}
`;

fs.writeFileSync("src/lib/world-countries.ts", content, "utf8");
console.log("Successfully wrote src/lib/world-countries.ts with", countries.length, "countries");

