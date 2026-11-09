import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

// The preview card shown when the site is shared (LinkedIn, WhatsApp, Slack, iMessage...).
// Generated once at build time from the site content, in the same colours as the hero.
export const dynamic = "force-static";
export const alt = `${site.name}: ${site.intro}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#556b2f",
          color: "#f6f3e8",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", fontSize: 120, fontWeight: 700, letterSpacing: -4 }}>
          hi, i&apos;m {site.firstName.toLowerCase() + "!"}
          <div style={{ width: 12, height: 100, marginLeft: 12, marginBottom: 18, background: "#ffe08a" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 44, lineHeight: 1.25, maxWidth: 900, color: "#e6e2d0" }}>{site.intro}</div>
          <div style={{ display: "flex", fontSize: 32, color: "#ffe08a" }}>{site.website}</div>
        </div>
      </div>
    ),
    size,
  );
}
