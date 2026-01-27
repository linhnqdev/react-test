import { z } from "zod";

/**
 * Common Zod validation schemas
 */

// Email validation
export const emailSchema = z.string().email("Invalid email address");

// Password validation
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character");

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

// Register schema
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    name: z.string().min(2, "Name must be at least 2 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// User update schema
export const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: emailSchema.optional(),
  avatar: z.string().url("Invalid URL").optional(),
});

// Export types
export type ILoginFormData = z.infer<typeof loginSchema>;
export type IRegisterFormData = z.infer<typeof registerSchema>;
export type IUpdateUserFormData = z.infer<typeof updateUserSchema>;
