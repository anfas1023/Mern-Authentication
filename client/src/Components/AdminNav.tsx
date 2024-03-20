import React from 'react'
import { Link } from "react-router-dom";
import { useAppSelector,useAppDispatch } from "../app/hook";
import {adminLogOut} from'../features/admin/adminslice'

const AdminNav = () => {
  const dispatch=useAppDispatch()
    const {admin} =useAppSelector((state)=>state.admin)
    const handleLogout=(e:React.MouseEvent<HTMLSpanElement>)=>{
      e.preventDefault();
      dispatch(adminLogOut());
    }
  return (
  <>
 <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to="/adminlogin">
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
       {
        admin ? (
            <span onClick={handleLogout} className="text-red-700 cursor-pointer">Sign out</span>
        ) :(
          <Link to='/adminlogin' >
            Sign In
          </Link>
        )
       }
        </ul>
      </div>
    </div>
  </>
  )
}

export default AdminNav
