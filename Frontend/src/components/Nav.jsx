import React, { useState } from 'react'
import {  NavLink } from 'react-router-dom'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'

function Nav() {


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleClick = () => {
 isMenuOpen?setIsMenuOpen(false):setIsMenuOpen(true)

    // GSAP animation
    gsap.to(".navigate-link", {
      right: isMenuOpen ? "-300px" : "0px", // Toggles position
      duration: 0.8,
      ease: "power3.out",
    });
  };
 
  return (
    <>
    <div className='mainNav'>
        <div  className='left'>
        <div  className='title'>
          <span>MOVIE</span>HUB
        </div>
        <div>
          <ul>
          <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/feature"> Features</NavLink></li>
            <li><NavLink to="/contact">ContactUs</NavLink></li>
          </ul>
        </div>
        </div>
        <div className='right'>
     <NavLink to='/login'> <button className='login'> Login</button></NavLink>
      <NavLink to='/signup'> <button className='signup'>SignUp</button></NavLink>
      <button className='toggle'onClick={handleToggleClick} >|||</button>
        <div className='navigate-link'>
          <ul>
          <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/feature"> Features</NavLink></li>
            <li><NavLink to="/contact">ContactUs</NavLink></li>
          </ul>
        </div>
        </div>
        </div>
    </>
  )
}
export default Nav