import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import ForgotPassword from './ForgotPassword';
import ResetPassword from "./ResetPassword";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
function App() {
  return (
   
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup />} ></Route>
      <Route path='/login' element={<Login />} ></Route>
      <Route path='/dashboard' element={<Dashboard />} ></Route>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/forgot-password' element={<ForgotPassword />} ></Route>
      <Route path='/reset-password/:id/:token' element={<ResetPassword />} ></Route>
    </Routes>
    </BrowserRouter>
      
    
  )
   

  
}

export default App;
