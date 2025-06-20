import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import BackButton from "~/components/back-button";
import { Input3 } from "~/components/input3";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
import { useSignUpMutation } from "~/hooks/use-auth";
import { signUpSchema } from "~/lib/schema";

export type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword1, setShowPassword1] = useState(false);
	const navigate = useNavigate();
	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			confirmPassword: "",
		},
	});

	const { mutate, isPending } = useSignUpMutation();

	const handleOnSubmit = (values: SignUpFormData) => {
		mutate(values, {
			onSuccess: () => {
				toast.success("Email Verification required", {
					description:
						"Please check you email for verification link. If you dont see it , please check your spam folder.",
				});
				form.reset();
				navigate("/sign-in");
			},
			onError: (error: any) => {
				const errorMessage =
					error.response?.data?.message || "An error occured";
				console.log(error);
				toast.error("Something went wrong", {
					description: errorMessage,
				});
			},
		});
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const togglePasswordVisibility1 = () => {
		setShowPassword1(!showPassword1);
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center dark:bg-background p-4">
			<Card className="max-w-md w-screen">
				<CardHeader className="text-center mb-5">
					<div>
						<BackButton />
						<CardTitle className="text-2xl font-bold dark:text-primary">
							Create Account
						</CardTitle>
					</div>
					<CardDescription className="text-sm text-muted-foreground">
						Sign Up to start using FlowState
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleOnSubmit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Fullname</FormLabel>
										<FormControl>
											<Input3 type="text" placeholder="John Doe" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Address</FormLabel>
										<FormControl>
											<Input3
												type="email"
												placeholder="johndoe@example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className="relative">
												<Input3
													type={showPassword ? "text" : "password"}
													placeholder="********"
													{...field}
													className="pr-10"
												/>
												<button
													type="button"
													onClick={togglePasswordVisibility}
													className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary duration-200 ease-in-out transition-colors"
												>
													{showPassword ? (
														<EyeOff className="h-4 w-4" />
													) : (
														<Eye className="h-4 w-4" />
													)}
												</button>
											</div>
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
											<div className="relative">
												<Input3
													type={showPassword1 ? "text" : "password"}
													placeholder="********"
													{...field}
													className="pr-10"
												/>
												<button
													type="button"
													onClick={togglePasswordVisibility1}
													className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary duration-200 ease-in-out transition-colors"
												>
													{showPassword1 ? (
														<EyeOff className="h-4 w-4" />
													) : (
														<Eye className="h-4 w-4" />
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								variant={"glassMorph"}
								className="w-full mt-2"
								disabled={isPending}
							>
								{isPending ? (
									<>
										Signing up
										<Loader2 className="w-5 h-5 animate-spin" />
									</>
								) : (
									"Sign Up"
								)}
							</Button>
						</form>
					</Form>
					<CardFooter className="flex items-center justify-center mt-2">
						<div className="flex items-center justify-center mt-2 ">
							<p className="text-sm text-muted-foreground">
								Already have an account?{" "}
								<Link to="/sign-in" className="text-primary hover:underline">
									Sign In
								</Link>
							</p>
						</div>
					</CardFooter>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignUp;
