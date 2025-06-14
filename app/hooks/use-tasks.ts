import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateTaskFromData } from "~/components/ui/task/create-task-dialog";
import { fetchData, postData, updateData } from "~/lib/fetch-utils";
import type { TaskPriority, TaskStatus } from "~/types";

export const useCreateTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { projectId: string; taskData: CreateTaskFromData }) =>
			postData(`/tasks/${data.projectId}/create-task`, data.taskData),
		onSuccess: (data: any, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["project", variables.projectId],
			});
		},
	});
};

export const useTaskByIdQuery = (taskId: string) => {
	return useQuery({
		queryKey: ["task", taskId],
		queryFn: () => fetchData(`/tasks/${taskId}`),
	});
};

export const useUpdateTaskTitle = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { taskId: string; title: string }) =>
			updateData(`/tasks/${data.taskId}/title`, { title: data.title }),
		onMutate: async (variables) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: ["task", variables.taskId] });

			// Snapshot the previous value
			const previousTask = queryClient.getQueryData(["task", variables.taskId]);

			// Optimistically update to the new value
			queryClient.setQueryData(["task", variables.taskId], (old: any) => ({
				...old,
				title: variables.title,
			}));

			// Return a context object with the snapshotted value
			return { previousTask };
		},
		onError: (err, variables, context) => {
			// Rollback to the previous value
			if (context?.previousTask) {
				queryClient.setQueryData(
					["task", variables.taskId],
					context.previousTask
				);
			}
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
		},
	});
};

export const useUpdateTaskDescription = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { taskId: string; description: string }) =>
			updateData(`/tasks/${data.taskId}/description`, {
				description: data.description,
			}),
		onMutate: async (variables) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: ["task", variables.taskId] });

			// Snapshot the previous value
			const previousTask = queryClient.getQueryData(["task", variables.taskId]);

			// Optimistically update to the new value
			queryClient.setQueryData(["task", variables.taskId], (old: any) => ({
				...old,
				description: variables.description,
			}));

			// Return a context object with the snapshotted value
			return { previousTask };
		},
		onError: (err, variables, context) => {
			// Rollback to the previous value
			if (context?.previousTask) {
				queryClient.setQueryData(
					["task", variables.taskId],
					context.previousTask
				);
			}
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
		},
	});
};

// Update in use-tasks.ts
export const useUpdateTaskStatusMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { taskId: string; status: TaskStatus }) =>
			updateData(`/tasks/${data.taskId}/status`, { status: data.status }),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["task", data._id],
			});
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
		},
	});
};
// Update in use-tasks.ts
export const useUpdateTaskPriorityMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { taskId: string; priority: TaskPriority }) =>
			updateData(`/tasks/${data.taskId}/priority`, { priority: data.priority }),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["task", data._id],
			});
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
		},
	});
};

export const useUpdateAssignees = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { taskId: string; assignees: string[] }) =>
			updateData(`tasks/${data.taskId}/assignees`, {
				assignees: data.assignees,
			}),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["task", data._id],
			});
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
		},
	});
};
