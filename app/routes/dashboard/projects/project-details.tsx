import { useState } from "react";
import { useNavigate, useParams } from "react-router"
import type { Project, Task, TaskStatus } from "~/types";
import { UseProjectQuery } from "~/hooks/use-project";
import Loader from "~/components/ui/loader";
import { getProjectProgress } from "~/lib";
import BackButton from "~/components/back-button";
import { Progress } from "~/components/ui/progress";
import { Button } from "~/components/ui/button";
import CreateTaskDialog from "~/components/ui/task/create-task-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { Card, CardHeader } from "~/components/ui/card";

const ProjectDetails = () => {
  const {projectId,workspaceId} = useParams<{
    projectId:string,
    workspaceId:string,
  }>();


const navigate = useNavigate();

const [isCreateTask, setIsCreateTask] = useState(false);
const [taskFilter, setTaskFilter] = useState<TaskStatus|"All">("All");

const {data , isLoading} = UseProjectQuery(projectId!) as {
  data: {
    tasks:Task[];
    project:Project
};
  isLoading:boolean;
};

if (isLoading) 
  return (
    <div>
      <Loader/>
    </div>
  );

  const {project , tasks} = data;
  const projectProgress = getProjectProgress(tasks);

  const handleTaskClick = (taskId:string) => {
    navigate(
      `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
    );
  };

  return (
    <div className="space-y-8">
      <div className="felx flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <BackButton/>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold">
              {project.title}
            </h1>
          </div>
          {project.description && (
            <p className="text-sm text-gray-500">
              {project.description}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 min-w-32">
            <div className="text-sm text-muted-foreground">
              Progress:
            </div>
            <div className="flex-1">
              <Progress value={projectProgress} className="h-2"/>
            </div>
            <span className="text-sm text-muted-foreground">
              {projectProgress} %
            </span>
          </div>
          <Button variant={'neomorphic'} onClick={() => setIsCreateTask(true)}>
            Add Task
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setTaskFilter("All")}>All Tasks</TabsTrigger>
                <TabsTrigger value="todo" onClick={() => setTaskFilter("To Do")}>To Do</TabsTrigger>
                <TabsTrigger value="in-progress" onClick={() => setTaskFilter("In Progress")}>In Progress</TabsTrigger>
                <TabsTrigger value="done" onClick={() => setTaskFilter("Done")}>Done</TabsTrigger>
              </TabsList>
              <div className="space-x-1 flex items-center text-sm">
                <span className="text-muted-foreground">Status:</span>
                <div className="space-x-1">
                  <Badge variant={'outline'} className="bg-muted">
                    {tasks.filter((task) => task.status === "To Do").length} To Do
                  </Badge>
                  <Badge variant={'outline'} className="bg-muted">
                    {tasks.filter((task) => task.status === "In Progress").length} In Progress
                  </Badge>
                  <Badge variant={'outline'} className="bg-muted">
                    {tasks.filter((task) => task.status === "Done").length} Done
                  </Badge>
                </div>
              </div>
            </div>
            <TabsContent value="all" className="m-0">
              <div className="grid grid-cols-3 gap-4">
                <TabsColumn
                  title="To Do"
                  tasks={tasks.filter((task) => task.status === "To Do")}
                  onTaskClick={handleTaskClick}
                />
                <TabsColumn
                  title="In Progress"
                  tasks={tasks.filter((task) => task.status === "In Progress")}
                  onTaskClick={handleTaskClick}
                />
                <TabsColumn
                  title="Done"
                  tasks={tasks.filter((task) => task.status === "Done")}
                  onTaskClick={handleTaskClick}
                />
              </div>
            </TabsContent>
            <TabsContent value="todo" className="m-0">
              <div className="grid grid-cols-3 gap-4">
                <TabsColumn
                  title="To Do"
                  tasks={tasks.filter((task) => task.status === "To Do")}
                  onTaskClick={handleTaskClick}
                />
              </div>
            </TabsContent>
            <TabsContent value="in-progress" className="m-0">
              <div className="grid grid-cols-3 gap-4">
                <TabsColumn
                  title="In Progress"
                  tasks={tasks.filter((task) => task.status === "In Progress")}
                  onTaskClick={handleTaskClick}
                />
              </div>
            </TabsContent>
            <TabsContent value="done" className="m-0">
              <div className="grid grid-cols-3 gap-4">
                <TabsColumn
                  title="Done"
                  tasks={tasks.filter((task) => task.status === "Done")}
                  onTaskClick={handleTaskClick}
                />
              </div>
            </TabsContent>
          </Tabs>
      </div>
      {/* create task dialogue */}
      <CreateTaskDialog
        open={isCreateTask}
        onOpenChange={setIsCreateTask}
        projectId={projectId!}
        projectMembers={project.members as any}
      />
    </div>
  )
}

interface TaskColumnProps{
  title:string;
  tasks:Task[];
  onTaskClick:(taskId:string) => void;
  isfullWidth?:boolean
}

const TabsColumn = ({title,tasks,onTaskClick,isfullWidth= false}:TaskColumnProps) => {
  
  
  return(
    <div className={
      isfullWidth 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      : ""
    }>
      <div className={
        cn("space-y-4",!isfullWidth
        ? "h-full"
        : "col-span-full mb-4")
      }>
        {
          !isfullWidth && (
            <div className="flex items-center justify-between">
              <h1 className="font-medium">{title}</h1>
              <Badge variant={'outline'}>{tasks.length}</Badge>
            </div>
          )
        }
        <div
          className={cn("space-y-3",
            isfullWidth && "grid grid-cols-2 lg:grid-cols-3 gap-4"
          )}
        >
          {tasks.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground">
              No tasks yet
            </div>
          ):(
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onClick={() => onTaskClick(task._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const TaskCard = ({task,onClick}:{task:Task;onClick:() => void}) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-md transition-all duration-300 hover:translate-y-1"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge>{task.priority}</Badge>
        </div>
      </CardHeader>
    </Card>
  )
}

export default ProjectDetails;