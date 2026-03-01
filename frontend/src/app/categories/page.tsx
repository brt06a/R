import type { Metadata } from 'next';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse 100+ idea categories on IdeaNax. Find your niche and start earning.',
};

const categories = [
  // Technology (20)
  { name: 'Artificial Intelligence', slug: 'artificial-intelligence', min: 50000, max: 500000, icon: '🤖', group: 'Technology' },
  { name: 'Machine Learning', slug: 'machine-learning', min: 50000, max: 500000, icon: '🧠', group: 'Technology' },
  { name: 'Blockchain', slug: 'blockchain', min: 30000, max: 300000, icon: '⛓️', group: 'Technology' },
  { name: 'IoT', slug: 'iot', min: 20000, max: 200000, icon: '📡', group: 'Technology' },
  { name: 'Cybersecurity', slug: 'cybersecurity', min: 30000, max: 300000, icon: '🔐', group: 'Technology' },
  { name: 'Cloud Computing', slug: 'cloud-computing', min: 20000, max: 200000, icon: '☁️', group: 'Technology' },
  { name: 'AR/VR', slug: 'ar-vr', min: 25000, max: 250000, icon: '🥽', group: 'Technology' },
  { name: 'Robotics', slug: 'robotics', min: 50000, max: 500000, icon: '🦾', group: 'Technology' },
  { name: '5G Technology', slug: '5g-technology', min: 30000, max: 300000, icon: '📶', group: 'Technology' },
  { name: 'Quantum Computing', slug: 'quantum-computing', min: 100000, max: 1000000, icon: '⚛️', group: 'Technology' },
  { name: 'Edge Computing', slug: 'edge-computing', min: 20000, max: 200000, icon: '💻', group: 'Technology' },
  { name: 'Digital Twin', slug: 'digital-twin', min: 30000, max: 300000, icon: '🔄', group: 'Technology' },
  { name: 'Natural Language Processing', slug: 'natural-language-processing', min: 40000, max: 400000, icon: '💬', group: 'Technology' },
  { name: 'Computer Vision', slug: 'computer-vision', min: 40000, max: 400000, icon: '👁️', group: 'Technology' },
  { name: 'Autonomous Systems', slug: 'autonomous-systems', min: 50000, max: 500000, icon: '🚗', group: 'Technology' },
  { name: 'DevOps Tools', slug: 'devops-tools', min: 15000, max: 150000, icon: '🔧', group: 'Technology' },
  { name: 'API Development', slug: 'api-development', min: 10000, max: 100000, icon: '🔌', group: 'Technology' },
  { name: 'Low-Code/No-Code', slug: 'low-code-no-code', min: 20000, max: 200000, icon: '🧱', group: 'Technology' },
  { name: 'Embedded Systems', slug: 'embedded-systems', min: 15000, max: 150000, icon: '🔩', group: 'Technology' },
  { name: 'Wearable Tech', slug: 'wearable-tech', min: 20000, max: 200000, icon: '⌚', group: 'Technology' },
  // Business (15)
  { name: 'SaaS Solutions', slug: 'saas-solutions', min: 30000, max: 300000, icon: '📊', group: 'Business' },
  { name: 'E-commerce', slug: 'e-commerce', min: 20000, max: 200000, icon: '🛒', group: 'Business' },
  { name: 'FinTech', slug: 'fintech', min: 50000, max: 500000, icon: '💳', group: 'Business' },
  { name: 'InsurTech', slug: 'insurtech', min: 30000, max: 300000, icon: '🏥', group: 'Business' },
  { name: 'PropTech', slug: 'proptech', min: 25000, max: 250000, icon: '🏠', group: 'Business' },
  { name: 'LegalTech', slug: 'legaltech', min: 20000, max: 200000, icon: '⚖️', group: 'Business' },
  { name: 'HRTech', slug: 'hrtech', min: 15000, max: 150000, icon: '👥', group: 'Business' },
  { name: 'MarTech', slug: 'martech', min: 15000, max: 150000, icon: '📢', group: 'Business' },
  { name: 'AdTech', slug: 'adtech', min: 20000, max: 200000, icon: '📱', group: 'Business' },
  { name: 'Supply Chain', slug: 'supply-chain', min: 20000, max: 200000, icon: '🚛', group: 'Business' },
  { name: 'Logistics', slug: 'logistics', min: 15000, max: 150000, icon: '📦', group: 'Business' },
  { name: 'Retail Innovation', slug: 'retail-innovation', min: 20000, max: 200000, icon: '🏪', group: 'Business' },
  { name: 'B2B Marketplace', slug: 'b2b-marketplace', min: 25000, max: 250000, icon: '🤝', group: 'Business' },
  { name: 'Subscription Services', slug: 'subscription-services', min: 15000, max: 150000, icon: '🔁', group: 'Business' },
  { name: 'Franchise Models', slug: 'franchise-models', min: 30000, max: 300000, icon: '🏢', group: 'Business' },
  // Health (10)
  { name: 'HealthTech', slug: 'healthtech', min: 30000, max: 300000, icon: '💊', group: 'Health' },
  { name: 'Telemedicine', slug: 'telemedicine', min: 25000, max: 250000, icon: '🩺', group: 'Health' },
  { name: 'Mental Health', slug: 'mental-health', min: 20000, max: 200000, icon: '🧘', group: 'Health' },
  { name: 'Fitness & Wellness', slug: 'fitness-wellness', min: 15000, max: 150000, icon: '💪', group: 'Health' },
  { name: 'Medical Devices', slug: 'medical-devices', min: 50000, max: 500000, icon: '🔬', group: 'Health' },
  { name: 'Drug Discovery', slug: 'drug-discovery', min: 100000, max: 1000000, icon: '🧬', group: 'Health' },
  { name: 'Health Insurance', slug: 'health-insurance', min: 30000, max: 300000, icon: '🏥', group: 'Health' },
  { name: 'Elder Care', slug: 'elder-care', min: 20000, max: 200000, icon: '👴', group: 'Health' },
  { name: 'Nutrition Tech', slug: 'nutrition-tech', min: 15000, max: 150000, icon: '🥗', group: 'Health' },
  { name: 'Genomics', slug: 'genomics', min: 100000, max: 1000000, icon: '🔭', group: 'Health' },
  // Education (10)
  { name: 'EdTech', slug: 'edtech', min: 20000, max: 200000, icon: '📚', group: 'Education' },
  { name: 'Online Learning', slug: 'online-learning', min: 15000, max: 150000, icon: '🎓', group: 'Education' },
  { name: 'Skill Development', slug: 'skill-development', min: 10000, max: 100000, icon: '🔑', group: 'Education' },
  { name: 'K-12 Innovation', slug: 'k-12-innovation', min: 15000, max: 150000, icon: '✏️', group: 'Education' },
  { name: 'Higher Education', slug: 'higher-education', min: 20000, max: 200000, icon: '🏫', group: 'Education' },
  { name: 'Corporate Training', slug: 'corporate-training', min: 20000, max: 200000, icon: '💼', group: 'Education' },
  { name: 'Language Learning', slug: 'language-learning', min: 10000, max: 100000, icon: '🌍', group: 'Education' },
  { name: 'STEM Education', slug: 'stem-education', min: 15000, max: 150000, icon: '🔭', group: 'Education' },
  { name: 'Special Education', slug: 'special-education', min: 20000, max: 200000, icon: '♿', group: 'Education' },
  { name: 'Exam Prep', slug: 'exam-prep', min: 10000, max: 100000, icon: '📝', group: 'Education' },
  // Environment (10)
  { name: 'CleanTech', slug: 'cleantech', min: 30000, max: 300000, icon: '🌿', group: 'Environment' },
  { name: 'Renewable Energy', slug: 'renewable-energy', min: 50000, max: 500000, icon: '☀️', group: 'Environment' },
  { name: 'Waste Management', slug: 'waste-management', min: 20000, max: 200000, icon: '♻️', group: 'Environment' },
  { name: 'Water Purification', slug: 'water-purification', min: 25000, max: 250000, icon: '💧', group: 'Environment' },
  { name: 'Carbon Capture', slug: 'carbon-capture', min: 50000, max: 500000, icon: '🌫️', group: 'Environment' },
  { name: 'Sustainable Agriculture', slug: 'sustainable-agriculture', min: 20000, max: 200000, icon: '🌾', group: 'Environment' },
  { name: 'EV & Mobility', slug: 'ev-mobility', min: 50000, max: 500000, icon: '⚡', group: 'Environment' },
  { name: 'Green Building', slug: 'green-building', min: 30000, max: 300000, icon: '🏗️', group: 'Environment' },
  { name: 'Conservation Tech', slug: 'conservation-tech', min: 20000, max: 200000, icon: '🦋', group: 'Environment' },
  { name: 'Climate Analytics', slug: 'climate-analytics', min: 25000, max: 250000, icon: '🌡️', group: 'Environment' },
  // Social (10)
  { name: 'Social Media', slug: 'social-media', min: 20000, max: 200000, icon: '📲', group: 'Social' },
  { name: 'Community Platform', slug: 'community-platform', min: 15000, max: 150000, icon: '👨‍👩‍👧‍👦', group: 'Social' },
  { name: 'Dating & Relationships', slug: 'dating-relationships', min: 15000, max: 150000, icon: '💕', group: 'Social' },
  { name: 'Event Management', slug: 'event-management', min: 10000, max: 100000, icon: '🎉', group: 'Social' },
  { name: 'Travel & Tourism', slug: 'travel-tourism', min: 15000, max: 150000, icon: '✈️', group: 'Social' },
  { name: 'Food & Beverage', slug: 'food-beverage', min: 10000, max: 100000, icon: '🍕', group: 'Social' },
  { name: 'Entertainment', slug: 'entertainment', min: 20000, max: 200000, icon: '🎬', group: 'Social' },
  { name: 'Gaming', slug: 'gaming', min: 30000, max: 300000, icon: '🎮', group: 'Social' },
  { name: 'Sports Tech', slug: 'sports-tech', min: 20000, max: 200000, icon: '⚽', group: 'Social' },
  { name: 'Pet Care', slug: 'pet-care', min: 10000, max: 100000, icon: '🐾', group: 'Social' },
  // Finance (10)
  { name: 'Digital Payments', slug: 'digital-payments', min: 30000, max: 300000, icon: '💸', group: 'Finance' },
  { name: 'Lending Platform', slug: 'lending-platform', min: 50000, max: 500000, icon: '🏦', group: 'Finance' },
  { name: 'Investment Tech', slug: 'investment-tech', min: 40000, max: 400000, icon: '📈', group: 'Finance' },
  { name: 'Crypto & DeFi', slug: 'crypto-defi', min: 50000, max: 500000, icon: '₿', group: 'Finance' },
  { name: 'Personal Finance', slug: 'personal-finance', min: 20000, max: 200000, icon: '💰', group: 'Finance' },
  { name: 'Tax Tech', slug: 'tax-tech', min: 15000, max: 150000, icon: '📑', group: 'Finance' },
  { name: 'Accounting Software', slug: 'accounting-software', min: 15000, max: 150000, icon: '🧮', group: 'Finance' },
  { name: 'Banking Innovation', slug: 'banking-innovation', min: 30000, max: 300000, icon: '🏧', group: 'Finance' },
  { name: 'Wealth Management', slug: 'wealth-management', min: 40000, max: 400000, icon: '💎', group: 'Finance' },
  { name: 'Micro-Finance', slug: 'micro-finance', min: 20000, max: 200000, icon: '🪙', group: 'Finance' },
  // Government (5)
  { name: 'GovTech', slug: 'govtech', min: 20000, max: 200000, icon: '🏛️', group: 'Government' },
  { name: 'Smart City', slug: 'smart-city', min: 30000, max: 300000, icon: '🌆', group: 'Government' },
  { name: 'Public Safety', slug: 'public-safety', min: 20000, max: 200000, icon: '🚔', group: 'Government' },
  { name: 'Civic Engagement', slug: 'civic-engagement', min: 15000, max: 150000, icon: '🗳️', group: 'Government' },
  { name: 'Digital Identity', slug: 'digital-identity', min: 25000, max: 250000, icon: '🪪', group: 'Government' },
  // Creative (5)
  { name: 'Content Creation', slug: 'content-creation', min: 10000, max: 100000, icon: '✍️', group: 'Creative' },
  { name: 'Design Tools', slug: 'design-tools', min: 15000, max: 150000, icon: '🎨', group: 'Creative' },
  { name: 'Music Tech', slug: 'music-tech', min: 20000, max: 200000, icon: '🎵', group: 'Creative' },
  { name: 'Film & Media', slug: 'film-media', min: 25000, max: 250000, icon: '🎥', group: 'Creative' },
  { name: 'Publishing', slug: 'publishing', min: 10000, max: 100000, icon: '📖', group: 'Creative' },
  // Emerging (5)
  { name: 'Space Tech', slug: 'space-tech', min: 100000, max: 1000000, icon: '🚀', group: 'Emerging' },
  { name: 'AgriTech', slug: 'agritech', min: 20000, max: 200000, icon: '🌱', group: 'Emerging' },
  { name: 'FoodTech', slug: 'foodtech', min: 20000, max: 200000, icon: '🧪', group: 'Emerging' },
  { name: 'BioTech', slug: 'biotech', min: 100000, max: 1000000, icon: '🔬', group: 'Emerging' },
  { name: 'NanoTech', slug: 'nanotech', min: 100000, max: 1000000, icon: '⚗️', group: 'Emerging' },
];

const groups = ['Technology', 'Business', 'Health', 'Education', 'Environment', 'Social', 'Finance', 'Government', 'Creative', 'Emerging'];

export default function CategoriesPage() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen gradient-bg pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              100+ <span className="gradient-text">Idea Categories</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Find your niche. Every category shows estimated earning ranges based on historical sales data.
            </p>
          </div>

          {groups.map((group) => (
            <div key={group} className="mb-10">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="h-px flex-1 bg-white/10" />
                <span>{group}</span>
                <span className="h-px flex-1 bg-white/10" />
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {categories.filter((c) => c.group === group).map((cat) => (
                  <div key={cat.slug} className="glass-card p-4 hover:border-primary-500/30 transition-all duration-200 group">
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <h3 className="text-xs font-semibold text-white mb-1 group-hover:text-primary-300 transition-colors">{cat.name}</h3>
                    <p className="text-xs text-green-400">₹{(cat.min / 1000).toFixed(0)}K – ₹{(cat.max / 1000).toFixed(0)}K</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
