import {  CheckCircle, Loader, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { useVerifyEmailMutation } from '~/hooks/use-auth';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const {mutate, isPending:isVerifing} = useVerifyEmailMutation();
  useEffect(() => {
    const token = searchParams.get("token");
    if(!token){
      setIsSuccess(false);
    }else{
      mutate({token},{
        onSuccess: () => {
          setIsSuccess(true);
          toast.success("Email verified successfully")
        },
        onError: (error:any) => {
          setIsSuccess(false);
          const errorMessage = error.response?.data?.message || error;
          console.log(errorMessage);
          toast.error(errorMessage);
        },
      });
    }
  }, [searchParams]);
  

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Card className='w-full max-w-md'>
        <CardHeader>
      <div className='text-center'>
      <h1 className='text-2xl font-bold mb-1 text-primary'>Verify Email</h1>
      </div>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center  '>
          {isVerifing ? 
          <>
            <Loader className='w-10 h-10 text-primary animate-spin mb-1'/>
            <h3 className='text-md font-semibold mb-1'> Verifying Email ...</h3>
            <p className='text-sm text-gray-500 mb-6'>Please wait while we are verifying your email.</p>
          </> : isSuccess ? (
            <>
            <CheckCircle className='w-7 h-7 text-green-500 mb-5 animate-ping'/>
            <h3 className='text-md font-semibold mb-1'>Email Verified <span className='text-primary ml-1'>(●'◡'●)</span></h3>
            <p className='text-sm text-gray-500 mb-4'>
              Your Email has been Verified successfully
            </p>
            </>
          ):(
            <>
            <XCircle className='w-7 h-7 animate-ping text-red-500 mb-5'/>
            <h3 className='text-md font-semibold mb-1'>Email Verification Failed <span className='text-primary ml-1'>(〒▽〒)</span></h3>
            <p className='text-sm mb-4 text-gray-500'>Please try Again</p>
            </>
          )
          }
       <Link to={"/sign-in"}>
          <Button>
            Back to Sign In
          </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmail