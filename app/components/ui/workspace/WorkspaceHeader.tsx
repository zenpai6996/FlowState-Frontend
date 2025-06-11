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
        <div className='flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-3'>
          <div className='flex md:items-center gap-3'>
            {
              workspace.color && (
                <WorkspaceAvatar color={workspace.color} name={workspace.name}/>
              )
            }
            <h2 className='text-xl md:text-2xl font-semibold'>
              {workspace.name}
            </h2>
          </div>
          <div className='flex items-center gap-3 justify-end md:justify-start mb-4 md:mb-0 mt-3 '>
            <Button variant="glassMorph" onClick={onInviteMember}>
              <UserPlus  className='size-4 mr-2'/> Invite Member
            </Button>
            <Button variant='neomorphic' onClick={onCreateProject}><PlusCircle className='size-4 mr-2'/> Create Project</Button>
          </div>
        </div>
        {
          workspace.description && (
            <p className='text-sm md:text-base dark:text-muted-foreground'>
              <span className='text-primary'>Description : </span>{workspace.description}
            </p>
          )
        }
      </div>
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
  )
}

export default WorkspaceHeader