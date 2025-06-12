import { useState } from "react";
import { useNavigate, useParams } from "react-router"; 
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
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { AlertCircle, CalendarCheck, CheckCircle, ClockPlus, ShieldAlert } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"; // Corrected import for AvatarImage
import { format } from "date-fns";

const ProjectDetails = () => {
  const { projectId, workspaceId } = useParams<{
    projectId: string;
    workspaceId: string;
  }>();

  const navigate = useNavigate();

  const [isCreateTask, setIsCreateTask] = useState(false);
  // This state was not used, but kept in case it's needed for other logic
  const [taskFilter, setTaskFilter] = useState<TaskStatus | "All">("All");

  const { data, isLoading } = UseProjectQuery(projectId!) as {
    data: {
      tasks: Task[];
      project: Project;
    };
    isLoading: boolean;
  };

  if (isLoading)
    return (
      <div className='flex h-full items-center justify-center'>
        <h2 className='text-muted-foreground '>Fetching Project Details ...</h2>
        <Loader />
      </div>
    );

  const { project, tasks } = data;
  const projectProgress = getProjectProgress(tasks);

  const handleTaskClick = (taskId: string) => {
    navigate(
      `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
    );
  };

  return (
    <div className="space-y-8 mb-5">
      {/* --- FIX START: Consolidated and Responsive Header --- */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex justify-between">
            
            <BackButton/>
            <Button variant={'neomorphic'} className="w-auto sm:w-auto sm:text-sm px-6 py-2 rounded-full mt-5 sm:mt-0" onClick={() => setIsCreateTask(true)}>
                Add Task
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold">
                {project.title}
              </h1>
               
            </div>
            {project.description && (
              <p className="text-sm text-muted-foreground mt-2 max-w-prose">
                {project.description}
              </p>
            )}
            <div className="flex flex-col gap-4 w-full mt-3 md:w-auto md:min-w-[280px]">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex items-center gap-2 w-full">
                <div className="text-sm text-primary whitespace-nowrap">Progress:</div>
                <div className="flex-1">
                  <Progress value={projectProgress} className="h-2" />
                </div>
                <span className="text-sm text-white">{projectProgress}%</span>
             
              </div>
            </div>
          </div>
            
          </div>

          
        </div>

        <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground text-sm font-medium mr-2">Status:</span>
            <div className="flex flex-wrap gap-2">
                <Badge variant={'todo'} className="bg-muted">
                {tasks.filter((task) => task.status === "To Do").length} To Do
                </Badge>
                <Badge variant={'progress'} className="bg-muted">
                {tasks.filter((task) => task.status === "In Progress").length} In Progress
                </Badge>
                <Badge variant={'done'} className="bg-muted">
                {tasks.filter((task) => task.status === "Done").length} Done
                </Badge>
            </div>
        </div>
      </div>
      {/* --- FIX END: Consolidated and Responsive Header --- */}

      <div className="w-full">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="all" onClick={() => setTaskFilter("All")}>All Tasks</TabsTrigger>
            <TabsTrigger value="todo" onClick={() => setTaskFilter("To Do")} className="dark:text-yellow-500">To Do</TabsTrigger>
            <TabsTrigger value="in-progress" onClick={() => setTaskFilter("In Progress")} className="dark:text-cyan-500">In Progress</TabsTrigger>
            <TabsTrigger value="done" onClick={() => setTaskFilter("Done")} className="dark:text-green-500">Done</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {/* --- FIX START: Responsive grid for 'All Tasks' view --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* --- FIX END --- */}
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
          <TabsContent value="todo" className="mt-6">
            <TabsColumn
              title="To Do"
              tasks={tasks.filter((task) => task.status === "To Do")}
              onTaskClick={handleTaskClick}
              isfullWidth
            />
          </TabsContent>
          <TabsContent value="in-progress" className="mt-6">
            <TabsColumn
              title="In Progress"
              tasks={tasks.filter((task) => task.status === "In Progress")}
              onTaskClick={handleTaskClick}
              isfullWidth
            />
          </TabsContent>
          <TabsContent value="done" className="mt-6">
            <TabsColumn
              title="Done"
              tasks={tasks.filter((task) => task.status === "Done")}
              onTaskClick={handleTaskClick}
              isfullWidth
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <CreateTaskDialog
        open={isCreateTask}
        onOpenChange={setIsCreateTask}
        projectId={projectId!}
        projectMembers={project.members as any}
      />
    </div>
  )
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  isfullWidth?: boolean;
}

const TabsColumn = ({ title, tasks, onTaskClick, isfullWidth = false }: TaskColumnProps) => {
  return (
    <div className={cn(!isfullWidth && "flex flex-col")}>
      <div className={cn("space-y-4", !isfullWidth ? "h-full" : "col-span-full mb-4")}>
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-lg">
            {title === "To Do"
              ? <div className="flex items-center gap-2"><AlertCircle className="size-5 text-yellow-500" />{title}</div>
              : title === "In Progress"
                ? <div className="flex items-center gap-2"><ClockPlus className="size-5 text-cyan-500" />{title}</div>
                : <div className="flex items-center gap-2"><CheckCircle className="size-5 text-green-500" />{title}</div>
            }
          </h2>
          <Badge variant={'glassMorph'}>
            {title === "To Do"
              ? <span className="text-yellow-500">{tasks.length}</span>
              : title === "In Progress"
                ? <span className="text-cyan-500">{tasks.length}</span>
                : <span className="text-green-500">{tasks.length}</span>
            }
          </Badge>
        </div>
        
        <div className={cn("space-y-3", isfullWidth && "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4")}>
          {tasks.length === 0 ? (
            <Card className="mt-4">
              <CardHeader>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ShieldAlert size={20} />
                  {title === "Done" ? "No tasks completed yet." :
                    title === "To Do" ? "No pending tasks." :
                    "No tasks in progress."
                  }
                </div>
              </CardHeader>
            </Card>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task._id} task={task} onClick={() => onTaskClick(task._id)} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const TaskCard = ({ task, onClick }: { task: Task; onClick: () => void }) => {
    
  // --- FIX: Added stopPropagation to button clicks ---
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, action: string) => {
    e.stopPropagation(); // Prevents the card's onClick from firing
    console.log(`Button clicked: ${action}`);
    // Add logic here to update task status
  };

  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-4">
        <h4 className="font-medium text-base">{task.title}</h4>
        <div className="flex items-center justify-between mt-2">
          <Badge
            className={cn(
              "text-xs",
              task.priority === "High" ? "text-rose-500 dark:hover:shadow-rose-500" :
              task.priority === "Medium" ? "text-yellow-500 dark:hover:shadow-yellow-500" :
              "text-green-500 dark:hover:shadow-green-500"
            )}
            variant={'glassHologram'}
          >
            {task.priority}
          </Badge>
          <div className="flex gap-1">
            {task.status !== "To Do" && (
              <Button variant={'neoMorphicPressed'} size={'icon'} className="size-6 dark:hover:text-yellow-500 rounded-full"
                onClick={(e) => handleButtonClick(e, "Mark as To Do")} title="Mark as To Do">
                <AlertCircle className="size-4 animate-pulse" />
                <span className="sr-only">Mark as To Do</span>
              </Button>
            )}
            {task.status !== "In Progress" && (
              <Button variant={'neoMorphicPressed'} size={'icon'} className="size-6 rounded-full dark:hover:text-cyan-500"
                onClick={(e) => handleButtonClick(e, "Mark as In Progress")} title="Mark as in progress">
                <ClockPlus className="size-4 animate-pulse" />
                <span className="sr-only">Mark as In Progress</span>
              </Button>
            )}
            {task.status !== "Done" && (
              <Button variant={'neoMorphicPressed'} size={'icon'} className="dark:hover:text-green-500 size-6 rounded-full"
                onClick={(e) => handleButtonClick(e, "Mark as Done")} title="Mark as Done">
                <CheckCircle className="size-4 animate-pulse" />
                <span className="sr-only">Mark as Done</span>
              </Button>
            )}
          </div>
        </div>
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {task.description}
          </p>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {task.assignees && task.assignees.length > 0 && (
              <div className="flex -space-x-2">
                {task.assignees.slice(0, 5).map((member) => (
                  <Avatar key={member._id} className="relative size-8 bg-muted rounded-full border-2 border-accent" title={member.name}>
                    <AvatarImage src={member.profilePicture} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                {task.assignees.length > 5 && (
                  <span className="text-xs text-muted-foreground self-center pl-3">
                    + {task.assignees.length - 5}
                  </span>
                )}
              </div>
            )}
          </div>
          {task.dueDate && (
            <div className="text-xs text-primary flex items-center gap-1">
              <CalendarCheck className="size-3" />
              {format(new Date(task.dueDate), "d MMM yyyy")}
            </div>
          )}
        </div>
        {task.subtasks && task.subtasks.length > 0 && (
          <div className="mt-2 text-xs text-muted-foreground">
            {task.subtasks.filter((subtask) => subtask.completed).length}/{task.subtasks.length} subtasks
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ProjectDetails;