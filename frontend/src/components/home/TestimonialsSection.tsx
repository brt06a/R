import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Priya Sharma', role: 'Tech Entrepreneur', content: 'IdeaNax helped me monetize an AI idea I had for years. Received ₹2.5L within a month!', rating: 5, avatar: 'P' },
  { name: 'Rahul Verma', role: 'Product Manager', content: 'The platform is incredibly easy to use. Submitted 3 ideas and 2 got approved. Amazing experience.', rating: 5, avatar: 'R' },
  { name: 'Ananya Iyer', role: 'Startup Founder', content: 'Best platform for innovators in India. The coin system makes it fair and accessible for everyone.', rating: 5, avatar: 'A' },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Loved by <span className="gradient-text">Innovators</span>
          </h2>
          <p className="text-gray-400">What our community says about IdeaNax</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, content, rating, avatar }) => (
            <div key={name} className="glass-card p-5 hover:border-primary-500/30 transition-all duration-300">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">&ldquo;{content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center font-bold text-sm">
                  {avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{name}</p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
