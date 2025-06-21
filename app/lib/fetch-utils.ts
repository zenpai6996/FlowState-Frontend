import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor to attach token
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor to handle errors
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Handle 401 Unauthorized responses
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			// Dispatch global logout event
			window.dispatchEvent(
				new CustomEvent("force-logout", {
					detail: {
						reason: "SESSION_EXPIRED",
						message: "Your session has expired. Please log in again.",
					},
				})
			);

			return Promise.reject({
				...error,
				message: "Session expired. Please log in again.",
				code: "SESSION_EXPIRED",
			});
		}

		// Handle other errors
		if (error.response) {
			// Server responded with a status code outside 2xx
			const errorMessage = error.response.data?.message || "An error occurred";
			return Promise.reject({
				...error,
				message: errorMessage,
				code: error.response.data?.code || "API_ERROR",
			});
		} else if (error.request) {
			// Request was made but no response received
			return Promise.reject({
				...error,
				message: "Network error. Please check your connection.",
				code: "NETWORK_ERROR",
			});
		} else {
			// Something happened in setting up the request
			return Promise.reject({
				...error,
				message: "Request configuration error",
				code: "REQUEST_ERROR",
			});
		}
	}
);

// Enhanced postData with better typing and error handling
const postData = async <T>(path: string, data: unknown): Promise<T> => {
	try {
		const response = await api.post<T>(path, data);
		return response.data;
	} catch (error) {
		// The error is already processed by the interceptor
		return Promise.reject(error);
	}
};

// Enhanced fetchData with better typing and error handling
const fetchData = async <T>(path: string): Promise<T> => {
	try {
		const response = await api.get<T>(path);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

// Enhanced updateData with better typing and error handling
const updateData = async <T>(path: string, data: unknown): Promise<T> => {
	try {
		const response = await api.put<T>(path, data);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

// Enhanced deleteData with better typing and error handling
const deleteData = async <T>(path: string): Promise<T> => {
	try {
		const response = await api.delete<T>(path);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export { deleteData, fetchData, postData, updateData };
