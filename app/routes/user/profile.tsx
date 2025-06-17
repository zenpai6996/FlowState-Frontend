import { boolean, z } from "zod";
import type { User } from "~/types";

const changePasswordSchema = z
	.object({
		currentpassword: z
			.string()
			.min(1, { message: "Current Password is required" }),
		newPassword: z.string().min(8, { message: "New Password is required" }),
		confirmPassword: z
			.string()
			.min(8, { message: "Confirm password is required" }),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Password donot match",
		path: ["confirmPassword"],
	});

const profileSchema = z.object({
	name: z.string().min(1, { message: "Name is requied" }),
	profilePicture: z.string().optional(),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  
	return <div>profile</div>;
};

export default Profile;
