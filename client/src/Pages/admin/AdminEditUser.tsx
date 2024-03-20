import { fetchUser } from '@/features/data/userData';
import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
// type FormType = {
//     email: string;
//     username: string;
//   };
  interface ParamTypes {
    userId: string
  }

  type valueType={
    username:string ;
    email:string;

  }


const AdminEditUser = () => {
    const navigate=useNavigate()
    const { userId } = useParams<{userId?: string}>()
      const [value,setValue]=useState<valueType>() 
      const fetchUser=async()=>{
        const {data} =await axios.get(`http://localhost:3000/Server/admin/fetchOneUser/${userId}`);
        setValue(data);      
      }
      useEffect(()=>{
        fetchUser();
      },[]);

      const [form, setForm] = useState<valueType>({
        email: '',
        username: '',
      });
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setForm({
          ...form,
          [e.target.id]: e.target.value,
        });
      };


      useEffect(()=>{
        if(value) {
        setForm({email:value.email,username:value.username})
        }
      },[value]);


      const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();      
     await axios.post(`http://localhost:3000/Server/admin/adminedituser/${userId}`,form,{
        withCredentials:true
     }).then(()=>{
        navigate('/admindashboard');
     })
      }

  return (
  <>
  <div className=" p-3 max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-bold p-5">Edit User</h1>
      <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
        <input
           defaultValue={value?.username}
          className="bg-slate-100 p-3 rounded-lg"
          type="text"
          placeholder="username"
          id="username"
         onChange={handleChange}
        ></input>
        <input
        defaultValue={value?.email}
          className="bg-slate-100 p-3 rounded-lg"
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
        ></input>
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-90">
   Edit user
        </button>
        {/* <button onClick={notify}>Notify!</button> */}
       
      </form>
      {/* <p className="text-red-600">{error && 'Email already Exist!!'}</p> */}
      {/* <ToastContainer /> */}
      <div>

</div>
    </div>
  </>
  )
}

export default AdminEditUser
