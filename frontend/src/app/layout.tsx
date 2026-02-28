import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'IdeaNax - Where Ideas Become Value',
    template: '%s | IdeaNax',
  },
  description: 'IdeaNax is a marketplace where innovators submit, sell, and license ideas. Submit your idea today and start earning.',
  keywords: ['ideas marketplace', 'sell ideas', 'license ideas', 'innovation platform', 'idea submission'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://ideanax.com',
    siteName: 'IdeaNax',
    title: 'IdeaNax - Where Ideas Become Value',
    description: 'A marketplace where innovators submit, sell, and license ideas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IdeaNax - Where Ideas Become Value',
    description: 'A marketplace where innovators submit, sell, and license ideas.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
