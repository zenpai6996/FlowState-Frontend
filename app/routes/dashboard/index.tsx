import { FolderOpen, Plus } from "lucide-react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import RecentProjects from "~/components/ui/Dashboard/recent-projects";
import StatCard from "~/components/ui/Dashboard/stats-card";
import StatisticsCharts from "~/components/ui/Dashboard/stats-chart";
import UpcomingTasks from "~/components/ui/Dashboard/upcoming-task";
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

// Skeleton Components
const SkeletonCard = ({ className = "" }: { className?: string }) => (
	<div className={`bg-card rounded-lg border p-6 animate-pulse ${className}`}>
		<div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
		<div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
		<div className="h-3 bg-muted rounded w-2/3"></div>
	</div>
);

const SkeletonChart = ({ className = "" }: { className?: string }) => (
	<div className={`bg-card rounded-lg border p-6 animate-pulse ${className}`}>
		<div className="h-6 bg-muted rounded w-1/4 mb-6"></div>
		<div className="space-y-3">
			<div className="flex items-end space-x-2 h-32">
				{[...Array(7)].map((_, i) => (
					<div
						key={i}
						className="bg-muted rounded-t flex-1 animate-pulse"
						style={{
							height: `${Math.random() * 60 + 40}%`,
							animationDelay: `${i * 0.1}s`,
						}}
					></div>
				))}
			</div>
		</div>
	</div>
);

const SkeletonList = ({ className = "" }: { className?: string }) => (
	<div className={`bg-card rounded-lg border p-6 animate-pulse ${className}`}>
		<div className="h-6 bg-muted rounded w-1/3 mb-6"></div>
		<div className="space-y-4">
			{[...Array(4)].map((_, i) => (
				<div
					key={i}
					className="flex items-center space-x-4 animate-pulse"
					style={{ animationDelay: `${i * 0.2}s` }}
				>
					<div className="w-10 h-10 bg-muted rounded-full"></div>
					<div className="flex-1 space-y-2">
						<div className="h-4 bg-muted rounded w-3/4"></div>
						<div className="h-3 bg-muted rounded w-1/2"></div>
					</div>
					<div className="h-6 bg-muted rounded w-16"></div>
				</div>
			))}
		</div>
	</div>
);

const DashboardSkeletons = () => (
	<div className="space-y-8 2xl:space-y-12">
		{/* Header Skeleton */}
		<div className="flex items-center justify-between">
			<div className="h-8 bg-muted rounded w-48 animate-pulse"></div>
		</div>

		{/* Stats Cards Skeleton */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{[...Array(4)].map((_, i) => (
				<SkeletonCard key={i} />
			))}
		</div>

		{/* Charts Skeleton */}
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<SkeletonChart className="lg:col-span-2" />
			<SkeletonChart />
			<SkeletonChart />
		</div>

		{/* Recent Projects and Upcoming Tasks Skeleton */}
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
			<SkeletonList />
			<SkeletonList />
		</div>
	</div>
);

const index = () => {
	const [searchParams] = useSearchParams();
	const workspaceId = searchParams.get("workspaceId");
	const loaderData = useLoaderData() as { workspaces?: Workspace[] } | null;

	const workspaces = loaderData?.workspaces ?? [];
	const navigate = useNavigate();
	const { data, isPending } = useGetWorkspaceStats(workspaceId!) as {
		data: {
			stats: StatsProps;
			taskTrendsData: TaskTrendProps[];
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

	if (isPending) {
		return <DashboardSkeletons />;
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
						No Workspace Selected
					</h2>

					{/* Descriptive text */}
					<p className="text-muted-foreground mb-6 leading-relaxed">
						Workspaces help you organize your work and collaborate with your
						team.
					</p>

					{/* Call to action button */}
					<Button
						variant={"glassHologram"}
						className="rounded-full px-6 py-2  font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
						onClick={handleOnCreate}
					>
						<Plus className="w-4 h-4 mr-2" />
						Create Your WorkSpace
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
		<div className="space-y-8 2xl:space-y-12 ">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl uppercase font-bold">DashBoard</h1>
			</div>
			<StatCard data={data.stats} />
			<StatisticsCharts
				stats={data.stats}
				taskTrendsData={data.taskTrendsData}
				projectStatusData={data.projectStatusData}
				taskPriorityData={data.taskPriorityData}
				workspaceProductivityData={data.workspaceProductivityData}
			/>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
				<RecentProjects data={data.recentProjects} />
				<UpcomingTasks data={data.upcomingTasks} />
			</div>
		</div>
	);
};

export default index;
