import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import BackButton from "~/components/back-button";
import { Input3 } from "~/components/input3";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import Loader from "~/components/ui/loader";
import { Separator } from "~/components/ui/separator";
import {
	useChangePassword,
	useProfileQuery,
	useUpdateProfile,
} from "~/hooks/useUser";
import { useAuth } from "~/provider/auth-context";
import type { User } from "~/types";

const changePasswordSchema = z
	.object({
		currentPassword: z
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
	const { data: user, isPending } = useProfileQuery() as {
		data: User;
		isPending: boolean;
	};
	const { logout } = useAuth();
	const navigate = useNavigate();

	const form = useForm<ChangePasswordFormData>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const profileForm = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: user?.name || "",
			profilePicture: user?.profilePicture || "",
		},
		values: {
			name: user?.name || "",
			profilePicture: user?.profilePicture || "",
		},
	});

	const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
	const {
		mutate: changePassword,
		isPending: isChanging,
		error,
	} = useChangePassword();

	const handlePasswordChange = (values: ChangePasswordFormData) => {
		changePassword(values, {
			onSuccess: () => {
				toast.success("Password changed successfully. Please login again");
				form.reset();
				setTimeout(() => {
					logout();
					navigate("/");
				}, 2000);
			},
			onError: (error: any) => {
				const errorMessage = error.response.data.message;
				toast.error("Password update failed", {
					description: errorMessage,
				});
				console.log(error);
			},
		});
	};

	const handleProfileFormSubmit = (values: ProfileFormData) => {
		updateProfile(
			{ name: values.name, profilePicture: values.profilePicture || "" },
			{
				onSuccess: () => {
					toast.success("Profile updated successfully");
				},
				onError: (error: any) => {
					const errorMessage = error.response.data.message;
					console.log(error);
					toast.error("Profile update Failed", {
						description: errorMessage,
					});
				},
			}
		);
	};

	const BASE_URL = import.meta.env.VITE_API_URL;

	const handleImageUpload = async (file: File) => {
		const formData = new FormData();
		formData.append("profilePicture", file);

		const res = await fetch(`${BASE_URL}/users/upload-profile-picture`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: formData,
		});

		if (!res.ok) throw new Error("Upload failed");
		const data = await res.json();
		profileForm.setValue("profilePicture", data.profilePicture);
	};

	if (isPending) {
		return (
			<div className="flex h-full items-center justify-center p-4">
				<div className="text-center">
					<Loader />
					<h2 className="text-muted-foreground text-sm sm:text-base mt-2">
						Fetching User details ...
					</h2>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8 ">
			<div className="px-4 md:px-0">
				<BackButton />
				<h3 className="text-lg font-medium">Profile</h3>
				<p className="text-sm text-muted-foreground">
					Manage your account and profile
				</p>
			</div>
			<Separator />
			<Card>
				<CardHeader>
					<CardTitle>Personal Information</CardTitle>
					<CardDescription>Update your details</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...profileForm}>
						<form
							onSubmit={profileForm.handleSubmit(handleProfileFormSubmit)}
							className="grid gap-4"
						>
							<div className="flex items-center space-x-4 mb-6">
								<Avatar className="w-20 border border-primary/30 h-20 bg-primary/50">
									<AvatarImage
										src={
											profileForm.watch("profilePicture") ||
											user?.profilePicture
										}
									/>

									<AvatarFallback
										style={{ fontFamily: "Know" }}
										className="text-xl"
									>
										{user?.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div>
									<input
										id="avatar-upload"
										type="file"
										accept="image/"
										disabled={isChanging}
										style={{ display: "none" }}
									/>
									<Button
										type="button"
										size={"sm"}
										variant={"glassMorph"}
										onClick={() => {
											const input = document.getElementById(
												"avatar-upload"
											) as HTMLInputElement;
											input.click();
											input.onchange = async () => {
												if (input.files && input.files[0]) {
													try {
														await handleImageUpload(input.files[0]);
														toast.success("Profile picture uploaded");
													} catch (err) {
														toast.error("Upload failed");
													}
												}
											};
										}}
										className="dark:text-primary rounded-full"
									>
										Change Avatar
									</Button>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								<FormField
									control={profileForm.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Full Name</FormLabel>
											<FormControl>
												<Input3 className="w-full rounded-full" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="grid gap-2">
									<Label htmlFor="email">Email Address</Label>
									<Input3
										className="rounded-full"
										id="email"
										type="email"
										defaultValue={user?.email}
										disabled
									/>
								</div>
							</div>
							<Button
								type="submit"
								className="w-fit dark:text-primary"
								variant={"neomorphic"}
								disabled={isUpdating || isChanging || isPending}
							>
								{isUpdating || isChanging ? (
									<>
										<Loader2 className=" mr-2 w-4 h-4 animate-spin text-primary" />
										<span className="hidden md:block dark:text-primary">
											Saving...
										</span>
									</>
								) : (
									<>Save</>
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
			<Card className="mb-10">
				<CardHeader>
					<CardTitle>Security</CardTitle>
					<CardDescription>Update your password</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handlePasswordChange)}
							className="grod gap-4"
						>
							{error && (
								<Alert variant={"destructive"} className="mb-5">
									<AlertCircle className="w-4 h-4 text-red-500" />
									<AlertDescription>{error.message}</AlertDescription>
								</Alert>
							)}
							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="currentPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Current Password</FormLabel>
											<FormControl>
												<Input3
													className="rounded-full"
													id="current-passowrd"
													type="password"
													placeholder="Enter your current password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="grid grid-cols-1 mt-3 md:grid-cols-2 gap-2">
									<FormField
										control={form.control}
										name="newPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>New Password</FormLabel>
												<FormControl>
													<Input3
														className="rounded-full"
														id="new-passowrd"
														type="password"
														placeholder="Enter your new passowrd"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Confirm Password</FormLabel>
												<FormControl>
													<Input3
														className="rounded-full"
														id="confirm-passowrd"
														type="password"
														placeholder="Confirm your new password"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<Button
								variant={"neomorphic"}
								disabled={isPending || isChanging}
								type="submit"
								className="mt-5 w-fit dark:text-primary"
							>
								{isPending || isChanging ? (
									<>
										<Loader2 className="mr-2 w-4 h-4 animate-spin" />
										Updating
									</>
								) : (
									"Update Password"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Profile;
