import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  
  const navigate = useNavigate();
  return (
    <Button
    variant={'glassBubble'}
    size={"sm"}
    onClick={() =>  navigate(-1)}
    className='p-4 mr-4'
    >
    <ArrowLeft/> Back
    </Button>
  )
}

export default BackButton