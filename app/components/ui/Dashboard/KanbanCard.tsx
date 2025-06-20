import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import type { Task } from "~/types";

interface KanbanCardProps {
	task: Task;
}

const KanbanCard = ({ task }: KanbanCardProps) => {
	return (
		<div className="bg-background border rounded-lg p-3 space-y-3 hover:shadow-md transition-all duration-200 hover:border-primary">
			<div className="flex items-start justify-between">
				<Link
					to={`/workspaces/${task?.project?.workspace}/projects/${task?.project?._id}/tasks/${task?._id}`}
					className="text-sm font-semibold hover:text-primary transition-colors line-clamp-2 flex-1"
				>
					{task.title}
				</Link>
				<ArrowUpRight className="size-4 ml-2 text-muted-foreground hover:text-primary transition-colors flex-shrink-0" />
			</div>

			{task.description && (
				<p className="text-xs text-muted-foreground line-clamp-2">
					{task.description}
				</p>
			)}

			<div className="flex flex-wrap gap-1">
				{task.priority && (
					<Badge
						variant="glassMorph"
						className={cn(
							"text-xs",
							task.priority === "High"
								? "text-red-400"
								: task.priority === "Medium"
								? "text-yellow-400"
								: "text-green-400"
						)}
					>
						{task.priority}
					</Badge>
				)}
				{task.isArchived && (
					<Badge variant="glassHologram" className="text-xs">
						Archived
					</Badge>
				)}
			</div>

			<div className="space-y-2 text-xs">
				<div className="text-primary font-medium">
					<Link
						to={`/workspaces/${task?.project?.workspace}/projects/${task?.project?._id}`}
						className="hover:underline"
					>
						{task.project?.title}
					</Link>
				</div>

				<div className="flex justify-between text-muted-foreground">
					<span>Updated: {format(task.updatedAt, "dd/MM")}</span>
					{task.dueDate && (
						<span
							className={cn(
								"font-medium",
								new Date(task.dueDate) < new Date() ? "text-red-400" : ""
							)}
						>
							Due: {format(task.dueDate, "dd/MM")}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default KanbanCard;
