import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().trim().min(4, "Title must be at least 4 characters").max(120, "Title is too long"),
  excerpt: z
    .string()
    .trim()
    .max(220, "Keep the excerpt under 220 characters")
    .optional()
    .or(z.literal("")),
  content: z.string().trim().min(20, "Post content must be at least 20 characters"),
  coverImage: z.string().trim().url("Enter a valid image URL").optional().or(z.literal("")),
  isPublished: z.boolean().optional(),
});
