'use client';

import { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, MapPin, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Message sent! We\'ll reply within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <main>
      <Navbar />
      <div className="min-h-screen gradient-bg pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Have a question? We&apos;d love to hear from you. Send us a message and we&apos;ll respond within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              {[
                { icon: Mail, title: 'Email', value: 'support@ideanax.com' },
                { icon: Phone, title: 'Phone', value: '+91 98765 43210' },
                { icon: MapPin, title: 'Office', value: 'Bengaluru, Karnataka, India' },
              ].map(({ icon: Icon, title, value }) => (
                <div key={title} className="glass-card p-4 flex gap-3">
                  <div className="p-2.5 rounded-xl bg-primary-600/20">
                    <Icon className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{title}</p>
                    <p className="text-sm text-gray-400">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2 glass-card p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Your Name" placeholder="John Doe" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
                  <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
                </div>
                <Input label="Subject" placeholder="How can we help?" value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} required />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                  <textarea
                    className="w-full input-glass resize-none"
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" isLoading={isSubmitting} fullWidth>
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
