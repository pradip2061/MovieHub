import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RxCookie, RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from 'react-router-dom';
import{toast} from 'react-toastify'
function Login() {
  const navigate = useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const login = async(e)=>{
    e.preventDefault()

 await axios.post('https://moviefind-1.onrender.com/movie/login',{ email,password},
  {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    }
  }
 )
 .then((response)=>{
 const token = response.data.token
 if(response.request.status == 200){
  const storage = async()=>{
     localStorage.setItem('token',token)
  }
  storage()
    if(response.data.data[0].role == "admin"){
      toast.success('log in successfully',{className:'toast'})
      navigate('/admin')
    } else{
      toast.success('log in successfully',{className:'toast'})
    navigate('/content')}
 }
 if(response.status == 400){
  toast.error('log in failed',{className:'toast'})
 }
  
 
 })
  }
const token = localStorage.getItem('token')
 // useEffect(()=>{
//if(token){
  //navigate('/')
//}
  //},[])

  return (
    <><div className='creation'>
    <div className="login-form">
   <NavLink to='/'> <RxCross2 className='cross'/></NavLink>
    <h2>LOGIN</h2>
    <form className='field'>
        <input type="email" name="email" placeholder="Email" value={email}    onChange={(text)=>setEmail(text.target.value)} required />
        <input type="password" name="password" placeholder="Password"  value={password} onChange={(text)=>setPassword(text.target.value)}  required />
        <button type="submit" onClick={login}>Login</button>
    </form>
</div>
</div>
</>

  )
}

export default Login