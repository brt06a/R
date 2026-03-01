import type { Metadata } from 'next';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'IdeaNax Privacy Policy - how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen gradient-bg pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: January 1, 2025</p>
          </div>

          <div className="glass-card p-8 prose prose-invert prose-sm max-w-none space-y-8">
            {[
              {
                title: '1. Introduction',
                content: 'Welcome to IdeaNax ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform at ideanax.com. Please read this policy carefully. By using IdeaNax, you consent to the practices described herein.',
              },
              {
                title: '2. Information We Collect',
                content: 'We collect: (a) Personal Information: name, email address, mobile number, date of birth, password (hashed); (b) Usage Data: IP address, browser type, pages visited, time spent; (c) Payment Data: Razorpay transaction IDs (we do NOT store card details); (d) Uploaded Files: documents, images, videos you submit as part of idea submissions, stored in Supabase Storage.',
              },
              {
                title: '3. How We Use Your Information',
                content: 'We use collected information to: provide and maintain our platform; process transactions and send related notifications; verify your identity via OTP; manage your idea submissions and wallet; send service-related communications; improve our platform and user experience; comply with legal obligations; prevent fraud and ensure security.',
              },
              {
                title: '4. Data Storage and Security',
                content: 'Your data is stored on Supabase (PostgreSQL), a secure cloud infrastructure. All data is encrypted at rest using AES-256 and in transit using TLS 1.3. We implement row-level security, JWT authentication, rate limiting, and other industry-standard security measures. Despite our best efforts, no method of transmission over the internet is 100% secure.',
              },
              {
                title: '5. Payment Processing',
                content: 'Payments are processed by Razorpay, a PCI DSS-compliant payment processor. We do not store your credit card or debit card details. Razorpay\'s privacy policy governs their collection and use of your payment information. We only receive transaction confirmations and IDs.',
              },
              {
                title: '6. File Storage',
                content: 'Files uploaded during idea submission are stored in Supabase Storage Buckets, encrypted at rest. Access is controlled via signed URLs with expiry times (1 hour). Only authorized users can access their own files. Uploaded files become part of the submitted idea and are subject to our Terms & Conditions regarding IP transfer.',
              },
              {
                title: '7. Cookies and Tracking',
                content: 'We use HTTP-only secure cookies for refresh tokens (authentication). We use localStorage for access tokens. We may use analytics tools to understand platform usage. You can disable cookies in your browser settings, though this may affect functionality.',
              },
              {
                title: '8. Data Retention',
                content: 'We retain your personal data for 5 years from your last activity, or as required by applicable Indian law. Transaction records are retained for 7 years as required by financial regulations. You may request deletion of your account data, subject to legal retention requirements.',
              },
              {
                title: '9. Your Rights',
                content: 'You have the right to: (a) Access — request a copy of your personal data; (b) Correction — update inaccurate data; (c) Deletion — request deletion of your account (subject to legal requirements); (d) Portability — receive your data in a portable format; (e) Objection — object to certain processing activities. Contact us at support@ideanax.com to exercise these rights.',
              },
              {
                title: '10. Third-Party Services',
                content: 'We use: Supabase (database and storage), Razorpay (payments), Cashfree (payouts), Redis (queue management), and email service providers (SMTP). Each has their own privacy policy. We are not responsible for their practices.',
              },
              {
                title: '11. Children\'s Privacy',
                content: 'IdeaNax is not intended for users under 18 years of age. We do not knowingly collect personal information from children under 18. By using our platform, you confirm you are at least 18 years old. If we discover we have collected data from a minor, we will delete it immediately.',
              },
              {
                title: '12. Changes to This Policy',
                content: 'We may update this Privacy Policy periodically. We will notify you of significant changes via email or platform notification. Continued use of the platform after changes constitutes acceptance of the new policy.',
              },
              {
                title: '13. Contact Information',
                content: 'For privacy-related inquiries, contact us at: Email: support@ideanax.com | Address: IdeaNax Technologies Pvt. Ltd., Bengaluru, Karnataka, India - 560001',
              },
            ].map(({ title, content }) => (
              <div key={title}>
                <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
                <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
