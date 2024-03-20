import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Header from "./Components/Header";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { fetchUser } from "./features/data/userData";
import PrivateRoute from "./Components/PrivateRoute";
import AdminTable from "./Pages/admin/AdminTable";
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminEditUser from "./Pages/admin/AdminEditUser";
import { adminGetLoggedIn } from "./features/admin/adminslice";
import AdminProtectedroute from "./Components/AdminProtectedroute";

function App() {
  const { users } = useAppSelector((state) => state.userData);
  const { admin } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!users) {
      dispatch(fetchUser());
    }
    console.log("app use effect");
    if (!admin) {
      console.log("admin");
      dispatch(adminGetLoggedIn());
    }
  }, [users, dispatch, admin]);
  console.log(admin);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={!users?.username ? <Signin /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!users?.username ? <SignUp /> : <Navigate to="/signin" />}
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/about" element={<About />} />

          {/* admin */}
          <Route path="/admindashboard" element={!admin ? <Navigate to='/adminlogin'/> :<AdminTable/>}></Route>
          <Route path="/adminlogin" element={!admin ? <AdminLogin /> : <Navigate to='/admindashboard'/>} />
          <Route path="/adminedituser/:userId" element={<AdminEditUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
