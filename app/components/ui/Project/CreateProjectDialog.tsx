import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { string, z } from 'zod';
import { projectSchema } from '~/lib/schema';
import { ProjectStatus, type MemberProps } from '~/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Button } from '../button';
import { Calendar } from '../calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Checkbox } from '../checkbox';
import { ScrollArea } from '../scroll-area';

interface CreateProjectDialogProps {
    isOpen:boolean;
    onOpenChange:(open:boolean) => void;
    workspaceId:string;
    workspaceMembers:MemberProps[];
}

export type CreateProjectFormData = z.infer<typeof projectSchema>;

const CreateProjectDialog = ({isOpen,onOpenChange,workspaceId,workspaceMembers}:CreateProjectDialogProps) => {
  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues:{
      title:"",
      description:"",
      status:ProjectStatus.PLANNING,
      startDate:"",
      dueDate:"",
      members:[],
      tags:undefined,
    },
  });

  const onSubmit = (data:CreateProjectFormData) => {

  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[540px] max-h-[90vh] overflow-hidden'>
        <DialogHeader>
          <DialogTitle>
            Create Project
          </DialogTitle>
          <DialogDescription>
            Start a new Project and manage all your tasks
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='max-h-[calc(90vh-150px)] pr-2'>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 pr-2'>
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter project title'/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder='Enter the project description'/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Project Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Select Project Status"/>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ProjectStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                              {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="members"
              render={({field}) => {
                const selectedMember = field.value || []

                return(
                  <FormItem>
                  <FormLabel>Members</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={'glassMorph'} className='w-full justify-start text-left font-normal min-h-11 '>
                          {
                            selectedMember.length === 0 ?( <span className='text-muted-foreground'>Select Members</span>) : 
                              selectedMember.length <= 2 ? (selectedMember.map((m) => {
                                const member = workspaceMembers.find((wm) => wm.user._id === m.user);
                                
                                return `${member?.user.name} (${member?.role})`;
                              })) : (`${selectedMember.length} members selected`)
                            
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-full max-w-60 overflow-y-auto' align='start'>
                        <div className='flex flex-col gap-2'>
                          {
                            workspaceMembers.map((member) => {
                              const selectedMembers = selectedMember.find((m) => m.user === member.user._id);
                              return <div key={member._id} className='flex items-center gap-2 p-2 border rounded-full'>
                                <Checkbox
                                    
                                    checked={!!selectedMembers}
                                    onCheckedChange={(checked) => {
                                      if(checked) {
                                        field.onChange([...selectedMember,{
                                          user:member.user._id,role:"contributor"
                                        }])
                                      }else{
                                        field.onChange(selectedMember.filter((m) => m.user !== member.user._id))
                                      }
                                    }}
                                    id={`member-${member.user._id}`}
                                />
                                <span className='truncate flex-1'>
                                  {member.user.name}
                                </span>
                                {
                                  selectedMembers && (
                                    <Select
                                      value={selectedMembers.role}
                                      onValueChange={(role) => {
                                        selectedMember.map((m) => m.user === member.user._id ? {
                                          ...m ,
                                          role: role as 
                                            | "contributor"
                                            | "manager"
                                            | "viewer",
                                            
                                        }
                                        : m
                                      
                                      )
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Role"/>
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="manager">Manager</SelectItem>
                                        <SelectItem value="contributor">Contributor</SelectItem>
                                        <SelectItem value="viewer">Viewer</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )
                                }
                              </div>
                            })
                          }
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
                )
              }}
            />
           
              <FormField
              control={form.control}
              name="tags"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Tags seperated by comma'/>
                  </FormControl>
                </FormItem>
              )}
            />
           
              
              <div className='grid grid-cols-2 gap-4'>
               <FormField
              control={form.control}
              name="startDate"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                          <Button variant={'glassMirror'} className={"w-full justify-start text-left font-normal" + (!field.value ? "text-muted-foreground" : "")}>
                            <CalendarIcon className='size-4 mr-2'/>
                            {
                              field.value ? format(new Date(field.value),"PPPP") : (<span>
                                Pick a Date
                              </span>)
                            }
                          </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode='single'
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => {
                            field.onChange(date?.toISOString() || undefined)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="dueDate"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                          <Button variant={'glassMirror'} className={"w-full justify-start text-left font-normal" + (!field.value ? "text-muted-foreground" : "")}>
                            <CalendarIcon className='size-4 mr-2'/>
                            {
                              field.value ? format(new Date(field.value),"PPPP") : (<span>
                                Deadline Date
                              </span>)
                            }
                          </Button>
                      </PopoverTrigger>
                      <PopoverContent align='end'>
                        <Calendar
                          mode='single'
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => {
                            field.onChange(date?.toISOString() || undefined)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
            </div>
            <DialogFooter>
              <Button type='submit' variant={'neomorphic'}>Create Project</Button>
            </DialogFooter>
          </form>
        </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProjectDialog