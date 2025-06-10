import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { string, z } from 'zod';
import { projectSchema } from '~/lib/schema';
import { ProjectStatus, type MemberProps } from '~/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../dialog';
import { Form } from '../form';

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
      <DialogContent className='sm:max-w-[540px]'>
        <DialogHeader>
          <DialogTitle>
            Create Project
          </DialogTitle>
          <DialogDescription>
            Start a new Project and manage all your tasks
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProjectDialog