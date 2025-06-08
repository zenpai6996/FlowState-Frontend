import React from 'react';
import { Avatar,AvatarFallback,AvatarImage } from '../avatar';

const WorkspaceAvatar = ({color,name}:{color:string;name:string}) => {
  return (
    <div className='w-6 h-6 rounded flex items-center justify-center' style={{backgroundColor:color}}>
      <span className='text-xs text-white font-medium'>
      {name.charAt(0).toUpperCase()}
      </span>
    </div>
  )
}

export default WorkspaceAvatar