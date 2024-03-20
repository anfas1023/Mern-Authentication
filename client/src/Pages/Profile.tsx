import React, { useEffect, useRef, useState } from "react";
import Image from "../../public/user-sign-icon-front-side-with-white-background.jpg";
import { useAppDispatch, useAppSelector } from "../app/hook";
import axios from 'axios'
import {Updateuser,deleteUser,LogOutUser} from '../features/data/userData'

const Profile = () => {
  const fileRef=useRef<HTMLInputElement | null>(null)
  const [image,setImage]=useState<File | null>();
  const {users} =useAppSelector((state)=>state.userData);
  const dispatch=useAppDispatch();
  useEffect(()=>{
    setImage(users?.image);

    
  },[]);
  const [id,setid]=useState(users?._id || '')
  const [username,setName]=useState(users?.username || '')
  const [email,setEmail]=useState(users?.email || '')
  const [password,setPassword]=useState('')
  const userId=users?._id as string
 
  const handleImage = async (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]);
      try {
        const response = await axios.post('http://localhost:3000/Server/user/updateimage', formData,
        
        {
          withCredentials:true,
          headers:{
            'content-type': 'multipart/form-data'
          }
        },
        ).then(res =>{
          setImage(res.data.Image)
         
        }
        ).catch(err =>console.log("errr",err)
        )
        // await dispatch(UploadImage(formData))
       
        
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    
    }
  };

  const handleDelete=(e: React.MouseEvent<HTMLSpanElement>)=>{
   e.preventDefault();
    dispatch(deleteUser(userId))
  }

 

  const handleFormSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
    console.log("update",username,email,password);
    console.log("id",id); 

    dispatch(Updateuser({ username, email, password,id }));
    setPassword('')
  }

  const handleLogout=(e:React.MouseEvent<HTMLSpanElement>)=>{
    e.preventDefault();
    dispatch(LogOutUser())
  }
  return (
    <div className="max-w-lg  mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <input type='file' onChange={handleImage} ref={fileRef} className="bg-slate-100 rounded-lg py-3 px-3 hidden"></input>
        <img
          className="h-24 w-24 self-center cursor-pointer
        rounded-full object-cover pb-5"
        src={users?.image ? `http://localhost:3000/images/${image}` || `http://localhost:3000/images/${image}`: Image}

          alt="profile image"
          onClick={()=>fileRef.current?.click()}
        />
        <input defaultValue={users?.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg py-3 px-3"

          onChange={(e)=>setName(e.target.value)}
        ></input>

        <input
        defaultValue={users?.email}    
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-100 rounded-lg py-3 px-3"
          onChange={(e)=>setEmail(e.target.value)}
        ></input>

        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-100 rounded-lg py-3 px-3"
         value={password}
          onChange={(e)=>setPassword(e.target.value)}
        ></input>
        <button className= "bg-slate-700  hover:opacity-95 text-white rounded-lg uppercase p-3 disabled:opacity-80" >Update</button>
      </form>
      <div className="flex justify-between mt-5">
            <span onClick={handleDelete} className="text-red-700 cursor-pointer">DeleteAccout</span>
            <span onClick={handleLogout} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      {/* <p className="text-red-700">{error && 'something Went Error'}</p> */}
    </div>
  );
};

export default Profile;
