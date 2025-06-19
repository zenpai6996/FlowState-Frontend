import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { fetchData } from "~/lib/fetch-utils";
import type { ActivityLog } from "~/types";
import { Button } from "../button";
import { Card } from "../card";
import Loader from "../loader";
import TaskIcon from "./task-icon";

const TaskActivity = ({ resourceId }: { resourceId: string }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const { data, isPending } = useQuery({
		queryKey: ["task-activity", resourceId],
		queryFn: () => fetchData(`/tasks/${resourceId}/activity`),
	}) as {
		data: ActivityLog[];
		isPending: boolean;
	};

	if (isPending) {
		return (
			<div className="text-center">
				<Loader />
				<h2 className="text-muted-foreground text-sm sm:text-base mb-2">
					Fetching Logs ...
				</h2>
			</div>
		);
	}

	// Pagination logic
	const totalItems = data?.length || 0;
	const maxPages = 10;
	const totalPages = Math.min(Math.ceil(totalItems / itemsPerPage), maxPages);
	const maxItems = maxPages * itemsPerPage;
	const limitedData = data?.slice(0, maxItems) || [];
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = limitedData.slice(startIndex, endIndex);

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const goToPrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<Card className="shadow-sm p-3">
			<h3 className="text-sm text-muted-foreground ">Logs</h3>
			<div className="space-y-2 bg-background p-3 rounded-2xl">
				{currentItems?.map((activity) => (
					<Card
						key={activity._id}
						className="flex dark:bg-muted p-1 flex-row dark:hover:bg-background/80 dark:hover:scale-103 transition-all cursor-pointer dark:shadow-xl dark:shadow-primary duration-200 ease-in-out rounded-xl gap-2 "
					>
						<div className="flex items-center rounded-full justify-center size-5 md:size-6">
							{TaskIcon(activity.action)}
						</div>
						<div>
							<p className="text-xs md:text-sm font-medium">
								<span className="text-primary ">{activity.user.name}</span>{" "}
								<span
									style={{ fontFamily: "Geo" }}
									className="text-sm md:text-base text-muted-foreground"
								>
									{activity.details?.description}
								</span>
							</p>
						</div>
					</Card>
				))}
			</div>

			{/* Pagination Controls */}
			{totalPages > 1 && (
				<div className="flex justify-between items-center mt-2">
					<Button
						variant="glassMorph"
						size="sm"
						onClick={goToPrevPage}
						disabled={currentPage === 1}
						className="flex rounded-full dark:hover:text-primary items-center gap-1"
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="hidden md:block">Prev</span>
					</Button>

					<span className="text-xs text-muted-foreground">
						<span className="hidden md:block">Page</span>{" "}
						<span className="text-primary">{currentPage}</span> of{" "}
						<span className="text-primary">{totalPages}</span>
					</span>

					<Button
						variant="glassMorph"
						size="sm"
						onClick={goToNextPage}
						disabled={currentPage === totalPages}
						className="flex dark:hover:text-primary rounded-full items-center gap-1"
					>
						<span className="hidden md:block">Next</span>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			)}
		</Card>
	);
};

export default TaskActivity;
