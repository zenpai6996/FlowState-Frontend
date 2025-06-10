import React, { useState } from 'react';
import { forgotPasswordSchema } from '~/lib/schema';
import {z} from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card,CardHeader,CardContent } from '~/components/ui/card';
import { Link } from 'react-router';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useForgotPasswordMutation } from '~/hooks/use-auth';
import { toast } from 'sonner';

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

const ForgotPassword = () => {

  const [isSuccess, setIsSuccess] = useState(false);

  const {mutate:forgotPassword,isPending} = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues:{
      email:"",
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword(data,{
      onSuccess:() => {
        setIsSuccess(true);
        toast.success("Email sent to your Inbox !")
      },
      onError:(error:any) => {
        const errorMessage = error.response?.data?.message || "Something went wrong"
        setIsSuccess(false);
        toast.error("Failed to send email",{
          description:errorMessage
        })
      }
    })
  }
  return (
     <div className='flex flex-col items-center justify-center h-screen'>
  <div className='w-full max-w-md space-y-6'>
    <Card>
      <CardHeader>
        <div className='space-y-4'>
          <Link to={"/sign-in"} className='flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors'>
            <ArrowLeft className='w-4 h-4'/>
            <span className='text-xs'>Back to Sign In</span>
          </Link>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-primary'>Forgot Password</h1>
            <p className='text-sm text-muted-foreground'>Enter your email to reset  password</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isSuccess ?(
          <div className='flex flex-col items-center justify-center'>
            <CheckCircle2 className='w-7 h-7 text-green-500 mb-5 animate-ping'/>
            <h1 className='text-md font-bold mb-1'> Password reset email sent <span className='text-primary ml-1'>q(≧▽≦q)</span></h1>
            <p className='text-sm text-muted-foreground'>Check your inbox for the link to reset your password</p>
          </div>
        ) :(
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          
            <FormField
              name='email'
              control={form.control}
              render={({field}) => (
                <FormItem className='mt-3'>
                  <FormLabel>
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter your email'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type='submit' variant={'glassMorph'} className='w-full mt-5' disabled={isPending}>
                {isPending ? (
                 <>
                  <span>Sending Email</span>
                  <Loader2 className='w-4 h-4 animate-spin'/>
                 </>
                ):(
                  "Send Email"
                )}
            </Button>
          </form>
        </Form>
      )}
      </CardContent>
    </Card>
  </div>
</div>
  )
}

export default ForgotPassword