import { AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import {
	AlertCircle,
	CalendarCheck,
	CheckCircle,
	CirclePlus,
	ClockPlus,
	ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import BackButton from "~/components/back-button";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import Loader from "~/components/ui/loader";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CreateTaskDialog from "~/components/ui/task/create-task-dialog";
import { UseProjectQuery } from "~/hooks/use-project";
import { getProjectProgress } from "~/lib";
import { cn } from "~/lib/utils";
import type { Project, Task, TaskStatus } from "~/types";

const ProjectDetails = () => {
	const { projectId, workspaceId } = useParams<{
		projectId: string;
		workspaceId: string;
	}>();

	const navigate = useNavigate();

	const [isCreateTask, setIsCreateTask] = useState(false);
	const [taskFilter, setTaskFilter] = useState<TaskStatus | "All">("All");

	const { data, isLoading } = UseProjectQuery(projectId!) as {
		data: {
			tasks: Task[];
			project: Project;
		};
		isLoading: boolean;
	};

	if (isLoading)
		return (
			<div className="flex h-full items-center justify-center p-4">
				<div className="text-center">
					<Loader />
					<h2 className="text-muted-foreground text-sm sm:text-base mb-2">
						Fetching Project Details ...
					</h2>
				</div>
			</div>
		);

	const { project, tasks } = data;
	const projectProgress = getProjectProgress(tasks);

	const handleTaskClick = (taskId: string) => {
		navigate(
			`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
		);
	};

	return (
		<div className="space-y-4 sm:space-y-6 lg:space-y-8 mb-5 px-2 sm:px-4 lg:px-0">
			{/* Header Section */}
			<div className="space-y-4">
				<div>
					<BackButton />
					<div className="flex justify-between gap-3 mt-2 mb-7">
						<h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
							{project.title}
						</h1>
						<div className="flex flex-row gap-3">
							{/* Status Badges */}
							<Badge
								variant={"glassMorph"}
								className="flex items-center flex-wrap gap-2 text-xs sm:text-sm"
							>
								{/* <div className="text-primary xs:hidden inline whitespace-nowrap">
									Stats:
								</div> */}
								<div className="flex flex-wrap gap-1 sm:gap-2">
									<Badge
										variant={"todo"}
										className="bg-muted text-[10px] sm:text-xs"
										title="To Do"
									>
										<span className="hidden xs:inline animate-pulse">
											{tasks.filter((task) => task.status === "To Do").length}{" "}
											To Do
										</span>
										<span className="xs:hidden animate-pulse">
											{tasks.filter((task) => task.status === "To Do").length}
										</span>
									</Badge>
									<Badge
										variant={"progress"}
										className="bg-muted text-[10px] sm:text-xs"
										title="In Progress"
									>
										<span className="hidden xs:inline  animate-pulse">
											{
												tasks.filter((task) => task.status === "In Progress")
													.length
											}{" "}
											In Progress
										</span>
										<span className="xs:hidden  animate-pulse">
											{
												tasks.filter((task) => task.status === "In Progress")
													.length
											}
										</span>
									</Badge>
									<Badge
										variant={"done"}
										className="bg-muted text-[10px] sm:text-xs"
										title="Done"
									>
										<span className="hidden xs:inline  animate-pulse">
											{tasks.filter((task) => task.status === "Done").length}{" "}
											Done
										</span>
										<span className="xs:hidden  animate-pulse">
											{tasks.filter((task) => task.status === "Done").length}
										</span>
									</Badge>
								</div>
							</Badge>
							<Button
								variant={"neomorphic"}
								className="text-xs sm:text-sm px-3 sm:px-6  rounded-full whitespace-nowrap"
								onClick={() => setIsCreateTask(true)}
							>
								<CirclePlus className="size-4 sm:size-4 md:size-5 flex-shrink-0" />
								<span className="hidden xs:inline sm:inline whitespace-nowrap">
									Add Task
								</span>
							</Button>
						</div>
					</div>
					{project.description && (
						<p className="text-xs sm:text-sm text-muted-foreground mt-3 line-clamp-2 sm:line-clamp-none">
							<span className="text-primary">Description :</span>{" "}
							{project.description}
						</p>
					)}
				</div>

				{/* Progress and Add Task Section */}
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
					<div className="flex items-center gap-2 flex-1 min-w-0">
						<div className="text-xs sm:text-sm text-primary whitespace-nowrap">
							Progress:
						</div>
						<div className="flex-1 min-w-0 max-w-xs">
							<Progress value={projectProgress} className="h-2" />
						</div>
						<Badge variant={"glassMorph"}>
							<span className="text-xs text-white dark:hover:text-primary whitespace-nowrap">
								{projectProgress}%
							</span>
						</Badge>
					</div>
				</div>
				<div className="flex flex-row">
					{project?.tags?.slice(0, 6).map((tag, index) => (
						<>
							<Badge
								key={index}
								variant={"neoMorphicPressed"}
								className="mr-2 mb-2  text-xs sm:text-sm text-muted dark:hover:text-primary"
							>
								{tag}
							</Badge>
						</>
					))}
				</div>
			</div>

			{/* Tabs Section */}
			<div className="w-full">
				<Tabs defaultValue="all" className="w-full">
					<div className="flex flex-col gap-4 mb-4 sm:mb-6">
						<TabsList className="w-full grid grid-cols-4 h-auto p-1">
							<TabsTrigger
								value="all"
								onClick={() => setTaskFilter("All")}
								className="text-xs sm:text-sm py-2 px-1 sm:px-3"
							>
								<span className="hidden sm:inline">All Tasks</span>
								<span className="sm:hidden">All</span>
							</TabsTrigger>
							<TabsTrigger
								value="todo"
								onClick={() => setTaskFilter("To Do")}
								className="dark:text-yellow-500 text-xs sm:text-sm py-2 px-1 sm:px-3"
							>
								<span className="hidden sm:inline">To Do</span>
								<span className="sm:hidden">Todo</span>
							</TabsTrigger>
							<TabsTrigger
								value="in-progress"
								onClick={() => setTaskFilter("In Progress")}
								className="dark:text-cyan-500 text-xs sm:text-sm py-2 px-1 sm:px-3"
							>
								<span className="hidden sm:inline">In Progress</span>
								<span className="sm:hidden">Progress</span>
							</TabsTrigger>
							<TabsTrigger
								value="done"
								onClick={() => setTaskFilter("Done")}
								className="dark:text-green-500 text-xs sm:text-sm py-2 px-1 sm:px-3"
							>
								Done
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="all" className="m-0">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
							<TabsColumn
								title="To Do"
								tasks={tasks.filter((task) => task.status === "To Do")}
								onTaskClick={handleTaskClick}
							/>
							<TabsColumn
								title="In Progress"
								tasks={tasks.filter((task) => task.status === "In Progress")}
								onTaskClick={handleTaskClick}
							/>
							<TabsColumn
								title="Done"
								tasks={tasks.filter((task) => task.status === "Done")}
								onTaskClick={handleTaskClick}
							/>
						</div>
					</TabsContent>

					<TabsContent value="todo" className="m-0">
						<div className="grid grid-cols-1 gap-3 sm:gap-4">
							<TabsColumn
								title="To Do"
								tasks={tasks.filter((task) => task.status === "To Do")}
								onTaskClick={handleTaskClick}
								isfullWidth
							/>
						</div>
					</TabsContent>

					<TabsContent value="in-progress" className="m-0">
						<div className="grid grid-cols-1 gap-3 sm:gap-4">
							<TabsColumn
								title="In Progress"
								tasks={tasks.filter((task) => task.status === "In Progress")}
								onTaskClick={handleTaskClick}
								isfullWidth
							/>
						</div>
					</TabsContent>

					<TabsContent value="done" className="m-0">
						<div className="grid grid-cols-1 gap-3 sm:gap-4">
							<TabsColumn
								title="Done"
								tasks={tasks.filter((task) => task.status === "Done")}
								onTaskClick={handleTaskClick}
								isfullWidth
							/>
						</div>
					</TabsContent>
				</Tabs>
			</div>

			{/* Create Task Dialog */}
			<CreateTaskDialog
				open={isCreateTask}
				onOpenChange={setIsCreateTask}
				projectId={projectId!}
				projectMembers={project.members as any}
			/>
		</div>
	);
};

interface TaskColumnProps {
	title: string;
	tasks: Task[];
	onTaskClick: (taskId: string) => void;
	isfullWidth?: boolean;
}

const TabsColumn = ({
	title,
	tasks,
	onTaskClick,
	isfullWidth = false,
}: TaskColumnProps) => {
	const [isCreateTask, setIsCreateTask] = useState(false);
	return (
		<div
			className={
				isfullWidth
					? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
					: ""
			}
		>
			<div
				className={cn(
					"space-y-3 sm:space-y-4",
					!isfullWidth ? "h-full" : "col-span-full mb-4"
				)}
			>
				{!isfullWidth && (
					<div className="flex items-center justify-between">
						<h1 className="font-medium text-sm   sm:text-base flex items-center">
							{title === "To Do" ? (
								<>
									<AlertCircle className="mr-1 sm:mr-2 size-4 sm:size-5 text-yellow-500" />
									<span className="hidden xs:inline">
										{title.toUpperCase()}
									</span>
									<span className="xs:hidden">TODO</span>
								</>
							) : title === "In Progress" ? (
								<>
									<ClockPlus className="mr-1 sm:mr-2 size-4 sm:size-5 text-cyan-500" />
									<span className="hidden sm:inline">
										{title.toUpperCase()}
									</span>
									<span className="sm:hidden">PROGRESS</span>
								</>
							) : (
								<>
									<CheckCircle className="mr-1 sm:mr-2 size-4 sm:size-5 text-green-500" />
									{title.toUpperCase()}
								</>
							)}
						</h1>
						<Badge variant={"glassMorph"} className="text-xs">
							{title === "To Do" ? (
								<span className="text-yellow-500">{tasks.length}</span>
							) : title === "In Progress" ? (
								<span className="text-cyan-500">{tasks.length}</span>
							) : (
								<span className="text-green-500">{tasks.length}</span>
							)}
						</Badge>
					</div>
				)}
				<div
					className={cn(
						"space-y-3",
						isfullWidth &&
							"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
					)}
				>
					{tasks.length === 0 ? (
						<div className="text-center text-sm text-muted-foreground mb-5">
							<Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1">
								<CardHeader className="p-3 sm:p-4">
									<div className="flex flex-col justify-center text-primary items-center">
										<ShieldAlert
											size={16}
											className=" size-10 mb-3  flex-shrink-0 animate-pulse "
										/>

										<span className="text-xs sm:text-sm">
											{title === "Done"
												? "No Tasks completed"
												: title === "To Do"
												? "No Tasks pending"
												: "No Tasks in progress"}
										</span>
										<Button
											variant={"neomorphic"}
											className="text-xs sm:text-sm px-3 mt-2 sm:px-6 py-2 rounded-full whitespace-nowrap"
											onClick={() => setIsCreateTask(true)}
										>
											<span className="hidden xs:inline">Add Task</span>
											<span className="xs:hidden">Add Task</span>
										</Button>
									</div>
								</CardHeader>
							</Card>
						</div>
					) : (
						tasks.map((task) => (
							<TaskCard
								key={task._id}
								task={task}
								onClick={() => onTaskClick(task._id)}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};

const TaskCard = ({ task, onClick }: { task: Task; onClick: () => void }) => {
	return (
		<Card
			onClick={onClick}
			className="cursor-pointer mb-7 sm:mb-5 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
		>
			<CardHeader className="py-1 sm:py-1 px-3 sm:px-4">
				<h4 className="font-medium text-sm sm:text-base lg:text-lg line-clamp-1">
					{task.title.toUpperCase()}
				</h4>
				<div className="flex items-center justify-between mb-2 mt-1 gap-2">
					<Badge
						className={cn(
							"text-xs flex-shrink-0",
							task.priority === "High"
								? "text-rose-500 shadow-2xl dark:hover:border-rose-500"
								: task.priority === "Medium"
								? "text-yellow-500 shadow-2xl dark:hover:border-yellow-500"
								: "text-green-500 shadow-2xl dark:hover:border-green-500"
						)}
						variant={"glassMorph"}
					>
						{task.priority}
					</Badge>
					<div className="flex gap-2 sm:gap-3">
						{task.status !== "To Do" && (
							<Button
								variant={"glassMorph"}
								size={"icon"}
								className="size-6 sm:size-7 dark:text-yellow-500 rounded-full flex-shrink-0"
								onClick={() => {
									console.log("todo");
								}}
								title="Mark as To Do"
							>
								<AlertCircle className="size-6 sm:size-7 " />
								<span className="sr-only">Mark as To Do</span>
							</Button>
						)}
						{task.status !== "In Progress" && (
							<Button
								variant={"glassMorph"}
								size={"icon"}
								className="size-6 sm:size-7 rounded-full dark:text-cyan-500 flex-shrink-0"
								onClick={(e) => {
									e.stopPropagation();
									console.log("in progress");
								}}
								title="Mark as in progress"
							>
								<ClockPlus className="size-6 sm:size-7 " />
								<span className="sr-only">Mark as In Progress</span>
							</Button>
						)}
						{task.status !== "Done" && (
							<Button
								variant={"glassMorph"}
								size={"icon"}
								className="dark:text-green-500 size-6 sm:size-7 rounded-full flex-shrink-0"
								onClick={(e) => {
									e.stopPropagation();
									console.log("done");
								}}
								title="Mark as Done"
							>
								<CheckCircle className="size-6 sm:size-7 " />
								<span className="sr-only">Mark as Done</span>
							</Button>
						)}
					</div>
				</div>
				{task.description && (
					<p className="text-xs capitalize mt-5 px-2 sm:text-sm text-muted-foreground line-clamp-2 ">
						<span className="text-primary">Task Detail: </span>
						{task.description}
					</p>
				)}
			</CardHeader>
			<CardContent className="p-2 sm:p-3 lg:p-5 pt-0">
				<div className="flex items-center justify-between text-xs sm:text-sm gap-2">
					<div className="flex items-center gap-2 min-w-0 flex-1">
						{task.assignees && task.assignees.length > 0 && (
							<div className="flex ml-2 -space-x-1 sm:-space-x-2">
								{task.assignees.slice(0, 3).map((member) => (
									<Avatar
										key={member._id}
										className="relative size-6 sm:size-8 bg-muted rounded-full border-2 border-accent flex-shrink-0"
										title={member.name}
									>
										<AvatarImage src={member.profilePicture} />
										<AvatarFallback className="text-xs">
											{member.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
								))}
								{task.assignees.length > 3 && (
									<div className="flex items-center justify-center size-6 sm:size-8 bg-muted rounded-full border-2 border-accent">
										<span className="text-xs text-muted-foreground">
											+{task.assignees.length - 3}
										</span>
									</div>
								)}
							</div>
						)}
					</div>
					{task.dueDate && (
						<div className="text-xs text-primary flex items-center flex-shrink-0">
							<CalendarCheck className="size-3 mr-1" />
							<span className="hidden xs:inline">
								{format(new Date(task.dueDate), "d/MM/yyyy")}
							</span>
							<span className="xs:hidden">
								{format(new Date(task.dueDate), "d/MM/yyyy")}
							</span>
						</div>
					)}
				</div>
				{task.subtasks && task.subtasks.length > 0 && (
					<div className="mt-2 text-xs text-muted-foreground">
						{task.subtasks.filter((subtask) => subtask.completed).length}/
						{task.subtasks.length}
						<span className="hidden xs:inline"> subtasks</span>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default ProjectDetails;
