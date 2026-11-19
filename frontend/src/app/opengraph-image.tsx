import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteDetails } from "@/data/site";

export const alt = "Grand Sapphire Resorts in Thankamony, Idukki, Kerala";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), "public", siteDetails.image));
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "#122e22", backgroundImage: `url(data:image/jpeg;base64,${photo.toString("base64")})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%", height: "100%", padding: 64, backgroundColor: "rgba(13,27,46,0.65)", color: "#f8f5ec" }}>
        <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 24 }}>{siteDetails.name}</div>
        <div style={{ fontSize: 36 }}>Thankamony · Idukki · Kerala</div>
      </div>
    </div>, size,
  );
}
