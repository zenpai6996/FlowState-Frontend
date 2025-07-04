import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateTaskFromData } from "~/components/ui/task/create-task-dialog";
import { deleteData, fetchData, postData, updateData } from "~/lib/fetch-utils";
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
			queryClient.invalidateQueries({ queryKey: ["task-activity"] });
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
			queryClient.invalidateQueries({ queryKey: ["task-activity"] });
		},
	});
};

// Update in use-tasks.ts
export const useUpdateTaskStatusMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { taskId: string; status: TaskStatus }) =>
			updateData(`/tasks/${data.taskId}/status`, { status: data.status }),
		onMutate: async (variables) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: ["task", variables.taskId] });
			await queryClient.cancelQueries({ queryKey: ["project"] });

			// Snapshot the previous value
			const previousTask = queryClient.getQueryData(["task", variables.taskId]);
			const previousProject = queryClient.getQueryData(["project"]);

			// Optimistically update to the new value
			queryClient.setQueryData(["task", variables.taskId], (old: any) => ({
				...old,
				status: variables.status,
			}));

			// Also update the project data if needed
			if (previousProject) {
				queryClient.setQueryData(["project"], (old: any) => {
					if (!old?.tasks) return old;
					return {
						...old,
						tasks: old.tasks.map((task: any) =>
							task._id === variables.taskId
								? { ...task, status: variables.status }
								: task
						),
					};
				});
			}

			return { previousTask, previousProject };
		},
		onError: (err, variables, context) => {
			// Rollback to the previous value if error occurs
			if (context?.previousTask) {
				queryClient.setQueryData(
					["task", variables.taskId],
					context.previousTask
				);
			}
			if (context?.previousProject) {
				queryClient.setQueryData(["project"], context.previousProject);
			}
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
			queryClient.invalidateQueries({ queryKey: ["project"] });
			queryClient.invalidateQueries({ queryKey: ["task-activity"] });
		},
	});
};

//  in use-tasks.ts
export const useUpdateTaskPriorityMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { taskId: string; priority: TaskPriority }) =>
			updateData(`/tasks/${data.taskId}/priority`, { priority: data.priority }),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["task", data._id],
			});
			queryClient.invalidateQueries({
				queryKey: ["task-activity", data._id],
			});
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
			queryClient.invalidateQueries({ queryKey: ["task-activity"] });
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
			queryClient.invalidateQueries({
				queryKey: ["task-activity", data._id],
			});
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
			queryClient.invalidateQueries({ queryKey: ["task-activity"] });
		},
	});
};

export const useAddSubTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { taskId: string; title: string }) =>
			postData(`tasks/${data.taskId}/add-subtask`, {
				title: data.title,
			}),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["task", data._id],
			});
			queryClient.invalidateQueries({
				queryKey: ["task-activity", data._id],
			});
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
			queryClient.invalidateQueries({ queryKey: ["task-activity"] });
		},
	});
};

export const useUpdateSubTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: {
			taskId: string;
			subTaskId: string;
			completed: boolean;
		}) =>
			updateData(`tasks/${data.taskId}/update-subtask/${data.subTaskId}`, {
				completed: data.completed,
			}),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["task", data._id],
			});
			queryClient.invalidateQueries({
				queryKey: ["task-activity", data._id],
			});
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
			queryClient.invalidateQueries({ queryKey: ["task-activity"] });
		},
	});
};

export const useDeleteSubTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { taskId: string; subTaskId: string }) =>
			deleteData(`/tasks/${data.taskId}/subtasks/${data.subTaskId}`),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["task", variables.taskId],
			});
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
		},
	});
};

export const useUpdateSubTaskTitle = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { taskId: string; subTaskId: string; title: string }) =>
			updateData(`/tasks/${data.taskId}/subtasks/${data.subTaskId}/title`, {
				title: data.title,
			}),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["task", variables.taskId],
			});
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
		},
	});
};

export const useAddComment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { taskId: string; text: string }) =>
			postData(`tasks/${data.taskId}/add-comment`, {
				text: data.text,
			}),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["comments", data.task],
			});
			queryClient.invalidateQueries({
				queryKey: ["task-activity", data.task],
			});
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
			queryClient.invalidateQueries({ queryKey: ["task-activity"] });
		},
	});
};

export const useGetComments = (taskId: string) => {
	return useQuery({
		queryKey: ["comments", taskId],
		queryFn: () => fetchData(`/tasks/${taskId}/comments`),
	});
};

export const useWatchTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { taskId: string }) =>
			postData(`/tasks/${data.taskId}/watch`, {}),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["task", data._id],
			});
			queryClient.invalidateQueries({
				queryKey: ["task-activity", data._id],
			});
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
			queryClient.invalidateQueries({ queryKey: ["task-activity"] });
		},
	});
};

export const useArchiveTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { taskId: string }) =>
			postData(`/tasks/${data.taskId}/archived`, {}),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["task", data._id],
			});
			queryClient.invalidateQueries({
				queryKey: ["task-activity", data._id],
			});
		},
		onSettled: () => {
			// Always refetch after error or success
			queryClient.invalidateQueries({ queryKey: ["task"] });
			queryClient.invalidateQueries({ queryKey: ["task-activity"] });
		},
	});
};

export const useDeleteTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (taskId: string) => deleteData(`/tasks/${taskId}`),
		onSuccess: (_, taskId) => {
			queryClient.invalidateQueries({ queryKey: ["project"] });
			queryClient.invalidateQueries({ queryKey: ["task"] });
		},
	});
};

export const useGetMyTasks = () => {
	return useQuery({
		queryKey: ["my-tasks", "user"],
		queryFn: () => fetchData("tasks/my-tasks"),
	});
};
