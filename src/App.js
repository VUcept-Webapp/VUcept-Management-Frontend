import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./pages/AuthLayout";
import { DashBoard } from "./pages/DashBoard";
import { FirstYear } from "./pages/FirstYear";
import { HomeLayout } from "./pages/HomeLayout";
import { LogIn } from "./pages/LogIn";
import { ResetPassword } from "./pages/ResetPassword";
import { SignUp } from "./pages/SignUp";
import { UserManagement } from "./pages/UserManagement";

export const App = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<LogIn />}/>
          <Route path='signUp' element={<SignUp />}/>
          <Route path='resetPassword' element={<ResetPassword />}/>
        </Route>
        <Route path='home' element={<HomeLayout />}>
          <Route index path='dashBoard' element={<DashBoard />}/>
          <Route path='firstyearAttendance' element={<FirstYear />}/>
          <Route path='userManagement' element={<UserManagement />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
}