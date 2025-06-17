import { useMutation, useQuery } from "@tanstack/react-query";
import type { WorkSpaceForm } from "~/components/ui/workspace/CreateWorkspace";
import { fetchData, postData } from "~/lib/fetch-utils";

export const useCreateWorkspace = () => {
	return useMutation({
		mutationFn: async (data: WorkSpaceForm) => postData("/workspaces", data),
	});
};

export const useGetWorkspacesQuery = () => {
	return useQuery({
		queryKey: ["workspaces"],
		queryFn: async () => fetchData("/workspaces"),
	});
};

export const useGetWorkspaceById = (workspaceId: string) => {
	return useQuery({
		queryKey: ["workspace", workspaceId],
		queryFn: async () => fetchData(`/workspaces/${workspaceId}/projects`),
	});
};

export const useGetWorkspaceStats = (workspaceId: string) => {
	return useQuery({
		queryKey: ["workspace", workspaceId, "stats"],
		queryFn: async () => fetchData(`/workspaces/${workspaceId}/stats`),
	});
};

export const useGetWorkspaceDetails = (workspaceId: string) => {
	return useQuery({
		queryKey: ["workspace", workspaceId, "details"],
		queryFn: async () => fetchData(`/workspaces/${workspaceId}`),
	});
};

export const useInviteMember = () => {
	return useMutation({
		mutationFn: (data: { email: string; role: string; workspaceId: string }) =>
			postData(`/workspaces/${data.workspaceId}/invite-member`, data),
	});
};

export const useAcceptInvite = () => {
	return useMutation({
		mutationFn: (token: string) =>
			postData(`/workspaces/accept-invite-token`, { token }),
	});
};

export const useAcceptGeneralInvite = () => {
	return useMutation({
		mutationFn: (workspaceId: string) =>
			postData(`/workspaces/${workspaceId}/accept-general-invite`, {}),
	});
};
