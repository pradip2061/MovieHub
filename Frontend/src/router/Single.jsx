import React, { useState } from 'react'
import { useEffect } from 'react'
import{useNavigate, useParams,NavLink} from 'react-router-dom'
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDelete } from "react-icons/md";
import{toast} from 'react-toastify';
function Single() {
  
  const navigate = useNavigate()
  const [data,setData]=useState([])
  const [text,setText]=useState('')
  const[comment,setComment]=useState([])
  const[moviename,setMovieName]=useState('')
const[movietype,setMovieType]=useState('')
const[movieduration,setMovieDuration]=useState('')
const[moviedescription,setMovieDescription]=useState('')
const[image,setImage] = useState(null)
const[click,setClick]=useState(false)
const[response,setResponse]=useState('')
const[comments,setComments]=useState('')
const[message,setMessage]=useState('')
//const[image,setImage]=useState(null)
  const {id}= useParams()
const token = localStorage.getItem('token')

const createapi = async(e)=>{
  e.preventDefault()
 try {
  await axios.post(`https://moviefind-1.onrender.com/movie/comment/${id}`,{text},{
    headers:{
      "Authorization":`${token}`
    }
  })
  .then((response)=>{
    console.log(response)
    setResponse(response.data.text)
    setText('')
  })
 } catch (error) {
  if (error.code === 'ECONNABORTED') {
    console.error("Request timed out");
  } else {
    console.error("Error:", error.message);
  }
 }
}

const getcomment =async()=>{
 try {
  await axios.get(`https://moviefind-1.onrender.com/movie/get/${id}`)
  .then((response)=>{
    setComment(response.data.data)
    setResponse('')
  })
 } catch (error) {
  if (error.code === 'ECONNABORTED') {
    console.error("Request timed out");
  } else {
    console.error("Error:", error.message);
  }
 }
}

const updateapi =async()=>{
await axios.patch(`https://moviefind-1.onrender.com/movie/update/${id}`,{
  moviename,
  movietype,
  movieduration,
  moviedescription,
  image
  } ,{
      method:"POST",
      headers:{
        "Content-Type":"multipart/form-data",
        "Authorization":`${token}`
      }
    })
    .then((response)=>{
      setMessage(response.message)
      if(response.data.message == "Update successful"){
        toast.success('update successfully',{className:'toast'})
        setClick(false)
      }else{
        toast.error('you have no permission',{className:'toast'})
      }
    })
}




    const singleapi = async()=>{
      try{
await axios.get(`https://moviefind-1.onrender.com/movie/getsingle/${id}`)
.then((response)=>{
  const movieData= response.data.data
  const image = movieData.image
  const length = "https://moviefind-1.onrender.com/".length
  const imagepath = image.slice(length)
setData(movieData)
setMovieName(movieData.moviename || '');
      setMovieType(movieData.movietype || '');
      setMovieDuration(movieData.movieduration || '');
      setMovieDescription(movieData.moviedescription || '');
      setImage(imagepath||'')

})}catch(error){
  if (error.code === 'ECONNABORTED') {
    console.error("Request timed out");
  } else {
    console.error("Error:", error.message);
  }
}
    }

    useEffect(()=>{
      singleapi()
      setMessage('')
    },[message])
    useEffect(()=>{
      getcomment()
    },[response,comments])

  const show=()=>{
    click?setClick(false):setClick(true)
  }
  const deletecomment = async(id)=>{
    await axios.delete(`https://moviefind-1.onrender.com/movie/deletecomment/${id}`,
       {
         headers:{
           Authorization:token
         }
       }
     )
     .then((response)=>{
setComments(response.data.messege)
     })
   }
   
  return (
    <>
    <div className='single-data'>
    <div className='contentnavs'>
        <div  className='lefts'>
        <div  className='titles'>
          <span>MOVIE</span>HUB
        </div>
        </div>
        <div className='rights'>
        <button className='create' onClick={show}>Update</button>
        </div>
    </div>
    <div className='flex'>
    <div className='permovie'>
    <NavLink to='/content'> <RxCross2 className='cross1'/></NavLink>
    <h3 className='moviename'>{data.moviename}</h3>
    <img src={data.image}/>
  <div className='once'>
    <div className='comment'>
    <form onSubmit={createapi} method='post'>
  <div className='inputhere'>
    <input type='text' name='text' value={text} onChange={(e)=>setText(e.target.value)} placeholder='write your comment here' required/>
    <button type='submit'>send</button>
    </div>
    </form>
    <div className='wrapper'>
    {
      comment.map((item)=>
      <div key={item._id} className='comments'>
        <h3>{item.text}</h3>
        <MdOutlineDelete onClick={()=>deletecomment(item._id)} className='delete-icon'/>
        </div>
      )
    }
    </div>
  </div>
  </div>
  </div>
  {
    click ?
  <div className='menu'>
  <div className="update-form">
     <h2>Update</h2>
     <input type="text" name="moviename" placeholder="enter movie name" value={moviename} onChange={(e)=>setMovieName(e.target.value)} required/>
         <input type="text" name="movietype" placeholder="enter movie type" value={movietype} onChange={(e)=>setMovieType(e.target.value)} />
         <input type="text" name="movieduration" placeholder="enter movie duration" value={movieduration} onChange={(e)=>setMovieDuration(e.target.value)} />
         <input type="text" name="moviedescription" placeholder="enter movie description" value={moviedescription} onChange={(e)=>setMovieDescription(e.target.value)} />
         <input type='file' name='image'   onChange={(e)=>setImage(e.target.files[0])} />
         <button onClick={updateapi}>Send</button>
 </div>
  </div>:null
  }
  </div>
  </div>
  </>
  )
}

export default Single
//navigate(`/deletecomment/${item._id}`)