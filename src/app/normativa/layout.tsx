import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Normativas aplicables | STRUXAI",
  description:
    "Marco regulatorio completo del calculo, verificacion y construccion sostenible de edificios. Cubre Espana, USA, Australia, Chile y Colombia.",
  openGraph: {
    title: "Normativas aplicables | STRUXAI",
    description: "Marco regulatorio completo del calculo y verificacion estructural",
    url: "https://struxai.nexusfinlabs.com/normativa",
    siteName: "STRUXAI",
    type: "article",
  },
  alternates: {
    canonical: "https://struxai.nexusfinlabs.com/normativa",
  },
};

export default function NormativaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
