import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {  Link, useSearchParams } from 'react-router';
import {z} from 'zod';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { resetPasswordSchema } from '~/lib/schema';
import { ArrowLeft, CheckCircle2, Loader2,Eye,EyeOff } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useResetPasswordMutation } from '~/hooks/use-auth';
import { toast } from 'sonner';

type ResetPasswordFormData =  z.infer<typeof resetPasswordSchema>

const ResetPassword = () => {

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const {mutate:resetPassword ,isPending} = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues:{
      newPassword:"",
      confirmPassword:""
    },
  });

  const onSubmit = (values : ResetPasswordFormData) => {
    if(!token){
      toast.error("Invalid token");
      return;
    }
    resetPassword(
      {...values , token: token as string},
      {
        onSuccess:() => {
          setIsSuccess(true);
          toast.success("Password reset successful !");
        },
        onError: (error:any) => {
          setIsSuccess(false);
          const errorMessage = error.response?.data?.message;
          toast.error("Password reset unsuccessful",{
            description:errorMessage
          }); 
        }
      }
    )
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
   const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
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
            <h1 className='text-2xl font-bold text-primary'>Reset Password</h1>
            <p className='text-sm text-muted-foreground'>Enter your new password </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isSuccess ?(
          <div className='flex flex-col items-center justify-center'>
            <CheckCircle2 className='w-7 h-7 text-green-500 mb-5 animate-ping'/>
            <h1 className='text-md font-bold mb-1'> Password reset successful<span className='text-primary ml-1'>( •̀ ω •́ )✧</span></h1>
            <p className='text-sm text-muted-foreground'>You can now login using the new password</p>
          </div>
        ) :(
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          
            <FormField
              name='newPassword'
              control={form.control}
              render={({field}) => (
                <FormItem className='mt-3'>
                  <FormLabel>
                    New Password
                  </FormLabel>
                  <FormControl>
                   <div className='relative'>
                     <Input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder='********' 
                      {...field}
                      className='pr-10'
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className='absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary duration-200 ease-in-out transition-colors'
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </button>
                   </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              name='confirmPassword'
              control={form.control}
              render={({field}) => (
                <FormItem className='mt-3'>
                  <FormLabel>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                     <div className='relative'>
                      <Input 
                        type={showPassword1 ? 'text' : 'password'} 
                        placeholder='********' 
                        {...field}
                        className='pr-10'
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility1}
                        className='absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary duration-200 ease-in-out transition-colors'
                      >
                        {showPassword1 ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
           <Button type='submit' className='w-full mt-5' disabled={isPending}>
                          {isPending ? (
                           <>
                            <span>Reseting Password</span>
                            <Loader2 className='w-4 h-4 animate-spin'/>
                           </>
                          ):(
                            "Reset Passsword"
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

export default ResetPassword