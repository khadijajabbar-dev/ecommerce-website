import { z } from "zod";

export const createFlashSaleSchema = z.object({
  product: z.string().trim().min(1, "Product is required"),
  discountPercent: z
    .number({ required_error: "Discount % is required" })
    .min(1, "Discount must be at least 1%")
    .max(99, "Discount cannot exceed 99%"),
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: z.string().trim().min(1, "End date is required"),
  quantity: z.number().min(1, "Quantity must be at least 1").optional().nullable(),
});

// Same rules, but every field is optional since this is used for PUT/edit
export const updateFlashSaleSchema = createFlashSaleSchema.partial();
