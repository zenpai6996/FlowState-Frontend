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
	return (
		<div className="mb-6">
			<h3 className="text-sm font-medium text-muted-foreground">Assignees:</h3>
		</div>
	);
};

export default TaskAssigneesSelector;
