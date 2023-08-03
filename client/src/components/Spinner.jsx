import React,{useEffect,useState} from 'react'
import { useNavigate, useLocation} from 'react-router-dom'

const Spinner = () => {
    const[count,setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prev)=>--prev)
        },1000)
        count === 0 && navigate('/login',{
            state :location.pathname
        });
        return ()=>clearInterval(interval)
    },[count,navigate,location])
    return (
        <>
            <div className="text-center">
                <h1 className='Text-Center'>Redirecting in {count} second's</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </>
    )
}

export default Spinner