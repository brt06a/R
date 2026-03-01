import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { CTASection } from '../components/home/CTASection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
