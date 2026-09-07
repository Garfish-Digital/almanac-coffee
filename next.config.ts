import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Let Next generate AVIF/WebP variants from the JPG masters.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires quality values to be allowlisted. 82 for photography,
    // 75 for the flat tonal art where the extra bytes buy nothing.
    qualities: [75, 82],
    // The only images we optimize are our own, out of /public/images.
    localPatterns: [{ pathname: "/images/**", search: "" }],
  },
};

export default nextConfig;
