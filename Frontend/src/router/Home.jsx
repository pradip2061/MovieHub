import React, { useEffect,useState} from 'react'
import Nav from '../components/Nav'
import img from '../assets/disk.png'
import { Tilt } from 'react-tilt'
import { NavLink, Route, Routes, useNavigate} from 'react-router-dom'
import axios from 'axios'



function Home() {
  const navigate = useNavigate()
  const[data,setData]=useState('')

  
  useEffect(()=>{
    const tokens=localStorage.getItem('token')
    const navigates =async()=>{
      await axios.post('https://moviefind-1.onrender.com/movie/redirect',{tokens} ,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        }
      })
    .then((response)=>{
     setData(response.data.data.role)
    })
    }
    navigates()
  },[])
  const logic =()=>{
    if(data == "admin" ){
      navigate('/admin')
    }else if(data == "user"){
      navigate('/content')
    } else{
      navigate('/login')
    }
  }
  
  return (
    <>
    <div className='backhome'>
    <Nav/>
    <div className='body'>
    <div className='leftb'>
      <h1> Find your favourite movies</h1>
      <h2> on just click</h2>

    <button onClick={logic}> Get Started</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default Home