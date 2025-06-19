import { formatDistanceToNow } from "date-fns";
import {
	CircleArrowDown,
	CircleArrowRight,
	MessageSquareWarningIcon,
	Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddComment, useGetComments } from "~/hooks/use-tasks";
import { cn } from "~/lib/utils";
import type { User } from "~/types";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Badge } from "../badge";
import { Button } from "../button";
import Loader from "../loader";
import { ScrollArea } from "../scroll-area";
import { Separator } from "../separator";
import { Textarea } from "../textarea";

const CommentSection = ({
	taskId,
	members,
}: {
	taskId: string;
	members: User[];
}) => {
	const [newComment, setNewComment] = useState("");
	const [isCollapsed, setIsCollapsed] = useState(true);
	const { mutate: addComment, isPending } = useAddComment();
	const { data: comments, isLoading, refetch } = useGetComments(taskId);

	const handleAddComment = () => {
		if (!newComment.trim()) return;
		addComment(
			{ taskId, text: newComment },
			{
				onSuccess: () => {
					setNewComment("");
					toast.success("Comment posted successfully!");
					refetch();
				},
				onError: (error: any) => {
					const errorMessage =
						error.response?.data?.message || "Failed to post comment";
					console.log(error);
					toast.error("Failed to post comment", {
						description: errorMessage,
					});
				},
			}
		);
	};

	if (isLoading)
		return (
			<div className="flex h-full items-center justify-center p-4">
				<div className="text-center">
					<Loader />
					<h2 className="text-muted-foreground text-sm sm:text-base mt-2">
						Fetching Comments ...
					</h2>
				</div>
			</div>
		);

	const displayedComments = comments ? comments.slice(0, 20) : [];
	const hasComments = displayedComments.length > 0;
	const commentCount = comments?.length || 0;

	return (
		<div className="bg-background border-0 shadow-sm rounded-2xl overflow-hidden">
			<div className="p-3">
				{/* Header - Collapsible Trigger */}
				<div
					className={cn(
						"flex items-center justify-between cursor-pointer",
						isCollapsed ? "mb-0" : "mb-3"
					)}
					onClick={() => setIsCollapsed(!isCollapsed)}
				>
					<div className="flex items-center gap-2">
						{isCollapsed ? (
							<CircleArrowDown className="size-5 text-primary" />
						) : (
							<CircleArrowRight className="size-5 text-primary" />
						)}
					</div>
					<MessageSquareWarningIcon className="size-5 text-primary" />
				</div>

				{/* Collapsible Content */}
				<div
					className={cn(
						"overflow-hidden transition-all duration-300 ease-in-out",
						isCollapsed ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100"
					)}
				>
					<div className="mb-4">
						{hasComments ? (
							<ScrollArea className="h-64 sm:h-80 -mx-2">
								<div className="px-4 space-y-3">
									{comments.map((comment, index) => (
										<div key={comment._id}>
											<Badge
												variant={"glassMorph"}
												className="flex gap-3 w-full bg-muted hover:scale-101 transition-all duration-200 ease-in-out hover:shadow-2xl dark:hover:shadow-primary p-2 md:p-3 rounded-2xl"
											>
												<Avatar className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 mb-4">
													<AvatarImage
														src={comment.author.profilePicture}
														className="object-cover"
													/>
													<AvatarFallback className="text-xs bg-primary/10 text-primary border-0">
														{comment.author.name.charAt(0).toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1 min-w-0">
													<div className="flex items-center justify-between gap-2 mb-1">
														<span className=" text-xs md:text-sm font-medium text-foreground truncate">
															{comment.author.name}
														</span>
														<span className="text-[10px] md:text-xs text-muted-foreground flex-shrink-0">
															{formatDistanceToNow(
																new Date(comment.createdAt),
																{
																	addSuffix: true,
																}
															)}
														</span>
													</div>
													<p
														style={{ fontFamily: "Geo" }}
														className="text-sm md:text-base text-muted-foreground leading-relaxed break-words"
													>
														{comment.text}
													</p>
												</div>
											</Badge>
											{index < comments.length - 1 && (
												<Separator className="mt-2 opacity-50 dark:bg-muted" />
											)}
										</div>
									))}
								</div>
							</ScrollArea>
						) : (
							<div className="flex flex-col items-center justify-center mb-3 px-4 text-center space-y-3">
								<div className="rounded-full bg-muted p-3">
									<MessageSquareWarningIcon className="h-10 w-10 text-primary" />
								</div>
								<div className="space-y-1">
									<p className="text-sm font-medium text-muted-foreground">
										No Comments yet
									</p>
									<p className="text-xs text-muted-foreground">
										Be the First to make a comment
									</p>
								</div>
							</div>
						)}
					</div>

					{/* Comment Input - Always visible but moves with the collapse */}
					<div
						className={cn(
							"border-t border-primary pt-4 px-1",
							isCollapsed ? "hidden" : "block"
						)}
					>
						<div className="flex justify-between gap-4">
							<Textarea
								placeholder="Write a comment..."
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey && !isPending) {
										e.preventDefault();
										handleAddComment();
									}
								}}
								className="resize-none border-0 transition-colors min-h-[2.5rem] sm:min-h-[3rem] pr-12 py-0 md:py-1  text-sm"
								disabled={isPending}
							/>
							<Button
								variant={"glassMirror"}
								onClick={handleAddComment}
								disabled={!newComment.trim() || isPending}
								className="size-7  md:size-10 p-0 bg-primary hover:bg-primary/90 disabled:opacity-50 "
							>
								{isPending ? (
									<div className="w-3 h-3 animate-spin rounded-full border border-current border-t-transparent" />
								) : (
									<Send className="w-3 h-3 text-primary" />
								)}
							</Button>
						</div>
						<div className="flex items-center justify-between mt-2">
							<p className="text-xs text-muted-foreground">
								Press Enter to send, Shift+Enter for new line
							</p>
						</div>
					</div>
				</div>

				{/* Comment Input - Shown when collapsed
				{isCollapsed && (
					<div className="relative mt-2">
						<Textarea
							placeholder="Add a comment..."
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey && !isPending) {
									e.preventDefault();
									handleAddComment();
								}
							}}
							className="resize-none border-0 transition-colors min-h-[2.5rem] h-10 sm:min-h-[2.5rem] pr-10 text-sm"
							disabled={isPending}
						/>
						<Button
							variant={"neomorphic"}
							onClick={handleAddComment}
							disabled={!newComment.trim() || isPending}
							size="sm"
							className="absolute right-2 top-2 h-6 w-6 p-0 bg-primary hover:bg-primary/90 disabled:opacity-50"
						>
							{isPending ? (
								<div className="w-3 h-3 animate-spin rounded-full border border-current border-t-transparent" />
							) : (
								<Send className="w-3 h-3 text-primary" />
							)}
						</Button>
					</div>
				)} */}
			</div>
		</div>
	);
};

export default CommentSection;
