import { z } from "zod";

export const signinFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

export const forgotPasswordFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export const resetPasswordFormSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

export type SigninFormValues = z.infer<typeof signinFormSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;
