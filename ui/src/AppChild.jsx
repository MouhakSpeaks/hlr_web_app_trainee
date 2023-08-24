import React from 'react'
import Navbar from './Components/Navbar'
import Createbtn from './Components/Buttons/Createbtn'
import { GoogleLogin } from '@react-oauth/google'

const AppChild = () => {
  return (
    <div>
      <Navbar />
      <Createbtn />
    </div>
  )
}

export default AppChild
