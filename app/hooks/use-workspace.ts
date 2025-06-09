import { useMutation } from "@tanstack/react-query"
import type { WorkSpaceForm } from "~/components/ui/workspace/CreateWorkspace"
import { postData } from "~/lib/fetch-utils"

export const useCreateWorkspace = () => {
  return useMutation({
    mutationFn: async (data : WorkSpaceForm) => postData("/workspaces",data)
  })
}