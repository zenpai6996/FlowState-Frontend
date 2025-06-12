import type { CreateTaskFromData } from "~/components/ui/task/create-task-dialog";
import { postData } from "~/lib/fetch-utils";
import { useMutation,useQueryClient } from "@tanstack/react-query";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:(data:{projectId:string,taskData:CreateTaskFromData}) => 
      postData(`/tasks/${data.projectId}/create-task`,data.taskData),
    onSuccess:(data:any,variables) => {
      queryClient.invalidateQueries({
        queryKey:["project",variables.projectId],
      });
    },
  });
};