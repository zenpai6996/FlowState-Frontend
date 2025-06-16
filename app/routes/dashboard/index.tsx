import { FolderOpen, Plus } from "lucide-react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import StatCard from "~/components/ui/Dashboard/stats-card";
import Loader from "~/components/ui/loader";
import { useGetWorkspaceStats } from "~/hooks/use-workspace";
import type {
	Project,
	ProjectStatusProps,
	StatsProps,
	Task,
	TaskPriorityProps,
	TaskTrendProps,
	Workspace,
	WorspaceProductivityProps,
} from "~/types";

const index = () => {
	const [searchParams] = useSearchParams();
	const workspaceId = searchParams.get("workspaceId");
	const loaderData = useLoaderData() as { workspaces?: Workspace[] } | null;

	const workspaces = loaderData?.workspaces ?? [];
	const navigate = useNavigate();
	const { data, isPending } = useGetWorkspaceStats(workspaceId!) as {
		data: {
			stats: StatsProps;
			taskTrendData: TaskTrendProps[];
			taskPriorityData: TaskPriorityProps[];
			projectStatusData: ProjectStatusProps[];
			workspaceProductivityData: WorspaceProductivityProps[];
			upcomingTasks: Task[];
			recentProjects: Project[];
		};
		isPending: boolean;
	};

	const handleOnCreate = () => {
		navigate(`/workspaces`);
	};

	if (isPending) {
		return (
			<div className="flex h-full items-center justify-center p-4">
				<div className="text-center">
					<Loader />
					<h2 className="text-muted-foreground text-sm sm:text-base mt-2">
						Fetching Workspace Stats ...
					</h2>
				</div>
			</div>
		);
	}

	if (!workspaces) {
		return (
			<div className="flex h-full items-center justify-center p-4">
				<div className="text-center">
					<h2 className="text-lg font-semibold">No workspace selected</h2>
					<p className="text-muted-foreground text-sm mt-2">
						Create or select a workspace to get started.
					</p>
				</div>
			</div>
		);
	}
	if (!data) {
		return (
			<div className="flex h-full items-center justify-center p-4">
				<div className="text-center max-w-md mx-auto">
					{/* Animated Icon */}
					<div className="relative mb-6">
						<div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
							<FolderOpen className="w-12 h-12 text-primary animate-pulse" />
						</div>
						{/* Floating elements for visual interest */}
						<div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary/20 animate-bounce delay-300"></div>
						<div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-primary/30 animate-bounce delay-500"></div>
					</div>

					{/* Main heading */}
					<h2 className="text-xl font-semibold mb-2 text-foreground">
						No Projects Yet
					</h2>

					{/* Descriptive text */}
					<p className="text-muted-foreground mb-6 leading-relaxed">
						Projects help you organize your work and collaborate with your team.
						Create your first project to get started on your journey!
					</p>

					{/* Call to action button */}
					<Button
						variant={"glassHologram"}
						className="rounded-full px-6 py-2  font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
						onClick={handleOnCreate}
					>
						<Plus className="w-4 h-4 mr-2" />
						Create Your First Project
					</Button>
				</div>
			</div>
		);
	}

	if (!data.stats) {
		return (
			<div className="flex h-full items-center justify-center p-4">
				<div className="text-center max-w-md mx-auto">
					{/* Animated Icon */}
					<div className="relative mb-6">
						<div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
							<FolderOpen className="w-12 h-12 text-primary animate-pulse" />
						</div>
						{/* Floating elements for visual interest */}
						<div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary/20 animate-bounce delay-300"></div>
						<div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-primary/30 animate-bounce delay-500"></div>
					</div>

					{/* Main heading */}
					<h2 className="text-xl font-semibold mb-2 text-foreground">
						No Projects Yet
					</h2>

					{/* Descriptive text */}
					<p className="text-muted-foreground mb-6 leading-relaxed">
						Projects help you organize your work and collaborate with your team.
						Create your first project to get started on your journey!
					</p>

					{/* Call to action button */}
					<Button
						variant={"glassHologram"}
						className="rounded-full px-6 py-2  font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
						onClick={handleOnCreate}
					>
						<Plus className="w-4 h-4 mr-2" />
						Create Your First Project
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8 2xl:space-y-12">
			<div className="flex items-center justify-between">
				<h1>DashBoard</h1>
			</div>
			<StatCard data={data.stats} />
		</div>
	);
};

export default index;
