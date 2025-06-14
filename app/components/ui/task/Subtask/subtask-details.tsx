import { useState } from "react";
import { cn } from "~/lib/utils";
import type { Subtask } from "~/types";
import { Button } from "../../button";
import { Checkbox } from "../../checkbox";
import { Input } from "../../input";

const SubtaskDetails = ({
	subtask,
	taskId,
}: {
	subtask: Subtask[];
	taskId: string;
}) => {
	const [newSubtask, setNewSubtask] = useState("");
	const handleToggleTask = (subtasks: string, checked: boolean) => {};

	return (
		<div className="mb-6 p-3 md:p-4">
			<h3 className="text-md font-medium  mb-0">Sub Tasks</h3>
			<div className="space-y-2 mb-4">
				{subtask.length > 0 ? (
					<div>
						{subtask.map((subtasks) => (
							<div key={subtasks._id} className="flex items-center space-x-2">
								<Checkbox
									id={subtasks._id}
									checked={subtasks.completed}
									onCheckedChange={(checked) =>
										handleToggleTask(subtasks._id, !!checked)
									}
								/>
								<label
									className={cn(
										"text-sm",
										subtasks.completed
											? "line-through text-muted-foreground"
											: ""
									)}
								>
									{subtasks.title}
								</label>
							</div>
						))}
					</div>
				) : (
					<>
						<div className="text-sm text-muted-foreground">No Subtask</div>
					</>
				)}
			</div>
			<div className="flex gap-3">
				<Input
					placeholder="Add a subtask"
					value={newSubtask}
					onChange={(e) => setNewSubtask(e.target.value)}
					className="mr-1"
				/>
				<Button variant={"neomorphic"} className="">
					Add
				</Button>
			</div>
		</div>
	);
};

export default SubtaskDetails;
