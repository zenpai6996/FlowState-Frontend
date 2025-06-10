import { CirclePlus,  ShieldAlert } from 'lucide-react';
import React from 'react';
import { Button } from '../button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';

interface NoDataFoundProps{
  title:string;
  description:string;
  buttonText:string;
  buttonAction: () => void
}

const NoDataFound = ({title,description,buttonAction,buttonText}:NoDataFoundProps) => {
  return (
    <Card className='col-span-full text-center py-12 2xl:py-24 dark:bg-muted rounded-2xl mb-4'>
      <CardHeader>
        <ShieldAlert className='size-12 mx-auto text-ring'/>
        <CardTitle>
          <h3 className='mt-4 text-lg text-ring font-semibold'>{title}</h3>
        </CardTitle>
      </CardHeader>
     <CardDescription>
       <p className='mt-2 text-sm text-muted-foreground max-w-sm mx-auto'>
        {description}
      </p>
     </CardDescription>
     <CardContent>
       <Button onClick={buttonAction} className='mt-4 text-ring' variant={"glassMorph"}>
        <CirclePlus className='size-4 mr-2 text-ring'/>
        {buttonText}
      </Button>
     </CardContent>
    </Card>
  );
}

export default NoDataFound