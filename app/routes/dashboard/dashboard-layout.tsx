import React, { useState, useEffect } from "react";
import { useAuth } from "~/provider/auth-context";
import Loader from "~/components/ui/loader";
import { Navigate, Outlet, useNavigate } from "react-router";
import Header from "~/components/Layout/Header";
import type { Workspace } from "~/types";
import { SidebarComponent } from "~/components/Layout/Sidebar";
import CreateWorkspace from "~/components/ui/workspace/CreateWorkspace";
import { fetchData } from "~/lib/fetch-utils";

export const clientLoader = async () => {
	try {
		const [workspaces] = await Promise.all([fetchData("/workspaces")]);
		return { workspaces };
	} catch (error) {
		console.log("Error in clientLoader:", error);
	}
};

const DashboardLayout = () => {
	const { isAuthenticated, isLoading } = useAuth();
	const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
		null
	);

	// Close mobile sidebar when clicking outside or on route change
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				// md breakpoint
				setIsMobileOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Close mobile sidebar when route changes
	useEffect(() => {
		setIsMobileOpen(false);
	}, [location.pathname]);

	if (isLoading) {
		return (
			<div className="flex h-screen w-full items-center justify-center bg-background">
				<div className="text-center space-y-4">
					<Loader />
					<p className="text-sm text-muted-foreground">Loading dashboard...</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/sign-in" replace />;
	}

	const handleWorkspaceSelected = (workspace: Workspace) => {
		setCurrentWorkspace(workspace);
		// Close mobile sidebar after selection
		if (isMobileOpen) {
			setIsMobileOpen(false);
		}
	};

	const handleMobileToggle = (open: boolean) => {
		setIsMobileOpen(open);
	};

	return (
		<div className="flex h-screen w-full bg-background">
			{/* Mobile Overlay */}
			{isMobileOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300"
					onClick={() => setIsMobileOpen(false)}
					aria-hidden="true"
				/>
			)}

			{/* Sidebar Component */}
			<div
				className={`
        fixed inset-y-0 left-0 z-50 md:static md:z-auto
        transform transition-transform duration-300 ease-in-out md:transform-none
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
			>
				<SidebarComponent
					isMobileOpen={isMobileOpen}
					currentWorkspace={currentWorkspace}
					onClose={() => setIsMobileOpen(false)}
				/>
			</div>

			{/* Main Content Area */}
			<div className="flex flex-1 flex-col h-full min-w-0 md:ml-0">
				{/* Header Component */}
				<div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
					<Header
						onWorkspaceSelected={handleWorkspaceSelected}
						selectedWorkspace={currentWorkspace}
						onCreateWorkspace={() => setIsCreatingWorkspace(true)}
						isMobileOpen={isMobileOpen}
						setIsMobileOpen={handleMobileToggle}
					/>
				</div>

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto bg-background">
					<div className="h-full w-full">
						<div className="mx-auto max-w-full h-full">
							<div className="px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8 h-full">
								<div className="h-full w-full">
									<Outlet />
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>

			{/* Create Workspace Modal */}
			<CreateWorkspace
				isCreatingWorkspace={isCreatingWorkspace}
				setIsCreatingWorkspace={setIsCreatingWorkspace}
			/>
		</div>
	);
};

export default DashboardLayout;
