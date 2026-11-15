export type SupportedLang = "es" | "en";

export interface TranslatedContent {
  earthImageTitle: string;
  earthImageSubtitle: string;
  earthGeologySummary: string;
  earthMineralogy: string;
  spaceImageTitle: string;
  spaceImageSubtitle: string;
  spaceGeologySummary: string;
  spaceMineralogy: string;
  executiveSummary: string;
  solidAnalogy: string[];
  analogyLimitations: string[];
  operationalValue: string[];
  metrics: {
    variable: string;
    earthValue: string;
    spaceValue: string;
    compatibility: string;
  }[];
}

export const analogTranslationsEn: Record<string, TranslatedContent> = {
  "salar-de-uyuni": {
    earthImageTitle: "Hyperflat Halite Crust & Salt Desiccation Polygons",
    earthImageSubtitle: "Salar de Uyuni · Andean Altiplano (Bolivia)",
    earthGeologySummary: "Massive evaporitic plain covering 10,582 km² with a vertical topographic variance under 1 meter across 100 km. Hard halite crust (NaCl >98%) with metric polygonal networks (1-3 m) and deep brine reservoirs enriched in Li, K, B, and Mg.",
    earthMineralogy: "Halite (NaCl), Gypsum (CaSO4·2H2O), Ulexite, Lithium Chloride, and Sulfate salts",
    spaceImageTitle: "Basaltic Plain & Cohesive Regolith of Mare Tranquillitatis",
    spaceImageSubtitle: "Lunar Tranquility Base · Apollo 11 Mission / NASA LRO",
    spaceGeologySummary: "Impact-formed basaltic mare plain with millimeter-scale roughness of cohesive regolith, and evaporitic chloride analogs discovered by Mars Odyssey THEMIS in Terra Sirenum.",
    spaceMineralogy: "Calcic plagioclase, Ilmenite (FeTiO3), Pyroxenes, and Chloride salts",
    executiveSummary: "Salar de Uyuni is the largest natural hyperflat altimetric standard on Earth. Its pristine reflective and homogeneous surface is formally utilized by NASA missions (ICESat-2, Landsat) to calibrate laser altimeters and radar descent systems critical for the Artemis HLS and Starship landing craft on the Moon and Mars.",
    solidAnalogy: [
      "Millimetric hyperflat microtopography ideal for space descent Doppler radar and LiDAR altimeter calibration.",
      "Terradynamics of metallic grouser wheels: accurately mimics mechanical drag, shear resistance, and wear over high-friction dry mineral crusts.",
      "High surface albedo reflectance (>0.70) optimal for tuning Terrain Relative Navigation (TRN) autonomous vision algorithms."
    ],
    analogyLimitations: [
      "Terrestrial atmospheric pressure of ~660 hPa at 3,653 m elevation vs ultra-high lunar vacuum (10⁻¹² hPa) or tenuous Martian CO2 atmosphere (~6 hPa).",
      "Presence of subsurface water brines at shallow depth (0.5 - 2 m), completely absent on the Moon.",
      "Earth gravity (1g) imposing greater axle loads on rovers compared to lunar (0.166g) or Martian (0.38g) gravity."
    ],
    operationalValue: [
      "Precision calibration tests for laser altimetry sensors of NASA Artemis III lunar landers.",
      "Evaluation of saline abrasive wear on wheel treads and rotary joints of lunar and Martian rovers.",
      "Electrochemical simulation of mineral salt separation for in-situ resource extraction of oxygen and lithium."
    ],
    metrics: [
      { variable: "Topographic Slope", earthValue: "< 0.05° across 100 km", spaceValue: "0.2° to 1.5° in Lunar Maria", compatibility: "HIGH" },
      { variable: "Surface Roughness", earthValue: "5 to 15 cm salt ridges", spaceValue: "3 to 10 cm regolith ripples", compatibility: "HIGH" },
      { variable: "Solar UV Index", earthValue: "UV 14-16 (Extreme)", spaceValue: "Unfiltered UV (Sterilizing)", compatibility: "MEDIUM" },
      { variable: "Substrate Hardness", earthValue: "Salt crust 15-45 MPa", spaceValue: "Compacted regolith 20-60 MPa", compatibility: "HIGH" }
    ]
  },
  "cuevas-volcanicas-lipez": {
    earthImageTitle: "Subterranean Basaltic Lava Tube Structures",
    earthImageSubtitle: "Magmatic Flow Conduits and Volcanic Skylights",
    earthGeologySummary: "Underground volcanic galleries created by draining fluid basaltic lava. Roof thicknesses of 5 to 20 m of dense basalt with vertical collapse skylights and an isothermal interior microclimate fully decoupled from exterior conditions.",
    earthMineralogy: "Alkaline basalt, Olivine, Augitic pyroxene, and secondary Siliceous encrustations",
    spaceImageTitle: "Marius Hills Pit viewed by NASA LROC NAC",
    spaceImageSubtitle: "65-meter Diameter Lunar Skylight Opening into Deep Basaltic Conduits",
    spaceGeologySummary: "Circular collapse pit 65 m wide and >80 m deep detected by SELENE and LROC, opening directly into massive, intact basaltic tubes extending for tens of kilometers.",
    spaceMineralogy: "Titanium-rich lunar mare basalt, Anorthosite, Pyromorphite, and Pyroclastic glass",
    executiveSummary: "For the Artemis Permanent Moon Base and Mars habitats, cosmic radiation and 250 °C surface temperature swings are mission-ending hazards. The lava tubes of Lípez and Lanzarote offer the exact geological blueprint for establishing pressurized underground habitats protected beneath tens of meters of volcanic rock.",
    solidAnalogy: [
      "Natural attenuation of >95% of galactic cosmic radiation (GCR) and solar particle events (SPE).",
      "Radical thermal stability: constant interior temperature unaffected by violent surface thermal extremes.",
      "Total structural shielding against micrometeoroid bombardment and hypervelocity secondary ejecta."
    ],
    analogyLimitations: [
      "Tube dimensions: due to reduced lunar gravity (1/6g), lunar tubes can exceed 500 meters in width without collapsing, orders of magnitude larger than terrestrial tubes (5 to 30 m).",
      "Chemical weathering by water vapor and atmospheric gases on Earth, non-existent on the lunar surface."
    ],
    operationalValue: [
      "Validation of deployment protocols for inflatable pressurized habitat modules and rock anchors.",
      "Field trials of autonomous cave drones and LiDAR SLAM navigation in GPS-denied environments.",
      "Subsurface planetary geology field training for ESA PANGAEA and NASA Artemis astronauts."
    ],
    metrics: [
      { variable: "Radiation Shielding", earthValue: "> 95% SPE/GCR attenuation", spaceValue: "> 98% under 10 m regolith", compatibility: "HIGH" },
      { variable: "Thermal Stability", earthValue: "12 °C ± 3 °C year-round", spaceValue: "-20 °C constant subsurface", compatibility: "HIGH" },
      { variable: "Rock Composition", earthValue: "Basalt and dacitic volcanic rocks", spaceValue: "Ilmenite-rich lunar basalt", compatibility: "HIGH" },
      { variable: "Ceiling Compressive Strength", earthValue: "50 - 120 MPa compression", spaceValue: "40 - 100 MPa basalt compression", compatibility: "HIGH" }
    ]
  },
  "sol-de-manana": {
    earthImageTitle: "Acidic-Sulfate Fumaroles & Opalline Silica Sinter",
    earthImageSubtitle: "Sol de Mañana Geothermal Field · 4,850 m a.s.l. (Bolivia)",
    earthGeologySummary: "Active high-enthalpy geothermal field with boiling mudpots at 85 °C (boiling point at this elevation), H2S/SO2-rich fumaroles, and extensive amorphous opaline silica sediment deposits.",
    earthMineralogy: "Opaline silica (SiO2·nH2O), Elemental sulfur (S8), Alunite, Kaolinite, and Jarosite",
    spaceImageTitle: "Opaline Silica Deposit Uncovered by NASA Spirit Rover",
    spaceImageSubtitle: "Home Plate Outcrop · NASA Mars Exploration Rover Mission",
    spaceGeologySummary: "Hydrothermal volcanic structure 90 m across featuring stratified pyroclastic tuffs and pure silica nodules (>90% SiO2) discovered when Spirit's stalled wheel churned up bright white soil.",
    spaceMineralogy: "Microdigitate opaline silica, Jarosite, Iron sulfates, and Hematite dust",
    executiveSummary: "Sol de Mañana is the highest acid-sulfate hydrothermal analog on Earth. Its unique combination of low atmospheric pressure, sterilizing UV flux, and opaline silica precipitation closely replicates the ancient volcanic hydrothermal settings of Home Plate in Gusev Crater, Mars, where primitive microbial biosignatures have the highest preservation potential.",
    solidAnalogy: [
      "Identical infrared VNIR/TIR spectral signatures of opaline silica sinter and hydrated sulfates (jarosite and alunite).",
      "Low-pressure boiling regime (~560 hPa) matching the thermodynamics of hydrothermal fluids in Noachian Mars.",
      "Preservation of cellular biosignatures within rapidly precipitated amorphous silica matrices."
    ],
    analogyLimitations: [
      "The terrestrial geothermal system remains vigorously active today, whereas Martian hydrothermal vents became extinct billions of years ago.",
      "Higher abundance of meteoric recharge water on Earth compared to cold modern Mars."
    ],
    operationalValue: [
      "Calibration of miniaturized rover spectrometers (Raman, LIBS, APXS) for Mars exploration.",
      "Mars Sample Return science protocols prioritizing silica-rich rock cores.",
      "Corrosion tolerance trials for aerospace titanium and aluminum alloys in acidic sulfuric gases."
    ],
    metrics: [
      { variable: "Silica Purity", earthValue: "85% to 92% amorphous SiO2", spaceValue: "> 90% SiO2 at Home Plate", compatibility: "HIGH" },
      { variable: "Sulfate Mineralogy", earthValue: "Massive Alunite and Jarosite", spaceValue: "Jarosite and Magnesium Sulfate", compatibility: "HIGH" },
      { variable: "Fluid pH", earthValue: "pH 1.5 to 3.0 (Highly acidic)", spaceValue: "Acidic pH inferred on early Mars", compatibility: "HIGH" },
      { variable: "Operating Pressure", earthValue: "560 hPa (~5,000 m)", spaceValue: "6 to 9 hPa on Martian surface", compatibility: "MEDIUM" }
    ]
  },
  "cumbre-licancabur": {
    earthImageTitle: "Periglacial Volcanic Crater Lake at 5,916 m a.s.l.",
    earthImageSubtitle: "Licancabur Volcano · Extreme UV Radiation & Nocturnal Freezing",
    earthGeologySummary: "Conical stratovolcano hosting a periglacial summit lake at almost 6,000 m elevation subjected to sterilizing solar UV, reduced atmospheric pressure (500 hPa), 120 km/h winds, and night temperatures dropping to -25 °C.",
    earthMineralogy: "Basaltic andesite, Volcanic glass, Pyroxenes, Feldspar, and Periglacial breccias",
    spaceImageTitle: "Illuminated Rim of Shackleton Crater by NASA LRO",
    spaceImageSubtitle: "Artemis Base Camp · Permanently Shadowed Regions with Water Ice",
    spaceGeologySummary: "Impact crater 21 km wide with elevated rim peaks receiving sunlight ~86% of the solar year and crater floor in perpetual shadow (PSR) at 40 Kelvin (-233 °C) hosting cryogenic water ice traps.",
    spaceMineralogy: "Pure anorthosite (calcic plagioclase), Impact melt glass, Ejecta breccia, and Amorphous water ice",
    executiveSummary: "Licancabur is Earth's premier high-altitude natural laboratory for studying biological and material limits under unfiltered solar radiation and severe periglacial cold. Studied extensively by the SETI Institute and NASA Ames, its conditions inform EVA spacesuit durability and lunar surface sensor engineering.",
    solidAnalogy: [
      "World-record solar UV radiation flux measured on Earth's surface (UV-B index >43 recorded in high Andean peaks).",
      "Severe hypoxia and thin atmosphere (50% sea level density) stressing environmental life support systems.",
      "Friable volcanic substrate with fragmented regolith and angular impact boulders."
    ],
    analogyLimitations: [
      "Terrestrial night temperatures (-25 °C) are significantly warmer than the 40 K (-233 °C) deep cryogenic shadow of Shackleton.",
      "The summit crater lake contains liquid water during southern summer, while on the Moon water exists exclusively as cryogenic ice in vacuum."
    ],
    operationalValue: [
      "Accelerated aging analysis of Artemis spacesuit polymers, gold visors, and seals.",
      "Thermal fatigue stress testing of avionics subjected to rapid day-night cycles.",
      "Crew cognitive and physiological performance monitoring under hypoxic and steep terrain stress."
    ],
    metrics: [
      { variable: "UV Radiation", earthValue: "UV >20 (Lethal for unshielded cells)", spaceValue: "Unshielded solar UV-C & cosmic rays", compatibility: "HIGH" },
      { variable: "Atmospheric Pressure", earthValue: "495 hPa (~50% atmosphere)", spaceValue: "Strict vacuum (10⁻¹² hPa)", compatibility: "MEDIUM" },
      { variable: "Minimum Temperature", earthValue: "-25 °C to -30 °C at night", spaceValue: "40 K (-233 °C in PSR)", compatibility: "PARTIAL" },
      { variable: "Rim Slope Angle", earthValue: "28° to 35° on volcanic cone", spaceValue: "30° to 32° crater interior walls", compatibility: "HIGH" }
    ]
  },
  "atacama-yungay": {
    earthImageTitle: "Hyperarid Clay Plains & Perchlorate Crusts",
    earthImageSubtitle: "Yungay Station · Atacama Desert (Chile)",
    earthGeologySummary: "The driest non-polar desert region on Earth, with rainfall averaging under 1 mm per decade. Clay soils laden with anhydrite, calcium/magnesium perchlorates, and undetectable organic matter.",
    earthMineralogy: "Anhydrite (CaSO4), Halite, Nitrates, Perchlorates (ClO4-), and Smectite clays",
    spaceImageTitle: "Fluvio-Lacustrine Delta in Jezero Crater by NASA HiRISE",
    spaceImageSubtitle: "Perseverance Rover Exploration Site · Clay Sediments & Carbonates",
    spaceGeologySummary: "Ancient impact basin that once hosted a deep lake fed by an inflow river, displaying deltaic sediments rich in smectite clays, carbonates, and hyperarid aeolian deposits.",
    spaceMineralogy: "Smectite clays, Magnesium carbonates, Sulfates, and Basaltic pyroxene",
    executiveSummary: "Yungay in the Atacama Desert is NASA's global benchmark hyperarid analog. It uniquely mirrors Mars through soil perchlorates, severe desiccation, and intense UV flux, having served as the testbed for life-detection instruments aboard Viking, Phoenix, Curiosity, and Perseverance.",
    solidAnalogy: [
      "Soil chemistry dominated by oxidants and perchlorates that break down surface amino acids.",
      "Hygroscopic deliquescence: nighttime condensation without liquid rain as the sole hydration mechanism.",
      "Mechanical cohesion of compacted aeolian dust beds ideal for penetrometer and drill trials."
    ],
    analogyLimitations: [
      "21% oxygen atmosphere with standard terrestrial pressure (~900 hPa).",
      "Warmer daytime temperatures (up to +35 °C) compared to Mars' average -60 °C regime."
    ],
    operationalValue: [
      "Deep robotic drilling validation (such as the 2-meter drill on ExoMars Rosalind Franklin).",
      "Rover mobility testing in loose aeolian sands to prevent wheel entrapment hazards.",
      "Development of chemical remediation protocols to neutralize toxic perchlorates before crew habitat entry."
    ],
    metrics: [
      { variable: "Daytime Relative Humidity", earthValue: "< 5% at Yungay", spaceValue: "< 0.1% at Jezero", compatibility: "HIGH" },
      { variable: "Perchlorate Concentration", earthValue: "0.03% to 0.2% by mass", spaceValue: "0.5% to 1.0% in Martian regolith", compatibility: "HIGH" },
      { variable: "Total Organic Carbon", earthValue: "< 10 μg/g (Life's dry limit)", spaceValue: "Trace organics in Gale Crater", compatibility: "HIGH" },
      { variable: "Aeolian Dust Density", earthValue: "0.8 - 1.2 g/cm³", spaceValue: "1.0 - 1.4 g/cm³ on Mars", compatibility: "HIGH" }
    ]
  },
  "mcmurdo-dry-valleys": {
    earthImageTitle: "Snow-Free Polygonal Ground over Cryogenic Permafrost",
    earthImageSubtitle: "Beacon Valley · McMurdo Dry Valleys (Antarctica)",
    earthGeologySummary: "Snow-free hyperarid polar desert. Polygonal contraction ground created by fossil ice wedges >8 million years old protected beneath a 20-50 cm layer of dry rocky lag gravel.",
    earthMineralogy: "Massive subsurface water ice, Beacon quartzose sandstone, Halite, and Sulfates",
    spaceImageTitle: "Cryogenic Volatiles Traps at Shackleton Crater",
    spaceImageSubtitle: "Lunar South Pole & Buried Glacial Sheets of Mars",
    spaceGeologySummary: "Massive subsurface water ice deposits sheltered from solar vacuum by overlying dry regolith, confirmed by orbital radar SHARAD and LRO LAMP.",
    spaceMineralogy: "Water ice (H2O), CO2 dry ice (Mars), Fragmented regolith, and Hydrated minerals",
    executiveSummary: "The McMurdo Dry Valleys are Earth's most precise morphological and thermodynamic analog for in-situ water ice extraction (ISRU) at lunar poles and the buried glaciers of Arcadia Planitia on Mars. Their ancient ice preserved beneath dry regolith achieves a 96% operational fidelity score.",
    solidAnalogy: [
      "Thermodynamic model of sublimation prevention beneath dry protective overburden.",
      "Thermal contraction polygonal networks identical to those imaged by HiRISE on Mars.",
      "Severe polar winter cold (-50 °C to -60 °C) and 300 km/h katabatic winds challenging excavation mechanics."
    ],
    analogyLimitations: [
      "Normal sea-level atmospheric pressure elevating ice sublimation thresholds relative to lunar vacuum.",
      "Endolithic microbial communities residing inside porous sandstone rocks."
    ],
    operationalValue: [
      "Thermal and mechanical drill head development for lunar Artemis ice mining payloads.",
      "Ground-penetrating radar (GPR) calibration to estimate ice table depth prior to landing.",
      "Cryogenic rocket propellant production modeling (LOX/LH2 and LOX/methane)."
    ],
    metrics: [
      { variable: "Subsurface Ice Stability", earthValue: "Preserved >8 Myr at 20 cm depth", spaceValue: "Massive ice at 30-100 cm depth", compatibility: "HIGH" },
      { variable: "Polygonal Geometry", earthValue: "10 to 25 m diameter polygons", spaceValue: "15 to 30 m polygons on Mars", compatibility: "HIGH" },
      { variable: "Atmospheric Humidity", earthValue: "< 0.01 g/m³ (Ultra-dry air)", spaceValue: "Trace vapor on Mars", compatibility: "HIGH" },
      { variable: "Extraction Energy Needed", earthValue: "334 kJ/kg ice melting", spaceValue: "2.8 MJ/kg vacuum sublimation", compatibility: "MEDIUM" }
    ]
  },
  "haughton-crater": {
    earthImageTitle: "Impact Shock Breccias in Polar Desert Terrain",
    earthImageSubtitle: "Haughton Crater · Devon Island (Canadian Arctic)",
    earthGeologySummary: "Complex impact structure 23 km in diameter formed 39 million years ago in dolomites and limestones under a barren, periglacial polar desert climate.",
    earthMineralogy: "Hydrothermal impact breccias, Shatter cones, Pulverized dolomite, and Fine-grained regolith",
    spaceImageTitle: "Stratigraphy of Mount Sharp & Gale Crater",
    spaceImageSubtitle: "154 km Impact Basin · NASA Curiosity Rover Mission",
    spaceGeologySummary: "Deep impact basin featuring an uplifted central peak, layered sedimentary sulfate beds, and impact breccias deposited by the catastrophic collision.",
    spaceMineralogy: "Clay minerals, Magnesium sulfates, Impact glass, Pyroxenes, and Magnetite",
    executiveSummary: "Haughton Crater on Devon Island hosts NASA's Haughton-Mars Project (HMP) research station. For nearly three decades, it has served as a proving ground for Moon and Mars base simulations, pressurized rover tests, and EVA spacewalk navigation across rugged crater terrain.",
    solidAnalogy: [
      "Shatter cones and hypervelocity shock melts indistinguishable from lunar impact regolith.",
      "Dry U-shaped valleys and ejecta ridges matching the terrain traversed by Curiosity and Perseverance.",
      "Extreme geographic and operational isolation testing crew autonomy under mission-like delays."
    ],
    analogyLimitations: [
      "Summer permafrost thaw causing localized fluvial erosion along crater walls.",
      "Presence of arctic tundra vegetation in low-lying valleys."
    ],
    operationalValue: [
      "Habitat usability trials in cylindrical analog modules like the Flashline Mars Arctic Station.",
      "Optimized EVA walking and robotic routing across steep, loose crater scree slopes.",
      "Deep-space communication latency trials with up to 20-minute signal delays."
    ],
    metrics: [
      { variable: "Impact Structure Diameter", earthValue: "23 km diameter", spaceValue: "21 km Shackleton / 154 km Gale", compatibility: "HIGH" },
      { variable: "Shock Deformation", earthValue: "Shatter cones and melt breccias", spaceValue: "Polymict impact breccias", compatibility: "HIGH" },
      { variable: "Rover Route Roughness", earthValue: "0.2 to 2 m angular boulders", spaceValue: "Impact ejecta rocks in Gale", compatibility: "HIGH" },
      { variable: "Logistical Isolation Index", earthValue: "No cell/grid coverage", spaceValue: "4 to 22 min light-time delay", compatibility: "HIGH" }
    ]
  }
};

