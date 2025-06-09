import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { data, useNavigate } from 'react-router';
import { z } from 'zod';
import { workspaceSchema } from '~/lib/schema';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { cn } from '~/lib/utils';
import { Button } from '../button';
import { useCreateWorkspace } from '~/hooks/use-workspace';
import { toast } from 'sonner';
interface CreateWorkspaceProps {
  isCreatingWorkspace: boolean;
  setIsCreatingWorkspace: (isCreatingWorkspace: boolean) => void;
}

//8 predefined colors
export const colorOptions = [
  "#FF9F1C",	//Sunset Orange
  	"#3A86FF"	, //Electric Blue
    "#4ADE80",	//Neon Green	
    "#FF6B6B",	//Coral Red	
	  "#9D4EDD",	//Violet Purple
    "#14B8A6",	//Aqua Cyan	
	  "#EC4899",	//Magenta Pink
    "#FACC15",  //Golden Yellow	
];

export type WorkSpaceForm = z.infer<typeof workspaceSchema>;

const CreateWorkspace = ({isCreatingWorkspace,setIsCreatingWorkspace}:CreateWorkspaceProps) => {
  
  const navigate = useNavigate();
  const {mutate, isPending} = useCreateWorkspace();

  const onSubmit = (data: WorkSpaceForm) => {
    mutate(data, {
      onSuccess:(data:any) => {
        form.reset();
        setIsCreatingWorkspace(false);
        toast.success("Workspace created successfully!");
        navigate(`/workspaces/${data._id}`);
      },
      onError: (error:any) => {
        const errorMessage = error?.response?.data?.message || "Something went wrong!";
        console.log(error);
        setIsCreatingWorkspace(false);
        form.reset();
        toast.error("Something went wrong!",{
          description: errorMessage
        });
      }
    }) 
  }

  const form = useForm<WorkSpaceForm>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: '',
      color: colorOptions[0], //default color set to the first color
      description: ''
    }
  });


  return (
    <Dialog  open={isCreatingWorkspace} onOpenChange={setIsCreatingWorkspace} modal={true}>
      <DialogContent className='max-h-[80vh] overflow-y-auto rounded-2xl'>
        <DialogHeader className=' text-primary font-bold'>
          Create Workspace
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter workspace name'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} placeholder='Enter workspace description'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Accents</FormLabel>
                    <FormControl>
                      <div className='flex gap-5  flex-wrap'>
                        {
                          colorOptions.map((color) => (
                            <div>
                              <div
                                key={color}
                                onClick={() => field.onChange(color)}
                                style={{backgroundColor: color}} 
                                className={cn('w-6 h-6 cursor-pointer rounded-full hover:opacity-60 transition-all duration-300 ease-linear',field.value === color && "ring-2 ring-offset-1 ring-primary dark:ring-white")}>

                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit' disabled={isPending} variant='neomorphic' className='rounded-2xl'>
                {isPending ? "Creating..." : "Create Workspace"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateWorkspace