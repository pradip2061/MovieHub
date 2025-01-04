
import React from 'react'
import { useEffect, useState } from 'react'
import {  NavLink, useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import axios from 'axios'
import img from '../assets/no-video.png'
import { FaSearch } from "react-icons/fa";
import Scroll from '../components/Scroll'
function YourVideos() {
 
    const navigate = useNavigate()
const [movie,setMovie]=useState([])


const logout = ()=>{
 localStorage.removeItem('token') 
   navigate('/')
}

const[filter,setFilter]=useState([])
const[input,setInput]=useState('')

 
//const render =(e)=>{
 // e.preventDefault()
//  const movies= movie.filter(item =>item.moviename.toLowerCase().includes(input.toLowerCase()))
 // setFilter(movies);
//}
//useEffect(()=>{
//setFilter(movie)
//},[!input])
//useEffect(()=>{
 // setFilter(movie)
//},[movie])
useEffect(()=>{
  const gettrend = async()=>{
    await axios.get('https://moviefind-1.onrender.com/movie/gettrend')
    .then((response)=>{
  setMovie(response.data.data)
    })
  }
  gettrend()
},[])

  
  return (
    <div className='own-video'>
    <div className='contentnav'>
        <div  className='lefts'>
        <div  className='titles'>
          <span>MOVIE</span>HUB
        </div>
        </div>
        <div className='search'>
        <form>
          <input type='text' value={input} onChange={(e)=>setInput(e.target.value)} placeholder='search movies here' required/>
          <FaSearch  className='searchicon'/>
          </form>
        </div>
        <div className='rights'>
        <button className='create' onClick={()=>navigate('/create')}>Create</button>
       <button className='signups' onClick={logout}>Logout</button>
        </div>
        </div>
    <div className='scrollsection'>
    <Scroll/>
    <div className='wrap'>
    <h1 style={{marginTop:40}}>All Movies</h1>
    <div className="app">
    {movie.length > 0 ? 
          movie.map((item) => (
            <div className='trendvideo'>
            <img src={item.image}/>
            <h1>{item.movienames}</h1>
            </div>
          ))
         :
         <div className='error'>
          <img src={img} className='novideo'/>
          <h1>No Videos Found</h1>
          </div>
        }
    </div>
    </div>
    </div>
    </div>
  )
}

export default YourVideos