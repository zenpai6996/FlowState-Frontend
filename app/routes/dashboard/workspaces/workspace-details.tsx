import React ,{useState} from 'react'
import { useParams } from 'react-router'
import Loader from '~/components/ui/loader';
import WorkspaceHeader from '~/components/ui/workspace/WorkspaceHeader';
import {useGetWorkspaceById } from '~/hooks/use-workspace';
import type { Workspace,Project } from '~/types';
import ProjectList from '~/components/ui/workspace/ProjectList';
import CreateProjectDialog from '~/components/ui/Project/CreateProjectDialog';

const WorkspaceDetails = () => {

  const {workspaceId} = useParams<{workspaceId:string}>();
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isInviteMember, setIsInviteMember] = useState(false);

  
  if(!workspaceId){
    return (
      <div>No Workspace found</div>
    )
  }
  
  const {data, isLoading} = useGetWorkspaceById(workspaceId) as {
    data:{
      projects: Project[];
      workspace: Workspace;
    }
    isLoading:boolean;
  };

  if(isLoading){
    return (
      <div className='flex h-full items-center justify-center'>
      <h2 className='text-muted-foreground '>Fetching Projects ...</h2>
      <Loader/>
      </div>
    )
  }


  return (
    <div className='space-y-8'>
      <WorkspaceHeader
        workspace={data.workspace}
        members={data?.workspace?.members as any}
        onCreateProject={() => setIsCreateProject(true)}
        onInviteMember={() => setIsInviteMember(true)}
      />
      <ProjectList
      workspaceId={workspaceId}
      project={data.projects}
      onCreateProject={() => setIsCreateProject(true)}
      />
      <CreateProjectDialog
        isOpen={isCreateProject}
        onOpenChange={setIsCreateProject}
        workspaceId={workspaceId}
        workspaceMembers={data.workspace.members as any}
      />
    </div>
  )
}

export default WorkspaceDetails