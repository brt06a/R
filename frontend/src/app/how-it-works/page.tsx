import type { Metadata } from 'next';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { PenSquare, CheckCircle, TrendingUp, Banknote, ArrowDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how IdeaNax works - from idea submission to earning money.',
};

const steps = [
  {
    icon: PenSquare,
    step: '01',
    title: 'Create Your Account',
    description: 'Sign up with email or mobile. Verify via OTP. Receive 15 free coins instantly — enough for 3 idea submissions.',
    color: 'text-primary-400',
    bg: 'bg-primary-600/20 border-primary-500/30',
  },
  {
    icon: PenSquare,
    step: '02',
    title: 'Submit Your Idea',
    description: 'Select a category, describe the problem and solution, attach supporting files, choose your sale type. Costs 5 coins.',
    color: 'text-blue-400',
    bg: 'bg-blue-600/20 border-blue-500/30',
  },
  {
    icon: CheckCircle,
    step: '03',
    title: 'Expert Review',
    description: 'Our panel of industry experts reviews your idea within 48 hours for quality, originality, and market potential.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-600/20 border-yellow-500/30',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Listed on Marketplace',
    description: 'Approved ideas are listed and matched with potential buyers, investors, and companies looking for innovation.',
    color: 'text-purple-400',
    bg: 'bg-purple-600/20 border-purple-500/30',
  },
  {
    icon: Banknote,
    step: '05',
    title: 'Earn Money',
    description: 'When your idea sells, earnings are credited to your wallet. Withdraw to your bank anytime (min ₹500, 5% fee).',
    color: 'text-green-400',
    bg: 'bg-green-600/20 border-green-500/30',
  },
];

export default function HowItWorksPage() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen gradient-bg pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              How <span className="gradient-text">IdeaNax</span> Works
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              From idea to income in five simple steps.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map(({ icon: Icon, step, title, description, color, bg }, index) => (
              <div key={step}>
                <div className="glass-card p-6 flex gap-5">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center ${bg}`}>
                    <Icon className={`h-7 w-7 ${color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 font-mono">STEP {step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="h-5 w-5 text-primary-500/50" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Coin System</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { plan: 'Starter', price: '₹49', coins: 30 },
                { plan: 'Basic', price: '₹99', coins: 79 },
                { plan: 'Standard', price: '₹199', coins: 159 },
                { plan: 'Premium', price: '₹499', coins: 369 },
              ].map(({ plan, price, coins }) => (
                <div key={plan} className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-sm font-medium text-white">{plan}</p>
                  <p className="text-2xl font-bold text-primary-400">{coins}</p>
                  <p className="text-xs text-gray-400">coins</p>
                  <p className="text-sm text-white font-semibold mt-1">{price}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">* New users receive 15 free coins on signup. Coins are non-refundable.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
