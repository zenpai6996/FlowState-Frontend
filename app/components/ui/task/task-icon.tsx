import {
	ArrowRightLeft,
	CheckCircle2,
	CheckSquare,
	Edit,
	FileText,
	Folder,
	FolderPlus,
	MessageSquare,
	Minus,
	Paperclip,
	Plus,
	RefreshCw,
	UserCheck,
	UserMinus,
	UserPlus,
	Users,
} from "lucide-react";
import type { ActionType } from "~/types";

const TaskIcon = (action: ActionType) => {
	switch (action) {
		case "created_task":
			return (
				<div className="bg-green-500/10 p-1 rounded-fufull">
					<CheckSquare className="size-3 text-green-500" />
				</div>
			);

		case "updated_task":
			return (
				<div className="bg-blue-500/10 p-1 rounded-full">
					<Edit className="size-3 text-blue-500" />
				</div>
			);

		case "created_subtask":
			return (
				<div className="bg-teal-500/10 p-1 rounded-full">
					<Plus className="size-3 text-teal-500" />
				</div>
			);

		case "updated_subtask":
			return (
				<div className="bg-sky-500/10 p-1 rounded-full">
					<RefreshCw className="size-3 text-sky-500" />
				</div>
			);

		case "deleted_subtask":
			return (
				<div className="bg-red-500/10 p-1 rounded-full">
					<Minus className="size-3 text-red-500" />
				</div>
			);

		case "edited_subtask":
			return (
				<div className="bg-indigo-500/10 p-1 rounded-full">
					<Edit className="size-3 text-indigo-500" />
				</div>
			);

		case "completed_task":
			return (
				<div className="bg-emerald-500/10 p-1 rounded-full">
					<CheckCircle2 className="size-3 text-emerald-500" />
				</div>
			);

		case "created_project":
			return (
				<div className="bg-purple-500/10 p-1 rounded-full">
					<FolderPlus className="size-3 text-purple-500" />
				</div>
			);

		case "updated_project":
			return (
				<div className="bg-violet-500/10 p-1 rounded-full">
					<Folder className="size-3 text-violet-500" />
				</div>
			);

		case "completed_project":
			return (
				<div className="bg-green-600/10 p-1 rounded-full">
					<CheckCircle2 className="size-3 text-green-600" />
				</div>
			);

		case "created_workspace":
			return (
				<div className="bg-amber-500/10 p-1 rounded-full">
					<Users className="size-3 text-amber-500" />
				</div>
			);

		case "updated_workspace":
			return (
				<div className="bg-amber-600/10 p-1 rounded-full">
					<Edit className="size-3 text-amber-600" />
				</div>
			);

		case "added_comment":
			return (
				<div className="bg-pink-500/10 p-1 rounded-full">
					<MessageSquare className="size-3 text-pink-500" />
				</div>
			);

		case "added_member":
			return (
				<div className="bg-teal-500/10 p-1 rounded-full">
					<UserPlus className="size-3 text-teal-500" />
				</div>
			);

		case "removed_member":
			return (
				<div className="bg-rose-500/10 p-1 rounded-full">
					<UserMinus className="size-3 text-rose-500" />
				</div>
			);

		case "joined_workspace":
			return (
				<div className="bg-lime-500/10 p-1 rounded-full">
					<UserCheck className="size-3 text-lime-500" />
				</div>
			);

		case "transferred_workspace_ownership":
			return (
				<div className="bg-fuchsia-500/10 p-1 rounded-full">
					<ArrowRightLeft className="size-3 text-fuchsia-500" />
				</div>
			);

		case "added_attachment":
			return (
				<div className="bg-gray-500/10 p-1 rounded-full">
					<Paperclip className="size-3 text-gray-500" />
				</div>
			);

		default:
			return (
				<div className="bg-gray-500/10 p-1 rounded-full">
					<FileText className="size-3 text-gray-500" />
				</div>
			);
	}
};

export default TaskIcon;
