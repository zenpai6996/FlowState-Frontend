import {
	CheckCircle2,
	ChevronDown,
	ChevronRight,
	Circle,
	CircleOffIcon,
	Plus,
	Trash,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
	useAddSubTask,
	useDeleteSubTask,
	useUpdateSubTask,
} from "~/hooks/use-tasks";
import { cn } from "~/lib/utils";
import type { Subtask } from "~/types";
import { Badge } from "../../badge";
import { Button } from "../../button";
import { Checkbox } from "../../checkbox";
import { Input } from "../../input";

const SubtaskDetails = ({
	subtask,
	taskId,
}: {
	subtask: Subtask[];
	taskId: string;
}) => {
	const [newSubtask, setNewSubtask] = useState("");
	const [isCollapsed, setIsCollapsed] = useState(false);
	const { mutate: addSubTask, isPending } = useAddSubTask();
	const { mutate: updateSubTask, isPending: isUpdating } = useUpdateSubTask();
	const { mutate: deleteSubTask, isPending: isDeleting } = useDeleteSubTask();

	const handleDeleteSubTask = (subTaskId: string) => {
		deleteSubTask(
			{ taskId, subTaskId },
			{
				onSuccess: () => {
					toast.success("Subtask deleted successfully");
				},
				onError: (error: any) => {
					const errorMessage =
						error.response?.data?.message || "Failed to delete subtask";
					toast.error("Something went wrong", {
						description: errorMessage,
					});
				},
			}
		);
	};

	const completedCount = subtask.filter((task) => task.completed).length;
	const totalCount = subtask.length;
	const completionPercentage =
		totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

	const handleToggleTask = (subTaskId: string, checked: boolean) => {
		updateSubTask(
			{ taskId, subTaskId, completed: checked },
			{
				onSuccess: () => {
					toast.success("Subtask updated successfully");
				},
				onError: (error: any) => {
					const errorMessage =
						error.response?.data?.message || "Failed to update subtask";
					console.error(error);
					toast.error("Something went wrong", {
						description: errorMessage,
					});
				},
			}
		);
	};

	const handleAddSubTask = () => {
		if (!newSubtask.trim()) {
			toast.error("Please enter a subtask title");
			return;
		}

		addSubTask(
			{ taskId, title: newSubtask.trim() },
			{
				onSuccess: () => {
					setNewSubtask("");
					toast.success("Subtask added successfully");
				},
				onError: (error: any) => {
					const errorMessage =
						error.response?.data?.message || "Failed to add subtask";
					console.error(error);
					toast.error("Something went wrong", {
						description: errorMessage,
					});
				},
			}
		);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !isPending) {
			handleAddSubTask();
		}
	};

	return (
		<div className="mx-auto container px-2 md:px-6">
			{/* Header Section - Always visible and clickable */}
			<div
				className="flex items-center justify-between cursor-pointer"
				onClick={() => setIsCollapsed(!isCollapsed)}
			>
				<div className="flex items-center space-x-2 ">
					<div className="mb-8">
						{isCollapsed ? (
							<Badge variant={"glassMorph"} className="rounded-full">
								<ChevronRight className="h-4 w-4 md:h-7 md:w-7  dark:text-primary transition-transform duration-300" />
							</Badge>
						) : (
							<Badge variant={"glassMorph"} className="rounded-full">
								<ChevronDown className="h-4 w-4 md:h-7 md:w-7  dark:text-primary transition-transform duration-300" />
							</Badge>
						)}
					</div>
					<div className="space-y-1">
						<h3 className="text-sm font-semibold text-foreground">Subtasks</h3>
						{totalCount > 0 && (
							<div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
								<span>
									{completedCount} of {totalCount} completed
								</span>
								<span className="text-xs">({completionPercentage}%)</span>
							</div>
						)}
					</div>
				</div>
				{totalCount > 0 && (
					<div className="flex items-center space-x-2">
						{completionPercentage === 100 ? (
							<CheckCircle2 className="h-5 w-5 text-green-500" />
						) : (
							<CircleOffIcon className="h-5 w-5 text-muted-foreground" />
						)}
					</div>
				)}
			</div>

			{/* Collapsible Content with Animation */}
			<div
				className={cn(
					"overflow-hidden transition-all duration-300 ease-in-out",
					isCollapsed ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100"
				)}
			>
				<div className="mt-4">
					{/* Progress Bar */}
					{totalCount > 0 && (
						<div className="space-y-2 mb-2">
							<div className="w-full bg-secondary rounded-full h-2">
								<div
									className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
									style={{ width: `${completionPercentage}%` }}
								/>
							</div>
						</div>
					)}

					{/* Subtasks List */}
					<div className="space-y-3">
						{subtask.length > 0 ? (
							<div className="space-y-2">
								{subtask.map((subtasks, index) => (
									<div
										key={subtasks._id}
										className={cn(
											"group flex items-center mt-2  mb-2  rounded-2xl space-x-3 p-3  border transition-all duration-200",
											"hover:bg-background/50 hover:border-accent-foreground/20",
											subtasks.completed
												? "bg-muted/30  border-muted"
												: "bg-background border-border"
										)}
									>
										<label
											htmlFor={subtasks._id}
											className={cn(
												"flex-1 text-sm cursor-pointer transition-all duration-200",
												subtasks.completed
													? "line-through text-muted-foreground"
													: "text-foreground group-hover:text-primary"
											)}
										>
											<div className="flex flex-row">
												<Badge
													variant="glassMorph"
													className=" text-xs md:text-sm text-muted-foreground mr-1 md:mr-2 shrink-0"
												>
													{index + 1}
												</Badge>
												{/* Truncated title container */}
												<span className="mt-[3px] text-xs truncate max-w-[180px] sm:max-w-[240px] md:max-w-[710px]">
													{subtasks.title}
												</span>
											</div>
										</label>
										<Checkbox
											id={subtasks._id}
											checked={subtasks.completed}
											onCheckedChange={(checked) =>
												handleToggleTask(subtasks._id, !!checked)
											}
											disabled={isUpdating}
											className="data-[state=checked]:bg-primary data-[state=checked]:border-primary cursor-pointer"
										/>
										<Button
											variant={"neomorphic"}
											onClick={() => handleDeleteSubTask(subtasks._id)}
											className="dark:hover:border-red-400 rounded-full border "
											size={"icon"}
											disabled={isDeleting}
										>
											<Trash className="dark:text-red-400" />
										</Button>
									</div>
								))}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-8 px-4 text-center space-y-3">
								<div className="rounded-full bg-muted p-3">
									<Circle className="h-6 w-6 text-muted-foreground" />
								</div>
								<div className="space-y-1">
									<p className="text-sm font-medium text-muted-foreground">
										No subtasks yet
									</p>
									<p className="text-xs text-muted-foreground">
										Break down this task into smaller, manageable steps
									</p>
								</div>
							</div>
						)}
					</div>

					{/* Add Subtask Section */}
					<div className="space-y-3">
						<div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
							<span>Add Subtask :</span>
						</div>
						<div className="flex space-x-2">
							<Input
								placeholder="Enter subtask inshort..."
								value={newSubtask}
								onChange={(e) => setNewSubtask(e.target.value)}
								onKeyPress={handleKeyPress}
								disabled={isPending}
								className="flex-1 text-xs md:text-sm focus:ring-2 focus:ring-primary/20"
							/>
							<Button
								disabled={isPending || !newSubtask.trim()}
								onClick={handleAddSubTask}
								variant="neomorphic"
								size="default"
								className="shrink-0 px-4"
							>
								{isPending ? (
									<div className="flex items-center space-x-2">
										<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
										<span>Adding...</span>
									</div>
								) : (
									<div className="flex items-center space-x-2">
										<Plus className="h-4 w-4" />
										<span>Add</span>
									</div>
								)}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SubtaskDetails;
