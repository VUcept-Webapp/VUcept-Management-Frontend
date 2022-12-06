import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./lib/contexts";
import { AuthLayout } from "./pages/AuthLayout";
import { Calendar } from "./pages/Calendar";
import { FirstYear } from "./pages/FirstYear";
import { HomeLayout } from "./pages/HomeLayout";
import { LogAttendance } from "./pages/LogAttendance";
import { LogIn } from "./pages/LogIn";
import { ResetPassword } from "./pages/ResetPassword";
import { SignUp } from "./pages/SignUp";
import { UserManagement } from "./pages/UserManagement";
import { VisionsAssignment } from "./pages/VisionsAssignment";
import { VUceptorAttendance } from "./pages/VUceptorAttendance";

export const App = () => {
  return <BrowserRouter>
    <AuthProvider>
    {/* Pop up notification */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true}/>
      <Routes>
        {/* Authentication routes */}
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<LogIn toast={toast}/>}/>
          <Route path='signUp' element={<SignUp toast={toast}/>}/>
          <Route path='resetPassword' element={<ResetPassword toast={toast}/>}/>
        </Route>
        {/* Home page routes */}
        <Route path='home' element={<HomeLayout />}>
          <Route path='calendar' element={<Calendar toast={toast}/>}/>
          <Route path='visionsAssignment' element={<VisionsAssignment toast={toast}/>}/>
          <Route path='firstyearAttendance' element={<FirstYear toast={toast}/>}/>
          <Route path='vuceptorAttendance' element={<VUceptorAttendance toast={toast}/>}/>
          <Route path='logVisions' element={<LogAttendance toast={toast}/>}/>
          <Route path='userManagement' element={<UserManagement toast={toast}/>}/>
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
}