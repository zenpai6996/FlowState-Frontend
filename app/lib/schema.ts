import { z } from "zod";
import { ProjectStatus } from "~/types";

export const signInSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password is required"),
});

export const signUpSchema = z
	.object({
		email: z.string().email("Invalid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		name: z.string().min(3, "Name must be at least 3 characters"),
		confirmPassword: z
			.string()
			.min(8, "Password must be at least 8 characters"),
	})
	.refine((data) => data.confirmPassword === data.password, {
		message: "Passwords must match",
	});

export const resetPasswordSchema = z
	.object({
		newPassword: z.string().min(8, "Password must be 8 characters"),
		confirmPassword: z.string().min(1, "Password must be 8 characters"),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords donot match",
	});

export const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address"),
});

export const workspaceSchema = z.object({
	name: z.string().min(3, "Name must be atleast 3 charecters"),
	color: z.string().min(3, "Color must be atleast 3 characters"),
	description: z.string().optional(),
});

export const projectSchema = z
	.object({
		title: z.string().min(3, "Title must be at least 3 characters"),
		description: z.string().min(3, "Add a description for the project"),
		status: z.nativeEnum(ProjectStatus),
		startDate: z.string().min(10, "Start Date is required"),
		dueDate: z
			.string()
			.min(10, "Due date is required")
			.refine(
				(val) => {
					const dueDate = new Date(val);
					const today = new Date();
					today.setHours(0, 0, 0, 0);
					return dueDate >= today;
				},
				{ message: "Due date must be today or in the future" }
			),
		members: z
			.array(
				z.object({
					user: z.string(),
					role: z.enum(["manager", "contributor", "viewer"]),
				})
			)
			.optional(),
		tags: z
			.string()
			.min(1, "Add a tag to better explain the project")
			.refine(
				(val) => {
					if (!val.includes(",")) return true;
					return val.split(",").every((tag) => tag.trim().length > 0);
				},
				{
					message:
						"Multiple tags must be separated by commas and cannot be empty",
				}
			),
	})
	.refine(
		(data) => {
			const startDate = new Date(data.startDate);
			const dueDate = new Date(data.dueDate);
			return dueDate >= startDate;
		},
		{
			message: "Due date must be after or equal to the start date",
			path: ["dueDate"], // This ensures the error is attached to the dueDate field
		}
	);

export const createtaskSchema = z.object({
	title: z.string().min(1, "Task title is required"),
	description: z.string().optional(),
	status: z.enum(["To Do", "In Progress", "Done"]),
	priority: z.enum(["Low", "Medium", "High"]),
	dueDate: z.string().min(1, "Due date is required"),
	assignees: z.array(z.string()).min(1, "At least one assignees is required"),
});

export const inviteMemberSchema = z.object({
	email: z.string().email(),
	role: z.enum(["admin", "member", "viewer"]),
});
