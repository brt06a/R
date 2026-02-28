import type { Metadata } from 'next';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'IdeaNax Terms & Conditions - understand your rights and obligations.',
};

export default function TermsPage() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen gradient-bg pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">Terms & Conditions</h1>
            <p className="text-gray-400">Last updated: January 1, 2025</p>
          </div>

          <div className="glass-card p-8 space-y-8">
            {[
              {
                title: '1. Acceptance of Terms',
                content: 'By accessing or using IdeaNax ("Platform"), you agree to be bound by these Terms & Conditions. If you do not agree to these terms, do not use the platform. These terms constitute a legally binding agreement between you and IdeaNax Technologies Pvt. Ltd.',
              },
              {
                title: '2. Account Registration',
                content: 'You must be at least 18 years of age to create an account. You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized use of your account. IdeaNax reserves the right to terminate accounts that violate these terms.',
              },
              {
                title: '3. Idea Submission and Intellectual Property Transfer',
                content: null,
                highlight: 'BY SUBMITTING AN IDEA AND PAYING THE SUBMISSION FEE, YOU IRREVOCABLY TRANSFER ALL INTELLECTUAL PROPERTY RIGHTS AND OWNERSHIP OF THE IDEA TO IDEANAX. THIS INCLUDES ALL PATENTS, COPYRIGHTS, TRADEMARKS, TRADE SECRETS, AND OTHER INTELLECTUAL PROPERTY RIGHTS ASSOCIATED WITH THE SUBMITTED IDEA. ANY REUSE, RESALE, REDISTRIBUTION, OR PUBLICATION OF THAT IDEA WITHOUT IDEANAX\'S WRITTEN PERMISSION MAY RESULT IN LEGAL ACTION UNDER APPLICABLE INTELLECTUAL PROPERTY LAWS.',
                extra: 'You represent and warrant that: (a) the idea is original and does not infringe on third-party rights; (b) you have the full right to transfer ownership; (c) the idea is not subject to any existing agreements, licenses, or encumbrances; (d) the idea does not contain any malicious, illegal, or harmful content.',
              },
              {
                title: '4. Coin System',
                content: 'IdeaNax uses a virtual coin system for idea submissions. Coins are purchased with real money and used on the platform. Submission cost: 5 coins per idea. New accounts receive 15 free coins. COINS ARE NON-REFUNDABLE once purchased. Coins have no cash value and cannot be exchanged for money. IdeaNax reserves the right to modify coin pricing.',
              },
              {
                title: '5. Payment Terms',
                content: 'Payments are processed by Razorpay. By making a payment, you agree to Razorpay\'s terms. All prices are in Indian Rupees (INR). We do not offer refunds on coin purchases. In case of payment failure, coins will not be credited. Contact support within 48 hours for payment discrepancies.',
              },
              {
                title: '6. Withdrawal Policy',
                content: 'Minimum withdrawal amount: ₹500. Maximum: your current wallet balance. A 5% platform fee is deducted from all withdrawals. Processing time: 3-7 business days. Withdrawals are processed via Cashfree Payouts. Bank account details must be accurate; IdeaNax is not liable for failed transfers due to incorrect details.',
              },
              {
                title: '7. Prohibited Content',
                content: 'The following idea submissions are strictly prohibited: (a) illegal activities or content; (b) content infringing third-party intellectual property; (c) adult or explicit content; (d) hateful, discriminatory, or violent content; (e) false or misleading information; (f) spam or artificially generated content. Violations may result in account termination and legal action.',
              },
              {
                title: '8. Account Termination',
                content: 'IdeaNax reserves the right to suspend or terminate your account without notice for: violation of these terms; fraudulent activity; chargebacks or payment disputes; providing false information; any activity that harms the platform or other users. Upon termination, your access to submitted ideas, wallet, and data may be restricted.',
              },
              {
                title: '9. Limitation of Liability',
                content: 'To the maximum extent permitted by law, IdeaNax shall not be liable for any indirect, incidental, special, consequential, or punitive damages. Our total liability shall not exceed the amount you paid to IdeaNax in the 30 days preceding the claim. IdeaNax does not guarantee any earnings from idea submissions.',
              },
              {
                title: '10. Governing Law',
                content: 'These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India.',
              },
              {
                title: '11. Dispute Resolution',
                content: 'Any dispute arising from these Terms shall first be attempted to be resolved amicably. If not resolved within 30 days, disputes shall be submitted to binding arbitration under the Arbitration and Conciliation Act, 1996, with a single arbitrator appointed by mutual agreement, in Bengaluru, India.',
              },
              {
                title: '12. Modifications to Terms',
                content: 'IdeaNax reserves the right to modify these Terms at any time. Significant changes will be communicated via email or platform notification. Continued use after changes constitutes acceptance of the new Terms.',
              },
              {
                title: '13. Contact Information',
                content: 'For terms-related inquiries: Email: support@ideanax.com | Legal: legal@ideanax.com | Address: IdeaNax Technologies Pvt. Ltd., Bengaluru, Karnataka, India - 560001',
              },
            ].map(({ title, content, highlight, extra }) => (
              <div key={title}>
                <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
                {content && <p className="text-gray-300 text-sm leading-relaxed">{content}</p>}
                {highlight && (
                  <div className="my-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-red-300 text-sm font-semibold leading-relaxed">{highlight}</p>
                  </div>
                )}
                {extra && <p className="text-gray-300 text-sm leading-relaxed mt-2">{extra}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
