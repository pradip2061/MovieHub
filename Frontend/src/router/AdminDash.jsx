import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img from '../assets/no-video.png'
import axios, { Axios } from 'axios'
import { RxCross2 } from "react-icons/rx";
import {toast} from 'react-toastify'
function AdminDash() {
    const navigate = useNavigate()
    const[data,setData]=useState([])
    const[moviename,setMovieName]=useState('')
const[movietype,setMovieType]=useState('')
const[movieduration,setMovieDuration]=useState('')
const[moviedescription,setMovieDescription]=useState('')
const[image,setImage]=useState(null)
const[show,setShow]=useState(false)
const[messege,setMessage]=useState('')
const[display,setDisplay]=useState(false)
const[messeges,setMessages]=useState('')
const[movienames,setMovieNames]=useState('')
const[movielanguage,setMovieLanguage]=useState('')
const[movietrend,setMovieTrend]=useState([])
const[profile,setProfile]=useState([])

let userimage;
let username;

const tokens = localStorage.getItem('token')
   const logout = ()=>{ localStorage.removeItem('token')
navigate('/')
toast.success('logout successfully')
    }
    useEffect(()=>{
      const getmovies = async()=>{
        await axios.get('http://localhost:3000/movie/get')
        .then((response)=>{
          setData(response.data.data)
        })
      }
      setMessage('')
      getmovies()
    },[messege])

const create= async(e)=>{
e.preventDefault()
if(profile !== 0){
  userimage = profile[0].image
username = profile[0].username
}else{
 userimage = 'https://cdn-icons-png.flaticon.com/128/219/219970.png'
 username = 'unknown'
}
await axios.post('http://localhost:3000/movie/create',{
  moviename,
movietype,
movieduration,
moviedescription,
image,
userimage,
username
},{
  method:'POST',
 headers:{
   "Content-Type":"multipart/form-data",
   "Authorization":`${tokens}`
 }
})
.then((response)=>{
  setMessage(response.data.messege)
if(response.status==200){
  setShow(false)
  toast.success('create successfully',{className:'toast'})
}
})
}
const trending = async(e)=>{
  e.preventDefault()
  await axios.post('http://localhost:3000/movie/trending',{
    movienames,
  movielanguage,
  image,
  },{
    method:'POST',
   headers:{
     "Content-Type":"multipart/form-data",
     "Authorization":`${tokens}`
   }
  })
  .then((response)=>{
    setMessages(response.data.messege)
  if(response.status==200){
    setDisplay(false)
    toast.success('create successfully',{className:'toast'})
  }
  })
  }
  useEffect(()=>{
    const gettrend =async()=>{
    await axios.get('http://localhost:3000/movie/gettrend')
     .then((response)=>{
      setMovieTrend(response.data.data)
      })
       }
       gettrend()
  },[messeges])
  
const shows=()=>{
  show?setShow(false):setShow(true)
}
const displays=()=>{
display?setDisplay(false):setDisplay(true)
}
useEffect(()=>{
  const getprofile= async()=>{
await axios.get('http://localhost:3000/movie/getprofile',{
  headers:{
      "Authorization":`${tokens}`
  }
})
.then((response)=>{
setProfile(response.data.data)
})
  }
  getprofile()
},[])
  return (
    <>
    <div>
    {
      show ?
      <div className='bg'>
    <div className="login-form-ad">
     <RxCross2 className='cross2' onClick={()=>setShow(false)}/>
     <h2>Create</h2>
     <form className='field'>
     <input type="text" name="moviename" placeholder="enter movie name"  onChange={(e)=>setMovieName(e.target.value)} required/>
         <input type="text" name="movietype" placeholder="enter movie type" onChange={(e)=>setMovieType(e.target.value)} required/>
         <input type="text" name="movieduration" placeholder="enter movie duration" onChange={(e)=>setMovieDuration(e.target.value)} required />
         <input type="text" name="moviedescription" placeholder="enter movie description" onChange={(e)=>setMovieDescription(e.target.value)} required />
         <input type='file' name='image'  onChange={(e)=>setImage(e.target.files[0])} required/>
         <button onClick={create}>Send</button>
     </form>
 </div></div>:null
    }
   { display ?
      <div className='bg'>
    <div className="login-form-ad">
     <RxCross2 className='cross2' onClick={()=>setDisplay(false)}/>
     <h2>Create</h2>
     <form className='field'>
     <input type="text" name="movienames" placeholder="enter movie name"  onChange={(e)=>setMovieNames(e.target.value)} required/>
         <input type="text" name="movielanguage" placeholder="enter movie language" onChange={(e)=>setMovieLanguage(e.target.value)} required/>
         <input type='file' name='image'  onChange={(e)=>setImage(e.target.files[0])} required/>
         <button onClick={trending} >Send</button>
     </form>
 </div></div>:null
    }
    <div className='contentnavs'>
        <div  className='lefts'>
        <div  className='titles'>
          <span>MOVIE</span>HUB
        </div>
        </div>
        <div className='rights'>
        <button onClick={logout} className='logout'>logout</button>
        </div>
    </div>
    <div className='header'>
      <h1>Admin Dashboard</h1>
      <div>
      <button onClick={shows}>create</button>
      <button onClick={displays}>Trend</button>
      </div>
    </div>

    <div className='trending'>
    <h1>Recent Movies</h1>
    <div className='recent'>
    {movietrend.length > 0 ? 
          movietrend.map((item) => (
            <div key={item._id} className='photo'>
            <img src={item.image}/>
            <h3>{item.movienames}</h3>
            <div className='button'>
            <button className='d' onClick={()=>navigate(`/trend/${item._id}`)}>delete</button>
            </div>
            </div>
          ))
         : <h1>No Videos</h1>
        }
        </div>
    </div>
    <div className='catagories'>
   <h1>All Movies</h1>
   <div className='cato'> 
    {data.length > 0 ? 
          data.map((item) => (
            <div key={item._id} className='photo'>
            <img src={item.image}/>
            <h3>{item.moviename}</h3>
            <div className='button'>
            <button className='u'>update</button>
            <button className='d' onClick={()=>navigate(`/adsingle/${item._id}`)}>delete</button>
            </div>
            </div>
          ))
         : null
         /* <div className='error'>
          <img src={img} className='novideo'/>
          <h1>No Videos Found</h1>
          </div> */
        }
        </div>
    </div>
    </div>
  
    </>
  )
}

export default AdminDash