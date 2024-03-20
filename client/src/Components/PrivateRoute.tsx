import React from 'react'
import { useAppSelector } from '../app/hook'
import { Navigate } from 'react-router-dom'

type childrenProps={
    children:React.ReactNode
}

const PrivateRoute = ({children}:childrenProps) => {            
    const {users} =useAppSelector((state)=>state.userData)
if(!users?.username){
    return <Navigate to='/signin'/>
}
return children 
}

export default PrivateRoute
