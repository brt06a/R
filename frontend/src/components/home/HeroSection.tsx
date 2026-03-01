import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { ArrowRight, Lightbulb, Star, Shield, Zap } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm mb-6">
          <Star className="h-3.5 w-3.5" />
          <span>India&apos;s #1 Idea Marketplace</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="text-white">Where </span>
          <span className="gradient-text">Ideas</span>
          <span className="text-white"> Become </span>
          <span className="gradient-text">Value</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Submit your innovative ideas, connect with buyers, and earn money.
          Join thousands of innovators who are monetizing their creativity on IdeaNax.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auth/signup">
            <Button size="lg" className="group">
              Start Submitting Ideas
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="outline" size="lg">
              How It Works
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { icon: Lightbulb, label: '10,000+', sublabel: 'Ideas Submitted' },
            { icon: Shield, label: '₹50L+', sublabel: 'Paid to Creators' },
            { icon: Zap, label: '100+', sublabel: 'Categories' },
          ].map(({ icon: Icon, label, sublabel }) => (
            <div key={sublabel} className="glass-card p-4 text-center">
              <Icon className="h-5 w-5 text-primary-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">{label}</p>
              <p className="text-xs text-gray-400">{sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
