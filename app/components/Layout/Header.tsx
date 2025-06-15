import {
	ArrowBigDownDash,
	Bell,
	ChevronLeft,
	ChevronRightIcon,
	CircleUserRound,
	Home,
	LogOut,
	PlusCircle,
} from "lucide-react";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/provider/auth-context";
import type { Workspace } from "~/types";
import { ModeToggle } from "../mode-toggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import WorkspaceAvatar from "../ui/workspace/WorkspaceAvatar";

interface HeaderProps {
	onWorkspaceSelected: (workspace: Workspace) => void;
	selectedWorkspace: Workspace | null;
	onCreateWorkspace: () => void;
	isMobileOpen: boolean;
	setIsMobileOpen: (open: boolean) => void;
}

const Header = ({
	onWorkspaceSelected,
	selectedWorkspace,
	onCreateWorkspace,
	isMobileOpen,
	setIsMobileOpen,
}: HeaderProps) => {
	const { user, logout } = useAuth();
	const { workspaces } = useLoaderData() as { workspaces: Workspace[] };

	const navigate = useNavigate();
	const isOnWorkspacePage = useLocation().pathname.includes("/workspace");

	// useEffect(() => {
	// 	if (workspaces?.length > 0 && !selectedWorkspace) {
	// 		// Try to get last selected workspace from localStorage
	// 		const lastWorkspaceId = localStorage.getItem("lastWorkspaceId");
	// 		const workspaceToSelect = lastWorkspaceId
	// 			? workspaces.find((w) => w._id === lastWorkspaceId)
	// 			: workspaces[0];

	// 		if (workspaceToSelect) {
	// 			handleOnClick(workspaceToSelect);
	// 		}
	// 	}
	// }, [workspaces, selectedWorkspace]);

	const handleOnClick = (workspace: Workspace) => {
		// localStorage.setItem("lastWorkspaceId", workspace._id);
		onWorkspaceSelected(workspace);
		const location = window.location;
		if (isOnWorkspacePage) {
			navigate(`/workspaces/${workspace._id}`);
		} else {
			const basePath = location.pathname;
			navigate(`${basePath}?workspaceId=${workspace._id}`);
		}
	};

	// if (isLoading) {
	// 	console.log("Loading workspaces...");
	// }

	// if (isError) {
	// 	console.error("Error loading workspaces");
	// }

	// console.log("workspaces from query:", queryWorkspaces);
	// console.log("workspaces from loader:", loaderData?.workspaces);
	// console.log("final workspaces:", workspaces);

	return (
		<div className="dark:bg-muted sticky top-0 z-40 border-b rounded-2xl border-primary dark:border-primary">
			<div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
				<div className="flex items-center gap-2">
					<Button
						variant="glassMirror"
						size="icon"
						className="md:hidden rounded-full"
						onClick={() => setIsMobileOpen(!isMobileOpen)}
					>
						{isMobileOpen ? (
							<ChevronLeft className="size-4" />
						) : (
							<ChevronRightIcon className="size-4" />
						)}
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger className="rounded-full" asChild>
							<Button
								variant={"glassMorph"}
								size={"default"}
								className="hover:border-primary transition-colors duration-200 ease-in-out"
							>
								{selectedWorkspace ? (
									<>
										{selectedWorkspace.color && (
											<WorkspaceAvatar
												color={selectedWorkspace.color}
												name={selectedWorkspace.name}
												className="max-sm:size-5"
											/>
										)}
										<span className="font-medium max-sm:hidden">
											{selectedWorkspace.name}
										</span>
									</>
								) : location.pathname === "/dashboard" ? (
									<>
										<Home className="size-4" />
										<span className="font-medium max-sm:hidden">Dashboard</span>
									</>
								) : (
									<>
										<span className="font-medium flex flex-row max-sm:hidden">
											Select Workspace
											<ArrowBigDownDash className="ml-2 mt-[2px]" />
										</span>
										<span className="sm:hidden">
											<ArrowBigDownDash className="size-5 dark:text-primary" />
										</span>
									</>
								)}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							<DropdownMenuLabel className="font-bold">
								Workspaces
							</DropdownMenuLabel>{" "}
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								{Array.isArray(workspaces) && workspaces.length > 0 ? (
									workspaces.map((workspace) => (
										<DropdownMenuItem
											key={workspace._id}
											onClick={() => handleOnClick(workspace)}
											className={
												selectedWorkspace?._id === workspace._id
													? "border border-primary bg-muted/30"
													: ""
											}
										>
											{workspace.color && (
												<WorkspaceAvatar
													color={workspace.color}
													name={workspace.name}
												/>
											)}
											<span className="ml-2">{workspace.name}</span>
											{selectedWorkspace?._id === workspace._id}
										</DropdownMenuItem>
									))
								) : (
									<DropdownMenuItem disabled>
										No workspaces found
									</DropdownMenuItem>
								)}
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={onCreateWorkspace}>
								<PlusCircle className="w-4 h-4 mr-2" />
								Create Workspace
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="flex items-center gap-2">
					<ModeToggle />
					<Button
						variant={"neonGlow"}
						className="rounded-full dark:hover:text-primary hover:text-primary"
						size={"icon"}
					>
						<Bell />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar className="hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer">
								<AvatarImage src={user?.profilePicture} />
								<AvatarFallback className="bg-primary text-primary-foreground">
									{user?.name?.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link to="user/profile" className="flex flex-row">
									Profile <CircleUserRound className="ml-15" />
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={logout}>
								Logout
								<LogOut className="ml-13" />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};

export default Header;
