import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions - IdeaNax',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <nav className="border-b border-gray-200 dark:border-gray-800 px-8 py-4">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          IdeaNax
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Terms &amp; Conditions</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: January 2024</p>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              By accessing, registering on, or using IdeaNax (&quot;the Platform&quot;), you agree to be bound by these Terms &amp; Conditions (&quot;Terms&quot;). If you do not agree to all of these Terms, you must not use the Platform. These Terms constitute a legally binding agreement between you and IdeaNax.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Platform Description</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              IdeaNax is an online marketplace that allows users to submit, showcase, sell, and license ideas. The Platform provides tools for idea management, secure payments, and intellectual property protection. IdeaNax acts as an intermediary platform and does not claim ownership of user-submitted ideas except as specified in these Terms.
            </p>
          </section>

          <section className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. Intellectual Property &amp; Ownership</h2>
            <div className="text-gray-700 dark:text-gray-300 mt-2 space-y-3">
              <p className="font-bold text-lg">
                BY SUBMITTING AN IDEA TO IDEANAX, YOU ACKNOWLEDGE AND AGREE TO THE FOLLOWING:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-medium">
                <li>You retain ownership of your original idea concept.</li>
                <li>You grant IdeaNax a non-exclusive, worldwide, royalty-free license to display, promote, and facilitate the sale of your idea on the Platform.</li>
                <li>IdeaNax has the right to use anonymized or aggregated idea data for platform improvement and analytics.</li>
                <li>You represent and warrant that you are the sole creator of the idea and that the idea does not infringe on any third-party intellectual property rights.</li>
                <li>Upon sale or licensing of an idea, ownership transfers to the buyer as per the transaction terms. IdeaNax is not liable for post-sale disputes.</li>
                <li>IdeaNax reserves the right to remove any idea that violates these Terms, infringes on third-party rights, or is deemed inappropriate at our sole discretion.</li>
              </ul>
              <p className="font-bold">
                YOU ASSUME FULL RESPONSIBILITY FOR ENSURING YOUR IDEA DOES NOT INFRINGE ON EXISTING PATENTS, COPYRIGHTS, TRADEMARKS, OR OTHER INTELLECTUAL PROPERTY RIGHTS.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. User Accounts</h2>
            <div className="text-gray-600 dark:text-gray-400 mt-2 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li>You must be at least 18 years old to create an account.</li>
                <li>You must provide accurate, complete, and current information.</li>
                <li>You are responsible for maintaining the security of your account credentials.</li>
                <li>You must not share your account or use another person&apos;s account.</li>
                <li>IdeaNax reserves the right to suspend or terminate accounts that violate these Terms.</li>
                <li>Accounts locked due to failed login attempts will be automatically unlocked after 30 minutes.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">5. Coins &amp; Payments</h2>
            <div className="text-gray-600 dark:text-gray-400 mt-2 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li>Coins are purchased using real currency via Razorpay.</li>
                <li>Each idea submission costs 2 coins.</li>
                <li>Coins are non-refundable once purchased.</li>
                <li>Coin purchases are subject to payment verification.</li>
                <li>IdeaNax reserves the right to change coin pricing with 30 days notice.</li>
                <li>Duplicate or fraudulent transactions will be reversed.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">6. Withdrawals</h2>
            <div className="text-gray-600 dark:text-gray-400 mt-2 space-y-2">
              <ul className="list-disc pl-6 space-y-1">
                <li>Minimum withdrawal amount is ₹500.</li>
                <li>A 2% platform fee is deducted from each withdrawal.</li>
                <li>Withdrawals are processed via Cashfree Payouts (bank transfer or UPI).</li>
                <li>Processing time is 1-5 business days.</li>
                <li>IdeaNax reserves the right to hold or reject withdrawals pending fraud investigation.</li>
                <li>You are responsible for providing accurate bank/UPI details.</li>
                <li>Failed payouts due to incorrect details are not the responsibility of IdeaNax.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">7. Prohibited Conduct</h2>
            <div className="text-gray-600 dark:text-gray-400 mt-2 space-y-2">
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Submit false, misleading, or plagiarized ideas</li>
                <li>Attempt to manipulate the payment system</li>
                <li>Use automated tools to interact with the Platform</li>
                <li>Harass, threaten, or abuse other users</li>
                <li>Attempt to circumvent security measures</li>
                <li>Resell or redistribute Platform content without authorization</li>
                <li>Violate any applicable local, national, or international laws</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">8. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              IDEANAX IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, IDEANAX SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE PRECEDING 12 MONTHS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">9. Dispute Resolution</h2>
            <div className="text-gray-600 dark:text-gray-400 mt-2 space-y-2">
              <p>Any disputes arising from these Terms shall be resolved through:</p>
              <ol className="list-decimal pl-6 space-y-1">
                <li><strong>Negotiation:</strong> Parties shall first attempt to resolve disputes amicably within 30 days.</li>
                <li><strong>Mediation:</strong> If negotiation fails, disputes shall be submitted to mediation.</li>
                <li><strong>Arbitration:</strong> Unresolved disputes shall be settled by binding arbitration in accordance with applicable laws.</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">10. Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              These Terms shall be governed by and construed in accordance with the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts in the relevant jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">11. Modifications</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              IdeaNax reserves the right to modify these Terms at any time. Material changes will be communicated via email or platform notification at least 30 days before taking effect. Continued use of the Platform after modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">12. Termination</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              IdeaNax may terminate or suspend your account at any time for violation of these Terms or for any other reason at our sole discretion. Upon termination, your right to use the Platform ceases immediately. Pending withdrawals may be processed or cancelled at our discretion. Idea submissions remain on the Platform unless specifically requested for deletion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">13. Contact</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              For questions about these Terms: legal@ideanax.com
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
