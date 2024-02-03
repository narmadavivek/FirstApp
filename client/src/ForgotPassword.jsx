import {useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ForgotPassword(){
  
  const [email, setEmail] = useState();
  const navigate = useNavigate()
  
axios.defaults.withCredentials = true;
const handleSubmit =(e) => {
  e.preventDefault();
  axios.post('http://localhost:3001/forgot-password', {  email})
  .then(res => {
   
   if(res.data.Status === "Success"){
      navigate('/login')
   }
  })

  .catch(err => console.log(err))
}

 return(
   <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
   <div className="bg-white p-3 rounded w-25">
       <h2>Forgot Password</h2>
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
           <button type="submit" className="btn btn-success w-100 rounded-0">
               SEND
             </button>
             </form>
   </div>
</div>
 )
}

export default ForgotPassword;