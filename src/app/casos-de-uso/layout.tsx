import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casos de uso - STRUXAI (interno)",
  description: "Pagina interna de testing. No indexada.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function CasosDeUsoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
