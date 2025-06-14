import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router";
import { getTaskStatusColor } from "~/lib";
import { cn } from "~/lib/utils";
import type { Project } from "~/types";
import { Badge } from "../badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../card";
import { Progress } from "../progress";

interface ProjectCardTypes {
	project: Project;
	progress: number;
	workspaceId: string;
}

const ProjectCard = ({ project, progress, workspaceId }: ProjectCardTypes) => {
	return (
		<Link to={`/workspaces/${workspaceId}/projects/${project._id}`}>
			<Card className="transition-all duration-300 dark:hover:shadow-md hover:-translate-y-1 mb-3">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>{project.title.toUpperCase()}</CardTitle>
						<span
							className={cn(
								"text-xs p-1 px-2 rounded-full",
								getTaskStatusColor(project.status)
							)}
						>
							{project.status}
						</span>
					</div>
					<CardDescription className="line-clamp-2 mt-2">
						{project.description || "No Description"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="space-y-1">
							{project?.tags?.slice(0, 3).map((tag, index) => (
								<Badge
									key={index}
									variant={"glassMorph"}
									className="mr-2 mb-2 text-[10px] sm:text-xs text-muted-foreground dark:hover:text-primary"
								>
									{tag}
								</Badge>
							))}
							<div className="flex justify-between text-xs">
								<span className="text-xs mr-3">Progress:</span>
								<Progress value={progress} className="h-4" />
								<span className="text-xs text-muted-foreground ml-3">
									{progress}%
								</span>
							</div>
							<div className="flex items-center justify-between ">
								<div className="flex items-center text-sm gap-2 text-primary">
									<span>{project.tasks.length}</span>
									<span>tasks</span>
								</div>
								{project.dueDate && (
									<div className="flex items-center text-xs text-primary mt-2">
										<CalendarDays className="w-3 h-3 mr-2 mb-[1px]" />
										<span>{format(project.dueDate, "dd/MM/yyyy")}</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default ProjectCard;
