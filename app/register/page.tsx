"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lightbulb, Check } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { registerSchema } from "@/lib/validations/auth";
import { APP_NAME } from "@/lib/constants";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: result.data.name, email: result.data.email, password: result.data.password }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setErrors({ form: data.error ?? "Registration failed. Please try again." });
      }
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const passwordChecks = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "One number", met: /[0-9]/.test(formData.password) },
    { label: "One special character", met: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-gray-950 to-cyan-950/20" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full max-w-md"
      >
        <div className="p-8 rounded-2xl bg-gray-900/80 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">{APP_NAME}</span>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Create account</h1>
          <p className="text-gray-400 mb-8">Start selling your ideas today.</p>

          {errors.form && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-6">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input id="name" type="text" label="Full Name" placeholder="John Doe" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={errors.name} autoComplete="name" />
            <Input id="email" type="email" label="Email" placeholder="you@example.com" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={errors.email} autoComplete="email" />
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} label="Password" placeholder="Create a strong password"
                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password} autoComplete="new-password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-300 transition-colors">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {formData.password && (
              <div className="grid grid-cols-2 gap-1.5">
                {passwordChecks.map((check) => (
                  <div key={check.label} className={`flex items-center gap-1.5 text-xs ${check.met ? "text-green-400" : "text-gray-500"}`}>
                    <Check className="w-3 h-3" />
                    {check.label}
                  </div>
                ))}
              </div>
            )}

            <Input id="confirmPassword" type="password" label="Confirm Password" placeholder="Repeat your password"
              value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword} autoComplete="new-password" />

            <Button type="submit" size="lg" loading={loading} className="w-full">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
