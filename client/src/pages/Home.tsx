// Home — Areatec Original (Luminous Tech Noir)
// Assembles all sections in the correct order
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

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const YOUTUBE_VIDEO_ID = "oGTjg2QUjUY";

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
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
      <Footer />
      <VideoModal isOpen={isVideoOpen} onClose={closeVideo} videoId={YOUTUBE_VIDEO_ID} />
    </div>
  );
}
