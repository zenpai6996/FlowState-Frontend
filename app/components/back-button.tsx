import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  
  const navigate = useNavigate();
  return (
    <Button
    variant={'glassMirror'}
    size={"sm"}
    onClick={() =>  navigate(-1)}
    className='p-4 mr-4 mb-5 mt-5 md:mt-0 lg:mt-0 rounded-full '
    >
    <ArrowLeft/> Back
    </Button>
  )
}

export default BackButton