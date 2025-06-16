import { PlusCircle, UserPlus } from "lucide-react";
import type { User, Workspace } from "~/types";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import WorkspaceAvatar from "./WorkspaceAvatar";

interface WorkspaceHeaderProps {
	workspace: Workspace;
	members: {
		user: User;
		_id: string;
		role: "admin" | "member" | "owner" | "viewer";
		joinedAt: Date;
	}[];
	onCreateProject: () => void;
	onInviteMember: () => void;
}

const WorkspaceHeader = ({
	workspace,
	members,
	onCreateProject,
	onInviteMember,
}: WorkspaceHeaderProps) => {
	return (
		<div className="space-y-3">
			<div className="space-y-1">
				<div className="flex flex-row md:mt-0 mt-5 mb-5 md:flex-row justify-between md:justify-between md:items-center gap-3">
					<div className="flex items-center   gap-4 ">
						{workspace.color && (
							<WorkspaceAvatar color={workspace.color} name={workspace.name} />
						)}
						<div className="flex md:block">
							<h2 className="text-md md:text-2xl font-semibold">
								{workspace.name}
							</h2>
						</div>
					</div>
					<div className="flex  md:ml-0 gap-3 md:gap-4 flex-wrap">
						<div className="flex items-center gap-2">
							<Button
								variant="glassMorph"
								onClick={onInviteMember}
								size="icon"
								className="size-9 md:size-auto md:px-4 md:py-2"
								title="Invite Member"
							>
								<UserPlus className="size-4" />
								<span className="sr-only md:not-sr-only md:ml-2">
									Invite Member
								</span>
							</Button>
							<Button
								variant="neomorphic"
								onClick={onCreateProject}
								size="icon"
								className="size-9 dark:text-primary md:size-auto md:px-4 md:py-2"
								title="Create Workspace"
							>
								<PlusCircle className="size-4" />
								<span className="sr-only md:not-sr-only md:ml-2">
									Create Project
								</span>
							</Button>
						</div>
					</div>
				</div>
				{workspace.description && (
					<p className="text-sm md:text-base  md:mt-0 mt-1">
						<span className="text-primary">Description : </span>
						<span style={{ fontFamily: "Geo" }}>{workspace.description}</span>
					</p>
				)}
				{members.length > 0 && (
					<div className="flex items-center gap-2">
						<span className="text-sm dark:text-primary">Members :</span>
						<div className="flex space-x-2">
							{members.map((member) => (
								<Avatar
									key={member._id}
									className="relative h-8 w-8 rounded-full border-2 border-background overflow-hidden"
									title={member.user.name}
								>
									<AvatarImage
										src={member.user.profilePicture}
										alt={member.user.name}
									/>
									<AvatarFallback className="text-xs">
										{member.user.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default WorkspaceHeader;
