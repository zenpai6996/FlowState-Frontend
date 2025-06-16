import { format } from "date-fns";
import {
	CheckCircle,
	CircleAlert,
	ClockPlus,
	FolderArchiveIcon,
} from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import type { Task } from "~/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../card";

const UpcomingTasks = ({ data }: { data: Task[] }) => {
	const [searchParams] = useSearchParams();
	const workspaceId = searchParams.get("workspaceId");
	return (
		<Card>
			<CardHeader>
				<CardTitle>Upcoming Tasks</CardTitle>
				<CardDescription>Tasks that are due soon</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{data.length === 0 ? (
					<Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm  border-slate-200/30 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
						<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/5 dark:from-primary/10 dark:to-primary/10" />

						<CardContent className="flex items-start md:items-center md:justify-center relative z-10">
							<div className="flex flex-col items-center text-center py-4">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/10 dark:from-primary/20 dark:to-primary/20 flex items-center justify-center mb-3 border border-slate-200/30 dark:border-slate-700/30 backdrop-blur-sm">
									<FolderArchiveIcon className="size-5 text-primary" />
								</div>
								<h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">
									No upcoming Tasks
								</h3>
								<p className="text-xs text-slate-500 dark:text-slate-400">
									Start by adding tasks for your project
								</p>
							</div>
						</CardContent>
					</Card>
				) : (
					data.map((task) => (
						<Link
							to={`/workspaces/${workspaceId}/projects/${task.project}/tasks/${task._id}`}
							key={task._id}
							className="flex items-start space-x-3 bg-background p-2 rounded-2xl hover:scale-101 border transition-all duration-200 ease-in-out hover:border-primary border-b pb-3 last:border-0"
						>
							<div
								className={cn(
									"mt-0.5 rounded-full p-1",
									task.priority === "High"
										? "bg-red-200 text-red-500"
										: task.priority === "Medium"
										? "bg-yellow-100 text-yellow-500"
										: "bg-green-100 text-green-500"
								)}
							>
								{task.status === "Done" ? (
									<CheckCircle className="size-4" />
								) : task.status === "In Progress" ? (
									<ClockPlus className="size-4" />
								) : (
									<CircleAlert className="size-4" />
								)}
							</div>
							<div className="space-y-1">
								<div className="flex flex-row space-x-10">
									<p className="font-medium text-sm md:text-md">{task.title}</p>
								</div>
								<div className="items-center flex text-xs text-muted-foreground">
									<span
										className={
											task.status === "Done"
												? "text-green-500"
												: task.status === "In Progress"
												? "text-cyan-500"
												: "text-yellow-500" // Default color if neither condition matches
										}
									>
										{task.status}
									</span>
									{task.dueDate && (
										<>
											<span className="mx-1"> - </span>
											<span>
												{format(new Date(task.dueDate), "dd/MM/yyyy")}
											</span>
										</>
									)}
								</div>
							</div>
						</Link>
					))
				)}
			</CardContent>
		</Card>
	);
};

export default UpcomingTasks;
