import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Header from "./Components/Header";
import { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "./app/hook";
import {fetchUser} from './features/data/userData'
import PrivateRoute from "./Components/PrivateRoute";
import AdminTable from "./Pages/admin/AdminTable";
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminEditUser from "./Pages/admin/AdminEditUser";




function App() {
  

  const {users}=useAppSelector((state)=>state.userData);
  const dispatch=useAppDispatch();
  useEffect(()=>{
    if (!users) {
      dispatch(fetchUser())
    }

  },[users,dispatch]);
 

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={!users?.username ? <Signin />   : <Navigate to='/'/> } />
          <Route path="/signup"  element={!users?.username ? <SignUp /> :  <Navigate to='/signin'/> } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/about" element={<About />} />
          <Route path='/admindashboard' element={<AdminTable/>}></Route>
          <Route path='/adminlogin' element={<AdminLogin/>}/>
          <Route path='/adminedituser/:userId' element={<AdminEditUser/>}/>
        </Routes>
       
      </BrowserRouter>
    </>
  );
}

export default App;
