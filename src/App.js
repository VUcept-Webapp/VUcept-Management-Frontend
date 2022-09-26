import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./pages/AuthLayout";
import { DashBoard } from "./pages/DashBoard";
import { HomeLayout } from "./pages/HomeLayout";
import { LogIn } from "./pages/LogIn";
import { ResetPassword } from "./pages/ResetPassword";
import { SignUp } from "./pages/SignUp";
import { UserManagement } from "./pages/UserManagement";

export const App = () => {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<LogIn />}/>
          <Route path='signUp' element={<SignUp />}/>
          <Route path='resetPassword' element={<ResetPassword />}/>
        </Route>
        <Route path='home' element={<HomeLayout />}>
          <Route path='dashBoard' element={<DashBoard />}/>
          <Route path='userManagement' element={<UserManagement />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
}