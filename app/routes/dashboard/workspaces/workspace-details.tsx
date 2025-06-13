import { useState } from "react";
import { useParams } from "react-router";
import Loader from "~/components/ui/loader";
import CreateProjectDialog from "~/components/ui/Project/CreateProjectDialog";
import ProjectList from "~/components/ui/workspace/ProjectList";
import WorkspaceHeader from "~/components/ui/workspace/WorkspaceHeader";
import { useGetWorkspaceById } from "~/hooks/use-workspace";
import type { Project, Workspace } from "~/types";

const WorkspaceDetails = () => {
	const { workspaceId } = useParams<{ workspaceId: string }>();
	const [isCreateProject, setIsCreateProject] = useState(false);
	const [isInviteMember, setIsInviteMember] = useState(false);

	if (!workspaceId) {
		return <div className="px-4 py-8 text-center">No Workspace found</div>;
	}

	const { data, isLoading } = useGetWorkspaceById(workspaceId) as {
		data: {
			projects: Project[];
			workspace: Workspace;
		};
		isLoading: boolean;
	};

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center px-4">
				<div className="text-center">
					<Loader />
					<h2 className="text-muted-foreground mb-2">Fetching Projects ...</h2>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8 ">
			<WorkspaceHeader
				workspace={data.workspace}
				members={data?.workspace?.members as any}
				onCreateProject={() => setIsCreateProject(true)}
				onInviteMember={() => setIsInviteMember(true)}
			/>
			<ProjectList
				workspaceId={workspaceId}
				project={data.projects}
				onCreateProject={() => setIsCreateProject(true)}
			/>
			<CreateProjectDialog
				isOpen={isCreateProject}
				onOpenChange={setIsCreateProject}
				workspaceId={workspaceId}
				workspaceMembers={data.workspace.members as any}
			/>
		</div>
	);
};

export default WorkspaceDetails;
