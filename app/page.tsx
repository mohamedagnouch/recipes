import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MyRecipesCarousel from "./components/MyRecipesCarousel";
import StatsSection from "./components/StatsSection";
import TeamSection from "./components/TeamSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <MyRecipesCarousel />
      <TeamSection />
      <StatsSection />
      <Footer />
    </main>
  );
}

