import { FolderOpenDot } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { getProjectProgress, getTaskStatusColor } from "~/lib";
import { cn } from "~/lib/utils";
import type { Project } from "~/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../card";
import { Progress } from "../progress";

const RecentProjects = ({ data }: { data: Project[] }) => {
	const [searchParams] = useSearchParams();
	const workspaceId = searchParams.get("workspaceId");
	return (
		<Card className="mb-6">
			<CardHeader>
				<CardTitle>Recent Projects</CardTitle>
				<CardDescription>Recently worked on projects</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{data.length === 0 ? (
					<Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm  border-slate-200/30 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
						<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/5 dark:from-primary/10 dark:to-primary/10" />

						<CardContent className="flex items-start md:items-center md:justify-center relative z-10">
							<div className="flex flex-col items-center text-center py-4">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/10 dark:from-primary/20 dark:to-primary/20 flex items-center justify-center mb-3 border border-slate-200/30 dark:border-slate-700/30 backdrop-blur-sm">
									<FolderOpenDot className="size-5 text-primary" />
								</div>
								<h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">
									No Recent Projects
								</h3>
								<p className="text-xs text-slate-500 dark:text-slate-400">
									Create your project to get started
								</p>
							</div>
						</CardContent>
					</Card>
				) : (
					data.map((project) => {
						const projectProgress = getProjectProgress(project.tasks);
						return (
							<Card
								key={project._id}
								className="border bg-background hover:border-primary hover:scale-101 transition-all duration-200 ease-in-out rounded-lg p-4"
							>
								<div className="items-center justify-between mb-2">
									<Link
										to={`/workspaces/${workspaceId}/projects/${project._id}`}
									>
										<div className="flex justify-between gap-3">
											<h3 className="font-medium hover:text-primary transition-colors capitalize">
												{project.title}
											</h3>
											<span
												className={cn(
													"px-2 py-1 text-xs rounded-full",
													getTaskStatusColor(project.status)
												)}
											>
												{project.status}
											</span>
										</div>
										<p
											className="text-sm text-gray-300 mb-3 line-clamp-2"
											style={{ fontFamily: "Geo" }}
										>
											{project.description}
										</p>
										<div className="space-y-1">
											<div className="flex items-center justify-between text-xs">
												<span className="text-primary">Progress</span>
												<span>{projectProgress}%</span>
											</div>
											<Progress value={projectProgress} className="h-1" />
										</div>
									</Link>
								</div>
							</Card>
						);
					})
				)}
			</CardContent>
		</Card>
	);
};

export default RecentProjects;
