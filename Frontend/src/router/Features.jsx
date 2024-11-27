import React from 'react'

import img3 from '../assets/red.jpg'
import Nav from '../components/Nav'
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdOutlineSystemUpdate } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
function Features() {
  return (
    <>
    <div className='feature-div'>
      <Nav/>
    <div className='feature'>
    <div className='intro'>
<div className='text'>
  <h1> Welcome To MovieHub</h1>
  <h2> Discover The Ultimate  Movie Experience</h2>
</div>
<div className='img'>
  <img src={img3}/>
</div>
    </div>
    <div className='explain'>
    <div className='f'>
    <MdOutlineCreateNewFolder  className='creates'/>
    <h3> we can set own favourite movies</h3>
    </div>
    <div className='s'>
    <MdOutlineSystemUpdate className='creates' />
    <h3> we can update the movie details</h3></div>
     <div className='l'>
     <RiDeleteBin5Line className='creates' />
     <h3> movie detail can delete by only admin</h3>
     </div>
      </div>
      <div style={{marginTop:47,color:'white'}}>.</div>
    </div>
    </div>
    </>
  )
}

export default Features