import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card(props) {
  const navigate = useNavigate()
  return ( <><div className='card' onClick={()=>navigate(`/single/${props.data._id}`)}>
  <img src={props.data.image}/>
  <div className='section'>
  <h3>{props.data.moviename}</h3>
  <p>{props.data.moviedescription}</p>
  </div>
    <div className='profile-sections'>
    <div className='profile-image'>
    <img src={props.data.userimage} alt='no image'/>
    </div>
    <h1>{props.data.username}</h1>
  </div>
  
   </div>
 </>

  )
}

export default Card