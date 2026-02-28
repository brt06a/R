export const APP_NAME = "IdeaNax";
export const APP_DESCRIPTION = "The marketplace where ideas become assets. Submit, sell, and license your best ideas.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const CATEGORIES = [
  { id: "technology", label: "Technology", icon: "💻", color: "from-blue-500 to-cyan-500" },
  { id: "business", label: "Business", icon: "💼", color: "from-green-500 to-emerald-500" },
  { id: "creative", label: "Creative", icon: "🎨", color: "from-purple-500 to-pink-500" },
  { id: "science", label: "Science", icon: "🔬", color: "from-yellow-500 to-orange-500" },
  { id: "social", label: "Social Impact", icon: "🌍", color: "from-red-500 to-rose-500" },
  { id: "health", label: "Health & Wellness", icon: "🏥", color: "from-teal-500 to-green-500" },
  { id: "education", label: "Education", icon: "📚", color: "from-indigo-500 to-purple-500" },
  { id: "finance", label: "Finance", icon: "💰", color: "from-amber-500 to-yellow-500" },
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export const LICENSE_TYPES = [
  {
    id: "exclusive",
    name: "Exclusive License",
    description: "Full ownership transfer — buyer gets all rights",
    multiplier: 3,
  },
  {
    id: "non-exclusive",
    name: "Non-Exclusive License",
    description: "Share the idea with multiple buyers",
    multiplier: 1,
  },
  {
    id: "royalty",
    name: "Royalty-Based",
    description: "Earn ongoing royalties on revenue generated",
    multiplier: 1.5,
  },
];

export const MOCK_IDEAS = [
  {
    id: "1",
    title: "AI-Powered Personal Finance Coach",
    description: "An app that analyzes spending patterns and provides personalized financial advice using machine learning, helping users save more and invest smarter.",
    category: "finance",
    price: 25000,
    rating: 4.8,
    reviews: 124,
    author: { name: "Priya Sharma", avatar: "PS" },
    tags: ["AI", "Finance", "Mobile App"],
    featured: true,
    views: 3420,
  },
  {
    id: "2",
    title: "Hyperlocal Skill Exchange Platform",
    description: "A neighborhood-based platform where people can trade skills instead of money — teach guitar, learn cooking, all within your community.",
    category: "social",
    price: 15000,
    rating: 4.6,
    reviews: 89,
    author: { name: "Rahul Verma", avatar: "RV" },
    tags: ["Community", "Marketplace", "Skills"],
    featured: true,
    views: 2100,
  },
  {
    id: "3",
    title: "AR Interior Design Visualizer",
    description: "Augmented reality app that lets users visualize furniture and decor in their actual rooms before purchasing, reducing returns by 60%.",
    category: "technology",
    price: 40000,
    rating: 4.9,
    reviews: 203,
    author: { name: "Anjali Nair", avatar: "AN" },
    tags: ["AR", "Interior Design", "E-commerce"],
    featured: true,
    views: 5600,
  },
  {
    id: "4",
    title: "Mental Health Gamification System",
    description: "Turn mental wellness routines into engaging games with achievements, streaks, and social accountability features.",
    category: "health",
    price: 20000,
    rating: 4.5,
    reviews: 67,
    author: { name: "Dev Malhotra", avatar: "DM" },
    tags: ["Mental Health", "Gamification", "Wellness"],
    featured: false,
    views: 1890,
  },
  {
    id: "5",
    title: "Smart Agricultural Drone Network",
    description: "Autonomous drone fleet for precision farming — monitors crop health, automates irrigation, and predicts yield using computer vision.",
    category: "technology",
    price: 75000,
    rating: 4.7,
    reviews: 156,
    author: { name: "Kiran Patel", avatar: "KP" },
    tags: ["Drones", "Agriculture", "AI"],
    featured: false,
    views: 4200,
  },
  {
    id: "6",
    title: "Micro-Learning Corporate Training",
    description: "Bite-sized 3-minute daily lessons that improve employee skills 40% faster than traditional training programs, with AI personalization.",
    category: "education",
    price: 30000,
    rating: 4.4,
    reviews: 92,
    author: { name: "Neha Gupta", avatar: "NG" },
    tags: ["Education", "Corporate", "AI"],
    featured: false,
    views: 2750,
  },
];

/** Access token cookie max age in seconds (15 minutes). Override via JWT_EXPIRES_IN. */
export const AUTH_COOKIE_MAX_AGE = 60 * 15;
