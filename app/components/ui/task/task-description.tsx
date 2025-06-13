import { Edit, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateTaskDescription } from "~/hooks/use-tasks";
import { Button } from "../button";
import { Textarea } from "../textarea";

const TaskDescription = ({
	description,
	taskId,
}: {
	description: string;
	taskId: string;
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newDescription, setNewDescription] = useState(description);
	const { mutate, isPending } = useUpdateTaskDescription();

	const updateDescription = () => {
		mutate(
			{ taskId, description: newDescription },
			{
				onSuccess: () => {
					setIsEditing(false);
					toast.success("Description updated successfully");
				},
				onError: (error: any) => {
					// Error handler will roll back automatically
					const errorMessage =
						error.response?.data?.message ||
						error.message ||
						"Failed to update description";
					console.error(error);
					toast.error("Update failed", {
						description: errorMessage,
					});
				},
			}
		);
	};

	return (
		<div className="flex items-center gap-2">
			{isEditing ? (
				<Textarea
					className="text-base! rounded-2xl border dark:border-primary w-full dark:bg-background min-w-1xl"
					value={newDescription}
					onChange={(e) => setNewDescription(e.target.value)}
					disabled={isPending}
				/>
			) : (
				<div className=" text-sm md:text-base text-pretty text-muted-foreground  font-semibold">
					{description}
				</div>
			)}
			{isEditing ? (
				<Button
					type="submit"
					variant={"neomorphic"}
					className="py-0 rounded-2xl"
					size={"lg"}
					onClick={updateDescription}
					disabled={isPending}
				>
					<Save />
					{isPending ? "Saving ..." : "Save"}
				</Button>
			) : (
				<>
					<Edit
						className="size-10 md:size-5 mb-5  dark:hover:text-primary cursor-pointer"
						onClick={() => setIsEditing(true)}
					/>
				</>
			)}
		</div>
	);
};

export default TaskDescription;
