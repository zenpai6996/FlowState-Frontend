import { AlertCircle } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import Loader from "~/components/ui/loader";
import WorkspaceAvatar from "~/components/ui/workspace/WorkspaceAvatar";
import {
	useAcceptGeneralInvite,
	useAcceptInvite,
	useGetWorkspaceDetails,
} from "~/hooks/use-workspace";
import type { Workspace } from "~/types";

const WorkspaceInvite = () => {
	const { workspaceId } = useParams();
	const [searchParams] = useSearchParams();

	const token = searchParams.get("tk");
	const navigate = useNavigate();
	const { data: workspace, isLoading } = useGetWorkspaceDetails(
		workspaceId!
	) as {
		data: Workspace;
		isLoading: boolean;
	};

	const { mutate: acceptInvite, isPending: isAccepting } = useAcceptInvite();
	const { mutate: acceptGeneralInvite, isPending: isGeneralAccepting } =
		useAcceptGeneralInvite();

	if (!workspaceId) {
		return (
			<div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-background via-muted to-primary p-4 text-center">
				<div className="mx-auto max-w-md space-y-6 rounded-xl border bg-card/50 p-8 shadow-lg backdrop-blur-xl">
					<div className="flex flex-col items-center space-y-4">
						<div className="rounded-full bg-destructive/20 p-4">
							<AlertCircle className="h-12 w-12 text-destructive" />
						</div>
						<h1 className="text-2xl font-bold tracking-tight text-foreground">
							Workspace Not Found
						</h1>
						<p className="text-muted-foreground">
							The workspace you're looking for doesn't exist or you don't have
							permission to access it.
						</p>
					</div>
					<Button
						variant={"glassMorph"}
						className="dark:text-primary"
						onClick={() => navigate("/workspaces")}
					>
						Go to workspaces
					</Button>
				</div>
			</div>
		);
	}

	const handleAcceptInvite = () => {
		if (!workspaceId) return;

		if (token) {
			acceptInvite(token, {
				onSuccess: () => {
					toast.success("Invitation Accepted !!");
					navigate(`/workspaces/${workspaceId}`);
				},
				onError: (error: any) => {
					toast.error(error.response.data.message);
					console.log(error);
				},
			});
		} else {
			acceptGeneralInvite(workspaceId, {
				onSuccess: () => {
					toast.success("Invitation Accepted !!");
					navigate(`/workspaces/${workspaceId}`);
				},
				onError: (error: any) => {
					toast.error(error.response.data.message);
					console.log(error);
				},
			});
		}
	};

	const handleDeclineInvite = () => {
		toast.info("Invitation Declined");
		navigate("/workspaces");
	};

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center p-4">
				<div className="text-center">
					<Loader />
					<h2 className="text-muted-foreground text-sm sm:text-base mt-2">
						Loading ...
					</h2>
				</div>
			</div>
		);
	}
	return (
		<div className="flex items-center justify-center h-screen bg-gradient-to-br from-background via-muted to-primary ">
			<Card className="max-w-md w-full">
				<CardHeader>
					<div className=" flex justify-center items-center gap-3 mb-2">
						<WorkspaceAvatar name={workspace.name} color={workspace.color} />
						<CardTitle>{workspace.name}</CardTitle>
					</div>
					<CardDescription className="text-center">
						You've been invited to join "
						<strong className="text-primary">{workspace.name}</strong>"
						workspace
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4 text-center">
					{workspace.description && (
						<p className="text-xs text-muted-foreground">
							{workspace.description}
						</p>
					)}
					<div className="flex gap-3">
						<Button
							variant={"glassMorph"}
							className="flex-1 dark:text-primary"
							onClick={handleAcceptInvite}
							disabled={isAccepting || isGeneralAccepting}
						>
							{isAccepting || isGeneralAccepting
								? "Joining..."
								: "Accept Invite"}
						</Button>
						<Button
							variant={"glassMorph"}
							className="flex-1 dark:text-red-500"
							onClick={handleDeclineInvite}
							disabled={isAccepting || isGeneralAccepting}
						>
							Decline
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default WorkspaceInvite;
