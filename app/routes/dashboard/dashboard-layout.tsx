import React from 'react'
import { ModeToggle } from '~/components/mode-toggle'
import { Button } from '~/components/ui/button';
import { useAuth } from '~/provider/auth-context'

const DashboardLayout = () => {
  const {user,logout} = useAuth();
  
  return (
    <>
    <ModeToggle/>
    <Button  onClick={logout}>Logout</Button>
    <div>DashboardLayout</div>
    </>
  )
}

export default DashboardLayout