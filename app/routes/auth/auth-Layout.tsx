import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/provider/auth-context";

const AuthLayout = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isAuthenticated) {
		const lastWorkspaceId = localStorage.getItem("lastWorkspaceId");
		if (lastWorkspaceId) {
			return <Navigate to={`/dashboard?workspaceId=${lastWorkspaceId}`} />;
		} else {
			return <Navigate to="/dashboard" />; // Let dashboard handle empty state
		}
	}

	return (
		<div>
			<Outlet />
		</div>
	);
};

export default AuthLayout;
