import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { useCreateTask } from "~/hooks/use-tasks";
import { createtaskSchema } from "~/lib/schema";
import type { ProjectMemberRole, User } from "~/types";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Checkbox } from "../checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../form";
import { Input } from "../input";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../select";
import { Textarea } from "../textarea";

interface CreateTaskDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	projectId: string;
	projectMembers: { user: User; role: ProjectMemberRole }[];
}

export type CreateTaskFromData = z.infer<typeof createtaskSchema>;

const CreateTaskDialog = ({
	open,
	onOpenChange,
	projectId,
	projectMembers,
}: CreateTaskDialogProps) => {
	const form = useForm<CreateTaskFromData>({
		resolver: zodResolver(createtaskSchema),
		defaultValues: {
			title: "",
			description: "",
			status: "To Do",
			priority: "Low",
			dueDate: "",
			assignees: [],
		},
	});

	const { mutate, isPending } = useCreateTask();

	const onSubmit = (values: CreateTaskFromData) => {
		mutate(
			{
				projectId,
				taskData: values,
			},
			{
				onSuccess: () => {
					toast.success("Task created successfully !");
					form.reset();
					onOpenChange(false);
				},
				onError: (error: any) => {
					const errorMessage = error.response.data.message;
					toast.error("Something went wrong", {
						description: errorMessage,
					});
					console.log(error);
				},
			}
		);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>Create Task</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid gap-6  py-1">
							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem className="mb-1">
											<FormLabel>Task Title</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Enter task title" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem className="mb-1">
											<FormLabel>Task Description</FormLabel>
											<FormControl>
												<Textarea {...field} placeholder="Describe the task" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="grid gap-4 md:grid-cols-2">
									<FormField
										control={form.control}
										name="status"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Task Status</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormItem className="mb-1">
															<FormControl>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Select task status" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="To Do">To Do</SelectItem>
																<SelectItem value="In Progress">
																	In Progress
																</SelectItem>
																<SelectItem value="Done">Done</SelectItem>
															</SelectContent>
														</FormItem>
													</Select>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="priority"
										render={({ field }) => (
											<FormItem className="mb-1">
												<FormLabel>Task Priority</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormItem>
															<FormControl>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Select task priority" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="Low">Low</SelectItem>
																<SelectItem value="Medium">Medium</SelectItem>
																<SelectItem value="High">High</SelectItem>
															</SelectContent>
														</FormItem>
													</Select>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name="dueDate"
									render={({ field }) => (
										<FormItem className="mb-1">
											<FormLabel>Due Date</FormLabel>
											<FormControl>
												<Popover modal={true}>
													<PopoverTrigger asChild>
														<Button
															variant={"glassMirror"}
															className={
																"w-full justify-start text-left font-normal" +
																(!field.value ? "text-muted-foreground" : "")
															}
														>
															<CalendarIcon className="size-4 mr-2" />
															{field.value ? (
																format(new Date(field.value), "dd/MM/yyyy")
															) : (
																<span>Pick a date</span>
															)}
														</Button>
													</PopoverTrigger>
													<PopoverContent>
														<Calendar
															mode="single"
															selected={
																field.value ? new Date(field.value) : undefined
															}
															onSelect={(date) => {
																field.onChange(
																	date?.toISOString() || undefined
																);
															}}
														/>
													</PopoverContent>
												</Popover>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="assignees"
									render={({ field }) => {
										const selectedMembers = field.value || [];

										return (
											<FormItem>
												<FormLabel>Assignees</FormLabel>
												<FormControl>
													<Popover>
														<PopoverTrigger asChild>
															<Button
																variant={"glassMorph"}
																className="w-full justify-start text-left font-normal min-h-11"
															>
																{selectedMembers.length === 0 ? (
																	<span className="text-muted-foreground">
																		Select Assignees
																	</span>
																) : selectedMembers.length <= 2 ? (
																	selectedMembers
																		.map((m) => {
																			const members = projectMembers.find(
																				(wm) => wm.user._id === m
																			);
																			return `${members?.user.name}`;
																		})
																		.join(",")
																) : (
																	`${selectedMembers.length} assignees selected`
																)}
															</Button>
														</PopoverTrigger>
														<PopoverContent
															className="w-xs md:w-sm max-h-60 overflow-y-auto p-2"
															align="center"
														>
															<div className="flex flex-col gap-2">
																{projectMembers.map((member) => {
																	const selectedMember = selectedMembers.find(
																		(m) => m === member.user?._id
																	);
																	return (
																		<div
																			key={member.user._id}
																			className="flex items-center gap-2 p-2 border rounded-2xl"
																		>
																			<Checkbox
																				checked={!!selectedMember}
																				onCheckedChange={(checked) => {
																					if (checked) {
																						field.onChange([
																							...selectedMembers,
																							member.user._id,
																						]);
																					} else {
																						field.onChange(
																							selectedMembers.filter(
																								(m) => m !== member.user._id
																							)
																						);
																					}
																				}}
																				id={`member-${member.user._id}`}
																			/>
																			<span className="truncate flex-1">
																				{member.user.name}
																			</span>
																		</div>
																	);
																})}
															</div>
														</PopoverContent>
													</Popover>
												</FormControl>
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button variant={"neomorphic"} type="submit" disabled={isPending}>
								{isPending ? "Creating..." : "Create Task"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateTaskDialog;
