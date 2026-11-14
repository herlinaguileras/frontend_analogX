/** Ilustración vectorial decorativa, sin coordenadas ni mediciones geográficas. */
export function TerrainArt({ variant = "earth" }: { variant?: "earth" | "mars" | "moon" }) {
  const sky = variant === "mars" ? "#563c3a" : variant === "moon" ? "#171b2c" : "#555b90";
  const mountain = variant === "mars" ? "#7a4e3c" : variant === "moon" ? "#626371" : "#70788e";
  return <svg className="terrain-art" viewBox="0 0 600 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="600" height="220" fill={sky} /><path d="M0 83c120-35 200 35 320-2s180-28 280-8v147H0Z" fill={variant === "earth" ? "#b3979e" : "#917263"} opacity=".6" />
    <path d="m0 156 60-19 44-53 22 13 58 48 52-28 50 29 78-79 20 22 42 57 48-15 26 23 100-29v95H0Z" fill={mountain} />
    <path d="m286 146 78-79 20 22 42 57-56-25-23 8-18-6Z" fill="#dad1cf" opacity=".4" />
    <path d="M0 164c120 12 160-7 260-2s210 20 340-6v64H0Z" fill={variant === "earth" ? "#c2bfca" : variant === "moon" ? "#82818c" : "#b57f59"} />
    <path d="M0 200c155-22 280 25 600-11M0 180c230 15 400-10 600-1" stroke="#fff" opacity=".12" fill="none" />
  </svg>;
}
