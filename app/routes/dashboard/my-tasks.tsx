import { format } from "date-fns";
import {
	Archive,
	ArrowBigRightDash,
	ArrowDownNarrowWide,
	ArrowUpNarrowWide,
	ArrowUpRight,
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	Circle,
	CircleAlert,
	ClockPlus,
	Filter,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Input4 } from "~/components/input4";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import KanbanCard from "~/components/ui/Dashboard/KanbanCard";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Loader from "~/components/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useGetMyTasks } from "~/hooks/use-tasks";
import { cn } from "~/lib/utils";
import type { Task } from "~/types";

const MyTasks = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const initialFilter = searchParams.get("filter") || "all";
	const initialSort = searchParams.get("sort") || "desc";
	const initialSearch = searchParams.get("search") || "empty";
	const [filter, setFilter] = useState<string>(initialFilter);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
		initialSort === "asc" ? "asc" : "desc"
	);
	const [search, setSearch] = useState<string>(initialSearch);
	const [currentPage, setCurrentPage] = useState<Record<string, number>>({
		todo: 1,
		inProgress: 1,
		done: 1,
	});
	const [tasksPerPage] = useState(1);

	// Add this helper function to calculate paginated tasks
	const getPaginatedTasks = (tasks: Task[], status: string) => {
		const page = currentPage[status.toLowerCase().replace(" ", "")] || 1;
		const startIndex = (page - 1) * tasksPerPage;
		const endIndex = startIndex + tasksPerPage;
		return tasks.slice(startIndex, endIndex);
	};

	// Add this pagination component
	const PaginationControls = ({
		status,
		totalTasks,
		onPageChange,
	}: {
		status: string;
		totalTasks: number;
		onPageChange: (status: string, page: number) => void;
	}) => {
		const statusKey = status.toLowerCase().replace(" ", "");
		const current = currentPage[statusKey] || 1;
		const totalPages = Math.ceil(totalTasks / tasksPerPage);

		return (
			<div className="flex items-center justify-between mt-3">
				<Button
					variant="glassMirror"
					size="sm"
					onClick={() => onPageChange(statusKey, current - 1)}
					disabled={current <= 1}
					className="gap-1"
				>
					<ChevronLeft className="h-4 w-4" />
					<span className="sr-only">Previous</span>
				</Button>

				<div className="text-sm text-muted-foreground">
					Page {current} of {totalPages}
				</div>

				<Button
					variant="glassMirror"
					size="sm"
					onClick={() => onPageChange(statusKey, current + 1)}
					disabled={current >= totalPages}
					className="gap-1"
				>
					<span className="sr-only">Next</span>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		);
	};

	const { data: myTasks, isLoading } = useGetMyTasks() as {
		data: Task[];
		isLoading: boolean;
	};

	useEffect(() => {
		const params: Record<string, string> = {};
		searchParams.forEach((value, key) => {
			params[key] = value;
		});
		params.filter = filter;
		params.sort = sortDirection;
		params.search = search;

		setSearchParams(params, { replace: true });
	}, [filter, sortDirection, search]);

	useEffect(() => {
		const urlFilter = searchParams.get("filter") || "all";
		const urlSort = searchParams.get("sort") || "desc";
		const urlSearch = searchParams.get("search") || "";

		if (urlFilter !== filter) setFilter(urlFilter);
		if (urlSort !== sortDirection)
			setSortDirection(urlSort === "asc" ? "asc" : "desc");
		if (urlSearch !== search) setSearch(urlSearch);
	}, [searchParams]);

	const filteredTasks =
		myTasks?.length > 0
			? myTasks
					.filter((task) => {
						if (filter === "all") return true;
						if (filter === "todo") return task.status === "To Do";
						if (filter === "inprogress") return task.status === "In Progress";
						if (filter === "done") return task.status === "Done";
						if (filter === "archived") return task.isArchived === true;
						if (filter === "high") return task.priority === "High";
						if (filter === "medium") return task.priority === "Medium";
						if (filter === "Low") return task.priority === "Low";
					})
					.filter(
						(task) =>
							task.title.toLowerCase().includes(search.toLowerCase()) ||
							task.description?.toLowerCase().includes(search.toLowerCase())
					)
			: [];

	const sortTasks = [...filteredTasks].sort((a, b) => {
		if (a.dueDate && b.dueDate) {
			return sortDirection === "asc"
				? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
				: new Date(b.dueDate).getTime() - new Date(b.dueDate).getTime();
		}
		return 0;
	});

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center p-4">
				<div className="text-center">
					<Loader />
					<h2 className="text-muted-foreground text-sm sm:text-base mt-2">
						Fetching Your Tasks ...
					</h2>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-start md:items-center justify-between">
				<h1 className="text-2xl font-bold uppercase">Tasks</h1>
				<div className="flex flex-row items-start md:flex-row gap-3">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={"glassMorph"}>
								<Filter className="size-4" />
								<span className="hidden md:block">Filter</span>
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent>
							<DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="text-primary"
								onClick={() => setFilter("all")}
							>
								<Circle className="text-primary" />
								All
							</DropdownMenuItem>
							<DropdownMenuItem
								className="text-yellow-500"
								onClick={() => setFilter("todo")}
							>
								<CircleAlert className="text-yellow-500" />
								To Do
							</DropdownMenuItem>
							<DropdownMenuItem
								className="text-cyan-500"
								onClick={() => setFilter("inprogress")}
							>
								<ClockPlus className="text-cyan-500" />
								In Progress
							</DropdownMenuItem>
							<DropdownMenuItem
								className="text-green-500"
								onClick={() => setFilter("done")}
							>
								<CheckCircle className="text-green-500" />
								Done
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="text-primary"
								onClick={() => setFilter("archived")}
							>
								<Archive className="text-primary" />
								Archived
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button
						variant={"neomorphic"}
						onClick={() =>
							setSortDirection(sortDirection === "asc" ? "desc" : "asc")
						}
						className="dark:text-primary"
					>
						{sortDirection === "asc" ? (
							<>
								<ArrowDownNarrowWide />
								<span className="hidden md:block"> Oldest First</span>
							</>
						) : (
							<>
								<ArrowUpNarrowWide />
								<span className="hidden md:block"> Newest First</span>
							</>
						)}
					</Button>
				</div>
			</div>
			<Input4
				placeholder="Search tasks ..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="max-w-md dark:bg-muted"
			/>
			<Tabs defaultValue="board">
				<TabsList className="w-full h-[50px] flex gap-2 p-1 bg-background/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
					<TabsTrigger
						value="list"
						className="flex-1 data-[state=active]:bg-white/20 data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20 data-[state=inactive]:text-muted-foreground hover:text-primary hover:bg-white/10 transition-all duration-300 ease-out rounded-xl font-medium backdrop-blur-sm"
					>
						List
					</TabsTrigger>
					<TabsTrigger
						value="board"
						className="flex-1 data-[state=active]:bg-white/20 data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/20 data-[state=inactive]:text-muted-foreground hover:text-primary hover:bg-white/10 transition-all duration-300 ease-out rounded-xl font-medium backdrop-blur-sm"
					>
						Kanban
					</TabsTrigger>
				</TabsList>
				{/* List View */}
				<TabsContent value="list">
					<Card>
						<CardHeader>
							<CardTitle className="text-xl">My Tasks</CardTitle>
							<CardDescription>
								{sortTasks?.length} tasks assigned
								{sortTasks?.length === 0 && (
									<div className="p-4 text-center text-sm text-muted-foreground">
										No task Found
									</div>
								)}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="divide-y">
								{sortTasks?.map((task) => (
									<div
										className="md:p-4 p-3 hover:bg-background/70 hover:border-primary  transition-all duration-200 ease-in-out border bg-background rounded-2xl mb-1"
										key={task._id}
									>
										<div className="flex flex-col md:flex-row md:items-center justify-between mb-2 ">
											<div className="flex gap-3">
												<div>
													{task.status === "Done" ? (
														<CheckCircle className="bg-green-100/10 text-green-500 rounded-full" />
													) : task.status === "To Do" ? (
														<ClockPlus className="bg-yellow-100/10 text-yellow-500 rounded-full" />
													) : (
														<CircleAlert className="bg-cyan-100/10 text-cyan-500 rounded-full" />
													)}
												</div>
												<div>
													<div className="flex flex-row gap-3">
														<Link
															to={`/workspaces/${task?.project?.workspace}/projects/${task?.project?._id}/tasks/${task?._id}`}
															className=" text-sm  hover:text-primary transition-all flex hover:underline items-center duration-200 ease-in-out capitalize font-bold"
														>
															{task.title}
															<ArrowUpRight className="size-5 ml-1 " />
														</Link>
													</div>
													<div className="flex items-center gap-2 mt-2">
														<Badge
															className={cn(
																"text-xs",
																task.status === "In Progress"
																	? "text-cyan-500"
																	: task.status === "To Do"
																	? "text-yellow-500"
																	: "text-green-500"
															)}
															variant={"glassMorph"}
														>
															{task.status}
														</Badge>
														{task.priority && (
															<Badge
																variant={"glassMorph"}
																className={
																	task.priority === "High"
																		? "text-red-400"
																		: task.priority === "Medium"
																		? "text-yellow-400"
																		: "text-green-400"
																}
															>
																{task.priority}
															</Badge>
														)}
														{task.isArchived && (
															<Badge variant={"glassHologram"}>Archived</Badge>
														)}
													</div>
													<div className="text-primary text-xs mt-2 font-semibold text-start flex flex-row">
														Project:&nbsp;&nbsp;
														<Link
															to={`/workspaces/${task?.project?.workspace}/projects/${task?.project?._id}`}
															className="text-muted-foreground hover:underline font-medium flex flex-row hover:text-primary gap-2"
														>
															{task.project?.title}
															<ArrowBigRightDash className="size-3.5 mt-[1px]" />
														</Link>
													</div>
													<p className="text-xs text-muted-foreground line-clamp-1 capitalize mt-2 w-[200px] md:w-[380px] lg:w-[500px]">
														<span className="text-primary font-semibold">
															Description:
														</span>
														&nbsp;&nbsp;
														{task.description}
													</p>
												</div>
											</div>
											<div className=" flex flex-row bg-muted  p-2 md:p-3 rounded-xl justify-between md:flex-col text-xs md:text-sm text-muted-foreground  space-y-2 border border-muted-foreground mt-3">
												<div className="flex flex-col md:flex-row  gap-2 text-xs text-primary font-semibold">
													Last updated:
													<span className="text-muted-foreground text-xs font-medium">
														{format(task.updatedAt, "dd/MM/yyyy")}
													</span>
												</div>
												{task.dueDate && (
													<div className="flex flex-col md:flex-row gap-2 text-xs text-primary font-semibold">
														Due date:
														<span className="text-muted-foreground font-medium text-xs">
															{format(task.dueDate, "dd/MM/yyyy")}
														</span>
													</div>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				{/* Board View */}
				<TabsContent value="board">
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
						{/* To Do Column */}
						<div className="bg-card border rounded-xl p-4 space-y-3">
							<div className="flex items-center gap-2 pb-3 border-b">
								<CircleAlert className="size-5 text-yellow-500" />
								<h3 className="font-semibold text-yellow-500">To Do</h3>
								<Badge variant="glassMorph" className={"ml-auto"}>
									{sortTasks.filter((task) => task.status === "To Do").length}
								</Badge>
							</div>
							<div className="space-y-3">
								{getPaginatedTasks(
									sortTasks.filter((task) => task.status === "To Do"),
									"todo"
								).map((task) => (
									<KanbanCard key={task._id} task={task} />
								))}
								{sortTasks.filter((task) => task.status === "To Do").length ===
									0 && (
									<div className="text-center p-6 text-muted-foreground text-sm">
										No tasks to do
									</div>
								)}
							</div>
							<PaginationControls
								status="todo"
								totalTasks={
									sortTasks.filter((task) => task.status === "To Do").length
								}
								onPageChange={(status, page) =>
									setCurrentPage({ ...currentPage, [status]: page })
								}
							/>
						</div>

						{/* In Progress Column */}
						<div className="bg-card border rounded-xl p-4 space-y-3">
							<div className="flex items-center gap-2 pb-3 border-b">
								<ClockPlus className="size-5 text-cyan-500" />
								<h3 className="font-semibold text-cyan-500">In Progress</h3>
								<Badge variant="glassMorph" className="ml-auto">
									{
										sortTasks.filter((task) => task.status === "In Progress")
											.length
									}
								</Badge>
							</div>
							<div className="space-y-3">
								{getPaginatedTasks(
									sortTasks.filter((task) => task.status === "In Progress"),
									"inProgress"
								).map((task) => (
									<KanbanCard key={task._id} task={task} />
								))}
								{sortTasks.filter((task) => task.status === "In Progress")
									.length === 0 && (
									<div className="text-center p-6 text-muted-foreground text-sm">
										No tasks in progress
									</div>
								)}
							</div>
							<PaginationControls
								status="inProgress"
								totalTasks={
									sortTasks.filter((task) => task.status === "In Progress")
										.length
								}
								onPageChange={(status, page) =>
									setCurrentPage({ ...currentPage, [status]: page })
								}
							/>
						</div>

						{/* Done Column */}
						<div className="bg-card border rounded-xl p-4 space-y-3">
							<div className="flex items-center gap-2 pb-3 border-b">
								<CheckCircle className="size-5 text-green-500" />
								<h3 className="font-semibold text-green-500">Done</h3>
								<Badge variant="glassMorph" className="ml-auto">
									{sortTasks.filter((task) => task.status === "Done").length}
								</Badge>
							</div>
							<div className="space-y-3">
								{getPaginatedTasks(
									sortTasks.filter((task) => task.status === "Done"),
									"done"
								).map((task) => (
									<KanbanCard key={task._id} task={task} />
								))}
								{sortTasks.filter((task) => task.status === "Done").length ===
									0 && (
									<div className="text-center p-6 text-muted-foreground text-sm">
										No completed tasks
									</div>
								)}
							</div>
							<PaginationControls
								status="done"
								totalTasks={
									sortTasks.filter((task) => task.status === "Done").length
								}
								onPageChange={(status, page) =>
									setCurrentPage({ ...currentPage, [status]: page })
								}
							/>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default MyTasks;
