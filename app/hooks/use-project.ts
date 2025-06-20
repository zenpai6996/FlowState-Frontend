import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateProjectFormData } from "~/components/ui/Project/CreateProjectDialog";
import { fetchData, postData, updateData } from "~/lib/fetch-utils";
import type { ProjectStatus } from "~/types";

export const useCreateProject = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			projectData: CreateProjectFormData;
			workspaceId: string;
		}) =>
			postData(
				`/projects/${data.workspaceId}/create-project`,
				data.projectData
			),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["workspace", data.workspace],
			});
			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});
		},
	});
};

export const UseProjectQuery = (projectId: string) => {
	return useQuery({
		queryKey: ["project", projectId],
		queryFn: () => fetchData(`/projects/${projectId}/tasks`),
	});
};

export const useUpdateProjectStatusMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { projectId: string; status: ProjectStatus }) =>
			updateData(`/projects/${data.projectId}/status`, { status: data.status }),
		onMutate: async (variables) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({
				queryKey: ["project", variables.projectId],
			});
			await queryClient.cancelQueries({ queryKey: ["project"] });

			// Snapshot the previous value
			const previousProject = queryClient.getQueryData([
				"project",
				variables.projectId,
			]);

			// Optimistically update to the new value
			queryClient.setQueryData(
				["project", variables.projectId],
				(old: any) => ({
					...old,
					status: variables.status,
				})
			);

			// // Also update the project data if needed
			// if (previousProject) {
			// 	queryClient.setQueryData(["project"], (old: any) => {
			// 		if (!old?.tasks) return old;
			// 		return {
			// 			...old,
			// 			tasks: old.tasks.map((task: any) =>
			// 				task._id === variables.taskId
			// 					? { ...task, status: variables.status }
			// 					: task
			// 			),
			// 		};
			// 	});
			// }

			return { previousProject };
		},
		onError: (err, variables, context) => {
			// Rollback to the previous value if error occurs
			if (context?.previousProject) {
				queryClient.setQueryData(
					["task", variables.projectId],
					context.previousProject
				);
			}
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["project"] });
		},
	});
};
