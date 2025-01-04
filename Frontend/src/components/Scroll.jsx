import React, { useState,useEffect } from 'react'
import { FaEarthAmericas } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { SlUserFollowing } from "react-icons/sl";
import { CiYoutube } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import axios from "axios"
function Scroll() {
    const [show,setShow]=useState(false)
    const[profile,setProfile]=useState([])
const token = localStorage.getItem('token')
const shows=()=>{
show?setShow(false):setShow(true)
}
useEffect(()=>{
  const getprofile= async()=>{
await axios.get('https://moviefind-1.onrender.com/movie/getprofile',{
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
    <div className='menu'>
    <div className='options' onClick={shows}>
      <h3>Menu</h3>
    </div>{ show?
    <div className='scrolldown'>
    <div className='varymain'>
      <div className='vary'>
      <FaEarthAmericas style={{color:'white',fontSize:'22'}} />
      <div>
      <ul>
<li><NavLink style={{color:'white',fontFamily:'sans-serif',fontSize:18}} to='/content'>All</NavLink></li>
      </ul>
        </div>
      </div>
      <div className='vary'>
      <FaArrowTrendUp style={{color:'white',fontSize:'22'}}/>
      <div>
      <ul> <li><NavLink  style={{color:'white',fontFamily:'sans-serif',fontSize:18}} to='/trending'>Trending</NavLink></li></ul>
      </div>
      </div>
      <div className='vary'> 
      <CiYoutube style={{color:'white',fontSize:'22'}}/>
      <div>
      <ul>
      <li><NavLink  style={{color:'white',fontFamily:'sans-serif',fontSize:18}} to='/yourvideo'>YourVideos</NavLink></li>
      </ul>
      </div></div>
      </div>
      <div className='vary1'>
      <div className='vary-2'>
      <div className='icon-set'>
      <SlUserFollowing style={{color:'white',fontSize:'22'}} className='follwing'/>
      <div>
      <li><a style={{color:'white',fontFamily:'sans-serif',fontSize:18, marginRight:25}}>Following</a></li>
      </div>
      </div>
      {
      profile.length>0 ?  profile.map((item)=>(
        <div key={item._id} className='user-followings'>
        <img src={item.image}/>
        <h1>{item.username}</h1>
      </div>
      )) :null
      }
      </div>
      </div>
    </div>:null
    }
    </div>
  )
}

export default Scroll