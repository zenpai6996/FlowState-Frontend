import React from 'react';
import { Avatar,AvatarFallback,AvatarImage } from '../avatar';

const WorkspaceAvatar = ({color,name,className}:{color:string;name:string;className?:string}) => {
  return (
    <div className='w-6 h-6  mr-1  rounded-full flex items-center justify-center' style={{backgroundColor:color}}>
      <span className='text-xs text-white font-medium'>
      {name.charAt(0).toUpperCase()}
      </span>
    </div>
  )
}

export default WorkspaceAvatar