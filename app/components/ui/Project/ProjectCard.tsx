import React from 'react'
import type { Project } from '~/types'

interface ProjectCardTypes {
    project:Project;
    progress:number;
    workspaceId:string;
}

const ProjectCard = ({project,progress,workspaceId}:ProjectCardTypes) => {
  return (
    <div>
      <div>
        
      </div>
    </div>
  )
}

export default ProjectCard