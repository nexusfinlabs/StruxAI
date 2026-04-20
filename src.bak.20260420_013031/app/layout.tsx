import { AppProviders } from "@/providers/AppProviders";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://struxai.nexusfinlabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "STRUXAI | Structural analysis with AI for Revit, BIM & FEM",
  description:
    "Automate BIM → FEM with AI. Connect Revit, validate models, run structural analysis, and return traceable results to your technical workflow.",
  keywords: [
    "structural analysis AI",
    "Revit FEM",
    "BIM to FEM",
    "structural engineering automation",
    "BIM structural software",
    "AI for structural engineering",
  ],
  openGraph: {
    title: "STRUXAI | Structural analysis with AI for Revit, BIM & FEM",
    description:
      "Automate BIM → FEM with AI. Connect Revit, validate models, and return traceable results.",
    url: siteUrl,
    siteName: "STRUXAI",
    locale: "en_US",
    type: "website",
    images: [{ url: "/brand-hero.png", alt: "STRUXAI product preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "STRUXAI | Structural analysis with AI",
    description:
      "Less manual work. More speed. More control. More traceability.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
