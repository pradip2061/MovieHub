import React from 'react'
import { IoHome } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import Nav from '../components/Nav';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

function Contact() {
  return (
    <>
    <div className='contact-div'>
      <Nav/>
    <div className='contact'>
      <div className='top'>
        <h1>Contact Us</h1>
        <h3> If you find errors, bugs and need help you can send messeges directly.</h3>
      </div>
      <div className='bottom'>
        <div className='leftc'>
         <div>
         <IoHome className='icon' />
         <span>
          <h2>Address</h2>
          <h3> B.N.P-8 surkhet Nepal</h3>
          </span>
         </div>
         <div>
         <FaPhone className='icon'/>
         <span>
         <h2>Phone</h2>
         <h3>9868027628</h3>
         </span>
         </div>
         <div>
         <MdOutlineMailOutline className='icon'/>
         <span>
         <h2> Email</h2>
         <h3> singhhemanta46@gmail.com</h3>
         </span>
         </div>
        </div>
        <div className='rightc'>
          <h1> Send messege</h1>
          <input type='text'   placeholder='Full Name' name='name'required/>
          <input type='email' placeholder='Email' name='name'required/>
          <input type='' placeholder='Type Your Messege' name='name'required/>
          <button>Send</button>
        </div>
      </div>
    </div>
    <div className='redirect'>
        <FaFacebookF  className='social'/>
        <FaTwitter  className='social'/>
        <AiFillInstagram className='social' />
        </div>
        </div>
    </>
  )
}

export default Contact