import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { ArrowRight, Coins } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative glass-card p-10 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-purple-600/20" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Coins className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Get 15 FREE coins on signup</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Monetize Your Ideas?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Join thousands of innovators who are already earning with IdeaNax.
              Start free — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="group">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
