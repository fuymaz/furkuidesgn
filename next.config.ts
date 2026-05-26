import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Allow phone/tablet on the same LAN to load Next.js dev resources (HMR, chunks).
  // Without this, JS bundles get blocked and framer-motion's initial={opacity:0}
  // styles never animate to visible — page looks blank on mobile.
  // Add additional LAN IPs here if you preview from multiple devices.
  allowedDevOrigins: ["192.168.1.190"],
};

export default withNextIntl(nextConfig);
