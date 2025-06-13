import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { CreateProjectFormData } from "~/components/ui/Project/CreateProjectDialog"
import { fetchData, postData } from "~/lib/fetch-utils"

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
          queryClient.invalidateQueries({
            queryKey:["projects"],
          });
        },
  });
};

export const UseProjectQuery = (projectId:string) => {
  return useQuery({
    queryKey:["project",projectId],
    queryFn:() => fetchData(`/projects/${projectId}/tasks`),
  });
};