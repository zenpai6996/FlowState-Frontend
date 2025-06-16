import { FolderArchiveIcon, FolderOpenDot } from "lucide-react";
import type { StatsProps } from "~/types";
import { Badge } from "../badge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

const StatCard = ({ data }: { data: StatsProps }) => {
	// Check if project data exists
	const hasProjectData = !!(
		data.totalProjectCancelled ||
		data.totalProjectCompleted ||
		data.totalProjectInProgress ||
		data.totalProjectOnHold ||
		data.totalProjectPlanning
	);

	// Check if task data exists
	const hasTaskData = !!(
		data.totalTasks ||
		data.totalTasksCompleted ||
		data.totalTasksInProgress ||
		data.totalTasksTodo
	);

	// Project Card Component
	const ProjectCard = () => {
		if (!hasProjectData) {
			return (
				<Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm  border-slate-200/30 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
					<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10" />
					<CardHeader className="flex flex-col items-center justify-between pb-2 relative z-10">
						<div className="flex gap-4 justify-between w-full">
							<CardTitle className="text-xl font-medium text-slate-600 dark:text-slate-300">
								Projects:
							</CardTitle>
							<div className="text-xl text-muted-foreground font-bold opacity-60">
								0
							</div>
						</div>
					</CardHeader>
					<CardContent className="flex items-start md:items-center md:justify-center relative z-10">
						<div className="flex flex-col items-center text-center py-4">
							<div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 flex items-center justify-center mb-3 border border-slate-200/30 dark:border-slate-700/30 backdrop-blur-sm">
								<FolderOpenDot className="size-5" />
							</div>
							<h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">
								No Projects Yet
							</h3>
							<p className="text-xs text-slate-500 dark:text-slate-400">
								Create your first project to get started
							</p>
						</div>
					</CardContent>
				</Card>
			);
		}

		return (
			<Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 group">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10" />
				<CardHeader className="flex flex-col items-center justify-between pb-2 relative z-10">
					<div className="flex gap-4 justify-between w-full">
						<CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
							Projects:
						</CardTitle>
						<div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
							{data.totalProjects}
						</div>
					</div>
				</CardHeader>
				<CardContent className="flex items-start md:items-center md:justify-center relative z-10">
					<div className="flex flex-col md:flex-row gap-3">
						<Badge
							variant={"glassMorph"}
							className="text-xs font-medium text-purple-500 dark:text-purple-400 bg-purple-50/80 dark:bg-purple-900/30 border-purple-200/50 dark:border-purple-700/50 hover:bg-purple-100/80 dark:hover:bg-purple-900/50 transition-colors duration-200"
						>
							{data.totalProjectPlanning || 0} Planning
						</Badge>
						<Badge
							variant={"glassMorph"}
							className="text-xs font-medium text-blue-500 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30 border-blue-200/50 dark:border-blue-700/50 hover:bg-blue-100/80 dark:hover:bg-blue-900/50 transition-colors duration-200"
						>
							{data.totalProjectInProgress || 0} in Progress
						</Badge>
						<Badge
							variant={"glassMorph"}
							className="text-xs font-medium text-green-500 dark:text-green-400 bg-green-50/80 dark:bg-green-900/30 border-green-200/50 dark:border-green-700/50 hover:bg-green-100/80 dark:hover:bg-green-900/50 transition-colors duration-200"
						>
							{data.totalProjectCompleted || 0} Completed
						</Badge>
						<Badge
							variant={"glassMorph"}
							className="text-xs font-medium text-yellow-500 dark:text-yellow-400 bg-yellow-50/80 dark:bg-yellow-900/30 border-yellow-200/50 dark:border-yellow-700/50 hover:bg-yellow-100/80 dark:hover:bg-yellow-900/50 transition-colors duration-200"
						>
							{data.totalProjectOnHold || 0} on hold
						</Badge>
						<Badge
							variant={"glassMorph"}
							className="text-xs font-medium text-red-500 dark:text-red-400 bg-red-50/80 dark:bg-red-900/30 border-red-200/50 dark:border-red-700/50 hover:bg-red-100/80 dark:hover:bg-red-900/50 transition-colors duration-200"
						>
							{data.totalProjectCancelled || 0} Cancelled
						</Badge>
					</div>
				</CardContent>
			</Card>
		);
	};

	// Task Card Component
	const TaskCard = () => {
		if (!hasTaskData) {
			return (
				<Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm  border-slate-200/30 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
					<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-teal-500/5 dark:from-cyan-400/10 dark:to-teal-400/10" />
					<CardHeader className="flex flex-col items-center justify-between pb-2 relative z-10">
						<div className="flex gap-4 justify-between w-full">
							<CardTitle className="text-xl font-medium text-slate-600 dark:text-slate-300">
								Tasks:
							</CardTitle>
							<div className="text-xl text-muted-foreground font-bold opacity-60">
								0
							</div>
						</div>
					</CardHeader>
					<CardContent className="flex items-start md:items-center md:justify-center relative z-10">
						<div className="flex flex-col items-center text-center py-4">
							<div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/10 to-teal-500/10 dark:from-cyan-400/20 dark:to-teal-400/20 flex items-center justify-center mb-3 border border-slate-200/30 dark:border-slate-700/30 backdrop-blur-sm">
								<FolderArchiveIcon className="size-5" />
							</div>
							<h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">
								No Tasks Yet
							</h3>
							<p className="text-xs text-slate-500 dark:text-slate-400">
								Tasks will appear here once you create projects
							</p>
						</div>
					</CardContent>
				</Card>
			);
		}

		return (
			<Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 group">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-teal-500/5 dark:from-cyan-400/10 dark:to-teal-400/10" />
				<CardHeader className="flex flex-col items-center justify-between pb-2 relative z-10">
					<div className="flex gap-4 justify-between w-full">
						<CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
							Tasks:
						</CardTitle>
						<div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
							{data.totalTasks}
						</div>
					</div>
				</CardHeader>
				<CardContent className="flex items-start md:items-center md:justify-center relative z-10">
					<div className="flex flex-col md:flex-row gap-3">
						<Badge
							variant={"glassMorph"}
							className="text-xs font-medium text-yellow-500 dark:text-yellow-400 bg-yellow-50/80 dark:bg-yellow-900/30 border-yellow-200/50 dark:border-yellow-700/50 hover:bg-yellow-100/80 dark:hover:bg-yellow-900/50 transition-colors duration-200"
						>
							{data.totalTasksTodo || 0} Todo
						</Badge>
						<Badge
							variant={"glassMorph"}
							className="text-xs font-medium text-cyan-500 dark:text-cyan-400 bg-cyan-50/80 dark:bg-cyan-900/30 border-cyan-200/50 dark:border-cyan-700/50 hover:bg-cyan-100/80 dark:hover:bg-cyan-900/50 transition-colors duration-200"
						>
							{data.totalTasksInProgress || 0} in Progress
						</Badge>
						<Badge
							variant={"glassMorph"}
							className="text-xs font-medium text-green-500 dark:text-green-400 bg-green-50/80 dark:bg-green-900/30 border-green-200/50 dark:border-green-700/50 hover:bg-green-100/80 dark:hover:bg-green-900/50 transition-colors duration-200"
						>
							{data.totalTasksCompleted || 0} Completed
						</Badge>
					</div>
				</CardContent>
			</Card>
		);
	};

	return (
		<div className="grid gap-4 grid-cols-2">
			<ProjectCard />
			<TaskCard />
		</div>
	);
};

export default StatCard;
