import {
	ChevronLeft,
	ChevronRightIcon,
	Component,
	Home,
	ListChecks,
	LogOut,
	MonitorCog,
	Users2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { useAuth } from "~/provider/auth-context";
import type { Workspace } from "~/types";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import SidebarNav from "./SidebarNav";

export const SidebarComponent = ({
	currentWorkspace,
	isMobileOpen,
}: {
	currentWorkspace: Workspace | null;
	isMobileOpen: boolean;
}) => {
	const { user, logout } = useAuth();
	const [isCollapsed, setIsCollapsed] = useState(false);

	const navItems = [
		{ title: "Dashboard", href: `/dashboard`, icon: Home },
		{ title: "Workspaces", href: "/workspaces", icon: MonitorCog },
		{ title: "Tasks", href: "/my-tasks", icon: ListChecks },
		{ title: "Members", href: "/members", icon: Users2 },
	];

	return (
		<>
			{/* Sidebar */}
			<div
				className={cn(
					"flex flex-col border-r rounded-br-2xl rounded-tr-2xl border-accent dark:border-r bg-muted transition-all duration-300 ease-in-out fixed h-full z-40",
					isCollapsed ? "w-16 md:w-[70px]" : "w-16 md:w-[240px]",
					"md:relative",
					"max-md:transition-transform max-md:duration-300 max-md:ease-in-out",
					isMobileOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full" // Mobile toggle
				)}
			>
				<div className="flex h-14 items-center dark:border-b rounded-r-2xl rounded-l-2xl border-accent px-4 mb-4">
					<Link to={"/dashboard"} className="flex items-center">
						{!isCollapsed ? (
							<div className="flex items-center gap-2">
								<Component className="size-6 text-primary dark:hover:animate-spin transition-all duration-150 ease-in-out" />
								<span
									style={{ fontFamily: "Air" }}
									className=" text-3xl mb-2 text-primary hidden md:block"
								>
									FlowState
								</span>
							</div>
						) : null}
					</Link>

					<Button
						variant={"glassMirror"}
						size={"icon"}
						className={cn(
							"ml-auto hidden md:block hover:text-primary dark:hover:text-primary transition-colors duration-300 ease-in-out rounded-full"
						)}
						onClick={() => setIsCollapsed(!isCollapsed)}
					>
						{isCollapsed ? (
							<ChevronRightIcon className="size-4 ml-[9px] animate-pulse" />
						) : (
							<ChevronLeft className="size-4 ml-[9px] animate-pulse" />
						)}
					</Button>
				</div>

				<ScrollArea className="flex-1 px-3 py-2">
					<SidebarNav
						items={navItems}
						isCollapsed={isCollapsed}
						className={cn(isCollapsed && "items-center space-y-2")}
						currentWorkspace={currentWorkspace}
						isMobileOpen={isMobileOpen}
					/>
				</ScrollArea>

				<div className="p-3 border-t rounded-r-2xl rounded-l-2xl border-accent dark:border-t">
					<Button
						variant={"glassMirror"}
						size={isCollapsed ? "icon" : "default"}
						className={cn(
							"w-full justify-start rounded-full",
							isCollapsed && "justify-center"
						)}
						onClick={logout}
					>
						<LogOut className={cn("size-4", !isCollapsed && "mr-2")} />
						{!isCollapsed && (
							<span className="hidden md:block ml-8">Logout</span>
						)}
					</Button>
				</div>
			</div>
		</>
	);
};

export const mobileToggle = ({ isMobileOpen, setIsMobileOpen }: any) => {
	{
		/* Mobile Toggle Button (only visible on small screens) */
	}
	<Button
		variant="glassMirror"
		size="icon"
		className="fixed top-50 -left-3 z-50 md:hidden rounded-full"
		onClick={() => setIsMobileOpen(!isMobileOpen)}
	>
		{isMobileOpen ? (
			<ChevronLeft className="size-4" />
		) : (
			<ChevronRightIcon className="size-4" />
		)}
	</Button>;
};
