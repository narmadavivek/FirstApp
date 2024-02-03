import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ResetPassword(){
  
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  const {id, token} = useParams()
  
axios.defaults.withCredentials = true;
const handleSubmit =(e) => {
  e.preventDefault();
  axios.post(`http://localhost:3001/reset-password/${id}/${token}`, { password })
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
       <h2>Reset Password</h2>
       <form onSubmit={handleSubmit}>
           <div className="mb-3">
           <label htmlFor="email">
           <strong>New Password</strong>
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
               Update
             </button>
             </form>
   </div>
</div>
 )
}

export default ResetPassword;