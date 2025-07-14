import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Preview from "@/components/Preview";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import CTA from "@/components/Cta";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/Faq";
import { AnimatedTestimonialsDemo } from "@/components/Testimonial";

const Home = () => {
  return (
    <main className="">
      <Hero />
      <Stats />
      <Features />
      <About />
      <HowItWorks />
      <Preview />
      <AnimatedTestimonialsDemo />
      <Roadmap />
      <FAQ />
      <CTA />
    </main>
  );
};

export default Home;
