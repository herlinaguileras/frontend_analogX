import type { CSSProperties } from "react";

const paths = {
  explore: "m12 3 8 5v8l-8 5-8-5V8l8-5Zm0 0v18M4 8l8 5 8-5",
  compare: "M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4",
  science: "M9 3h6m-5 0v7L5 19a1 1 0 0 0 1 2h12a1 1 0 0 0 1-2l-5-9V3M8 15h8",
  book: "M12 5v16m0-16C9 3 6 3 3 4v15c3-1 6-1 9 2 3-3 6-3 9-2V4c-3-1-6-1-9 1Z",
  search: "m21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  arrow: "M4 12h16m-6-6 6 6-6 6",
  pin: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
  layers: "m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5",
  target: "M12 2v4m0 12v4M2 12h4m12 0h4M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  info: "M12 11v6m0-10v.1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  check: "m5 12 4 4L19 6",
  close: "m6 6 12 12M6 18 18 6",
  chevron: "m9 5 7 7-7 7",
  globe: "M2 12h20M12 2c6 6 6 14 0 20-6-6-6-14 0-20ZM22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  clock: "M12 6v6l4 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
} as const;

export function Icon({ name, size = 18, style }: { name: keyof typeof paths; size?: number; style?: CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}><path d={paths[name]} /></svg>;
}
