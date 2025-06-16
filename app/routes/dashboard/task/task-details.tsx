import { formatDistanceToNow } from "date-fns";
import {
	Archive,
	ArchiveRestore,
	CircleArrowLeft,
	Eye,
	EyeOff,
	ShieldClose,
	Trash2Icon,
	X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import BackButton from "~/components/back-button";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardTitle } from "~/components/ui/card";
import Loader from "~/components/ui/loader";
import CommentSection from "~/components/ui/task/comment-section";
import { DeleteConfirmationDialog } from "~/components/ui/task/delete-confirmation";
import SubtaskDetails from "~/components/ui/task/Subtask/subtask-details";
import TaskActivity from "~/components/ui/task/task-activity";
import TaskAssigneesSelector from "~/components/ui/task/task-assignees-selector";
import TaskDescription from "~/components/ui/task/task-description";
import TaskPrioritySelector from "~/components/ui/task/task-priority-selector";
import TaskStatusSelector from "~/components/ui/task/task-status-selector";
import TaskTitle from "~/components/ui/task/TaskTitle";
import Watchers from "~/components/ui/task/Watchers";
import {
	useArchiveTask,
	useDeleteTask,
	useTaskByIdQuery,
	useWatchTask,
} from "~/hooks/use-tasks";
import { cn } from "~/lib/utils";
import { useAuth } from "~/provider/auth-context";
import type { Project, Task } from "~/types";

