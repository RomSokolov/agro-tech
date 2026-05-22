import { z } from "zod";

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  email: z.email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(30, "Phone number is too long"),
  message: z.string().trim().max(1000, "Message is too long").optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const leadSchema = leadFormSchema.extend({
  type: z.enum(["general", "quote"]),
  equipmentId: z.string().optional(),
  equipmentName: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
