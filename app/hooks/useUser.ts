import { useMutation, useQuery, type QueryKey } from "@tanstack/react-query";
import { fetchData, updateData } from "~/lib/fetch-utils";
import type {
	ChangePasswordFormData,
	ProfileFormData,
} from "~/routes/user/profile";

const queryKey: QueryKey = ["user"];

export const useProfileQuery = () => {
	return useQuery({
		queryKey,
		queryFn: () => fetchData("/users/profile"),
	});
};

export const useChangePassword = () => {
	return useMutation({
		mutationFn: (data: ChangePasswordFormData) =>
			updateData("/users/change-password", data),
	});
};

export const useUpdateProfile = () => {
	return useMutation({
		mutationFn: (data: ProfileFormData) => updateData("/users/profile", data),
	});
};
