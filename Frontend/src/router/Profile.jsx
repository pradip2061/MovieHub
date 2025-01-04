import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';
function Profile() {
    const navigate = useNavigate()
    const[name,setName]=useState('')
    const[image,setImage]=useState(null)
    const token = localStorage.getItem('token')
    const profile = async()=>{
await axios.post('https://moviefind-1.onrender.com/movie/profile',{name,image},{
    method:'POST',
    headers:{
    "content-type":'multipart/form-data',
    "Authorization":`${token}`
    }
})
.then((response)=>{
    //setMessege(response.data.messege)
    localStorage.setItem('messege','user has profile')
    if(response.status == 200){
        navigate('/content/*')
    }
})
 }

  return (
<div className='profile'>
    <div className='profile-section'>
        <div className='select-photo'>
        <CgProfile className='p-size' />
        <input type='file' required onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
        <input type='text' required className='input' placeholder='enter your username' onChange={(e)=>setName(e.target.value)}/>
        <button onClick={profile}>continue</button>
    </div>
</div>
  )
}

export default Profile