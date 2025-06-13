import { Edit, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateTaskTitle } from "~/hooks/use-tasks";
import { Button } from "../button";
import { Input } from "../input";

const TaskTitle = ({ title, taskId }: { title: string; taskId: string }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(title);
	const { mutate, isPending } = useUpdateTaskTitle();

	const updateTitle = () => {
		mutate(
			{ taskId, title: newTitle },
			{
				onSuccess: () => {
					setIsEditing(false);
					toast.success("Task title updated successfully !!");
				},
				onError: (error: any) => {
					const errorMessage = error.response.data.message;
					console.log(error);
					toast.error("Something Went Wrong", {
						description: errorMessage,
					});
				},
			}
		);
	};

	return (
		<div className="flex justify-between items-center gap-2">
			{isEditing ? (
				<Input
					className="text-xl! font-semibold w-full min-w-1xl"
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
					disabled={isPending}
				/>
			) : (
				<h2 className=" text-xl flex-1 mt-5 font-semibold capitalize">
					{title}
				</h2>
			)}
			{isEditing ? (
				<Button
					type="submit"
					variant={"neomorphic"}
					className="py-0 rounded-2xl"
					size={"sm"}
					onClick={updateTitle}
					disabled={isPending}
				>
					<Save />
					{isPending ? "Saving ..." : "Save Title"}
				</Button>
			) : (
				<>
					<Edit
						className="size-5 mt-5 dark:hover:text-primary cursor-pointer"
						onClick={() => setIsEditing(true)}
					/>
				</>
			)}
		</div>
	);
};

export default TaskTitle;
