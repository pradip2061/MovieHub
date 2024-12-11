import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from 'react-router-dom';
import{toast} from 'react-toastify';
function Create() {
    const navigate = useNavigate()
const[moviename,setMovieName]=useState('')
const[movietype,setMovieType]=useState('')
const[movieduration,setMovieDuration]=useState('')
const[moviedescription,setMovieDescription]=useState('')
const[image,setImage]=useState(null)
const[profile,setProfile]=useState([])
const token = localStorage.getItem('token')
let userimage;
let username;
    const create= async(e)=>{
        e.preventDefault()
        if(profile.length<0){
        userimage = 'https://cdn-icons-png.flaticon.com/128/219/219970.png'
         username = 'unknown'
       }else{
        userimage = profile[0].image
        username = profile[0].username
       }
await axios.post('https://moviefind-902o.onrender.com/movie/create',{
moviename,
movietype,
movieduration,
moviedescription,
image,
userimage,
username
} ,{
    method:"POST",
    headers:{
      "Content-Type":"multipart/form-data",
      "Authorization":`${token}`
    }
  }
)
.then((response)=>{
if(response.status==200){
    toast.success('create successfully',{className:'toast'})
    navigate('/content')
}})
    }

    useEffect(()=>{
      const getprofile= async()=>{
  await axios.get('https://moviefind-902o.onrender.com/movie/getprofile',{
      headers:{
          "Authorization":`${token}`
      }
  })
  .then((response)=>{
    setProfile(response.data.data)
  })
      }
      getprofile()
},[])

  return (
    <div className='creation'>
    <div className="login-form">
    <NavLink to='/content'> <RxCross2 className='cross'/></NavLink>
     <h2>Create</h2>
     <form className='field'>
     <input type="text" name="moviename" placeholder="enter movie name"  onChange={(e)=>setMovieName(e.target.value)} required/>
         <input type="text" name="movietype" placeholder="enter movie type" onChange={(e)=>setMovieType(e.target.value)} required/>
         <input type="text" name="movieduration" placeholder="enter movie duration" onChange={(e)=>setMovieDuration(e.target.value)} required />
         <input type="text" name="moviedescription" placeholder="enter movie description" onChange={(e)=>setMovieDescription(e.target.value)} required />
         <input type='file' name='image'  onChange={(e)=>setImage(e.target.files[0])} required/>
         <button onClick={create} >Send</button>
     </form>
 </div>
 </div>
  )
}
export default Create