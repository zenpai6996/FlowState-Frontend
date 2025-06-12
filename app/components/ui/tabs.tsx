import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "~/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-stone-100 text-stone-500 inline-flex h-9 w-fit items-center justify-center rounded-full p-[5px] dark:bg-muted border dark:border-stone-800 dark:text-stone-400",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-white dark:data-[state=active]:text-primary focus-visible:border-stone-950 focus-visible:ring-stone-950/50 focus-visible:outline-ring dark:data-[state=active]:border-stone-200 dark:data-[state=active]:bg-background text-stone-950  inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-full mx-1 border border-primary px-5 py-3 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4  dark:dark:data-[state=active]:text-stone-50 dark:focus-visible:border-stone-300 dark:focus-visible:ring-stone-300/50 dark:dark:data-[state=active]:border-primary dark:dark:data-[state=active]:bg-background dark:text-stone-50  dark:border-gray-500",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
