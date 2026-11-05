import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is fully static, so build it to plain HTML/CSS/JS in out/ and serve it from Cloudflare.
  output: "export",
  images: {
    // There's no image optimisation server on static hosting, so images are served as-is.
    // Keep files in public/ reasonably sized (e.g. ~1600px wide, compressed WebP/JPEG).
    unoptimized: true,
  },
};

export default nextConfig;
