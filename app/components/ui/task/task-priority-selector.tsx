import { ShieldAlert, ShieldCheck, ShieldHalf } from "lucide-react";
import { toast } from "sonner";
import { useUpdateTaskPriorityMutation } from "~/hooks/use-tasks";
import { cn } from "~/lib/utils";
import type { TaskPriority } from "~/types";
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

const TaskPrioritySelector = ({
	priority,
	taskId,
}: {
	priority: TaskPriority;
	taskId: string;
}) => {
	const { mutate, isPending } = useUpdateTaskPriorityMutation();

	const handlePriorityChange = (value: string) => {
		mutate(
			{ taskId, priority: value as TaskPriority },
			{
				onSuccess: () => {
					toast.success("Priority updated successfully");
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
			value={priority}
			onValueChange={handlePriorityChange}
			disabled={isPending}
		>
			<SelectTrigger
				className={cn(
					"sm:w-auto cursor-pointer ",
					priority === "High"
						? "dark:text-red-400  "
						: priority === "Medium"
						? "dark:text-yellow-500 "
						: "dark:text-green-500  "
				)}
			>
				<Badge variant={"glassMorph"}>
					{priority === "High" ? (
						<ShieldAlert className="size-4 md:ml-0 md:size-5 dark:text-red-400" />
					) : priority === "Medium" ? (
						<ShieldHalf className="size-4 md:ml-0 md:size-5 dark:text-yellow-500" />
					) : (
						<ShieldCheck className="size-4 md:ml-0 md:size-5 dark:text-green-500" />
					)}
					<div className="hidden sm:block ">
						<SelectValue
							className={
								priority === "High"
									? "dark:text-red-400  "
									: priority === "Medium"
									? "dark:text-yellow-500 "
									: "dark:text-green-500  "
							}
							placeholder="Priority"
						/>
					</div>
				</Badge>
			</SelectTrigger>
			<SelectGroup>
				<SelectContent align="end">
					<SelectLabel>Priority</SelectLabel>
					<SelectSeparator />
					<SelectItem className="text-green-500" value="Low">
						Low
					</SelectItem>
					<SelectItem className="text-yellow-500" value="Medium">
						Medium
					</SelectItem>
					<SelectItem className="text-red-500" value="High">
						High
					</SelectItem>
				</SelectContent>
			</SelectGroup>
		</Select>
	);
};

export default TaskPrioritySelector;
