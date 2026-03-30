import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "./aboutSection/page";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <ServicesSection></ServicesSection>
      <AboutSection></AboutSection>
      <Testimonials></Testimonials>
    </div>
  );
}
