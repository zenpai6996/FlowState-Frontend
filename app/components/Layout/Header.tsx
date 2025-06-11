import React from 'react';
import { useAuth } from '~/provider/auth-context';
import type { Workspace } from '~/types';
import { Button } from '~/components/ui/button';
import { ArrowBigDownDash, Bell, CircleUserRound, LogOut, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuGroup } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { ModeToggle } from '../mode-toggle';
import { Link, useLoaderData } from 'react-router';
import WorkspaceAvatar from '../ui/workspace/WorkspaceAvatar';
import { ChevronRightIcon, ChevronLeft } from 'lucide-react';
import { cn } from '~/lib/utils';

interface HeaderProps {
  onWorkspaceSelected: (workspace: Workspace) => void;
  selectedWorkspace: Workspace | null;
  onCreateWorkspace: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const Header = ({
  onWorkspaceSelected,
  selectedWorkspace,
  onCreateWorkspace,
  isMobileOpen,
  setIsMobileOpen
}: HeaderProps) => {
  
  const { user, logout } = useAuth();
  const { workspaces } = useLoaderData() as { workspaces: Workspace[] };

  return (
    <div className='dark:bg-muted sticky top-0 z-40 border-b rounded-2xl border-primary dark:border-primary'>
      <div className='flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 py-4'>
        <div className="flex items-center gap-2">
          {/* Mobile Toggle Button (visible only on mobile) */}
          <Button
            variant="glassMirror"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <ChevronLeft className="size-4" /> : <ChevronRightIcon className="size-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className='rounded-full'  asChild>
             <Button 
                variant={"glassMorph"} 
                size={'default'} 
                className='hover:border-primary transition-colors duration-200 ease-in-out'
              >
                {selectedWorkspace ? (
                  <>
                    {selectedWorkspace.color && (
                      <WorkspaceAvatar 
                        color={selectedWorkspace.color} 
                        name={selectedWorkspace.name} 
                        className="max-sm:size-5" // Smaller avatar on mobile
                      />
                    )}
                    <span className='font-medium max-sm:hidden'>{selectedWorkspace?.name}</span>
                  </>
                ) : (
                  <>
                    <span className='font-medium flex flex-row max-sm:hidden'>
                      Select Workspace<ArrowBigDownDash className='ml-2 mt-[2px]'/>
                    </span>
                    <span className='sm:hidden'>
                      <ArrowBigDownDash className='size-5 dark:text-primary '/>
                    </span>
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className='font-bold'>Workspaces</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuGroup>
                {workspaces.map((ws) => (
                  <DropdownMenuItem key={ws._id} onClick={() => onWorkspaceSelected(ws)}>
                    {ws.color && <WorkspaceAvatar color={ws.color} name={ws.name} />}
                    <span className='ml-2'>{ws.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator/>
              <DropdownMenuItem onClick={onCreateWorkspace}>
                <PlusCircle className='w-4 h-4 mr-2'/>
                Create Workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex items-center gap-2'>
          <ModeToggle/>
          <Button variant={'neonGlow'} className='rounded-full dark:hover:text-primary hover:text-primary' size={"icon"}>
            <Bell/>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button>
                <Avatar className='hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer'>
                  <AvatarImage src={user?.profilePicture}/>
                  <AvatarFallback className='bg-primary text-primary-foreground'>
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                <Link to="user/profile" className='flex flex-row'>Profile <CircleUserRound className='ml-15'/></Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem onClick={logout}>
                Logout<LogOut className='ml-13'/>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;