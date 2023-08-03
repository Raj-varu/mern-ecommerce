import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const navigate = useNavigate();

    //form function
    async function handelSubmit(e){
    e.preventDefault();
    console.log(name,password,email,phone);
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,password,email,phone,address});
        if(res.data.sucess){
         toast.success(res.data.message);
         navigate('/login');   
      }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong!')
      } 
    }
    return (
        <Layout title={'Register || Signup'}>
            <div className='register'>
                <h1>register</h1>
                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <input type="text" value={name} className="form-control" onChange={(e)=> setName(e.target.value)} required   placeholder='Name' />    
                    </div>
                    <div className="mb-3">
                        <input type="email" value={email} className="form-control" onChange={(e)=> setEmail(e.target.value)} required   placeholder='Email' />    
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} className="form-control" onChange={(e)=> setPassword(e.target.value)} required   placeholder='Password' />    
                    </div>
                    <div className="mb-3">
                        <input type="text" value={phone} className="form-control" onChange={(e)=> setPhone(e.target.value)} required   placeholder='Phone' />    
                    </div>
                    <div className="mb-3">
                        <input type="text" value={address} className="form-control" onChange={(e)=> setAddress(e.target.value)} required   placeholder='address' />    
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register