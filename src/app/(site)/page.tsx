import Heroes from "@/components/landing-page/heroes";
import PriceCards from "@/components/landing-page/price-cards";
import TestimonialCarousel from "@/components/landing-page/testimonial-card";
import TitleSection from "@/components/landing-page/title-section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <section>
      <div
        className="
        overflow-hidden
        px-4
        sm:px-6
        mt-10
        mb-4
        gap-4

        flex
        flex-col
        md:justify-center
        items-center"
      >
        <TitleSection
          pill="💫 Conceive, Create, Collaborate, Circulate"
          title="All your Ideas at one place, ready to be shared"
        ></TitleSection>
        <Button variant="default" size="default" className="group">
          Enter Boat-Note
          <ArrowRight className="w-4 h-4 ml-1 group-hover:rotate-[360deg] duration-300" />
        </Button>
        <Heroes />
        <TitleSection
          title="Folks love it. You will too💚"
          pill="Testimonials"
        ></TitleSection>
        <div className="mt-10 mb-20">
          <TestimonialCarousel></TestimonialCarousel>
        </div>
        <TitleSection
          subheading="Unlock collabrations with your team, unlimited* file upload, New AI features and Premium support"
          title="Subscribe to unlock features"
          pill="Choose a plan"
        ></TitleSection>
        <PriceCards/>

      </div>
    </section>
  );
};


export default HomePage;