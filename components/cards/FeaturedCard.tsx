"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Eye, ArrowRight } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";

interface FeaturedCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  author: { name: string; avatar: string };
  tags: string[];
  views: number;
}

export default function FeaturedCard(props: FeaturedCardProps) {
  const { id, title, description, category, price, rating, reviews, author, tags, views } = props;
  const categoryData = CATEGORIES.find((c) => c.id === category);

  return (
    <Link href={`/ideas/${id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "group relative rounded-3xl overflow-hidden cursor-pointer h-full",
          "bg-gradient-to-br from-gray-900 to-gray-800",
          "border border-white/10 hover:border-violet-500/50",
          "transition-all duration-300"
        )}
      >
        {/* Background gradient spotlight */}
        <div
          className={cn(
            "absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500",
            `bg-gradient-to-br ${categoryData?.color ?? "from-violet-500 to-cyan-500"}`
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

        <div className="relative p-8">
          {/* Featured badge */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/30 to-cyan-500/30 text-violet-300 border border-violet-500/30">
              ✨ Featured
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-gray-300">
              {categoryData?.icon} {categoryData?.label ?? category}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
            {title}
          </h3>
          <p className="text-gray-300 text-sm mb-5 line-clamp-3">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{rating}</span>
              <span className="text-gray-500">({reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Eye className="w-4 h-4" />
              <span>{views.toLocaleString()} views</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                {author.avatar}
              </div>
              <span className="text-sm text-gray-300">{author.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-white">{formatCurrency(price)}</span>
              <motion.div
                whileHover={{ x: 4 }}
                className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4 text-violet-400" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
