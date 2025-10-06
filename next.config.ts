import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow external images from these hosts (used in the project)

    domains: [
      "media.istockphoto.com",
      "encrypted-tbn0.gstatic.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "job-seek-seven.vercel.app",
      "exstad-api.daradev.me", 
    ],
  },
};

export default nextConfig;
