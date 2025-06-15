import { useSearchParams } from "react-router";
import { useGetWorkspaceStats } from "~/hooks/use-workspace";
import type { StatsProps, TaskTrendProps } from "~/types";

const index = () => {
	const [searchParams] = useSearchParams();
	const workspaceId = searchParams.get("workspaceId");
	const { data, isPending } = useGetWorkspaceStats(workspaceId!) as {
		data: {
			stats: StatsProps;
			taskTrendData: TaskTrendProps[];
		};
		isPending: boolean;
	};
	return <div>Dashboard</div>;
};

export default index;
