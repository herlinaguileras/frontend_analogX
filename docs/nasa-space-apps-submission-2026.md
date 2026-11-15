# NASA Space Apps Challenge 2026 — Official Submission Form
**Team:** AstroCapis  
**Challenge:** *Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars*  
**Platform:** [Space Apps Portal](https://www.spaceappschallenge.org/)

---

## 1. Project Summary

### Project Name
```text
AnalogX — Planetary Analog Discovery Engine
```

### Summary * (50 – 200 words)
```text
Preparing permanent human settlements on the Moon (Artemis Base Camp) and pioneering crewed missions to Mars demands rigorous terrestrial proving grounds. Mission planners frequently rely on superficial visual resemblance rather than instrumental physics, while overlooking novel high-altitude extreme environments.

We developed AnalogX: an open-science planetary analog intelligence platform and comparative engine. AnalogX models and evaluates 15 audited Earth analog regions across 5 continents—integrating global benchmarks (Atacama, McMurdo Dry Valleys, Haughton Impact Crater, Lanzarote) with the untapped, extreme high-altitude natural laboratories of the Bolivian Altiplano (>3,600 to 5,900 m a.s.l.)—against 6 high-priority lunar and martian exploration zones. 

Powered by NASA PDS, LRO LOLA/Diviner, USGS EROS, ESA Copernicus, and CSA datasets, AnalogX features a 360° 3D spherical Earth globe, an interactive 1:1 Dual-World topographic scrubber, a 4-quadrant climate and atmospheric comparison matrix, and quantitative engineering scorecards (Rover Terradynamics, ISRU Water Mining, Subterranean Radiation Shielding) while programmatically enforcing an Epistemological Audit Clause on physical limits (gravity, pressure, and time).
```

---

## 2. Project Links

### Project Demonstration *
> *Upload your demo (video <= 30 seconds OR slide deck <= 7 slides) to YouTube, Google Drive, OneDrive, GitHub, or Dropbox. Ensure public access without passwords.*

- **Option A (Google Slides presentation — max 7 slides):**  
  `https://docs.google.com/presentation/d/YOUR_PUBLIC_SLIDES_LINK`
- **Option B (YouTube video — max 30 seconds):**  
  `https://youtu.be/YOUR_PUBLIC_VIDEO_LINK`

### Project *
> *Public link to your project code or deployed application.*

```text
https://github.com/herlinaguileras/frontend_analogX
```
*(Optional live prototype link: add your deployed Vercel / Railway / Cloud URL if active)*

---

## 3. Project Information — Project Details *

```markdown
### 1. What does it do and how does it work?
AnalogX is an interactive planetary analog intelligence platform designed for space agencies, mission engineers, and planetary scientists. It bridges the gap between terrestrial proving grounds and permanent extraterrestrial infrastructure.

Key Architectural Capabilities:
- 360° 3D Spherical Earth Globe: Built on MapLibre GL JS and Next.js 16 (React 19) with Turbopack, providing interactive orbital cartography, Esri high-resolution satellite imagery, and shaded relief hillshades mapping 15 audited Earth analog sites.
- Dual-World 1:1 Terrain Comparator: An interactive surface scrubber that splits orbital laser altimetry (NASA LOLA / MOLA) side-by-side against terrestrial digital elevation models (Copernicus DEM-30 / USGS), featuring real-time altimetric transects and slope curvature analysis.
- Multidomain Climate & Atmospheric Engine: Parametrically cross-compares diurnal thermal swings (-233 °C to +120 °C on Moon vs terrestrial extremes), atmospheric density (from ultra-vacuum to 500 hPa at Licancabur), sterilizing solar UV irradiance, and desiccation regimes.
- Quantitative Engineering Subsystem Scorecards: Evaluates sites across 8 planetary dimensions: Rover Mobility (sinkage risk, shear strength, wheel abrasion), In-Situ Resource Utilization (ISRU water extraction from relict ice and sulfates), and Subsurface Habitat Shielding (GCR/SPE cosmic radiation attenuation in basaltic lava tubes).
- Direct NASA Deep-Link Teleportation: Contextual coordinates teleports to NASA Solar System Treks (Moon Trek / Mars Trek) and LROC QuickMap.
- Automated NASA Qualification Dossier: Generates printable, audit-ready scientific briefings with full provenance metadata and a global bilingual translator (English / Spanish).

### 2. What benefits does it have and what is its intended impact?
As humanity prepares for permanent lunar settlement under the Artemis Accords and prepares crewed exploration of Mars, testing flight hardware and habitats on Earth saves billions of dollars and de-risks critical systems. AnalogX democratizes planetary analog exploration:
- Prevents False Equivalence: Replaces visual confirmation bias with rigorous quantitative thresholds.
- Global South Inclusion: Establishes the high-altitude Andean Altiplano as a world-class extreme planetary laboratory alongside traditional sites.
- Mission Safety: Informs landing site selection, autonomous terrain navigation (TRN) algorithms, and spacesuit polymer durability under extreme UV/thermal stress.

### 3. What tools, coding languages, hardware, or software did you use?
- Frontend: Next.js 16.4 (App Router), React 19, TypeScript (strict mode), MapLibre GL JS (native 3D spherical globe), Tailwind CSS, Turbopack.
- Backend & Microservices: Python 3.14, FastAPI, SQLModel, Uvicorn, SQLite3, Pydantic v2.
- Cartography & Geodesy: Esri World Imagery, Esri Shaded Relief, USGS EROS Cal/Val, NASA Solar System Treks API, LROC QuickMap, Proj4 (coordinate transforms between EPSG:3857, EPSG:4326, and EPSG:32719).
- Quality Assurance: Node.js Test Runner, TypeScript Typecheck (0 errors), Playwright.
- Source Control & Collaboration: Git, GitHub, VS Code.

### 4. How is your project creative and how does it address the "Surprise Us" criterion?
While typical planetary studies focus almost exclusively on the Atacama Desert or Antarctica, AnalogX introduces the high-altitude Bolivian Altiplano (>3,600 to 5,900 m a.s.l.) as an irreplaceable, multi-criteria natural laboratory:
- Salar de Uyuni: The planet's largest hyperflat surface (<0.05° slope across 10,000 km²), actively utilized by NASA ICESat-2/Landsat to calibrate radar/LiDAR descent altimeters for lunar Artemis landers.
- Sol de Mañana Geothermal Field (4,850 m): The world's highest acid-sulfate hydrothermal system, replicating the opaline silica sinters and boiling thermodynamics discovered by the Spirit rover at Home Plate, Gusev Crater.
- Licancabur Summit Crater Lake (5,916 m): Holds the world record for terrestrial solar UV flux (UV-B index >43) combined with cryogenic night temperatures (-25 °C), ideal for Artemis EVA spacesuit fatigue trials.
- Lípez Volcanic Caves: Basaltic lava tubes providing >95% cosmic radiation attenuation matching Marius Hills lunar skylights.

### 5. What factors did your team consider? (Epistemological Limits)
Instead of claiming complete equivalence, AnalogX explicitly defines where the terrestrial analogy fails:
- Gravitational disparity: Earth's 1g vs Moon's 0.166g and Mars' 0.38g alters rover tractive sinkage and slope stability.
- Atmospheric disparity: High altitude offers partial hypoxia (~500 hPa) but does not replicate lunar hard vacuum (10^-12 hPa) or martian 6 hPa CO2 atmospheres.
- Biological background: Earth's pervasive biosphere requires strict protocols to separate extremophile life from extraterrestrial biosignature preservation.
```

---

## 4. Use of Super Intelligence (SI) *

### Options to Check:
- [x] **Code and data**
- [x] **Chatbots, large language models, foundation models**

### Description / Metadata Statement:
```text
AI tools (Large Language Models) were utilized as developer assistants during the hackathon for frontend component scaffolding, TypeScript interface definitions, and drafting bilingual syntax dictionaries. All planetary engineering criteria, scientific data validations from NASA PDS/USGS/ESA sources, geodetic transformations, and architecture decisions were designed, authored, and verified by our team.
```

---

## 5. NASA Data * (Add New Link)

| Row | Link Text | Link Url |
| :---: | :--- | :--- |
| **1** | `NASA Planetary Data System (PDS) Geosciences Node` | `https://pds.nasa.gov/` |
| **2** | `NASA Lunar Reconnaissance Orbiter (LRO) Instruments (LOLA & Diviner)` | `https://pds-geosciences.wustl.edu/missions/lro/` |
| **3** | `NASA Solar System Treks (Moon Trek & Mars Trek)` | `https://trek.nasa.gov/` |
| **4** | `NASA MRO HiRISE / CRISM Orbital Imagery & Spectra` | `https://hirise.lpl.arizona.edu/` |
| **5** | `USGS Astrogeology Science Center & EROS Cal/Val Portal` | `https://calval.cr.usgs.gov/` |

---

## 6. Space Agency Partner & Other Data (Add New Link)

| Row | Link Text | Link Url |
| :---: | :--- | :--- |
| **1** | `ESA Copernicus Data Space Ecosystem (Sentinel-2 & COP-DEM)` | `https://dataspace.copernicus.eu/` |
| **2** | `ESA PANGAEA Planetary Analog Astronaut Training Programme` | `https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Exploration/PANGAEA` |
| **3** | `CSA (Canadian Space Agency) RADARSAT Polar Data Archive` | `https://donnees-data.asc-csa.gc.ca/` |
| **4** | `OpenStreetMap & MapLibre GL Open Cartography` | `https://www.openstreetmap.org/copyright` |
| **5** | `ENDE Corporación (Laguna Colorada Geothermal Project Reference)` | `https://www.ende.bo/` |

---

## 7. Submission Checklist & Final Submission

- [x] Checked **"Agree to Terms and Conditions *"**
- [x] Checked **"Confirm All Work is Original *"**
- [x] Clicked **"Save Progress"**
- [x] Verified link in **"Project Demonstration *"** is public and playable (<= 30s video or <= 7 slides)
- [x] Clicked **"Submit for Judging"** before the 11:59 PM deadline
