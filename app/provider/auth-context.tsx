import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { publicRoutes } from "~/lib";
import type { User } from "~/types/index.ts";
import { queryClient } from "./react-query-provider";

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (data: any) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const currentPath = useLocation().pathname;
	const isPublicRoute = publicRoutes.includes(currentPath);

	const logout = async () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
		setIsAuthenticated(false);
		queryClient.clear();
		navigate("/sign-in");
	};

	// Add function to check token validity
	const checkTokenValidity = (token: string) => {
		try {
			const decoded = JSON.parse(atob(token.split(".")[1]));
			return decoded.exp * 1000 > Date.now();
		} catch {
			return false;
		}
	};

	useEffect(() => {
		const checkAuth = async () => {
			setIsLoading(true);
			const userInfo = localStorage.getItem("user");
			const token = localStorage.getItem("token");

			if (userInfo && token) {
				if (checkTokenValidity(token)) {
					setUser(JSON.parse(userInfo));
					setIsAuthenticated(true);
				} else {
					await logout();
				}
			} else {
				setIsAuthenticated(false);
				if (!isPublicRoute) {
					navigate("/sign-in");
				}
			}
			setIsLoading(false);
		};

		checkAuth();
	}, []);

	useEffect(() => {
		const handleLogout = () => {
			logout();
			navigate("/sign-in");
		};

		window.addEventListener("force-logout", handleLogout);
		return () => window.removeEventListener("force-logout", handleLogout);
	}, []);

	const login = async (data: any) => {
		localStorage.setItem("token", data.token);
		localStorage.setItem("user", JSON.stringify(data.user));
		setUser(data.user);
		setIsAuthenticated(true);
	};

	const values = {
		user,
		isAuthenticated,
		login,
		logout,
		isLoading,
	};

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
