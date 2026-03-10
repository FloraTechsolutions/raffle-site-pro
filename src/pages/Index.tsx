import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RafflesSection from "@/components/RafflesSection";
import RankingWinnersSection from "@/components/RankingWinnersSection";
import Footer from "@/components/Footer";
import SocialProof from "@/components/SocialProof";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <RafflesSection />
    <RankingWinnersSection />
    <Footer />
    <SocialProof />
    <WhatsAppFAB />
  </div>
);

export default Index;
