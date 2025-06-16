import { getProjectProgress } from "~/lib";
import type { Project } from "~/types";
import ProjectCard from "../Project/ProjectCard";
import NoDataFound from "./NoDataCard";

interface ProjectListTypes {
	workspaceId: string;
	project: Project[];
	onCreateProject: () => void;
}

const ProjectList = ({
	workspaceId,
	project,
	onCreateProject,
}: ProjectListTypes) => {
	return (
		<div>
			<h3 className="text-md md:text-xl font-medium mb-4">Projects :</h3>
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{project.length === 0 ? (
					<NoDataFound
						title="No project found"
						description="Create a project to get started"
						buttonText="Create Project"
						buttonAction={onCreateProject}
					/>
				) : (
					project.map((project) => {
						const projectProgress = getProjectProgress(project.tasks);
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

export default ProjectList;
