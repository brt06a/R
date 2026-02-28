import React from 'react';
import { PenSquare, CheckCircle, TrendingUp, Banknote } from 'lucide-react';

const steps = [
  { icon: PenSquare, step: '01', title: 'Submit Your Idea', description: 'Fill out our multi-step form with your problem, solution, and supporting files. Costs just 5 coins.' },
  { icon: CheckCircle, step: '02', title: 'Review Process', description: 'Our expert team reviews your idea for quality, originality, and market potential within 48 hours.' },
  { icon: TrendingUp, step: '03', title: 'Listed for Sale', description: 'Approved ideas are listed on our marketplace and matched with potential buyers and investors.' },
  { icon: Banknote, step: '04', title: 'Get Paid', description: 'Once your idea sells, earnings are credited to your wallet. Withdraw anytime to your bank account.' },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How <span className="gradient-text">IdeaNax</span> Works
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From idea to income in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, step, title, description }, index) => (
            <div key={step} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary-500/50 to-transparent z-10" />
              )}
              <div className="glass-card p-5 text-center hover:border-primary-500/30 transition-all duration-300">
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center mx-auto">
                    <Icon className="h-6 w-6 text-primary-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
