import { z } from "zod";

export const ideaSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(5000, "Description must be less than 5000 characters"),
  category: z.string().min(1, "Please select a category"),
  tags: z
    .array(z.string().max(30))
    .min(1, "Add at least one tag")
    .max(10, "Maximum 10 tags allowed"),
  price: z
    .number()
    .min(1000, "Minimum price is ₹1,000")
    .max(10000000, "Maximum price is ₹1,00,00,000"),
  licenseType: z.enum(["exclusive", "non-exclusive", "royalty"]),
  attachments: z.array(z.string()).optional(),
});

export const ideaFilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  sort: z.enum(["newest", "popular", "price-low", "price-high", "rating"]).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(50).optional(),
});

export type IdeaInput = z.infer<typeof ideaSchema>;
export type IdeaFilterInput = z.infer<typeof ideaFilterSchema>;
