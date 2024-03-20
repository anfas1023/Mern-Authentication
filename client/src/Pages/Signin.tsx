import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {useAppDispatch,useAppSelector} from '../app/hook'
import {signInUser} from '../features/data/userData'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Components/Header'



type FormType = {
  email: string;
  password: string;
};
const Signin = () => { 
  const notify = () => toast("Wow so easy!");
 
  const dispatch=useAppDispatch();
  const {loading,error,users} =useAppSelector((state)=>state.userData);
  
  const [form, setForm] = useState<FormType>({
    email: "",
    password: "",
  });
  
  const navigate=useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {
    try {
      e.preventDefault();
      dispatch(signInUser(form));
    
     if(users){
      navigate('/')
      toast.success('Wow so easy!');
     
     }
      // await axios
      //   .post("http://localhost:3000/Server/auth/signin", form,{
      //     method:'post',
      //     headers:{
      //       "Content-Type":'application/json'
      //     },
      //    withCredentials:true
      //   }
     
      //   )
      //   .then((res) => {
      //     console.log(res.data);
    
      //     // setLoading(false)
      //     dispatch(signInSucess(res.data))
      //     navigate('/')
      //   })
      //   .catch((err) => {
      //     console.log("err",err);
      //   dispatch(signInFailure(true));
      //   });
    } catch (error) {
     console.log(error);
     
    }
  };

  return (
    <>
    <Header/>
    <div className=" p-3 max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-bold p-5">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
         {loading ? 'Loading' : 'Sign In'}
        </button>
        {/* <button onClick={notify}>Notify!</button> */}
       
      </form>
      <div className="flex gap-2 mt-3">
        <p> Dont Have An Account?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-600">{error && 'Email already Exist!!'}</p>
      {/* <ToastContainer /> */}
      <div>

</div>
    </div>

    </>

  );
};

export default Signin;

