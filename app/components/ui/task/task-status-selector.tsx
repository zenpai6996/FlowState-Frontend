import { AlertCircle, CheckCircle, ClockPlus } from "lucide-react";
import { toast } from "sonner";
import { useUpdateTaskStatusMutation } from "~/hooks/use-tasks";
import { cn } from "~/lib/utils";
import type { TaskStatus } from "~/types";
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

const TaskStatusSelector = ({
	status,
	taskId,
}: {
	status: TaskStatus;
	taskId: string;
}) => {
	const { mutate, isPending } = useUpdateTaskStatusMutation();

	const handleStatusChange = (value: string) => {
		mutate(
			{ taskId, status: value as TaskStatus },
			{
				onSuccess: (data) => {
					toast.success("Status updated successfully");
				},
				onError: (error: any) => {
					const errorMessage =
						error.response?.data?.message || "Failed to update status";
					console.error(error);
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
						"sm:w-auto cursor-pointer mr-[10px] text-center",

						status === "To Do"
							? "text-yellow-500 border "
							: status === "In Progress"
							? "text-cyan-500 border "
							: "text-green-500 border"
					)}
				>
					<Badge variant={"glassMorph"}>
						{status === "To Do" ? (
							<AlertCircle className="text-yellow-500 size-4 md:ml-0 md:size-5" />
						) : status === "In Progress" ? (
							<ClockPlus className="text-cyan-500 size-4 md:ml-0 md:size-5" />
						) : (
							<CheckCircle className="text-green-500 size-4 md:ml-0 md:size-5" />
						)}
						<div className="hidden sm:block">
							<SelectValue placeholder="Status" />
						</div>
					</Badge>
				</SelectTrigger>

				<SelectContent align="end">
					<SelectLabel>Status</SelectLabel>
					<SelectSeparator />
					<SelectItem className="text-yellow-500" value="To Do">
						Todo
					</SelectItem>
					<SelectItem className="text-cyan-500" value="In Progress">
						In Progress
					</SelectItem>
					<SelectItem className="text-green-500" value="Done">
						Done
					</SelectItem>
				</SelectContent>
			</SelectGroup>
		</Select>
	);
};

export default TaskStatusSelector;
