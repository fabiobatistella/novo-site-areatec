// Home — Areatec (Luminous Tech Noir) + SEO optimized
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SistemaIntegrado from "@/components/SistemaIntegrado";
import Solucoes from "@/components/Solucoes";
import VeiculoOCRBanner from "@/components/VeiculoOCRBanner";
import DiferenciaisSection from "@/components/DiferenciaisSection";
import CortexSection from "@/components/CortexSection";
import NucleoTecnologico from "@/components/NucleoTecnologico";
import OlhoVivoSection from "@/components/OlhoVivoSection";
import HardwareSection from "@/components/HardwareSection";
import SetoresSection from "@/components/SetoresSection";
import CoberturaNacional from "@/components/CoberturaNacional";
import ExpansaoGlobal from "@/components/ExpansaoGlobal";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { VideoModal } from "@/components/VideoModal";
import SEOHead from "@/components/SEOHead";
import {
  organizationSchema,
  websiteSchema,
  faqSchema,
  cortexAISchema,
  digipareSchema,
} from "@/components/SchemaOrg";

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const YOUTUBE_VIDEO_ID = "oGTjg2QUjUY";
  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  return (
    <>
      <SEOHead
        title="Areatec — Tecnologia para Fiscalização, Estacionamento e Cidades Inteligentes"
        description="A Areatec é a plataforma brasileira que une fiscalização inteligente, estacionamento digital e videomonitoramento em um único ecossistema. Presente em mais de 200 cidades há 30 anos."
        path="/"
        jsonLd={[organizationSchema, websiteSchema, faqSchema, cortexAISchema, digipareSchema]}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection onOpenVideo={openVideo} />
          <SistemaIntegrado />
          <Solucoes />
          <VeiculoOCRBanner onOpenVideo={openVideo} />
          <DiferenciaisSection />
          <CortexSection />
          <NucleoTecnologico />
          <OlhoVivoSection onOpenVideo={openVideo} />
          <HardwareSection />
          <SetoresSection />
          <CoberturaNacional />
          <ExpansaoGlobal />
          <BlogSection />
          <CTASection onOpenVideo={openVideo} />
        </main>
        <Footer />
        <VideoModal isOpen={isVideoOpen} onClose={closeVideo} videoId={YOUTUBE_VIDEO_ID} />
      </div>
    </>
  );
}
