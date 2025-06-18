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
import { useLoginMutation } from "~/hooks/use-auth";
import { signInSchema } from "~/lib/schema";
import { useAuth } from "~/provider/auth-context";

type SigninFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<SigninFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate, isPending } = useLoginMutation();
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleOnSubmit = (values: SigninFormData) => {
		mutate(values, {
			onSuccess: (data) => {
				login(data);
				toast.success("Login Successful!!");
				navigate("/dashboard");
			},
			onError: (error: any) => {
				const errorMessage =
					error.response?.data?.message || "An error occured";
				toast.error(errorMessage);
				console.log(error);
			},
		});
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center dark:bg-background p-4">
			<Card className="max-w-md w-screen">
				<CardHeader className="text-center mb-5">
					<div>
						<BackButton />
						<CardTitle className="text-2xl font-bold dark:text-primary">
							Welcome Back
						</CardTitle>
					</div>
					<CardDescription className="text-sm text-muted-foreground">
						Sign in to your account to continue
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
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Address</FormLabel>
										<FormControl>
											<Input3
												className="dark:bg-background"
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
										<div className="flex items-center justify-between">
											<FormLabel>Password</FormLabel>
											<Link
												to={"/forgot-password"}
												className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 ease-in-out"
											>
												Forgot password?
											</Link>
										</div>
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
							<Button
								type="submit"
								variant={"glassMorph"}
								className="w-full mt-2"
								disabled={isPending}
							>
								{isPending ? (
									<>
										Signing in <Loader2 className="w-5 h-5 animate-spin" />
									</>
								) : (
									"Sign In"
								)}
							</Button>
						</form>
					</Form>
					<CardFooter className="flex items-center justify-center mt-2">
						<div className="flex items-center justify-center mt-4 ">
							<p className="text-sm text-muted-foreground">
								Don&apos;t have an account?{" "}
								<Link to="/sign-up" className="text-primary hover:underline">
									Sign Up
								</Link>
							</p>
						</div>
					</CardFooter>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignIn;
