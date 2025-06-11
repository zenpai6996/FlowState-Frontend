import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateProjectFormData } from "~/components/ui/Project/CreateProjectDialog"
import { postData } from "~/lib/fetch-utils"

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data:{
      projectData :CreateProjectFormData,
      workspaceId:string}) => 
        postData(`/projects/${data.workspaceId}/create-project`,
          data.projectData
        ),
        onSuccess:(data:any) => {
          queryClient.invalidateQueries({
            queryKey:["workspace",data.workspace],
          });
        },
  });
};