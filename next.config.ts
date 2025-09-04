import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // i18n: {
  //   locales: ["en", "km"], // English and Khmer
  //   defaultLocale: "en", // Default language
  // },
  images: {
    // allow external images from these hosts (used in the project)
    domains: [
      "media.istockphoto.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
  },
};

export default nextConfig;
