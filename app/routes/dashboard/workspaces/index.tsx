import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import CreateWorkspace from '~/components/ui/workspace/CreateWorkspace';
import { useGetWorkspacesQuery } from '~/hooks/use-workspace';
import type { Workspace } from '~/types';


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
    <div>

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