import { z } from "zod";

export const profileSchema: z.Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().nullish(),
  lastName: z.string().min(1, "Last name is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  website: z.string().nullish(),
});

export const emailSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters long")
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase()
    .trim()
    .refine((email) => {
      const [localPart, domain] = email.split("@");
      return localPart.length <= 64 && domain.length <= 255;
    }, "Email local part must not exceed 64 characters and domain must not exceed 255 characters")
    .refine(
      (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
      "Email must contain only allowed characters"
    ),
});
