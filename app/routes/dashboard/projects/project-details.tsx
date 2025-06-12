import {  useState } from "react";
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
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { AlertCircle,  CalendarCheck,  CheckCircle, ClockPlus, ShieldAlert } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";

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
   <div className='flex h-full items-center justify-center'>
      <h2 className='text-muted-foreground '>Fetching Project Details ...</h2>
      <Loader/>
      </div>
  );

  const {project , tasks} = data;
  const projectProgress = getProjectProgress(tasks);
  
  console.log("Fetched project data:", data);



  const handleTaskClick = (taskId:string) => {
    navigate(
      `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
    );
  };

  return (
    <div className="space-y-8  mb-5">
      <div className=" flex-col md:flex-row lg:flex-row md:items-center justify-between gap-4">
        <div className="mt-0 sm:mt-5">
          <BackButton/>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold">
              {project.title}
            </h1>
          </div>
          {project.description && (
            <p className="text-sm text-muted-foreground mt-2">
              {project.description}
            </p>
          )}
        </div>
        <div className="flex flex-row  sm:flex-row gap-3">
          <div className="flex items-center gap-2 w-full  sm:w-full">
            <div className="text-sm text-primary">
              Progress:
            </div>
            <div className="flex-1">
              <Progress value={projectProgress} className="h-2"/>
            </div>
            <span className="text-xs text-white">
              {projectProgress} %
            </span>
          </div>
          <Button variant={'neomorphic'} className="sm:text-sm sm:px-6 p-[10px] rounded-full text-[10px] " onClick={() => setIsCreateTask(true)}>
            Add Task
          </Button>
        </div>
       <div className="space-x-1 flex flex-row items-center mt-3 text-sm">
                <span className="text-muted-foreground mr-2 text-[16px]">Status:</span>
                <div className="space-x-1">
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
      <div className="flex items-center justify-between w-full">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 ">
              <TabsList className="w-full ">
                <TabsTrigger value="all" onClick={() => setTaskFilter("All")}>All Tasks</TabsTrigger>
                <TabsTrigger value="todo" onClick={() => setTaskFilter("To Do")} className="dark:text-yellow-500">To Do</TabsTrigger>
                <TabsTrigger value="in-progress" onClick={() => setTaskFilter("In Progress")} className="dark:text-cyan-500">In Progress</TabsTrigger>
                <TabsTrigger value="done" onClick={() => setTaskFilter("Done")} className="dark:text-green-500">Done</TabsTrigger>
              </TabsList>
               
              
            </div>
            <TabsContent value="all" className="m-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
              <div className="grid md:grid-cols-1 gap-4">
                <TabsColumn
                  title="To Do"
                  tasks={tasks.filter((task) => task.status === "To Do")}
                  onTaskClick={handleTaskClick}
                  isfullWidth
                />
              </div>
            </TabsContent>
            <TabsContent value="in-progress" className="m-0">
              <div className="grid md:grid-cols-1 gap-4">
                <TabsColumn
                  title="In Progress"
                  tasks={tasks.filter((task) => task.status === "In Progress")}
                  onTaskClick={handleTaskClick}
                  isfullWidth
                />
              </div>
            </TabsContent>
            <TabsContent value="done" className="m-0">
              <div className="grid md:grid-cols-1 gap-4">
                <TabsColumn
                  title="Done"
                  tasks={tasks.filter((task) => task.status === "Done")}
                  onTaskClick={handleTaskClick}
                  isfullWidth
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
  isfullWidth?:boolean;
}

const TabsColumn = ({title,tasks,onTaskClick,isfullWidth= false}:TaskColumnProps) => {
  
  
  return(
    <div className={
      isfullWidth 
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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
              <h1 className="font-medium">
                {title === "To Do" 
                  ? <div className="flex flex-row"><AlertCircle className="mr-2 size-6 text-yellow-500"/>{title}</div>
                  : title === "In Progress" 
                  ? <div className="flex flex-row"><ClockPlus className="mr-2 size-6 text-cyan-500"/>{title}</div>
                  : <div className="flex flex-row"><CheckCircle className="mr-2 size-6 text-green-500"/>{title}</div>
                }</h1>
              <Badge variant={'glassMorph'}>
                {
                  title === "To Do"
                  ? <span className="text-yellow-500">{tasks.length}</span>
                  : title === "In Progress"
                  ? <span className="text-cyan-500">{tasks.length}</span>
                  : <span className="text-green-500">{tasks.length}</span>

                }
              </Badge>
            </div>
          )
        }
        <div
          className={cn("space-y-3",
            isfullWidth && "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          )}
        >
          {tasks.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground">
              <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                 <div className="flex flex-row justify-betwen items-center">
                   <ShieldAlert size={20} className="mr-5"/>
                  {title === "Done" 
                    ? <span>No Tasks completed</span>
                    : title === "To Do" 
                    ? <span>No Tasks pending</span>
                    : <span>No Tasks in progress </span>
                  }
                 </div>
                </CardHeader>
              </Card>
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
      className="cursor-pointer mb-5 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <CardHeader className="p-4 sm:p-4">
        <h4 className="font-medium text-sm sm:text-xl">{task.title}</h4>
        <div className="flex items-center justify-between mt-2">
          <Badge 
            className={cn(
              "text-xs sm:text-sm",
              task.priority === "High" 
                ? "text-rose-500 shadow-2xl dark:hover:shadow-rose-500" 
                : task.priority === "Medium" 
                  ? "text-yellow-500 shadow-2xl dark:hover:shadow-yellow-500" 
                  : "text-green-500 shadow-2xl dark:hover:shadow-yellow-500"  
            )} 
            variant={'glassHologram'}
          >
            {task.priority}
          </Badge>
          <div className="flex gap-1">
            {task.status !== "To Do" && (
              <Button 
             variant={'neoMorphicPressed'}
              size={'icon'}
              className="size-5 sm:size-6 dark:hover:text-yellow-500 rounded-full"
              onClick={() => {
                console.log("todo");
              }}
              title="Mark as To Do"
              >
                <AlertCircle className={cn("size-5 sm:size-6    animate-pulse")}/>
                <span className="sr-only">Mark as To Do</span>
              </Button>
            )}
            {task.status !== "In Progress" && (
              <Button 
              variant={'neoMorphicPressed'}
              size={'icon'}
              className="size-5 sm:size-6  rounded-full  dark:hover:text-cyan-500 "
              onClick={() => {
                console.log("todo");
              }}
              title="Mark as in progress"
              >
                <ClockPlus className={cn("size-5 sm:size-6  rounded-full  animate-pulse")}/>
                <span className="sr-only">Mark as In Progress</span>
              </Button>
            )}
            {task.status !== "Done" && (
              <Button 
              variant={'neoMorphicPressed'}
              size={'icon'}
              className=" dark:hover:text-green-500 size-5 sm:size-6  rounded-full "
              onClick={() => {
                console.log("todo");
              }}
              title="Mark as Done"
              >
                <CheckCircle className={cn("size-5 sm:size-6  rounded-full   animate-pulse")}/>
                <span className="sr-only">Mark as Done</span>
              </Button>
            )}
          </div>
        </div>
            {
          task.description && (
            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
              {task.description}
            </p>
          )
        }
      </CardHeader>
      <CardContent  className="p-4 sm:p-6 pt-0">
        
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            {task.assignees && task.assignees.length > 0 && (
              <div className="flex -space-x-2">
                  {task.assignees.slice(0,5).map((member) => (
                    <Avatar
                      key={member._id}
                      className="relative size-8 bg-muted rounded-full border-2 border-accent"
                      title={member.name}
                    >
                      <AvatarImage src={member.profilePicture}/>
                      <AvatarFallback>
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {
                    task.assignees.length > 5 && (
                      <span className="text-xs text-muted-foreground">
                        + {task.assignees.length - 5}
                      </span>
                    )
                  }
              </div>
            )}
          </div>
          {
            task.dueDate && (
              <div className="text-xs text-primary flex items-center">
                <CalendarCheck className="size-3 mr-1"/>
                {
                  format(new Date(task.dueDate), "d/MM/yyyy")
                }
              </div> 
            ) 
          }
        </div>
        {
          task.subtasks && task.subtasks.length > 0 && (
            <div className="mt-2 text-xs text-muted-foreground">
              {task.subtasks.filter((subtask) => subtask.completed).length}/{task.subtasks.length} subtasks
            </div>
          )
        }
      </CardContent>
    </Card>
  )
}

export default ProjectDetails;