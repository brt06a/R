import Link from "next/link";
import FeaturedCard from "@/components/cards/FeaturedCard";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";
import HeroSection from "@/components/sections/HeroSection";
import { MOCK_IDEAS, CATEGORIES } from "@/lib/constants";

export default function HomePage() {
  const featuredIdeas = MOCK_IDEAS.filter((idea) => idea.featured);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSection />

      {/* Featured Ideas */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Featured <span className="gradient-text">Ideas</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Discover the most innovative ideas on the platform, hand-picked by our team.
              </p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredIdeas.map((idea) => (
              <StaggerItem key={idea.id}>
                <FeaturedCard {...idea} />
              </StaggerItem>
            ))}
          </StaggerChildren>

          <ScrollReveal delay={0.3} className="text-center mt-12">
            <Link href="/explore">
              <button className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all">
                Explore All Ideas →
              </button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Browse by <span className="gradient-text">Category</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Find ideas in your area of interest.
              </p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => (
              <StaggerItem key={category.id}>
                <Link href={`/explore?category=${category.id}`}>
                  <div className="group p-6 rounded-2xl glass border border-white/10 hover:border-violet-500/30 cursor-pointer transition-all hover:scale-105 text-center">
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                      {category.label}
                    </h3>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                How It <span className="gradient-text">Works</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "💡", step: "01", title: "Submit Your Idea", desc: "Write up your innovative idea with details, pricing, and licensing options." },
              { icon: "🔍", step: "02", title: "Get Discovered", desc: "Buyers browse and discover your idea through our search and recommendation engine." },
              { icon: "💰", step: "03", title: "Earn Revenue", desc: "Close deals, earn from licensing, and receive payouts directly to your account." },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="p-8 rounded-2xl glass border border-white/10 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-xs font-bold text-violet-400 mb-2">STEP {item.step}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-violet-900/20 to-cyan-900/20 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10,000+", label: "Ideas Listed" },
              { value: "₹5Cr+", label: "Total Payouts" },
              { value: "50,000+", label: "Active Users" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Ready to monetize your <span className="gradient-text">ideas?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of innovators who are turning their ideas into income on IdeaNax.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all shadow-lg shadow-violet-500/25">
                  Start Selling Ideas →
                </button>
              </Link>
              <Link href="/explore">
                <button className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all">
                  Browse Marketplace
                </button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
