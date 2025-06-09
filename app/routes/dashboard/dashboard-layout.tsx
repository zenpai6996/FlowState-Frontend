import React, { useState } from 'react';
import { useAuth } from '~/provider/auth-context'
import Loader from '~/components/ui/loader';
import { Navigate,Outlet,useNavigate } from 'react-router';
import Header from '~/components/Layout/Header';
import type { Workspace } from '~/types';
import { SidebarComponent } from '~/components/Layout/Sidebar';
import CreateWorkspace from '~/components/ui/workspace/CreateWorkspace';
import { fetchData } from '~/lib/fetch-utils';

export const clientLoader = async() => {
  try {
   const [workspaces] = await Promise.all([fetchData("/workspaces")]);
   return { workspaces };
  } catch (error) {
    console.log('Error in clientLoader:', error);
  }
}

const DashboardLayout = () => {
  const {isAuthenticated,isLoading} = useAuth();
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace|null>(null);
  
  if(isLoading){
    return <Loader/>
  }

  if(!isAuthenticated){
    return <Navigate to="/sign-in"/>
  }

  const handleWorkspaceSelected = (workspace:Workspace) => {
    setCurrentWorkspace(workspace);
  }

  return (
    <div className='flex h-screen w-full'>
    {/* SideBar Component */}
    <SidebarComponent currentWorkspace={currentWorkspace}/>
    <div className='flex flex-1 flex-col h-full'>
      {/* Header Component */}
      <Header 
        onWorkspaceSelected={handleWorkspaceSelected}
        selectedWorkspace={currentWorkspace}
        onCreateWorkspace={() => setIsCreatingWorkspace(true)}
      />
      <main className='flex-1 overflow-y-auto h-full w-full'>
        <div className='mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 w-full h-full'>
          <Outlet/>
        </div>
      </main>
    </div>
    <CreateWorkspace
    isCreatingWorkspace={isCreatingWorkspace}
    setIsCreatingWorkspace={setIsCreatingWorkspace}
    
    />
    </div>
  )
}

export default DashboardLayout