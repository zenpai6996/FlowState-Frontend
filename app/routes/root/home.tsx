import React from 'react'
import type { Route } from './+types/home';
import { Button } from '~/components/ui/button';
import { ModeToggle } from '~/components/mode-toggle';
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FlowState" },
    { name: "Project Management App", content: "Welcome to FlowState !" },
  ];
}


const HomePage = () => {
  return (
    <div className='flex '>
      
      <div className=' flex justify-center mx-5'><ModeToggle/></div>
     <div className='w-full h-screen flex items-center justify-center gap-4'>
      <Link to={"/sign-in"}>
        <Button className='bg-blue-500 dark:bg-blue-400 dark:hover:text-gray-900 dark:text-white text-white'>Login</Button>
      </Link>
      <Link to={"/sign-up"}>
        <Button variant={"outline"} className='bg-blue-500 dark:bg-blue-400 dark:text-white text-white'>Sign Up</Button>
      </Link>
     </div>

    </div>
    
  )
}

export default HomePage;