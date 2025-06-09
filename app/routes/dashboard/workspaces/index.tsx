import { Loader2, PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import CreateWorkspace from '~/components/ui/workspace/CreateWorkspace';
import { useGetWorkspacesQuery } from '~/hooks/use-workspace';
import type { Workspace } from '~/types';
import { Button } from '~/components/ui/button';


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
    </div>
    <CreateWorkspace
    isCreatingWorkspace={isCreatingWorkspace}
    setIsCreatingWorkspace={setIsCreatingWorkspace}
    />
    </>
  )
  }
 
}

export default Workspaces