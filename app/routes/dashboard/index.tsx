import { useSearchParams } from "react-router";
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
	WorspaceProductivityProps,
} from "~/types";

const index = () => {
	const [searchParams] = useSearchParams();
	const workspaceId = searchParams.get("workspaceId");
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
	if (!data.stats) {
		<div>Make a new Projects</div>;
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
