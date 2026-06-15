import Hero from "@/components/Hero";
import StatSection from "@/components/StatSection";
import HowItWorks from "@/components/HowItWorks";
import TagsSection from "@/components/TagsSection";
import GrowthStages from "@/components/GrowthStages";
import QuotesSection from "@/components/QuotesSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <StatSection />
      <HowItWorks />
      <TagsSection />
      <GrowthStages />
      <QuotesSection />
      <FinalCta />
      <Footer />
    </main>
  );
}
