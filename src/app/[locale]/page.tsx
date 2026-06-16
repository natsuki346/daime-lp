import Hero from "@/components/Hero";
import StatSection from "@/components/StatSection";
import TagsSection from "@/components/TagsSection";
import JourneySection from "@/components/JourneySection";
import QuotesSection from "@/components/QuotesSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <StatSection />
      <TagsSection />
      <JourneySection />
      <QuotesSection />
      <FinalCta />
      <Footer />
    </main>
  );
}
