"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Eye } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";

interface IdeaCardProps {
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
  className?: string;
}

export default function IdeaCard({
  id,
  title,
  description,
  category,
  price,
  rating,
  reviews,
  author,
  tags,
  views,
  className,
}: IdeaCardProps) {
  const categoryData = CATEGORIES.find((c) => c.id === category);

  return (
    <Link href={`/ideas/${id}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "group relative h-full rounded-2xl p-6 cursor-pointer",
          "bg-gray-900/60 backdrop-blur-sm border border-white/10",
          "hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10",
          "transition-colors duration-300",
          className
        )}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full",
              "bg-white/10 text-gray-300"
            )}
          >
            {categoryData?.icon} {categoryData?.label ?? category}
          </span>
          <div className="flex items-center gap-1 text-amber-400 text-xs">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-500">({reviews})</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-violet-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-3 mb-4">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
              {author.avatar}
            </div>
            <span className="text-xs text-gray-400">{author.name}</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-white">{formatCurrency(price)}</div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Eye className="w-3 h-3" />
              <span>{views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
