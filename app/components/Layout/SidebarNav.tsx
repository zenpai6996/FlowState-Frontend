import type { LucideIcon } from 'lucide-react';
import React from 'react'
import type { Workspace } from '~/types';
import { cn } from '~/lib/utils';
import { Button } from '../ui/button';
import { useLocation, useNavigate } from 'react-router';

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
  isCollapsed: boolean;
  className?: string;
  currentWorkspace: Workspace | null;
}


const SidebarNav = ({
  items,
  isCollapsed,
  className,
  currentWorkspace,
  ...props
}:SidebarNavProps) => {

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={cn("flex flex-col gap-y-2",className)} {...props}>
        {
          items.map((el) => {
            const Icon = el.icon;
            const isActive = location.pathname === el.href;
            const handleOnCLick = () => {
              if(el.href === "/workspaces"){
                navigate(el.href);
              }else if(currentWorkspace && currentWorkspace._id){
                navigate(`${el.href}?workspaceId=${currentWorkspace._id}`);
              }else{
                navigate(el.href);
              } 
            }
            return <Button 
            key={el.href}
            variant={isActive ? "neomorphic" : "ghost"}
            className={cn("justify-start dark:hover:text-primary transition-colors duration-300 ease-in-out rounded-full",isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground ")}
            onClick={handleOnCLick}
            >
              <Icon className='mr-1 ml-1  size-4'/>{
                isCollapsed ? (<span className=' sr-only'>{el.title}</span>) :(el.title) 
              }
            </Button>
          })
        }
    </nav>
  )
}

export default SidebarNav