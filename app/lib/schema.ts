import { z } from "zod";
import { ProjectStatus } from "~/types";

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

export const workspaceSchema = z.object({
  name:z.string().min(3,"Name must be atleast 3 charecters"),
  color:z.string().min(3,"Color must be atleast 3 characters"),
  description:z.string().optional(),
});

export const projectSchema = z.object({
  title:z.string().min(3,"Title must be atleast 3 characters"),
  description:z.string().optional(),
  status:z.nativeEnum(ProjectStatus),
  startDate:z.string().min(10,"Start Date is required"),
  dueDate:z.string().min(10,"Due date is required"),
  members:z.array(z.object({
    user:z.string(),
    role:z.enum(["admin","member","owner","viewer"]),
  })).optional(),
  tags:z.string().optional(),
});




