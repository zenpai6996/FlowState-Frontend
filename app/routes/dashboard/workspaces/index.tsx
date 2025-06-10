import { Loader2, PlusCircle, User } from 'lucide-react';
import React, { useState } from 'react';
import CreateWorkspace from '~/components/ui/workspace/CreateWorkspace';
import { useGetWorkspacesQuery } from '~/hooks/use-workspace';
import type { Workspace } from '~/types';
import { Button } from '~/components/ui/button';
import NoDataFound from '~/components/ui/workspace/NoDataCard';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import WorkspaceAvatar from '~/components/ui/workspace/WorkspaceAvatar';
import {format} from "date-fns";

const Workspaces = () => {

  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const {data : workspaces, isLoading} = useGetWorkspacesQuery() as {
    data: Workspace[];
    isLoading:boolean;
  };

  if(isLoading){
    return <Loader2 className='w-10 h-10 animate-spin text-gray-950 dark:text-primary'/>
  }else{
     return (
    <>
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl md:text-3xl font-bold'>
          Workspaces
        </h2>
        <Button variant={"neomorphic"} onClick={() => setIsCreatingWorkspace(true)}>
          <PlusCircle className='size-4 mr-2'/>
          New Workspace
        </Button>
      </div>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 '>
        {
          workspaces.map((ws) => (
            <WorkspaceCard key={ws._id} workspace={ws}/>
           ) )
        }
        {
          workspaces.length === 0 && 
          <NoDataFound 
            title="No Workspace found"
            description='Create a new workspace to get started'
            buttonText='Create Workspace'
            buttonAction={() => setIsCreatingWorkspace(true)}
          />
        }
      </div>
    </div>
    <CreateWorkspace
    isCreatingWorkspace={isCreatingWorkspace}
    setIsCreatingWorkspace={setIsCreatingWorkspace}
    />
    </>
  )
  }
 
}

const WorkspaceCard = ({workspace}:{workspace:Workspace}) => {
  return (
    <Card className='transition-all dark:hover:shadow-md hover:-translate-y-1 cursor-pointer'>
        <CardHeader className='pb-2 '>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 '>
              <WorkspaceAvatar name={workspace.name} color={workspace.color}/>
              <div className='mb-3'>
                <CardTitle>
                  {workspace.name}
                </CardTitle>
                <span className='text-xs text-muted-foreground'>
                 {format(workspace.createdAt, "d/MM/yyyy, h:mm a")}
                </span>
              </div>
            </div>
            <div className='flex items-center text-muted-foreground mt-1 mb-1  border rounded-full border-muted-foreground px-2 py-2'>
              <User className='size-3 mr-1'/>
              <span className='text-xs'>
                {workspace.members.length}
              </span>
            </div>
          </div>
          <CardDescription>
            {workspace.description || "No description"} 
          </CardDescription>
        </CardHeader>
        <Link to={`/workspaces/${workspace._id}`}>
        <CardContent>
          <div className='text-sm dark:hover:text-primary transition-colors duration-150 ease-in-out text-muted-foreground'>
            View Workspace
          </div>
        </CardContent>
    </Link>
      </Card>
  )
}

export default Workspaces