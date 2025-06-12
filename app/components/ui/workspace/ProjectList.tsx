import React from 'react';
import type { Project } from '~/types';
import NoDataFound from './NoDataCard';
import ProjectCard from '../Project/ProjectCard';

interface ProjectListTypes{
      workspaceId:string;
      project:Project[];
      onCreateProject: () => void
}

const ProjectList = ({workspaceId,project,onCreateProject}:ProjectListTypes) => {
  return (
    <div>
      <h3 className='text-xl font-medium mb-4'>Projects :</h3>
      <div className='grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'>
        {project.length === 0 ? (
          <NoDataFound 
            title="No project found"
            description='Create a project to get started'
            buttonText='Create Project'
            buttonAction={onCreateProject}
          />
        ) : (
          project.map((project) => {
            const projectProgress = 0;
            return (
              <ProjectCard
                key={project._id}
                project={project}
                progress={projectProgress}
                workspaceId={workspaceId}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProjectList