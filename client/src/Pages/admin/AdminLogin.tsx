import React,{useEffect, useState} from 'react'
import {useAppDispatch,useAppSelector} from '../../app/hook'
import {adminLogin} from '../../features/admin/adminslice'
import {useNavigate} from 'react-router-dom'
 

type FormType = {
    email: string;
    password: string;
  };
const AdminLogin = () => {
  const navigate=useNavigate()
    const [form, setForm] = useState<FormType>({
        email: "",
        password: "",
      });
  const dispatch=useAppDispatch();

  useEffect(()=>{
    if(admin){
      navigate('/admindashboard')
    }
  })
  const {admin}=useAppSelector((state)=>state.admin)
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setForm({
          ...form,
          [e.target.id]: e.target.value,
        });
      };



      const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
 e.preventDefault();
 dispatch(adminLogin(form));

      }
  return (
   <>
   <div className=" p-3 max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-bold p-5">Admin Login</h1>
      <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="email"
          placeholder="Email"
          id="email"
         onChange={handleChange}
        ></input>
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        ></input>
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-90">
      Log In
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

export default AdminLogin
