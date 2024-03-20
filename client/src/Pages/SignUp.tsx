import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {signUpUser} from '../features/data/userData'
import { useAppDispatch,useAppSelector } from "../app/hook";
import Header from '../Components/Header'
type FormType = {
  username: string;
  email: string;
  password: string;
};
const SignUp = () => {
  const {loading,error,users} =useAppSelector((state)=>state.userData);
  const [form, setForm] = useState<FormType>({
    username: "",
    email: "",
    password: "",
  });
  // const [error, setError] = useState<boolean | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  const navigate=useNavigate();
  const dispatch=useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      dispatch(signUpUser(form))
      console.log("here");
        navigate('/signin')
    } catch (error) {
   
    }
  };

  return (
    <>
    <div className=" p-3 max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-bold p-5">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
        ></input>
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
         {loading ? 'Loading' : 'sign Up'}
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an Account?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-600">{error && 'Email already Exist!!'}</p>
    </div>
    </>
  );
};

export default SignUp;
