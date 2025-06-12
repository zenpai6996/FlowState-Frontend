import React from 'react'
import type { User, Workspace } from '~/types'
import WorkspaceAvatar from './WorkspaceAvatar';
import { Button } from '../button';
import { PlusCircle, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';

interface WorkspaceHeaderProps{
  workspace:Workspace;
  members:{
    user:User;
    _id:string;
    role:"admin"|"member"|"owner"|"viewer";
    joinedAt:Date;
  }[];
  onCreateProject:() => void;
  onInviteMember:() => void;
}

const WorkspaceHeader = ({workspace,members,onCreateProject,onInviteMember}:WorkspaceHeaderProps) => {
  
  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <div className='flex flex-row md:mt-0 mt-5 mb-5 md:flex-row md:justify-between md:items-center gap-3'>
          <div className='flex items-center gap-3 '>
            {
              workspace.color && (
                <WorkspaceAvatar  color={workspace.color} name={workspace.name}/>
              )
            }
            <div className='flex flex-col md:block'>
              <h2 className='text-xl md:text-2xl font-semibold'>
                {workspace.name}
              </h2>
             
            </div>
          </div>
          <div className='flex ml-10 md:ml-0 gap-3 md:gap-4 flex-row'>
            <Button 
              variant="glassMorph" 
              onClick={onInviteMember}
              className='text-sm md:text-base'
            >
              <UserPlus className='size-4 mr-2'/> Invite Member
            </Button>
            <Button 
              variant='neomorphic' 
              onClick={onCreateProject}
              className='text-sm md:text-base'
            >
              <PlusCircle className='size-4 mr-2'/> Create Project
            </Button>
          </div>
        </div>
         {workspace.description && (
                <p className='text-sm md:text-base dark:text-muted-foreground md:mt-0 mt-1'>
                  <span className='text-primary'>Description : </span>{workspace.description}
                </p>
              )}
               {
        members.length > 0 && (
          <div className='flex items-center gap-2'>
            <span className='text-sm dark:text-primary'>
              Members :
            </span>
            <div className='flex space-x-2'>
              {
                members.map((member) => (
                  <Avatar key={member._id} className='relative h-8 w-8 rounded-full border-2 border-background overflow-hidden'
                  title={member.user.name}>
                    <AvatarImage 
                    src={member.user.profilePicture} 
                    alt={member.user.name}
                    />
                    <AvatarFallback className='text-xs'>
                      {
                        member.user.name.charAt(0)
                      }
                    </AvatarFallback>
                  </Avatar>
                ))
              }
            </div>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default WorkspaceHeader