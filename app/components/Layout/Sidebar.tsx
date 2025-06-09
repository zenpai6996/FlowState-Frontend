import { BrainCircuit, CheckCircle, ChevronLeft, ChevronRightIcon, LayoutDashboardIcon, ListChecks, LogOut, Settings, Users, Users2, WrenchIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useAuth } from '~/provider/auth-context'
import type { Workspace } from '~/types'
import { cn } from '~/lib/utils';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import SidebarNav from './SidebarNav';


export const SidebarComponent = ({currentWorkspace}:{currentWorkspace:Workspace|null}) => {
  
  const {user ,logout} = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      title:"Dashboard",
      href:"/dashboard",
      icon:LayoutDashboardIcon,
    },
    {
      title:"Workspaces",
      href:"/workspaces",
      icon:Users
    },
    {
      title:"My Tasks",
      href:"/my-tasks",
      icon:ListChecks,
    },
    {
      title:"Members",
      href:"/members",
      icon:Users2
    },
    {
      title:"Achieved",
      href:"/achieved",
      icon:CheckCircle,
    },
    {
      title:"Settings",
      href:"/settings",
      icon:Settings
    },
  ];

  return (
   <div className={cn("flex flex-col border-r rounded-r-2xl rounded-l-2xl border-primary dark:border-slate-700 bg-sidebar transition-all duration-300 ease-in-out", isCollapsed ? "w-16 md:w-[80px]" : "w-16 md:w-[240px]")}>
      <div className='flex h-14 items-center border-b rounded-r-2xl rounded-l-2xl border-primary dark:border-slate-700 px-4 mb-4'>
        <Link to={"/dashboard"} className='flex items-center'>
          {
            !isCollapsed ? (
              <div className='flex items-center gap-2'>
                <BrainCircuit className='size-6 text-primary' />
                <span className='font-semibold text-lg hidden md:block'>
                  FlowState
                </span>
              </div>
            ) : (
              <BrainCircuit className='size-6 text-primary pr-1' />
            )
          }
        </Link>

        <Button 
        variant={"ghost"} 
        size={"icon"} 
        className='ml-auto hidden md:block hover:text-primary dark:hover:text-primary transition-colors duration-300 ease-in-out rounded-full'
        onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {
            isCollapsed ? 
            (<ChevronRightIcon className='size-4 ml-[9px] animate-pulse'/>) :
            ( <ChevronLeft className='size-4 ml-[9px] animate-pulse'/>)
          }
        </Button>
      </div>
      <ScrollArea className='flex-1 px-3 py-2'>
          <SidebarNav 
            items={navItems} 
            isCollapsed={isCollapsed} 
            className={cn(isCollapsed && "items-center space-y-2")}
            currentWorkspace={currentWorkspace}
          />
      </ScrollArea>
      <div className='p-3 border-t rounded-r-2xl rounded-l-2xl border-primary dark:border-slate-700'>
        <Button 
        variant={"outline"} 
        size={isCollapsed ? "icon" : "default"} 
        className={cn("w-full justify-start dark:hover:text-primary transition-colors duration-300 ease-in-out rounded-full", isCollapsed && "justify-center ")}
        onClick={logout}>
          <LogOut className={cn("size-5", !isCollapsed && "mr-2")}/>
          {!isCollapsed && <span className='hidden md:block ml-8'>Logout</span>}
        </Button>
      </div>
     
    </div>
  )
}