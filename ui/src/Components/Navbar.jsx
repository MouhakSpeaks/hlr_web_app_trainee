import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Togglemenu from './Togglemenu'
const Navbar = () => {
  const navigate=useNavigate()
  const handleHome=()=>{
    navigate("/Home")
  }
  const handleLogout = ()=>{
    navigate("/")
  }
  const [toggle, settoggle]= useState(false)
  const handleHamburg =()=>{
    settoggle(true);
  }
  return (
    <div className='nav'>
        <div className='leftnav'>
            <h1 className='logo' onClick={handleHome}>logo</h1>
        </div>
        <div className='rightnav'>
            <ul>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>About</a></li>
                <li><a href='#'>Contact Us</a></li>
                <li><a onClick={handleLogout}>LogOut</a></li>
                {toggle===true?<Togglemenu onClose ={settoggle}/>:<img onClick ={handleHamburg} className="hamburg" src = "/Images/9104209_hamburger_menu_navigation_navbar_icon (1).png"></img>}

               
            </ul>
                       
        </div>
      
    </div>
  )
}

export default Navbar
