import { useMutation, useQuery } from "@tanstack/react-query"
import type { WorkSpaceForm } from "~/components/ui/workspace/CreateWorkspace"
import { fetchData, postData } from "~/lib/fetch-utils"

export const useCreateWorkspace = () => {
  return useMutation({
    mutationFn: async (data : WorkSpaceForm) => postData("/workspaces",data)
  })
}

export const useGetWorkspacesQuery = () => {
  return useQuery({
    queryKey:["workspaces"],
    queryFn: async () => fetchData("/workspaces"),
  });
}