import { CirclePlus,  ShieldAlert } from 'lucide-react';
import React from 'react';
import { Button } from '../button';

interface NoDataFoundProps{
  title:string;
  description:string;
  buttonText:string;
  buttonAction: () => void
}

const NoDataFound = ({title,description,buttonAction,buttonText}:NoDataFoundProps) => {
  return (
    <div className='col-span-full text-center py-12 2xl:py-24 dark:bg-accent rounded-2xl'>
      <ShieldAlert className='size-12 mx-auto text-ring'/>
      <h3 className='mt-4 text-lg text-ring font-semibold'>{title}</h3>
      <p className='mt-2 text-sm text-muted-foreground max-w-sm mx-auto'>
        {description}
      </p>
      <Button onClick={buttonAction} className='mt-4 text-ring' variant={"glassMorph"}>
        <CirclePlus className='size-4 mr-2 text-ring'/>
        {buttonText}
      </Button>
    </div>
  );
}

export default NoDataFound