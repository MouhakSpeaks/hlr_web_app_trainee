import React, { useState } from 'react'
import Createbtn from './Buttons/Createbtn'
import CreateMyForm from './CreateMyForm'
const Myform = () => {
    const [goBack, setgoBack] = useState(false)
    const handlegoback=()=>{
        setgoBack(true)
    }
  return (
    <>
        {goBack===true?<Createbtn/>: <div className='myform'>
        <CreateMyForm />
        <div className='firstbtns'><button onClick={handlegoback} className='goBack'>Cancel</button></div>  
         
        </div>}
    </>
    
  )
}
export default Myform
