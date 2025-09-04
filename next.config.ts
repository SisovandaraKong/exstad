import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "media.istockphoto.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
  },
  devIndicators: {
    buildActivity: false, // disables the dev indicator completely
  },
};

export default nextConfig;
