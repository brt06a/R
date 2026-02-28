import React from 'react';
import Link from 'next/link';
import { Lightbulb, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-primary-600">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">IdeaNax</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Where ideas become value. Submit, sell, and license your innovative ideas.
            </p>
            <div className="flex gap-3 mt-4">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Platform</h4>
            <ul className="space-y-2">
              {[
                { href: '/features', label: 'Features' },
                { href: '/categories', label: 'Categories' },
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/about', label: 'About Us' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Account</h4>
            <ul className="space-y-2">
              {[
                { href: '/auth/signup', label: 'Sign Up' },
                { href: '/auth/login', label: 'Sign In' },
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2">
              {[
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms & Conditions' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} IdeaNax. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
};
