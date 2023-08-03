import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const [auth,setAuth]= useAuth();
  // console.log('here',auth);
  return (
    <Layout>
        <h1>HomePage</h1>
        <pre>{JSON.stringify(auth,null,1)}</pre>
    </Layout>
  )
} 

export default HomePage