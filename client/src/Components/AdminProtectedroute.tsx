import React from 'react'
import { useAppSelector } from '../app/hook'
import { Navigate } from 'react-router-dom'

type childrenProps={
    children:React.ReactNode
}

const AdminProtectedroute = ({children}:childrenProps) => {            
    const {admin} =useAppSelector((state)=>state.admin)
if(!admin){
    return <Navigate to='/adminlogin'/>
}
return children 
}

export default AdminProtectedroute