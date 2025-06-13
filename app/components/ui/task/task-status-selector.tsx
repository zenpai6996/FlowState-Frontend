import { toast } from "sonner";
import { useUpdateTaskStatusMutation } from "~/hooks/use-tasks";
import { cn } from "~/lib/utils";
import type { TaskStatus } from "~/types";
import {
	Select,
	SelectContent,
	SelectItem,
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
			{ taskId, status },
			{
				onSuccess: (data) => {
					// Ensure server data is reflected
					toast.success("Status updated successfully");
				},
				onError: (error: any) => {
					// Error will trigger the onError in mutation which will rollback
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
			<SelectTrigger
				className={cn(
					"sm:w-[180px] cursor-pointer",
					status === "To Do"
						? "text-yellow-500 border text-xs md:text-sm  dark:border-yellow-500"
						: status === "In Progress"
						? "text-cyan-500 border text-xs md:text-sm   dark:border-cyan-500"
						: "text-green-500 border text-xs md:text-sm   dark:border-green-500"
				)}
			>
				<SelectValue placeholder={"Status"} />
			</SelectTrigger>
			<SelectContent>
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
		</Select>
	);
};

export default TaskStatusSelector;
