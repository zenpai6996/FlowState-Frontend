import React from 'react'
import {  useForm } from 'react-hook-form';
import { z } from 'zod';
import { signUpSchema } from '~/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardDescription, CardHeader,CardContent, CardTitle, CardFooter } from '~/components/ui/card';
import { Form, FormField, FormLabel,FormControl,FormItem ,FormMessage} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { useSignUpMutation } from '~/hooks/use-auth';

export type SignUpFormData = z.infer<typeof signUpSchema>

const SignUp = () => {

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const {mutate,isPending} = useSignUpMutation();

  const handleOnSubmit = (values: SignUpFormData) => {
    mutate(values,{
      onSuccess: () => {
        toast.success("Account created Successfully");
      },
      onError: (error:any) => {
        const errorMessage = error.response?.data?.message || "An error occured";
        console.log(error);
        toast.error("Something went wrong",{
          description:errorMessage
        })
      }
    });
  }



  return (
    <div className='min-h-screen flex flex-col items-center justify-center dark:bg-gray-950 p-4'>
      <Card className='max-w-md w-screen'>
        <CardHeader className='text-center mb-5'>
          <CardTitle className='text-2xl font-bold'>Create Account</CardTitle>
          <CardDescription className='text-sm text-muted-foreground'>Sign Up to start using FlowState</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                    Fullname
                  </FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='John Doe' {...field}/>
                  </FormControl>
                  <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='johndoe@example.com' {...field}/>
                  </FormControl>
                  <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel> 
                    Password
                  </FormLabel>    
                  <FormControl>
                    <Input type='password' placeholder='********' {...field}/>
                  </FormControl>
                  <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({field}) => (
                  <FormItem>
                    <FormLabel> 
                   Confirm Password
                  </FormLabel>    
                  <FormControl>
                    <Input type='password' placeholder='********' {...field}/>
                  </FormControl>
                  <FormMessage/>
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={isPending}>{isPending ? "Signing up" : "Sign Up"}</Button>
            </form>
          </Form>
          <CardFooter className='flex items-center justify-center mt-2'>
            <div className='flex items-center justify-center mt-4 '>
              <p className='text-sm text-muted-foreground'> 
                Already have an account?{" "}
                <Link to="/sign-in" className='text-primary hover:underline' >
                Sign In
                </Link> 
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>  
  )
}

export default SignUp