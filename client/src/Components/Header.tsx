import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hook";

const Header = () => {
  const {users} =useAppSelector((state)=>state.userData)
  const {admin} =useAppSelector((state)=>state.admin)
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
       {
        users?.username ? (
          <Link to='/profile'>
             Profile
          </Link>
        ) :(
          <Link to='/signin' >
            Sign In
          </Link>
        )
       }
        </ul>
      </div>
    </div>
  );
};

export default Header;
