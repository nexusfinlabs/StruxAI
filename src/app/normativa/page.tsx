import fs from "fs";
import path from "path";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { NormativaPage } from "@/components/normativa/NormativaPage";

export const dynamic = "force-static";
export const revalidate = 3600;

export default function Page() {
  const docsDir = path.join(process.cwd(), "src/docs/normativa");
  const contentEs = fs.readFileSync(path.join(docsDir, "es.md"), "utf-8");
  const contentEn = fs.readFileSync(path.join(docsDir, "en.md"), "utf-8");

  return (
    <>
      <Navbar />
      <NormativaPage contentEs={contentEs} contentEn={contentEn} />
      <Footer />
    </>
  );
}
