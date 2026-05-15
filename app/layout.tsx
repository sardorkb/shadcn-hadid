import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ServiceWorkerRegister } from "@/components/pwa/sw-register";

/* ── PWA viewport / theme ───────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1C3A27" },
    { media: "(prefers-color-scheme: dark)",  color: "#0d1f14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",          /* safe-area on iPhone notch */
};

export const metadata: Metadata = {
  title: {
    default: "Hadid Beton ERP",
    template: "%s — Hadid Beton ERP",
  },
  description: "Ready-mix concrete operations platform — production, fleet, quality, finance.",
  applicationName: "Hadid Beton ERP",
  authors: [{ name: "Hadid Beton" }],
  keywords: ["ERP", "concrete", "ready-mix", "beton", "Uzbekistan"],

  /* PWA */
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Hadid ERP",
    startupImage: [
      { url: "/icons/icon-512.png" },
    ],
  },

  /* Icons */
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/logo-icon.png",
  },

  /* Open Graph (share previews) */
  openGraph: {
    type: "website",
    title: "Hadid Beton ERP",
    description: "Ready-mix concrete operations platform.",
    siteName: "Hadid Beton ERP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" closeButton />
        </ThemeProvider>

        {/* PWA service worker — runs client-side only */}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
