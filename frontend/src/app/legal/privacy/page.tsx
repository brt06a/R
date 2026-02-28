import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - IdeaNax',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <nav className="border-b border-gray-200 dark:border-gray-800 px-8 py-4">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          IdeaNax
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: January 2024</p>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              IdeaNax (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. By accessing or using IdeaNax, you consent to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Information We Collect</h2>
            <div className="text-gray-600 dark:text-gray-400 mt-2 space-y-3">
              <p><strong>Personal Information:</strong> Name, email address, phone number, payment details, and bank account information for withdrawals.</p>
              <p><strong>Idea Content:</strong> All ideas, documents, prototypes, and related materials submitted to the platform.</p>
              <p><strong>Usage Data:</strong> IP address, browser type, operating system, pages visited, time spent, and interaction patterns.</p>
              <p><strong>Transaction Data:</strong> Payment history, coin purchases, wallet transactions, and withdrawal records.</p>
              <p><strong>Device Information:</strong> Device identifiers, screen resolution, and hardware configurations.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. How We Use Your Information</h2>
            <div className="text-gray-600 dark:text-gray-400 mt-2 space-y-2">
              <p>We use collected information to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide, maintain, and improve the platform</li>
                <li>Process transactions and manage your account</li>
                <li>Verify your identity and prevent fraud</li>
                <li>Send transactional emails and security alerts</li>
                <li>Comply with legal obligations</li>
                <li>Enforce our Terms and Conditions</li>
                <li>Analyze usage patterns to improve user experience</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. Data Storage and Security</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Your data is stored securely using Supabase (PostgreSQL) with Row Level Security policies. Passwords are hashed using bcrypt with high salt rounds. All communications are encrypted via TLS/SSL. Payment data is processed through PCI-DSS compliant providers (Razorpay, Cashfree). We implement industry-standard security measures including encryption at rest and in transit, regular security audits, and access controls.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">5. Third-Party Service Providers</h2>
            <div className="text-gray-600 dark:text-gray-400 mt-2 space-y-2">
              <p>We share data with the following third-party processors:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Supabase:</strong> Database hosting and file storage</li>
                <li><strong>Razorpay:</strong> Payment processing for coin purchases</li>
                <li><strong>Cashfree:</strong> Payout processing for withdrawals</li>
                <li><strong>Redis/Upstash:</strong> Queue management and caching</li>
                <li><strong>SMTP Provider:</strong> Email delivery</li>
              </ul>
              <p>These providers are contractually obligated to protect your data.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">6. Data Retention</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              We retain your personal data for as long as your account is active or as needed to provide services. Transaction records are retained for 7 years for legal and accounting purposes. Idea submissions and associated files are retained indefinitely unless you request deletion. Upon account deletion, personal data is removed within 30 days, except where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">7. Your Rights (GDPR-Style)</h2>
            <div className="text-gray-600 dark:text-gray-400 mt-2 space-y-2">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate personal data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Objection:</strong> Object to processing of your personal data</li>
              </ul>
              <p>To exercise these rights, contact us at privacy@ideanax.com.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">8. Cookies</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              We use HTTP-only secure cookies for authentication (access tokens and refresh tokens). These are essential cookies required for the platform to function. We do not use tracking cookies or third-party advertising cookies. Session cookies expire after 15 minutes (access) or 7 days (refresh).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">9. Children&apos;s Privacy</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              IdeaNax is not intended for users under 18 years of age. We do not knowingly collect personal data from minors. If we discover that a minor has created an account, we will terminate the account and delete associated data immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">10. Changes to This Policy</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              We may update this Privacy Policy from time to time. Significant changes will be notified via email or platform notification. Continued use of the platform after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">11. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              For privacy-related inquiries: privacy@ideanax.com
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
