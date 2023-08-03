import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import { useNavigate ,useLocation} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';



const Login = () => {
    const [auth,setAuth] = useAuth();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    //form function
    async function handelSubmit(e){
    e.preventDefault();
    console.log(password,email);
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{password,email});
        if(res.data.sucess){
         toast.success(res.data.message);
         setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
         });
         localStorage.setItem('auth',JSON.stringify(res.data));
         navigate(location.state||'/');   
      }else{
        toast.error(res.data.message);
      }
      } catch (error) {
        console.log(error);
        toast.error('No user found')
      } 
    }
    return (
        <Layout title={'Register || Signup'}>
            <div className='register'>
                <h1>Login</h1>
                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <input type="email" value={email} className="form-control" onChange={(e)=> setEmail(e.target.value)} required   placeholder='Email' />    
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} className="form-control" onChange={(e)=> setPassword(e.target.value)} required   placeholder='Password' />    
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Login