import React ,{useState} from 'react'
import { useParams } from 'react-router'

const WorkspaceDetails = () => {

  const {workspaceId} = useParams<{workspaceId:string}>();
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isInviteMember, setIsInviteMember] = useState(false);
  

  if(!workspaceId){
    return (
      <div>No Workspace found</div>
    )
  }


  return (
    <div>WorkspaceDetails</div>
  )
}

export default WorkspaceDetails