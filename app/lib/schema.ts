import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

export const signUpSchema = z.object({
   email: z.string().email("Invalid email address"),
   password: z.string().min(8, "Password must be at least 8 characters"),
   name: z.string().min(3, "Name must be at least 3 characters"),
   confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
   }).refine((data) => data.confirmPassword === data.password , {
    message: "Passwords must match",
   });

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8,"Password must be 8 characters"),
  confirmPassword: z.string().min(1, "Password must be 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword ,{
  path:["confirmPassword"],
  message:"Passwords donot match",
});

export const forgotPasswordSchema = z.object({
  email:z.string().email("Invalid email address"),
});




