import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photos. Remove once real images are in public/.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
