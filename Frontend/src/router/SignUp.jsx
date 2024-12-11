import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios'
import {toast} from 'react-toastify'

function SignUp() {
const navigate = useNavigate()
  const [username,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const signup = async(e)=>{
    e.preventDefault()
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     let value =regex.test(email)
     if(!value){
      toast.error('invalid email',{className:'toast'})
      return
     }
await axios.post('https://moviefind-902o.onrender.com/movie/sign',{username,email,password})
  .then((response)=>{
    console.log(response)
    if(response.request.status == 200){
      toast.success('register successful!!',{className:'toast'})
      navigate('/login')
    } else{
      toast.error('register failed!!')
    }
  })
  
  }
  return (
    <>
    <div className='creation'>
    <div className="login-form">
    <NavLink to='/'> <RxCross2 className='cross'/></NavLink>
     <h2>SignUp</h2>
     <form className='field'>
     <input type="text" name="username" placeholder="username" onChange={(text)=>setUserName(text.target.value)} required/>
         <input type="email" name="email" placeholder="Email" onChange={(text)=>setEmail(text.target.value)} required/>
         <input type="password" name="password" placeholder="Password" onChange={(text)=>setPassword(text.target.value)} required />
         <button type="submit" onClick={signup}>SignUp</button>
     </form>
 </div>
 </div>
 </>
  )
}

export default SignUp