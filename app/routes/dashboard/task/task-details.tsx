import { formatDistanceToNow } from "date-fns";
import {
	Archive,
	ArchiveRestore,
	Eye,
	EyeOff,
	ShieldClose,
	Trash2Icon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import BackButton from "~/components/back-button";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardTitle } from "~/components/ui/card";
import Loader from "~/components/ui/loader";
import SubtaskDetails from "~/components/ui/task/Subtask/subtask-details";
import TaskActivity from "~/components/ui/task/task-activity";
import TaskAssigneesSelector from "~/components/ui/task/task-assignees-selector";
import TaskDescription from "~/components/ui/task/task-description";
import TaskPrioritySelector from "~/components/ui/task/task-priority-selector";
import TaskStatusSelector from "~/components/ui/task/task-status-selector";
import TaskTitle from "~/components/ui/task/TaskTitle";
import Watchers from "~/components/ui/task/Watchers";
import { useTaskByIdQuery } from "~/hooks/use-tasks";
import { cn } from "~/lib/utils";
import { useAuth } from "~/provider/auth-context";
import type { Project, Task } from "~/types";

const TaskDetails = () => {
	const { user } = useAuth();
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

	// //TODO create an empty tasks container
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

	return (
		<div className="container mx-auto   md:px-4">
			<div className="flex flex-row md:flex-row items-center  justify-between mb-3">
				<BackButton className="mb-0" />

				<div className="flex flex-row md:flex-row   md:items-center">
					{task.isArchived && (
						<Badge className="ml-2" variant={"glassHologram"}>
							Archived
						</Badge>
					)}
				</div>
				<div className="flex space-x-2 mt-4 md:mt-0">
					<Button
						title={isUserWatching ? "Unwatch" : "Watch"}
						variant={"glassMorph"}
						onClick={() => {}}
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
						onClick={() => {}}
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
						onClick={() => {}}
						className="border dark:hover:border-red-400 "
					>
						<Trash2Icon className=" dark:text-red-400 rounded-full size-4 md:size-5 flex-shrink-0" />
						<span className="hidden text-xs dark:text-red-400 md:text-sm xs:inline sm:inline whitespace-nowrap">
							Delete Task
						</span>
					</Button>
				</div>
			</div>
			<div className="flex flex-col lg:flex-row gap-2">
				<div className="lg:col-span-2">
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
								<div className="flex flex-row mt-2">
									<Badge
										variant={"neosoft"}
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
										variant={"neosoft"}
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
						<div className="px-2 md:px-2">
							<h3 className="text-sm  mb-2 font-medium ml-1 text-primary">
								Subtasks:
							</h3>
							<Card className="dark:bg-background">
								<SubtaskDetails
									subtask={task.subtasks || []}
									taskId={task._id}
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
				<div className="md:w-[500px]">
					<Watchers watchers={task.watchers || []} />
					<TaskActivity resourceId={task._id} />
				</div>
			</div>
		</div>
	);
};

export default TaskDetails;
