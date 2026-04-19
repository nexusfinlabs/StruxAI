import { CapabilitiesSection } from "@/components/landing/CapabilitiesSection";
import { DashboardCta } from "@/components/landing/DashboardCta";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { ImpactSection } from "@/components/landing/ImpactSection";
import { Navbar } from "@/components/landing/Navbar";
import { ProcessTimeline } from "@/components/landing/ProcessTimeline";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { StatsBar } from "@/components/landing/StatsBar";
import { TrustBar } from "@/components/landing/TrustBar";
import { UseCasesSection } from "@/components/landing/UseCasesSection";
import { ValueGrid } from "@/components/landing/ValueGrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <ValueGrid />
        <ProcessTimeline />
        <StatsBar />
        <CapabilitiesSection />
        <ProductShowcase />
        <UseCasesSection />
        <ImpactSection />
        <DashboardCta />
      </main>
      <Footer />
    </>
  );
}