const TaskDetails = () => {
	const { user } = useAuth();
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const { taskId, projectId, workspaceId } = useParams<{
		taskId: string;
		projectId: string;
		workspaceId: string;
	}>();

	const navigate = useNavigate();

	const { data, isLoading } = useTaskByIdQuery(taskId!) as {
		data: {
			task: Task;
			project: Project;
		};
		isLoading: boolean;
	};

	const { mutate: watchTask, isPending: isWatching } = useWatchTask();
	const { mutate: archivedTask, isPending: isArchiving } = useArchiveTask();
	const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
	const handleDeleteTask = () => {
		if (
			!task.assignees.some(
				(assignee) => assignee._id?.toString() === user?._id?.toString()
			)
		) {
			toast.error("Only task assignees can delete this task");
			return;
		}
		setIsDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		deleteTask(task._id, {
			onSuccess: () => {
				toast.success("Task deleted successfully");
				navigate(-1); // Go back after deletion
			},
			onError: (error: any) => {
				const errorMessage =
					error.response?.data?.message || "Failed to delete task";
				toast.error("Delete failed", {
					description: errorMessage,
				});
			},
			onSettled: () => {
				setIsDeleteDialogOpen(false);
			},
		});
	};

	if (isLoading)
		return (
			<div className="flex h-full items-center justify-center p-4">
				<div className="text-center">
					<Loader />
					<h2 className="text-muted-foreground text-sm sm:text-base mt-2">
						Fetching Task Details ...
					</h2>
				</div>
			</div>
		);

	if (!data?.task) {
		return (
			<div className="flex items-center flex-col justify-center h-screen">
				<ShieldClose className="size-20 mb-5 text-primary animate-ping" />
				<div className="text-2xl font-bold mt-">Task not found</div>
			</div>
		);
	}

	const { task, project } = data;
	const isUserWatching = task?.watchers?.some(
		(watcher) => watcher._id?.toString() === user?._id?.toString()
	);
	const goBack = () => navigate(-1);

	const members = task?.assignees || [];

	const handleWatchTask = () => {
		watchTask(
			{ taskId: task._id },
			{
				onSuccess: () => {
					toast.success("Action Successfull !");
				},
				onError: (error: any) => {
					const errorMessage = error.response.data.message;
					console.log(error);
					toast.error("Task Watch Unsuccessfull", {
						description: errorMessage,
					});
				},
			}
		);
	};
	const handleArchiveTask = () => {
		archivedTask(
			{ taskId: task._id },
			{
				onSuccess: () => {
					toast.success("Task Archived Successfully !");
				},
				onError: (error: any) => {
					const errorMessage = error.response.data.message;
					console.log(error);
					toast.error("Task was not archived", {
						description: errorMessage,
					});
				},
			}
		);
	};

	return (
		<div className="container mx-auto md:px-4 relative">
			<div className="flex flex-row md:flex-row items-center justify-between mb-3">
				<BackButton className="mb-0" />

				<div className="flex space-x-2 mt-4 md:mt-0">
					<Button
						title={isUserWatching ? "Unwatch" : "Watch"}
						variant={"glassMorph"}
						onClick={handleWatchTask}
						disabled={isWatching}
					>
						{isUserWatching ? (
							<>
								<EyeOff className="md:mr-2 mr-0 size-4 flex-shrink-0" />{" "}
								<span className="hidden xs:inline sm:inline">Unwatch</span>
							</>
						) : (
							<>
								<Eye className="md:mr-2 mr-0 size-4 flex-shrink-0" />
								<span className="hidden xs:inline sm:inline">Watch</span>
							</>
						)}
					</Button>
					<Button
						title={task.isArchived ? "Unarchive" : "Archive"}
						variant={"glassMorph"}
						onClick={handleArchiveTask}
						disabled={isArchiving}
					>
						{task.isArchived ? (
							<>
								<ArchiveRestore className="md:mr-2 mr-0 size-4 flex-shrink-0" />{" "}
								<span className="hidden xs:inline sm:inline">Unarchive</span>
							</>
						) : (
							<>
								<Archive className="md:mr-2 mr-0 size-4 flex-shrink-0" />{" "}
								<span className="hidden xs:inline sm:inline">Archive</span>
							</>
						)}
					</Button>
					<Button
						variant={"neomorphic"}
						onClick={handleDeleteTask}
						className="border dark:hover:border-red-400"
						disabled={isDeleting}
					>
						<Trash2Icon className="dark:text-red-400 rounded-full size-4 md:size-5 flex-shrink-0" />
						<span className="hidden text-xs dark:text-red-400 md:text-sm xs:inline sm:inline whitespace-nowrap">
							{isDeleting ? "Deleting..." : "Delete Task"}
						</span>
					</Button>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex flex-col lg:flex-row gap-2">
				<div className="lg:col-span-2 w-full">
					<Card className="bg-muted rounded-2xl px-1 md:p-6 shadow-sm mb-6">
						<div className="flex flex-row md:flex-row justify-between items-start ">
							<div className="flex px-2 md:px-3 flex-col">
								<CardTitle>
									<TaskTitle title={task.title} taskId={task._id} />
								</CardTitle>

								<div className=" flex text-sm mt-2 md:text-base text-muted-foreground">
									<span className="text-primary">Created:&nbsp; </span>
									{formatDistanceToNow(new Date(task.createdAt), {
										addSuffix: true,
									})}
								</div>
								{task.isArchived && (
									<Badge
										className="mt-2 text-[10px] text-primary"
										variant={"glassHologram"}
									>
										Archived
									</Badge>
								)}
								<div className="flex flex-row mt-2">
									<Badge
										variant={"glassMorph"}
										className={cn(
											"block sm:hidden",
											task.priority === "High"
												? "dark:text-red-400 "
												: task.priority === "Medium"
												? "dark:text-yellow-500"
												: "dark:text-green-500"
										)}
									>
										<span className="text-[10px] md:text-xs">
											{task.priority}{" "}
										</span>
									</Badge>
									<Badge
										variant={"glassMorph"}
										className={cn(
											"ml-2   rounded-2xl block sm:hidden capitalize",
											task.status === "To Do"
												? "dark:text-yellow-500"
												: task.status === "In Progress"
												? "dark:text-cyan-500"
												: "dark:text-green-500"
										)}
									>
										<span className="text-[10px] md:text-xs">
											{task.status}{" "}
										</span>
									</Badge>
								</div>
							</div>

							<div className="flex ">
								<TaskPrioritySelector
									priority={task.priority}
									taskId={task._id}
								/>
								<TaskStatusSelector status={task.status} taskId={task._id} />
							</div>
						</div>
						<div className=" flex px-2 md:px-3 flex-col">
							<TaskDescription
								description={task.description || ""}
								taskId={task._id}
							/>
						</div>
						<div className="px-1 ">
							<h3 className="text-sm  mb-2 font-medium ml-1 text-primary">
								Subtasks:
							</h3>
							<Card className="dark:bg-background p-0">
								<SubtaskDetails
									subtask={task.subtasks || []}
									taskId={task._id}
								/>
							</Card>
						</div>
						<div className="px-1">
							<h3 className="text-sm  mb-2 font-medium ml-1 text-primary">
								Comments :
							</h3>
							<Card className="bg-background p-0 ">
								<CommentSection
									taskId={task._id}
									members={project.members as any}
								/>
							</Card>
						</div>
						<div className=" flex px-2 md:px-3 flex-col">
							<TaskAssigneesSelector
								task={task}
								assignees={task.assignees}
								projectMembers={project.members as any}
							/>
						</div>
					</Card>
				</div>
			</div>

			{/* Side Panel Overlay */}
			<div className={`fixed inset-0 z-50 ${isPanelOpen ? "block" : "hidden"}`}>
				<div
					className="absolute inset-0 bg-black/50 backdrop-blur-sm"
					onClick={() => setIsPanelOpen(false)}
				/>
			</div>

			{/* Side Panel Content */}
			<div
				className={`fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-xl transition-transform duration-300 ease-in-out ${
					isPanelOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="h-full flex flex-col">
					<div className="p-4 border-b flex justify-between items-center">
						<h2 className="text-lg font-semibold">Task Logs</h2>
						<button
							onClick={() => setIsPanelOpen(false)}
							className="p-1 rounded-full hover:bg-muted"
						>
							<X className="h-5 w-5" />
						</button>
					</div>

					<div className="flex-1 overflow-y-auto p-4 space-y-4">
						<Watchers watchers={task.watchers || []} />
						<TaskActivity resourceId={task._id} />
					</div>
				</div>
			</div>

			{/* Mobile Toggle Button (only visible on small screens) */}
			<button
				onClick={() => setIsPanelOpen(!isPanelOpen)}
				className=" fixed md:top-80  right-6 opacity-90 z-40 bg-primary text-muted p-3 rounded-full shadow-lg"
			>
				{isPanelOpen ? (
					<X className="h-6 w-6" />
				) : (
					<CircleArrowLeft className="h-6 w-6 animate-pulse" />
				)}
			</button>
			<DeleteConfirmationDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				onConfirm={handleConfirmDelete}
				isLoading={isDeleting}
			/>
		</div>
	);
};

export default TaskDetails;
