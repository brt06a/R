import React from 'react';
import { Shield, Zap, Globe, DollarSign, Lock, BarChart3, Users, Clock } from 'lucide-react';

const features = [
  { icon: Shield, title: 'IP Protection', description: 'Your ideas are protected with legal documentation and secure transfer protocols.' },
  { icon: Zap, title: 'Instant Submission', description: 'Submit your idea in minutes with our streamlined multi-step form.' },
  { icon: Globe, title: '100+ Categories', description: 'From AI to AgriTech, we cover every industry and niche market.' },
  { icon: DollarSign, title: 'Earn Real Money', description: 'Get paid directly to your bank account with our secure payout system.' },
  { icon: Lock, title: 'Bank-Grade Security', description: 'Your data is encrypted and stored securely on Supabase infrastructure.' },
  { icon: BarChart3, title: 'Transparent Process', description: 'Track your idea status from submission to sale in real-time.' },
  { icon: Users, title: 'Growing Community', description: 'Join thousands of innovators and connect with potential buyers.' },
  { icon: Clock, title: 'Fast Review', description: 'Our team reviews ideas quickly so you start earning sooner.' },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to <span className="gradient-text">Monetize Your Ideas</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A complete platform built for innovators who want to turn their creativity into income.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="glass-card p-5 hover:border-primary-500/30 transition-all duration-300 group">
              <div className="p-2.5 rounded-xl bg-primary-600/10 w-fit mb-3 group-hover:bg-primary-600/20 transition-colors">
                <Icon className="h-5 w-5 text-primary-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
