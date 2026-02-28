import { cn } from "@/lib/utils";
import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  endAdornment?: ReactNode;
}

export default function Input({ label, error, hint, endAdornment, className, id, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded-xl text-white placeholder-gray-500",
            "bg-white/5 border transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-violet-500/50",
            endAdornment ? "pr-10" : "",
            error
              ? "border-red-500/50 focus:border-red-500"
              : "border-white/10 focus:border-violet-500/50 hover:border-white/20",
            className
          )}
          {...props}
        />
        {endAdornment && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {endAdornment}
          </div>
        )}
      </div>
      {hint && !error && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
