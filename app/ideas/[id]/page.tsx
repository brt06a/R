import { notFound } from "next/navigation";
import { Star, Eye, Shield, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { MOCK_IDEAS, CATEGORIES, LICENSE_TYPES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

interface IdeaPageProps {
  params: Promise<{ id: string }>;
}

export default async function IdeaPage({ params }: IdeaPageProps) {
  const { id } = await params;
  const idea = MOCK_IDEAS.find((i) => i.id === id);

  if (!idea) notFound();

  const category = CATEGORIES.find((c) => c.id === idea.category);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <Link href="/explore" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-gray-300">
                  {category?.icon} {category?.label}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{idea.rating}</span>
                  <span className="text-gray-500">({idea.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{idea.title}</h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{idea.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {idea.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm border border-violet-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Author */}
            <ScrollReveal delay={0.1}>
              <div className="p-6 rounded-2xl glass border border-white/10">
                <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">About the Creator</h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-lg font-bold text-white">
                    {idea.author.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{idea.author.name}</div>
                    <div className="text-sm text-gray-400">Verified Creator</div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <Eye className="w-3 h-3" />
                      <span>{idea.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar - Pricing */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2} className="sticky top-24">
              <div className="p-6 rounded-2xl bg-gray-900/80 border border-white/10">
                <div className="text-3xl font-bold text-white mb-1">{formatCurrency(idea.price)}</div>
                <p className="text-gray-400 text-sm mb-6">Base licensing price</p>

                <h3 className="text-sm font-semibold text-white mb-4">Choose License Type</h3>
                <div className="space-y-3 mb-6">
                  {LICENSE_TYPES.map((license) => (
                    <label
                      key={license.id}
                      className="flex items-start gap-3 p-3 rounded-xl border border-white/10 hover:border-violet-500/30 cursor-pointer transition-all"
                    >
                      <input type="radio" name="license" value={license.id} className="mt-1" defaultChecked={license.id === "non-exclusive"} />
                      <div>
                        <div className="text-sm font-medium text-white">{license.name}</div>
                        <div className="text-xs text-gray-400">{license.description}</div>
                        <div className="text-xs text-violet-400 mt-1">
                          {formatCurrency(idea.price * license.multiplier)}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <Link href="/register">
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all mb-3">
                    Purchase License
                  </button>
                </Link>
                <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all font-medium">
                  Contact Creator
                </button>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield className="w-3.5 h-3.5 text-green-400" />
                    <span>Secure payment via Razorpay</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Instant delivery after payment</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
