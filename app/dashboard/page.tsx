import { Plus, TrendingUp, Eye, DollarSign, Star } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";
import IdeaCard from "@/components/cards/IdeaCard";
import { MOCK_IDEAS } from "@/lib/constants";

const stats = [
  { label: "Total Ideas", value: "3", icon: TrendingUp, color: "from-violet-500 to-purple-500" },
  { label: "Total Views", value: "12.4K", icon: Eye, color: "from-blue-500 to-cyan-500" },
  { label: "Total Earned", value: "₹1.2L", icon: DollarSign, color: "from-green-500 to-emerald-500" },
  { label: "Avg Rating", value: "4.7", icon: Star, color: "from-amber-500 to-yellow-500" },
];

export default function DashboardPage() {
  const myIdeas = MOCK_IDEAS.slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back! Here&apos;s how your ideas are performing.</p>
            </div>
            <Link href="/submit">
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all">
                <Plus className="w-5 h-5" />
                Submit New Idea
              </button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={stat.label}>
                <div className="p-6 rounded-2xl glass border border-white/10">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        {/* My Ideas */}
        <ScrollReveal>
          <h2 className="text-xl font-bold text-white mb-6">My Ideas</h2>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myIdeas.map((idea) => (
            <StaggerItem key={idea.id}>
              <IdeaCard {...idea} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
}
