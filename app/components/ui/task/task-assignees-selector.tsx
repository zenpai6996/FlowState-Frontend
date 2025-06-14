import { useState } from "react";
import { toast } from "sonner";
import { useUpdateAssignees } from "~/hooks/use-tasks";
import type { ProjectMemberRole, Task, User } from "~/types";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Badge } from "../badge";
import { Button } from "../button";
import { Checkbox } from "../checkbox";

const TaskAssigneesSelector = ({
	task,
	assignees,
	projectMembers,
}: {
	task: Task;
	assignees: User[];
	projectMembers: { user: User; role: ProjectMemberRole }[];
}) => {
	const [selectedId, setSelectedId] = useState<string[]>(
		assignees.map((assignee) => assignee._id)
	);
	const [dropDownOpen, setDropDownOpen] = useState(false);

	const { mutate, isPending } = useUpdateAssignees();

	const handleSelectAll = () => {
		const allIds = projectMembers.map((m) => m.user._id);
		setSelectedId(allIds);
	};

	const handleUnSelectAll = () => {
		setSelectedId([]);
	};

	const handleSelect = (id: string) => {
		let newSelected: String[] = [];

		if (selectedId.includes(id)) {
			newSelected = selectedId.filter((sid) => sid !== id);
		} else {
			newSelected = [...selectedId, id];
		}
		setSelectedId(newSelected);
	};

	const handleSave = () => {
		mutate(
			{
				taskId: task._id,
				assignees: selectedId,
			},
			{
				onSuccess: () => {
					setDropDownOpen(false);
					toast.success("Assignee changed Successfully!");
				},
				onError: (error: any) => {
					const errorMessage =
						error.response.data.message || "Failed to update assignee";
					toast.error("Something went wrong", {
						description: errorMessage,
					});
					console.log(errorMessage);
				},
			}
		);
	};

	return (
		<div className="mb-6">
			<h3 className="text-sm font-medium text-primary">Assignees:</h3>
			<div className="flex flex-wrap gap-2 mb-2 mt-2">
				{selectedId.length === 0 ? (
					<span className="text-xs text-muted-foreground">Unassigned</span>
				) : (
					projectMembers
						.filter((members) => selectedId.includes(members.user._id))
						.map((m) => (
							<Badge
								variant={"glassMorph"}
								key={m.user._id}
								className="flex items-center rounded-2xl py-0 md:px-1.5 "
							>
								<Avatar>
									<AvatarImage src={m.user.profilePicture} />
									<AvatarFallback className="size-5 md:size-6 text-[10px] md:text-xs   mt-[5px] md:mt-1   items-center border-1 dark:border-primary ">
										{m.user.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<span className="text-[10px] md:text-xs text-gray-300">
									{m.user.name}
								</span>
							</Badge>
						))
				)}
			</div>

			{/* dropdown Menu */}
			<div className="relative mt-3 ">
				<div className="flex justify-between ">
					<Button
						variant={"glassMirror"}
						onClick={() => setDropDownOpen(!dropDownOpen)}
						className="text-[10px] md:text-xs rounded-2xl px-3 py-2 text-left w-[155px] md:w-[175px] text-muted-foreground"
					>
						Select Assignees
					</Button>
					<Badge variant={selectedId.length === 0 ? "red" : "done"}>
						{selectedId.length === 0
							? "No assignees"
							: `${selectedId.length} selected`}
					</Badge>
				</div>
				{dropDownOpen && (
					<div className="absolute z-10 mt-1 w-full bg-background border rounded-2xl shadow-lg max-h-60 overflow-y-auto">
						<div className="flex justify-between px-2 py-1 border-b">
							<Button
								variant={"neosoft"}
								size={"sm"}
								className="text-xs rounded-2xl dark:text-green-500"
								onClick={() => handleSelectAll()}
							>
								Select all
							</Button>
							<Button
								variant={"neosoft"}
								size={"sm"}
								className="text-xs rounded-2xl dark:text-red-400"
								onClick={() => handleUnSelectAll()}
							>
								Unselect all
							</Button>
						</div>
						{projectMembers.map((m) => (
							<label
								className="flex items-center px-3 py-2 cursor-pointer dark:hover:bg-card "
								key={m.user._id}
							>
								<Checkbox
									checked={selectedId.includes(m.user._id)}
									onCheckedChange={() => handleSelect(m.user._id)}
									className="mr-2"
								/>
								<Avatar className="size-6 mr-2">
									<AvatarImage src={m.user.profilePicture} />
									<AvatarFallback>{m.user.name.charAt(0)}</AvatarFallback>
								</Avatar>
								<span className="text-xs md:text-sm">{m.user.name}</span>
							</label>
						))}
						<div className="flex justify-between px-2 py-1">
							<Button
								variant={"neosoft"}
								size={"sm"}
								className="font-light dark:text-red-400 rounded-2xl"
								onClick={() => setDropDownOpen(false)}
								disabled={isPending}
							>
								Cancel
							</Button>
							<Button
								variant={"neosoft"}
								size={"sm"}
								className="font-light dark:text-green-500 rounded-2xl"
								onClick={() => handleSave()}
								disabled={isPending}
							>
								Save
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskAssigneesSelector;
