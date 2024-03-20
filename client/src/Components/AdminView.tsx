import React,{useEffect, useState} from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from'axios'
import {IformTypes} from '../types/Iformtypes'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import AdminUserAdd from './AdminUserAdd';

type FormType = {
    email: string;
    password: string;
  };
const AdminView = () => {
  const [openModal, setModal] = useState<boolean>(false);
  const [userData,setUserData]=useState<IformTypes[]>([])
  const navigate=useNavigate();

  const fetchUser = async () => {
    try {
     const {data}=  await axios.get('http://localhost:3000/Server/admin/getUserData')
     setUserData(data)
   
             
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }; 

  const handleEditUser=(userId: string)=>{
    navigate(`/adminedituser/${userId}`);
  }
  useEffect(()=>{
 fetchUser()
  },[userData,setUserData])

  const OpenModal=()=>{
    setModal(true)
  }

  const handleDelete=async(userId:string)=>{
    setModal(false)
  await axios.delete(`http://localhost:3000/Server/admin/deleteUser/${userId}`)
  fetchUser()
  }
      
  return (
    <>
    <AdminUserAdd setModal={setModal} />
     <table className="table-auto border-collapse border border-gray-400 mx-auto">
        <thead className='bg-gray-200'>
          <tr className='text-center'>
            <th className='border border-gray-400 px-4 py-2'>UserName</th>
            <th className='border border-gray-400 px-4 py-2'>Email</th>
            <th className='border border-gray-400 px-4 py-2'>Created At</th>
            <th className='border border-gray-400 px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((users,i)=>(
            <tr key={i} className='text-center '>
            <td className='border border-gray-400 px-4 py-2'>{users.username}</td>
            <td className='border border-gray-400 px-4 py-2'>{users.email}</td>
            <td className='border border-gray-400 px-4 py-2'>{users.createdAt}</td>
            <td className='border border-gray-400 px-4 py-2'>
             <span className='inline-block'><MdDelete onClick={OpenModal} size={20}/></span>
             <Modal show={openModal} size="md" onClose={() => setModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this User?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={()=>handleDelete(users._id)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
             <span className='inline-block'><FaEdit onClick={() => handleEditUser(users._id)} size={20}/></span>
            </td>
          </tr>
          ))}  
        </tbody>
      </table>

    
     

    </>
  )
}

export default AdminView
