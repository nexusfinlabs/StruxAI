// import { CapabilitiesSection } from "@/components/landing/CapabilitiesSection";  // eliminado del home
// import { Building3DSection } from "@/components/landing/Building3DSection";  // movido a /casos-de-uso
// import { TimberBuildingSection } from "@/components/landing/TimberBuildingSection";  // movido a /casos-de-uso
import { StructuralFEMSection } from "@/components/landing/StructuralFEMSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { Navbar } from "@/components/landing/Navbar";
import { ProcessTimeline } from "@/components/landing/ProcessTimeline";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { StatsBar } from "@/components/landing/StatsBar";
import { TrustBar } from "@/components/landing/TrustBar";
import { UseCasesSection } from "@/components/landing/UseCasesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* <Building3DSection /> movido a /casos-de-uso */}
        <StructuralFEMSection />
        {/* <TimberBuildingSection /> movido a /casos-de-uso */}
        <TrustBar />
<ProcessTimeline />
        <StatsBar />
        <ProductShowcase />
        <UseCasesSection />
</main>
      <Footer />
    </>
  );
}
