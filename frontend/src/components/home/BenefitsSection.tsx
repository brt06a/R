import React from 'react';
import { TrendingUp, Shield, Coins, Award } from 'lucide-react';

const benefits = [
  { icon: TrendingUp, title: 'Earn ₹5,000 to ₹10,00,000', description: 'Our creators have earned anywhere from a few thousand to lakhs, depending on the quality and category of their idea.' },
  { icon: Shield, title: 'Legal IP Protection', description: 'Every submission is legally documented. You get a digital record of your idea submission with timestamp.' },
  { icon: Coins, title: 'Low Barrier to Entry', description: 'Just 5 coins per submission. With 15 free coins on signup, your first 3 ideas are on us!' },
  { icon: Award, title: 'Expert Review Panel', description: 'Ideas are reviewed by industry experts who ensure only quality, marketable ideas get approved.' },
];

export const BenefitsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose <span className="gradient-text">IdeaNax</span>?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            We provide everything an innovator needs to successfully commercialize their ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 glass-card p-5 hover:border-primary-500/30 transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
