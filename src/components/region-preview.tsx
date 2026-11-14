"use client";

import { useState } from "react";
import { regionPreviewUrl } from "@/lib/map-config";
import { TerrainArt } from "./terrain-art";

export function RegionPreview({ regionId }: { regionId: string }) {
  const url = regionPreviewUrl(regionId);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  if (!url) return <TerrainArt />;
  if (url === failedUrl) return <div className="preview-unavailable">Imagen no disponible</div>;
  // Una tesela real de contexto; no se presenta como producto instrumental.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="satellite-preview" src={url} alt="" loading="lazy" onError={() => setFailedUrl(url)} />;
}
