import {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login(){
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  
axios.defaults.withCredentials = true;
const handleSubmit =(e) => {
  e.preventDefault();
  axios.post('http://localhost:3001/login', {  email, password})
  .then(res => {
   
   if(res.data.Status === "Success"){
     if(res.data.role === "admin"){
         navigate("/dashboard")
     }else{
       navigate("/")
     }
   }
  })

  .catch(err => console.log(err))
}

 return(
   <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
   <div className="bg-white p-3 rounded w-25">
       <h2>Login</h2>
       <form onSubmit={handleSubmit}>
           <div className="mb-3">
           <label htmlFor="email">
           <strong>Email</strong>
           </label>
               <input
               required
                 autoComplete="off"
                 type="email"
                 name="email"
                 placeholder="enter your email"
                 className="form-control rounded-0"
                 onChange={(e) => setEmail(e.target.value)}
               />
           </div>
           <div className="mb-3">
           <label htmlFor="email">
           <strong>Password</strong>
           </label>
               <input
               required
               autoComplete="off"
                 type="password"
                 name="password"
                 placeholder="enter your password"
                 className="form-control rounded-0"
                 onChange={(e) => setPassword(e.target.value)}
               />
           </div>
           <button type="submit" className="btn btn-success w-100 rounded-0">
               Login
             </button>
             </form>
             <p>Already Have an Account
             <br></br>
             <Link to="/forgot-password">Forgot Password</Link></p>
             
             <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
               Signup 
             </Link>

       
   </div>
</div>
 )
}

export default Login;