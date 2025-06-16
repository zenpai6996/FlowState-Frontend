import { FolderPlus, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

export function NoWorkspacesState() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center h-[60vh] gap-4">
			<FolderPlus className="w-12 h-12 text-muted-foreground" />
			<h2 className="text-2xl font-bold">No Workspaces Found</h2>
			<p className="text-muted-foreground text-center">
				Get started by creating your first workspace
			</p>
			<Button
				onClick={() => {
					navigate("/workspaces/new");
					toast("	Create your first workspace", {
						description: "Workspaces help you organize your projects",
					});
				}}
			>
				<PlusCircle className="mr-2" />
				Create Workspace
			</Button>
		</div>
	);
}

export function NoProjectsState({ workspaceId }: { workspaceId: string }) {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center h-[60vh] gap-4">
			<FolderPlus className="w-12 h-12 text-muted-foreground" />
			<h2 className="text-2xl font-bold">No Projects Yet</h2>
			<p className="text-muted-foreground text-center">
				This workspace is empty. Create your first project to get started
			</p>
			<Button
				onClick={() => {
					navigate(`/projects/new?workspaceId=${workspaceId}`);
					toast("Create your first project", {
						description: "Projects help you organize your tasks",
					});
				}}
			>
				<PlusCircle className="mr-2" />
				Create Project
			</Button>
		</div>
	);
}
