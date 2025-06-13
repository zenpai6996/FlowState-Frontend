import { useState } from "react";
import type { ProjectMemberRole, Task, User } from "~/types";

const TaskAssigneesSelector = ({
	task,
	assignees,
	projectMembers,
}: {
	task: Task;
	assignees: User[];
	projectMembers: { user: User[]; role: ProjectMemberRole }[];
}) => {
	const [selectedId, setSelectedTd] = useState<string[]>(
		assignees.map((assignee) => assignee._id)
	);
	return (
		<div className="mb-6">
			<h3 className="text-sm font-medium text-primary">Assignees:</h3>
			<div className="flex flex-wrap gap-2 mb-2">{selectedId}</div>
		</div>
	);
};

export default TaskAssigneesSelector;
