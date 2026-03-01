import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const toSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

interface CategorySeed {
  name: string;
  description: string;
  estimatedEarningMin: number;
  estimatedEarningMax: number;
  icon: string;
}

const categories: CategorySeed[] = [
  // Technology (20)
  { name: 'Artificial Intelligence', description: 'AI-powered solutions and intelligent systems', estimatedEarningMin: 50000, estimatedEarningMax: 500000, icon: '🤖' },
  { name: 'Machine Learning', description: 'ML models, algorithms, and data-driven solutions', estimatedEarningMin: 50000, estimatedEarningMax: 500000, icon: '🧠' },
  { name: 'Blockchain', description: 'Decentralized applications and distributed ledger technologies', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '⛓️' },
  { name: 'IoT', description: 'Internet of Things devices and connected systems', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '📡' },
  { name: 'Cybersecurity', description: 'Security solutions, threat detection, and data protection', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '🔒' },
  { name: 'Cloud Computing', description: 'Cloud infrastructure, platforms, and services', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '☁️' },
  { name: 'AR/VR', description: 'Augmented and virtual reality experiences', estimatedEarningMin: 25000, estimatedEarningMax: 250000, icon: '🥽' },
  { name: 'Robotics', description: 'Robotic systems, automation, and mechanical intelligence', estimatedEarningMin: 50000, estimatedEarningMax: 500000, icon: '🦾' },
  { name: '5G Technology', description: 'Next-generation wireless communication solutions', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '📶' },
  { name: 'Quantum Computing', description: 'Quantum algorithms, hardware, and applications', estimatedEarningMin: 100000, estimatedEarningMax: 1000000, icon: '⚛️' },
  { name: 'Edge Computing', description: 'Distributed computing at the network edge', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🖥️' },
  { name: 'Digital Twin', description: 'Virtual replicas of physical assets and systems', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '🔄' },
  { name: 'Natural Language Processing', description: 'Text analysis, chatbots, and language understanding', estimatedEarningMin: 40000, estimatedEarningMax: 400000, icon: '💬' },
  { name: 'Computer Vision', description: 'Image recognition, object detection, and visual AI', estimatedEarningMin: 40000, estimatedEarningMax: 400000, icon: '👁️' },
  { name: 'Autonomous Systems', description: 'Self-driving vehicles and autonomous robotics', estimatedEarningMin: 50000, estimatedEarningMax: 500000, icon: '🚗' },
  { name: 'DevOps Tools', description: 'CI/CD pipelines, automation, and developer tools', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '🔧' },
  { name: 'API Development', description: 'RESTful APIs, GraphQL, and integration platforms', estimatedEarningMin: 10000, estimatedEarningMax: 100000, icon: '🔌' },
  { name: 'Low-Code/No-Code', description: 'Visual development platforms and drag-and-drop builders', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🧩' },
  { name: 'Embedded Systems', description: 'Firmware, microcontrollers, and hardware software', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '💾' },
  { name: 'Wearable Tech', description: 'Smartwatches, fitness trackers, and body sensors', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '⌚' },

  // Business (15)
  { name: 'SaaS Solutions', description: 'Software-as-a-service products and platforms', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '💼' },
  { name: 'E-commerce', description: 'Online retail, marketplaces, and digital storefronts', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🛒' },
  { name: 'FinTech', description: 'Financial technology, digital banking, and payment innovations', estimatedEarningMin: 50000, estimatedEarningMax: 500000, icon: '💳' },
  { name: 'InsurTech', description: 'Insurance technology and risk management solutions', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '🛡️' },
  { name: 'PropTech', description: 'Real estate technology and property management solutions', estimatedEarningMin: 25000, estimatedEarningMax: 250000, icon: '🏠' },
  { name: 'LegalTech', description: 'Legal services automation and compliance technology', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '⚖️' },
  { name: 'HRTech', description: 'Human resources management and workforce solutions', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '👥' },
  { name: 'MarTech', description: 'Marketing technology and customer engagement tools', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '📊' },
  { name: 'AdTech', description: 'Advertising technology and programmatic solutions', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '📢' },
  { name: 'Supply Chain', description: 'Supply chain optimization and logistics management', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '📦' },
  { name: 'Logistics', description: 'Last-mile delivery and freight management solutions', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '🚚' },
  { name: 'Retail Innovation', description: 'Smart retail, omnichannel, and customer experience', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🏪' },
  { name: 'B2B Marketplace', description: 'Business-to-business trading and procurement platforms', estimatedEarningMin: 25000, estimatedEarningMax: 250000, icon: '🤝' },
  { name: 'Subscription Services', description: 'Recurring revenue models and membership platforms', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '🔁' },
  { name: 'Franchise Models', description: 'Scalable franchise systems and business replication', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '🏢' },

  // Health (10)
  { name: 'HealthTech', description: 'Digital health solutions and medical technology', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '🏥' },
  { name: 'Telemedicine', description: 'Remote healthcare delivery and virtual consultations', estimatedEarningMin: 25000, estimatedEarningMax: 250000, icon: '👨‍⚕️' },
  { name: 'Mental Health', description: 'Mental wellness apps and psychological support platforms', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🧘' },
  { name: 'Fitness & Wellness', description: 'Exercise platforms, wellness tracking, and healthy living', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '💪' },
  { name: 'Medical Devices', description: 'Diagnostic equipment and medical hardware innovations', estimatedEarningMin: 50000, estimatedEarningMax: 500000, icon: '🩺' },
  { name: 'Drug Discovery', description: 'Pharmaceutical research and drug development technologies', estimatedEarningMin: 100000, estimatedEarningMax: 1000000, icon: '💊' },
  { name: 'Health Insurance', description: 'Digital insurance products and health coverage innovations', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '🏨' },
  { name: 'Elder Care', description: 'Senior living solutions and assisted care technologies', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '👴' },
  { name: 'Nutrition Tech', description: 'Diet planning, nutrition tracking, and food science', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '🥗' },
  { name: 'Genomics', description: 'Genetic analysis, personalized medicine, and DNA tech', estimatedEarningMin: 100000, estimatedEarningMax: 1000000, icon: '🧬' },

  // Education (10)
  { name: 'EdTech', description: 'Educational technology platforms and digital learning tools', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '📚' },
  { name: 'Online Learning', description: 'E-learning courses, MOOCs, and virtual classrooms', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '💻' },
  { name: 'Skill Development', description: 'Vocational training and professional upskilling platforms', estimatedEarningMin: 10000, estimatedEarningMax: 100000, icon: '🎯' },
  { name: 'K-12 Innovation', description: 'School education technology and childhood learning tools', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '🎒' },
  { name: 'Higher Education', description: 'University solutions, research platforms, and campus tech', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🎓' },
  { name: 'Corporate Training', description: 'Employee learning, LMS platforms, and workforce education', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🏫' },
  { name: 'Language Learning', description: 'Language education apps and translation tools', estimatedEarningMin: 10000, estimatedEarningMax: 100000, icon: '🗣️' },
  { name: 'STEM Education', description: 'Science, technology, engineering, and math learning tools', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '🔬' },
  { name: 'Special Education', description: 'Accessibility tools and inclusive learning solutions', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '♿' },
  { name: 'Exam Prep', description: 'Test preparation platforms and assessment tools', estimatedEarningMin: 10000, estimatedEarningMax: 100000, icon: '📝' },

  // Environment (10)
  { name: 'CleanTech', description: 'Clean technology solutions and environmental innovation', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '🌿' },
  { name: 'Renewable Energy', description: 'Solar, wind, and sustainable energy solutions', estimatedEarningMin: 50000, estimatedEarningMax: 500000, icon: '☀️' },
  { name: 'Waste Management', description: 'Recycling, waste reduction, and circular economy solutions', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '♻️' },
  { name: 'Water Purification', description: 'Clean water technology and water treatment innovations', estimatedEarningMin: 25000, estimatedEarningMax: 250000, icon: '💧' },
  { name: 'Carbon Capture', description: 'Carbon sequestration and greenhouse gas reduction tech', estimatedEarningMin: 50000, estimatedEarningMax: 500000, icon: '🌍' },
  { name: 'Sustainable Agriculture', description: 'Eco-friendly farming practices and food sustainability', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🌾' },
  { name: 'EV & Mobility', description: 'Electric vehicles, charging infrastructure, and green transport', estimatedEarningMin: 50000, estimatedEarningMax: 500000, icon: '⚡' },
  { name: 'Green Building', description: 'Sustainable construction and eco-friendly architecture', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '🏗️' },
  { name: 'Conservation Tech', description: 'Wildlife conservation and biodiversity protection technology', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🦋' },
  { name: 'Climate Analytics', description: 'Climate data analysis and environmental monitoring tools', estimatedEarningMin: 25000, estimatedEarningMax: 250000, icon: '🌡️' },

  // Social (10)
  { name: 'Social Media', description: 'Social networking platforms and community engagement tools', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '📱' },
  { name: 'Community Platform', description: 'Online communities, forums, and group collaboration tools', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '👫' },
  { name: 'Dating & Relationships', description: 'Matchmaking apps and relationship management platforms', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '❤️' },
  { name: 'Event Management', description: 'Event planning, ticketing, and virtual event platforms', estimatedEarningMin: 10000, estimatedEarningMax: 100000, icon: '🎪' },
  { name: 'Travel & Tourism', description: 'Travel booking, tourism experiences, and hospitality tech', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '✈️' },
  { name: 'Food & Beverage', description: 'Food delivery, restaurant tech, and culinary innovations', estimatedEarningMin: 10000, estimatedEarningMax: 100000, icon: '🍔' },
  { name: 'Entertainment', description: 'Digital entertainment, streaming, and content platforms', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🎬' },
  { name: 'Gaming', description: 'Video games, mobile gaming, and interactive entertainment', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '🎮' },
  { name: 'Sports Tech', description: 'Sports analytics, fitness tracking, and athlete performance', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '⚽' },
  { name: 'Pet Care', description: 'Pet health, grooming services, and animal care technology', estimatedEarningMin: 10000, estimatedEarningMax: 100000, icon: '🐾' },

  // Finance (10)
  { name: 'Digital Payments', description: 'Online payment solutions, wallets, and transaction platforms', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '💰' },
  { name: 'Lending Platform', description: 'Digital lending, peer-to-peer loans, and credit solutions', estimatedEarningMin: 50000, estimatedEarningMax: 500000, icon: '🏦' },
  { name: 'Investment Tech', description: 'Robo-advisors, trading platforms, and wealth tech', estimatedEarningMin: 40000, estimatedEarningMax: 400000, icon: '📈' },
  { name: 'Crypto & DeFi', description: 'Cryptocurrency, decentralized finance, and Web3 solutions', estimatedEarningMin: 50000, estimatedEarningMax: 500000, icon: '🪙' },
  { name: 'Personal Finance', description: 'Budgeting, expense tracking, and financial planning tools', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '💵' },
  { name: 'Tax Tech', description: 'Tax filing, compliance automation, and fiscal management', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '🧾' },
  { name: 'Accounting Software', description: 'Bookkeeping, invoicing, and financial reporting tools', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '📒' },
  { name: 'Banking Innovation', description: 'Neobanking, open banking, and digital banking solutions', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '🏛️' },
  { name: 'Wealth Management', description: 'Portfolio management, financial advisory, and estate planning', estimatedEarningMin: 40000, estimatedEarningMax: 400000, icon: '💎' },
  { name: 'Micro-Finance', description: 'Microloans, financial inclusion, and grassroots banking', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🤲' },

  // Government (5)
  { name: 'GovTech', description: 'Government services digitization and public sector technology', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🏛️' },
  { name: 'Smart City', description: 'Urban technology, smart infrastructure, and city management', estimatedEarningMin: 30000, estimatedEarningMax: 300000, icon: '🌆' },
  { name: 'Public Safety', description: 'Emergency response, surveillance, and safety systems', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🚨' },
  { name: 'Civic Engagement', description: 'Citizen participation, e-governance, and public services', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '🗳️' },
  { name: 'Digital Identity', description: 'Identity verification, eKYC, and digital credentials', estimatedEarningMin: 25000, estimatedEarningMax: 250000, icon: '🪪' },

  // Creative (5)
  { name: 'Content Creation', description: 'Creator tools, content management, and publishing platforms', estimatedEarningMin: 10000, estimatedEarningMax: 100000, icon: '✍️' },
  { name: 'Design Tools', description: 'Graphic design, UI/UX tools, and creative software', estimatedEarningMin: 15000, estimatedEarningMax: 150000, icon: '🎨' },
  { name: 'Music Tech', description: 'Music production, streaming, and audio technology', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🎵' },
  { name: 'Film & Media', description: 'Video production, film technology, and media distribution', estimatedEarningMin: 25000, estimatedEarningMax: 250000, icon: '🎥' },
  { name: 'Publishing', description: 'Digital publishing, e-books, and content distribution', estimatedEarningMin: 10000, estimatedEarningMax: 100000, icon: '📖' },

  // Emerging (5)
  { name: 'Space Tech', description: 'Space exploration, satellite technology, and aerospace innovation', estimatedEarningMin: 100000, estimatedEarningMax: 1000000, icon: '🚀' },
  { name: 'AgriTech', description: 'Agricultural technology, precision farming, and crop management', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🌱' },
  { name: 'FoodTech', description: 'Food innovation, alternative proteins, and culinary technology', estimatedEarningMin: 20000, estimatedEarningMax: 200000, icon: '🍽️' },
  { name: 'BioTech', description: 'Biotechnology, synthetic biology, and life sciences', estimatedEarningMin: 100000, estimatedEarningMax: 1000000, icon: '🔭' },
  { name: 'NanoTech', description: 'Nanotechnology, materials science, and molecular engineering', estimatedEarningMin: 100000, estimatedEarningMax: 1000000, icon: '🔬' },
];

async function main() {
  console.log('Seeding categories...');

  for (const cat of categories) {
    const slug = toSlug(cat.name);
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name: cat.name,
        slug,
        description: cat.description,
        estimatedEarningMin: cat.estimatedEarningMin,
        estimatedEarningMax: cat.estimatedEarningMax,
        icon: cat.icon,
        isActive: true,
      },
    });
  }

  console.log(`✅ Seeded ${categories.length} categories`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
