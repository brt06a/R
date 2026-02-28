"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { CATEGORIES, LICENSE_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const STEPS = ["Basic Info", "Details", "Pricing", "Review"];

export default function SubmitPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    price: "",
    licenseType: "non-exclusive",
  });

  const updateField = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Submit Your Idea</h1>
          <p className="text-gray-400">Turn your concept into a listed asset in minutes.</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between mb-12">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                i < step ? "bg-violet-600 text-white" :
                i === step ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/30" :
                "bg-white/10 text-gray-400"
              )}>
                {i < step ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span className={cn("ml-2 text-sm hidden sm:block", i === step ? "text-white font-medium" : "text-gray-500")}>
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div className={cn("h-0.5 w-8 sm:w-16 mx-2 sm:mx-4 transition-all", i < step ? "bg-violet-600" : "bg-white/10")} />
              )}
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-gray-900/80 border border-white/10">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h2 className="text-lg font-semibold text-white mb-6">Basic Information</h2>
                <Input id="title" label="Idea Title" placeholder="A compelling title for your idea" value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)} hint="10-100 characters" />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
                  <select value={formData.category} onChange={(e) => updateField("category", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-violet-500/50">
                    <option value="" className="bg-gray-900">Select a category</option>
                    {CATEGORIES.map((c) => <option key={c.id} value={c.id} className="bg-gray-900">{c.icon} {c.label}</option>)}
                  </select>
                </div>
                <Input id="tags" label="Tags" placeholder="AI, Mobile App, SaaS (comma separated)" value={formData.tags}
                  onChange={(e) => updateField("tags", e.target.value)} hint="Add 1-10 relevant tags" />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h2 className="text-lg font-semibold text-white mb-6">Detailed Description</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
                  <textarea value={formData.description} onChange={(e) => updateField("description", e.target.value)} rows={8}
                    placeholder="Describe your idea in detail. What problem does it solve? How does it work? Who is the target audience?..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 resize-none" />
                  <p className="mt-1.5 text-xs text-gray-500">{formData.description.length}/5000 characters (min 50)</p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h2 className="text-lg font-semibold text-white mb-6">Pricing & Licensing</h2>
                <Input id="price" type="number" label="Base Price (₹)" placeholder="25000" value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)} hint="Minimum ₹1,000" />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">License Type</label>
                  <div className="space-y-3">
                    {LICENSE_TYPES.map((lic) => (
                      <label key={lic.id} className={cn(
                        "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all",
                        formData.licenseType === lic.id ? "border-violet-500/50 bg-violet-500/10" : "border-white/10 hover:border-white/20"
                      )}>
                        <input type="radio" name="licenseType" value={lic.id} checked={formData.licenseType === lic.id}
                          onChange={(e) => updateField("licenseType", e.target.value)} className="mt-1" />
                        <div>
                          <div className="font-medium text-white text-sm">{lic.name}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{lic.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h2 className="text-lg font-semibold text-white mb-6">Review Your Submission</h2>
                <div className="space-y-4">
                  {[
                    { label: "Title", value: formData.title || "Not set" },
                    { label: "Category", value: CATEGORIES.find((c) => c.id === formData.category)?.label || "Not set" },
                    { label: "Tags", value: formData.tags || "Not set" },
                    { label: "Price", value: formData.price ? `₹${parseInt(formData.price).toLocaleString()}` : "Not set" },
                    { label: "License", value: LICENSE_TYPES.find((l) => l.id === formData.licenseType)?.name || "Not set" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start justify-between py-3 border-b border-white/10">
                      <span className="text-sm text-gray-400">{item.label}</span>
                      <span className="text-sm font-medium text-white">{item.value}</span>
                    </div>
                  ))}
                  {formData.description && (
                    <div className="py-3">
                      <div className="text-sm text-gray-400 mb-2">Description Preview</div>
                      <p className="text-sm text-white/80">{formData.description.slice(0, 200)}{formData.description.length > 200 ? "..." : ""}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)} className="flex items-center gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} loading={loading}>
                Submit Idea 🚀
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
