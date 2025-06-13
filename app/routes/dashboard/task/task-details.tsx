import {
	Archive,
	ArchiveRestore,
	Eye,
	EyeOff,
	ShieldClose,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import BackButton from "~/components/back-button";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import Loader from "~/components/ui/loader";
import TaskTitle from "~/components/ui/task/TaskTitle";
import { useTaskByIdQuery } from "~/hooks/use-tasks";
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
	if (!data) {
		return (
			<div className="flex items-center flex-col justify-center h-screen">
				<ShieldClose className="size-20 mb-5 text-primary animate-ping" />
				<div className="text-2xl font-bold mt-">Task not found</div>
			</div>
		);
	}

	const { task, project } = data;
	const isUserWatching = task?.watchers?.some(
		(watcher) => watcher._id.toString() === user?._id.toString()
	);
	const goBack = () => navigate(-1);

	const members = task?.assignees || [];

	return (
		<div className="container mx-auto p-0 py-4 md:px-4">
			<BackButton />
			<div className="flex flex-row md:flex-row items-center  justify-between mb-6">
				<div className="flex flex-row md:flex-row   md:items-center">
					<h1 className="text-xl md:text-2xl font-bold mt-2  mb-0 md:mb-5">
						{task.title.toUpperCase()}
					</h1>
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
						variant={"neomorphic"}
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
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
				<div className="lg:col-span-2">
					<Card className="bg-muted rounded-2xl p6 shadow-sm mb-6">
						<div className="flex flex-col md:flex-row justify-between items-start mb-4">
							<div className="flex px-2 md:px-3 flex-col">
								<Badge
									variant={
										task.priority === "High"
											? "red"
											: task.priority === "Medium"
											? "todo"
											: "done"
									}
									className="mb-2 capitalize"
								>
									{task.priority}{" "}
								</Badge>
								<TaskTitle title={task.title} taskId={task._id} />
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default TaskDetails;
