export interface User {
	_id: string;
	email: string;
	name: string;
	createdAt: Date;
	isEmailVerified: boolean;
	updatedAt: Date;
	profilePicture?: string;
}
export interface Workspace {
	_id: string;
	name: string;
	description?: string;
	owner: User | string;
	createdAt: Date;
	color: string;
	members: {
		_id: string;
		user: User;
		role: "admin" | "member" | "owner" | "viewer";
		joinedAt: Date;
	}[];
	updatedAt: Date;
}

export type TaskStatus = "To Do" | "In Progress" | "Done";
export type TaskPriority = "High" | "Medium" | "Low";
export enum ProjectMemberRole {
	MANAGER = "manager",
	CONTRIBUTOR = "contributor",
	VIEWER = "viewer",
}

export interface Subtask {
	_id: string;
	title: string;
	completed: boolean;
	createdAt: Date;
}

export interface Attachment {
	fileName: string;
	fileUrl: string;
	fileType: string;
	fileSize: number;
	uploadedBy: string;
	uploadedAt: Date;
	_id: string;
}

export interface Task {
	_id: string;
	title: string;
	description?: string;
	status: TaskStatus;
	project: Project;
	createdAt: Date;
	updatedAt: Date;
	isArchived: boolean;
	dueDate: Date;
	priority: TaskPriority;
	assignee: User | string;
	createdBy: User | string;
	assignees: User[];
	subtasks?: Subtask[];
	watchers?: User[];
	attachment?: Attachment[];
}

export enum ProjectStatus {
	PLANNING = "Planning",
	IN_PROGRESS = "In Progress",
	ON_HOLD = "On Hold",
	COMPLETED = "Completed",
	CANCELLED = "Cancelled",
}

export interface Project {
	_id: string;
	title: string;
	description?: string;
	status: ProjectStatus;
	workspace: Workspace;
	startDate: Date;
	dueDate: Date;
	progress: number;
	tasks: Task[];
	members: {
		user: "User";
		role: "admin" | "member" | "owner" | "viewer";
	}[];
	createdAt: Date;
	updatedAt: Date;
	isArchived: boolean;
	tags: string[];
}

export interface MemberProps {
	_id: string;
	user: User;
	role: "admin" | "member" | "owner" | "viewer";
	joinedAt: Date;
}

export type ResourceType =
	| "Task"
	| "Project"
	| "Workspace"
	| "Comment"
	| "User";

export type ActionType =
	| "created_task"
	| "updated_task"
	| "created_subtask"
	| "updated_subtask"
	| "deleted_subtask"
	| "edited_subtask"
	| "completed_task"
	| "created_project"
	| "updated_project"
	| "completed_project"
	| "created_workspace"
	| "updated_workspace"
	| "added_comment"
	| "added_member"
	| "removed_member"
	| "joined_workspace"
	| "transferred_workspace_ownership"
	| "added_attachment";

export interface ActivityLog {
	_id: string;
	user: User;
	action: ActionType;
	resourceType: ResourceType;
	resourceId: string;
	details: any;
	createdAt: Date;
}

export interface CommentReaction {
	emoji: string;
	user: User;
}

export interface Comment {
	_id: string;
	author: User;
	text: string;
	createdAt: Date;
	reactions?: CommentReaction[];
	attachments?: {
		fileName: string;
		fileUrl: string;
		fileType: string;
		filesize: number;
	};
}

export interface StatsProps {
	totalProjects: number;
	totalTaskS: number;
	totalProjectInProgress: number;
	totalTasksCompleted: number;
	totalTaskToDO: number;
	totalTaskInProgress: number;
	totalProjectCompleted: number;
	totalProjectPlanning: number;
	totalProjectCancelled: number;
	totalProjectOnHold: number;
}

export interface TaskTrendProps {
	name: string;
	completed: number;
	inProgress: number;
	todo: number;
}

export interface ProjectStatusProps {
	name: string;
	value: number;
	color: string;
}
export interface TaskPriorityProps {
	name: string;
	value: number;
	color: string;
}

export interface WorspaceProductivityProps {
	name: string;
	completed: number;
	total: number;
}
