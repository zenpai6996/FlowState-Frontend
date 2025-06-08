import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-full'>
      <Loader2 className='w-10 h-10 animate-spin'/>
    </div>
  )
}

export default Loader