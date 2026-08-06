import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().trim().min(3, "First name must be at least 3 characters").max(50),
  lastName: z.string().trim().min(3, "Last name must be at least 3 characters").max(50),
  phone: z.string().trim().regex(/^03\d{9}$/, "Phone number must be 11 digits and start with 03"),
  address: z.string().trim().min(5, "Address is required").max(200),
  city: z.string().trim().min(2, "City is required").max(60),
  profileImage: z.string().trim().url("Enter a valid image URL").optional().or(z.literal("")),
});
