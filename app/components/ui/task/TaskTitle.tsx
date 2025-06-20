import { Edit, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateTaskTitle } from "~/hooks/use-tasks";
import { Button } from "../button";
import { Input2 } from "../Input2";

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

	const handleClear = () => {
		setNewTitle(title); // Reset to original title
		setIsEditing(false); // Exit edit mode
	};

	return (
		<div className="flex justify-between items-center gap-2">
			{isEditing ? (
				<Input2
					className="md:text-xl text-sm font-semibold rounded-full border dark:border-primary w-full dark:bg-background min-w-1xl"
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
					disabled={isPending}
					onClear={handleClear}
				/>
			) : (
				<h1 className=" md:text-xl mt-[3px] text-md sm:max-w-[240px] md:max-w-[710px] truncate max-w-[160px]   flex-1 font-semibold capitalize">
					{title}
				</h1>
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
					<Save className=" rounded-full size-4 md:size-5 flex-shrink-0" />
					<span className="hidden text-xs md:text-sm xs:inline sm:inline whitespace-nowrap">
						{isPending ? "Saving ..." : "Save "}{" "}
					</span>
				</Button>
			) : (
				<>
					<Edit
						className="md:size-4 size-3  dark:hover:text-primary cursor-pointer"
						onClick={() => setIsEditing(true)}
					/>
				</>
			)}
		</div>
	);
};

export default TaskTitle;
