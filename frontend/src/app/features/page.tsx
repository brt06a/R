import type { Metadata } from 'next';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import {
  Shield, Zap, Globe, DollarSign, Lock, BarChart3, Users, Clock,
  Upload, Smartphone, Bell, FileCheck, Award, Headphones, RefreshCw, TrendingUp
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore all features of IdeaNax - the complete idea monetization platform.',
};

const features = [
  { icon: Shield, title: 'IP Protection', description: 'Every idea is legally documented with timestamps and digital signatures, protecting your intellectual property throughout the process.', category: 'Security' },
  { icon: Zap, title: 'Instant Submission', description: 'Our streamlined multi-step form lets you submit a complete idea in under 10 minutes with step-by-step guidance.', category: 'Usability' },
  { icon: Globe, title: '100+ Categories', description: 'From AI to AgriTech, Blockchain to BioTech — we cover every industry vertical with specialized reviewers.', category: 'Coverage' },
  { icon: DollarSign, title: 'Direct Bank Payouts', description: 'Earnings go directly to your bank account via Cashfree Payouts. Minimum withdrawal just ₹500.', category: 'Payments' },
  { icon: Lock, title: 'Bank-Grade Security', description: 'Data encrypted at rest and in transit. Supabase infrastructure with row-level security policies.', category: 'Security' },
  { icon: BarChart3, title: 'Real-Time Tracking', description: 'Track every idea from submission through review, approval, listing, and sale in real-time.', category: 'Analytics' },
  { icon: Users, title: 'Growing Marketplace', description: 'Access a growing network of corporate buyers, investors, and entrepreneurs looking for innovative ideas.', category: 'Community' },
  { icon: Clock, title: '48-Hour Review', description: 'Our expert panel reviews ideas within 48 business hours with detailed feedback on rejections.', category: 'Process' },
  { icon: Upload, title: 'File Attachments', description: 'Attach PDFs, PowerPoints, Word documents, images, and videos to support your idea submission.', category: 'Usability' },
  { icon: Smartphone, title: 'Mobile Responsive', description: 'Full functionality on any device. Submit, track, and manage ideas from your smartphone.', category: 'Usability' },
  { icon: Bell, title: 'Smart Notifications', description: 'Get notified instantly about idea status updates, new messages, and payout confirmations.', category: 'Communication' },
  { icon: FileCheck, title: 'Multiple Sale Types', description: 'Choose from Full Sale, License, Fixed Price, or Auction — whatever suits your idea best.', category: 'Flexibility' },
  { icon: Award, title: 'Earning Estimates', description: 'Each category shows realistic earning ranges based on historical sales data.', category: 'Analytics' },
  { icon: Headphones, title: '24/7 Support', description: 'Dedicated support team available via email and chat for any platform-related issues.', category: 'Support' },
  { icon: RefreshCw, title: 'Token Refresh', description: 'Secure JWT authentication with automatic token rotation for seamless sessions.', category: 'Security' },
  { icon: TrendingUp, title: 'Market Insights', description: 'Access category trends and demand reports to submit ideas in high-value areas.', category: 'Analytics' },
];

export default function FeaturesPage() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen gradient-bg pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Platform <span className="gradient-text">Features</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Everything you need to successfully monetize your ideas, built for India&apos;s innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, description, category }) => (
              <div key={title} className="glass-card p-5 hover:border-primary-500/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-primary-600/10 group-hover:bg-primary-600/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary-400" />
                  </div>
                  <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{category}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
