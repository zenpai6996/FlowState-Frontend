import {
	AlertCircle,
	CircleCheckBig,
	CircleParking,
	CirclePause,
	ClockPlus,
} from "lucide-react";
import { toast } from "sonner";
import { useUpdateProjectStatusMutation } from "~/hooks/use-project";
import { cn } from "~/lib/utils";
import type { ProjectStatus } from "~/types";
import { Badge } from "../badge";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "../select";

const ProjectStatusSelector = ({
	status,
	projectId,
}: {
	status: ProjectStatus;
	projectId: string;
}) => {
	const { mutate, isPending } = useUpdateProjectStatusMutation();
	// In project-status-selector.tsx
	const handleStatusChange = (value: string) => {
		mutate(
			{ projectId, status: value as ProjectStatus },
			{
				onSuccess: (data) => {
					toast.success("Status updated successfully");
				},
				onError: (error: any) => {
					const errorMessage =
						error.response?.data?.message ||
						error.response?.data?.error ||
						"Failed to update status";
					console.error("Status update error:", error);
					toast.error(errorMessage);
				},
			}
		);
	};
	return (
		<Select
			value={status}
			onValueChange={handleStatusChange}
			disabled={isPending}
		>
			<SelectGroup>
				<SelectTrigger
					className={cn(
						"sm:w-auto cursor-pointer p-2 md:p-3 mr-[5px] text-center",

						status === "On Hold"
							? "text-yellow-500 border "
							: status === "In Progress"
							? "text-cyan-500 border "
							: status === "Completed"
							? "text-green-500 border"
							: status === "Planning"
							? "text-purple-500 border"
							: "text-red-400 border"
					)}
				>
					<Badge variant={"glassMorph"} className="p-1 ">
						{status === "Cancelled" ? (
							<AlertCircle className="text-red-400 size-4 md:ml-0 md:size-5" />
						) : status === "In Progress" ? (
							<ClockPlus className="text-cyan-500 size-4 md:ml-0 md:size-5" />
						) : status === "On Hold" ? (
							<CirclePause className="text-yellow-500 size-4 md:ml-0 md:size-5" />
						) : status === "Planning" ? (
							<CircleParking className="text-purple-500 size-4 md:ml-0 md:size-5" />
						) : (
							<CircleCheckBig className="text-green-500 size-4 md:ml-0 md:size-5" />
						)}
						<div className="hidden sm:block">
							<SelectValue placeholder="Status" />
						</div>
					</Badge>
				</SelectTrigger>

				<SelectContent align="end">
					<SelectLabel>Status</SelectLabel>
					<SelectSeparator />
					<SelectItem className="text-purple-500" value="Planning">
						Planning
					</SelectItem>
					<SelectItem className="text-yellow-500" value="On Hold">
						On Hold
					</SelectItem>
					<SelectItem className="text-cyan-500" value="In Progress">
						In Progress
					</SelectItem>
					<SelectItem className="text-green-500" value="Completed">
						Completed
					</SelectItem>
					<SelectItem className="text-red-400" value="Cancelled">
						Cancelled
					</SelectItem>
				</SelectContent>
			</SelectGroup>
		</Select>
	);
};

export default ProjectStatusSelector;
