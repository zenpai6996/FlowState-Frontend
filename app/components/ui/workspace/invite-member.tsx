import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Copy, Loader, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Input4 } from "~/components/input4";
import { useInviteMember } from "~/hooks/use-workspace";
import { inviteMemberSchema } from "~/lib/schema";
import { cn } from "~/lib/utils";
import { Button } from "../button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../dialog";
import { Form, FormField, FormItem, FormLabel } from "../form";
import { Label } from "../label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

interface inviteMemberProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	workspaceId: string;
}

export type inviteMemberFormData = z.infer<typeof inviteMemberSchema>;
const ROLES = ["admin", "member", "viewer"] as const;
const InviteMemberDialog = ({
	isOpen,
	onOpenChange,
	workspaceId,
}: inviteMemberProps) => {
	const [inviteTab, setInviteTab] = useState("email");
	const [linkCopied, setLinkCopied] = useState(false);
	const handleCopyInvite = () => {
		navigator.clipboard.writeText(
			`${window.location.origin}/workspace-invite/${workspaceId}`
		);
		setLinkCopied(true);
		setTimeout(() => {
			setLinkCopied(false);
		}, 1000);
	};

	const form = useForm<inviteMemberFormData>({
		resolver: zodResolver(inviteMemberSchema),
		defaultValues: {
			email: "",
			role: "member",
		},
	});
	const { mutate, isPending } = useInviteMember();

	const onSubmit = async (data: inviteMemberFormData) => {
		if (!workspaceId) {
			return;
		}
		mutate(
			{
				workspaceId,
				...data,
			},
			{
				onSuccess: () => {
					toast.success("Invite sent Successfully");
					form.reset();
					setInviteTab("email");
					onOpenChange(false);
				},
				onError(error: any) {
					const errorMessage = error.response.data.message;
					toast.error("Failed to send invite", {
						description: errorMessage,
					});
					console.log(error);
				},
			}
		);
	};
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="dark:bg-background">
				<DialogHeader>
					<DialogTitle>Send Invite</DialogTitle>
					<DialogDescription>
						Invite a user to join the workspace
					</DialogDescription>
				</DialogHeader>
				<Tabs
					defaultValue="email"
					value={inviteTab}
					onValueChange={setInviteTab}
				>
					<TabsList className="w-full rounded-xl">
						<TabsTrigger disabled={isPending} value="email">
							Send Email
						</TabsTrigger>
						<TabsTrigger disabled={isPending} value="link">
							Share Link
						</TabsTrigger>
					</TabsList>
					<TabsContent value="email">
						<div className="grid gap-4 ">
							<div className="grid gap-2">
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)}>
										<div className="flex flex-col space-y-6 w-full mt-4">
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Email Address</FormLabel>
														<Input4
															className="rounded-md w-full "
															{...field}
															placeholder="Enter recipient's email"
															disabled={isPending}
														/>
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="role"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Select Role</FormLabel>
														<div className="flex gap-3 flex-wrap">
															{ROLES.map((role) => (
																<Label
																	key={role}
																	className="flex items-center cursor-pointer gap-2 "
																>
																	<input
																		type="radio"
																		value={role}
																		className="peer hidden"
																		checked={field.value === role}
																		onChange={() => field.onChange(role)}
																		disabled={isPending}
																	/>

																	<span
																		className={cn(
																			"capitalize text-md md:text-base border border-primary bg-muted p-1 px-2 rounded-xl focus:bg-background cursor-pointer hover:scale-102 transition-all duration-200 ease-in-out",
																			field.value === "admin"
																				? role === "admin" &&
																						"text-rose-400 border-red-400"
																				: field.value === "member"
																				? role === "member" &&
																				  "text-cyan-500 border-cyan-500"
																				: role === "viewer" &&
																				  "text-green-500 border-green-500"
																		)}
																	>
																		{role}
																	</span>
																</Label>
															))}
														</div>
													</FormItem>
												)}
											/>
										</div>
										<Button
											variant={"neomorphic"}
											className="dark:text-primary  mt-6 w-full"
											disabled={isPending}
										>
											{isPending ? (
												<Loader className="animate-spin" />
											) : (
												<Send />
											)}
											{isPending ? "Sending invite" : "Send Invite"}
										</Button>
									</form>
								</Form>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="link">
						<div className="grid gap-4">
							<div className="grid gap-2 mt-4">
								<Label>Share this Link to invite users</Label>
								<div className="flex items-center space-x-2 ">
									<Input4
										style={{ fontFamily: "Geo" }}
										className="rounded-xl text-xs"
										readOnly
										value={`${window.location.origin}/workspace-invite/${workspaceId}`}
									/>
									<Button
										onClick={handleCopyInvite}
										className="dark:text-primary"
										variant={"glassMorph"}
										disabled={isPending}
									>
										{linkCopied ? (
											<>
												<CheckCircle className="mr-2 w-4 h-4" />
												<span className="hidden md:block">Copied</span>
											</>
										) : (
											<>
												<Copy className="mr-2 w-4 h-4" />
												<span className="hidden md:block">Copy</span>
											</>
										)}
									</Button>
								</div>
							</div>
							<p className="text-sm text-center text-muted-foreground">
								Anyone with this link can join this workspace
							</p>
						</div>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default InviteMemberDialog;
