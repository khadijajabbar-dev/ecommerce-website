import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(2, "Product title must be at least 2 characters")
    .max(80, "Title is too long"),
  description: z
    .string()
    .max(500, "Keep description under 500 characters")
    .optional()
    .or(z.literal("")),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0"),
  discountPrice: z
    .union([z.coerce.number().positive(), z.literal("")])
    .optional(),
  stock: z.coerce
    .number({ invalid_type_error: "Stock must be a number" })
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),
  // Array of Cloudinary URLs — at least 1 image required, max 4
  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .min(1, "Please upload at least 1 product image")
    .max(4, "You can upload a maximum of 4 images"),
  // Brand — optional free text
  brand: z
    .string()
    .max(60, "Brand name is too long")
    .optional()
    .or(z.literal("")),
  // Colors — array of non-empty strings, max 10, all optional
  colors: z
    .array(z.string().min(1))
    .max(10, "You can add up to 10 colors")
    .optional()
    .default([]),
});