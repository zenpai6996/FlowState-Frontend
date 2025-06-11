import type { ProjectStatus } from "~/types";

export const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/verify-email",
  "/reset-password",
  "/forgot-password",
  "/",
];

export const isPublicRoute = (path:string) => {
  return publicRoutes.includes(path);
}

export const getTaskStatusColor = (status: ProjectStatus) => {
  switch(status){
    case "In Progress":
      return "dark:bg-blue-900/30 dark:text-blue-300";
    case "Completed" :
      return "dark:bg-green-900/30 dark:text-green-300";
    case "Cancelled" :
      return "dark:bg-red-900/30 dark:text-red-300";
    case "On Hold":
      return "dark:bg-yellow-900/30 dark:text-yellow-300";
    case "Planning":
      return "dark:bg-purple-900/30 dark:text-purple-300";
    default: 
    return "dark:bg-gray-800 dark:text-gray-300";
  }
}