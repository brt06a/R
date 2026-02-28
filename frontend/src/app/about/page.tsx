import type { Metadata } from 'next';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Target, Heart, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about IdeaNax - our mission, team, and story.',
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen gradient-bg pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              About <span className="gradient-text">IdeaNax</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Empowering India&apos;s innovators to monetize their best ideas.
            </p>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-primary-600/20">
                  <Target className="h-6 w-6 text-primary-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                IdeaNax was founded with a single mission: to create a bridge between creative minds and commercial opportunities.
                India is home to millions of brilliant thinkers, engineers, and entrepreneurs who have game-changing ideas but lack
                the platform to monetize them. We built IdeaNax to change that.
              </p>
              <p className="text-gray-300 leading-relaxed mt-3">
                We believe every idea has value. Whether it&apos;s a software solution, a business model, a product concept, or a
                scientific breakthrough — IdeaNax provides the infrastructure to protect, market, and sell your intellectual property.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Target, title: 'Our Vision', desc: 'To become India\'s largest marketplace for intellectual property and idea commercialization.', color: 'text-primary-400', bg: 'bg-primary-600/20' },
                { icon: Heart, title: 'Our Values', desc: 'Transparency, fairness, innovation, and creator-first thinking drive every decision we make.', color: 'text-red-400', bg: 'bg-red-600/20' },
                { icon: Zap, title: 'Our Impact', desc: 'We\'ve facilitated the sale of thousands of ideas, paying out over ₹50 lakh to creators.', color: 'text-yellow-400', bg: 'bg-yellow-600/20' },
              ].map(({ icon: Icon, title, desc, color, bg }) => (
                <div key={title} className="glass-card p-5 text-center">
                  <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`h-6 w-6 ${color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-400">{desc}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-6">Our Team</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Arjun Mehta', role: 'CEO & Co-founder', initial: 'A' },
                  { name: 'Priya Sharma', role: 'CTO', initial: 'P' },
                  { name: 'Rohit Kumar', role: 'Head of Product', initial: 'R' },
                  { name: 'Sneha Iyer', role: 'Head of Operations', initial: 'S' },
                ].map(({ name, role, initial }) => (
                  <div key={name} className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary-600/30 border border-primary-500/30 flex items-center justify-center text-2xl font-bold text-primary-400 mx-auto mb-2">
                      {initial}
                    </div>
                    <p className="text-sm font-medium text-white">{name}</p>
                    <p className="text-xs text-gray-400">{role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
