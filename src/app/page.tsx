import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { FeaturedWork, ExperienceTimeline, StudyTeaser, CTA } from "@/components/HomeSections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturedWork />
        <ExperienceTimeline />
        <StudyTeaser />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
