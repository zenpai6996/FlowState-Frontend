import { ChartBarBig, ChartLine, ChartPie } from "lucide-react";
import { useMemo } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type {
	ProjectStatusProps,
	StatsProps,
	TaskPriorityProps,
	TaskTrendProps,
	WorspaceProductivityProps,
} from "~/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../card";

interface StatsChartProps {
	stats: StatsProps;
	taskTrendsData: TaskTrendProps[];
	projectStatusData: ProjectStatusProps[];
	taskPriorityData: TaskPriorityProps[];
	workspaceProductivityData: WorspaceProductivityProps[];
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-3 min-w-[140px]">
				{label && (
					<p className="text-sm font-medium text-gray-900 mb-2 border-b border-gray-100 pb-1">
						{label}
					</p>
				)}
				<div className="space-y-1">
					{payload.map((entry: any, index: number) => (
						<div
							key={index}
							className="flex items-center justify-between gap-3"
						>
							<div className="flex items-center gap-2">
								<div
									className="w-2 h-2 rounded-full flex-shrink-0"
									style={{ backgroundColor: entry.color }}
								/>
								<span className="text-xs text-gray-600 font-medium">
									{entry.name}
								</span>
							</div>
							<span className="text-xs font-semibold text-gray-900">
								{entry.value}
							</span>
						</div>
					))}
				</div>
			</div>
		);
	}
	return null;
};

// Custom Pie Tooltip Component
const CustomPieTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		const data = payload[0];
		return (
			<div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-3 min-w-[120px]">
				<div className="flex items-center gap-2 mb-2">
					<div
						className="w-3 h-3 rounded-full flex-shrink-0"
						style={{ backgroundColor: data.payload.color }}
					/>
					<span className="text-sm font-medium text-gray-900">{data.name}</span>
				</div>
				<div className="text-right">
					<span className="text-lg font-bold text-gray-900">{data.value}</span>
					<span className="text-xs text-gray-500 ml-1">
						{data.name === "High" ||
						data.name === "Medium" ||
						data.name === "Low"
							? "tasks"
							: "projects"}
					</span>
				</div>
			</div>
		);
	}
	return null;
};

const StatisticsCharts = ({
	stats,
	taskTrendsData = [],
	projectStatusData = [],
	taskPriorityData = [],
	workspaceProductivityData = [],
}: StatsChartProps) => {
	const filteredProjectStatusData = useMemo(
		() => projectStatusData.filter((item) => item.value > 0),
		[projectStatusData]
	);

	const filteredTaskPriorityData = useMemo(
		() => taskPriorityData?.filter((item) => item.value > 0) || [],
		[taskPriorityData]
	);

	const safeTaskPriorityData = useMemo(
		() =>
			filteredTaskPriorityData.length > 0
				? filteredTaskPriorityData
				: [
						{ name: "High", value: 1, color: "#ef4444" },
						{ name: "Medium", value: 1, color: "#f59e0b" },
						{ name: "Low", value: 1, color: "#6b7280" },
				  ],
		[filteredTaskPriorityData]
	);

	return (
		<div className="space-y-4 mb-8">
			{/* Row 1: Project Status and Task Statistics side by side */}
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2">
				{/* Project Status Pie Chart */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<div className="space-y-0.5">
							<CardTitle className="text-base font-medium">
								Project Status
							</CardTitle>
							<CardDescription className="text-sm">
								Status distribution
							</CardDescription>
						</div>
						<ChartPie className="text-primary size-4" />
					</CardHeader>
					<CardContent className="w-full h-[280px] pt-1">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={filteredProjectStatusData}
									cx="50%"
									cy="45%"
									labelLine={false}
									outerRadius={75}
									innerRadius={50}
									dataKey="value"
									nameKey="name"
									paddingAngle={2}
								>
									{filteredProjectStatusData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={entry.color}
											stroke="#fff"
											strokeWidth={2}
										/>
									))}
								</Pie>
								<Tooltip content={<CustomPieTooltip />} />
								<Legend
									layout="horizontal"
									verticalAlign="bottom"
									align="center"
									wrapperStyle={{ paddingTop: "15px", fontSize: "12px" }}
								/>
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Task Statistics Line Chart */}
				<Card>
					<CardHeader className="flex items-center flex-row justify-between pb-2">
						<div className="space-y-0.5">
							<CardTitle className="text-base font-medium">
								Task Statistics
							</CardTitle>
							<CardDescription className="text-sm">
								Daily task trends
							</CardDescription>
						</div>
						<ChartLine className="size-4 text-primary" />
					</CardHeader>
					<CardContent className="w-full h-[280px] pt-1">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={taskTrendsData}
								margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
							>
								<XAxis
									tickLine={false}
									axisLine={false}
									dataKey="name"
									stroke="#888888"
									fontSize={11}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									stroke="#888888"
									fontSize={11}
								/>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<Tooltip content={<CustomTooltip />} />
								<Line
									type="monotone"
									dataKey="completed"
									strokeWidth={2}
									stroke="#10b981"
									dot={{ r: 3 }}
									name="Completed"
								/>
								<Line
									type="monotone"
									dataKey="inProgress"
									strokeWidth={2}
									stroke="#3b82f6"
									dot={{ r: 3 }}
									name="In Progress"
								/>
								<Line
									type="monotone"
									dataKey="toDo"
									strokeWidth={2}
									stroke="#f59e0b"
									dot={{ r: 3 }}
									name="To Do"
								/>
								<Legend
									layout="horizontal"
									verticalAlign="bottom"
									align="center"
									wrapperStyle={{ paddingTop: "15px", fontSize: "12px" }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Row 2: Workspace Productivity full width */}
			<Card>
				<CardHeader className="flex items-center flex-row justify-between pb-2">
					<div className="space-y-0.5">
						<CardTitle className="text-base font-medium">
							Workspace Productivity
						</CardTitle>
						<CardDescription className="text-sm">
							Task completion by project
						</CardDescription>
					</div>
					<ChartBarBig className="size-4 text-primary" />
				</CardHeader>
				<CardContent className="w-full h-[300px] pt-1">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={workspaceProductivityData}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} />
							<XAxis
								dataKey="name"
								angle={0}
								height={60}
								tick={{ fontSize: 11 }}
								interval={0}
							/>
							<YAxis
								tick={{ fontSize: 11 }}
								tickLine={false}
								axisLine={false}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Bar
								dataKey="completed"
								fill="#10b981"
								radius={[4, 4, 0, 0]}
								name="Completed"
							/>
							<Bar
								dataKey="inProgress"
								fill="#3b82f6"
								radius={[4, 4, 0, 0]}
								name="In Progress"
							/>
							<Bar
								dataKey="toDo"
								fill="#f59e0b"
								radius={[4, 4, 0, 0]}
								name="To Do"
							/>
							<Legend
								layout="horizontal"
								verticalAlign="bottom"
								align="center"
								wrapperStyle={{ paddingTop: "15px", fontSize: "12px" }}
							/>
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	);
};

export default StatisticsCharts;
