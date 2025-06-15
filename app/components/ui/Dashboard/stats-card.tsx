import type { StatsProps } from "~/types";
import { Badge } from "../badge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

const StatCard = ({ data }: { data: StatsProps }) => {
	if (!data) {
		return <div>Make a project</div>;
	}
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
			<Card>
				<CardHeader className="flex flex-col  items-start justify-between pb-2">
					<div className="flex gap-4 justify-between">
						<CardTitle className="text-xl font-medium">Projects:</CardTitle>
						<div className="text-xl font-bold">{data.totalProjects}</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col  gap-3">
						<div className="flex gap-3">
							<Badge variant={"glassMorph"} className="text-xs text-purple-400">
								{data.totalProjectPlanning || 0} Planning
							</Badge>
							<Badge variant={"glassMorph"} className="text-xs text-blue-400">
								{data.totalProjectInProgress || 0} in Progress
							</Badge>
						</div>
						<div className="flex gap-3">
							<Badge variant={"glassMorph"} className="text-xs text-green-400">
								{data.totalProjectCompleted || 0} Completed
							</Badge>
							<Badge variant={"glassMorph"} className="text-xs text-yellow-400">
								{data.totalProjectOnHold || 0} on hold
							</Badge>
						</div>
						<Badge variant={"glassMorph"} className="text-xs text-red-400">
							{data.totalProjectCancelled || 0} Cancelled
						</Badge>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default StatCard;
